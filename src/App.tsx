import React from 'react';
import MaterialEditor from './MaterialEditor';
import MaterialList from './MaterialList';
import MaterialViewer from './MaterialViewer';
import Message from './Message';
import SyncStatusProps from './SyncStatus';
import {
  createMaterial,
  getNextMaterialId,
  removeCloudMaterial,
  removeMaterial,
  removeRawMaterial,
  sendCloudMaterial,
  CutSetting,
  ScoreSetting,
  VectorEngraveSetting,
  BitmapEngraveSetting,
} from './lib/material';
import { IconPlus } from './Icons';
import {
  clearTempMaterial,
  forceSync,
  getBytesInUse,
  getShouldUpdate,
  reload,
  storeMaterials,
  storeRawMaterials,
  Material,
  RawMaterial,
} from './lib/chromeWrappers';
import {
  STATE_ADD,
  STATE_DISPLAY,
  STATE_EDIT,
  STATE_SELECTED,
} from './state';
import {
  EMPTY_BITMAP_ENGRAVE,
  EMPTY_MATERIAL,
  EMPTY_SCORE,
  EMPTY_VECTOR_ENGRAVE,
  TempMaterial,
} from './lib/constants';
import './App.css';
import logo from './logo.svg';

export type AddMaterial = () => Promise<void>;
export type CopyMaterial = (title: string) => Promise<void>;
export type EditMaterial = (title: string) => Promise<void>;
export type RemoveMaterial = (id: string, title: string) => Promise<void>;
export type UpdateMaterial = (key: string, value: any) => void;

export type UpdateCut = (cut: CutSetting) => void;

export type AddScore = () => void;
export type UpdateScore = (index: number, score: ScoreSetting) => void;

export type AddBitmapEngrave = () => void;
export type UpdateBitmapEngrave = (index: number, bitmap: BitmapEngraveSetting) => void;

export type AddVectorEngrave = () => void;
export type UpdateVectorEngrave = (index: number, vector: VectorEngraveSetting) => void;

interface MaterialEditor {
  addMaterial: AddMaterial;
  copyMaterial: CopyMaterial;
  editMaterial: EditMaterial;
  remove: RemoveMaterial;
  updateMaterial: UpdateMaterial;

  updateCut: UpdateCut;
  addScore: AddScore;
  updateScore: UpdateScore;
  addVectorEngrave: AddVectorEngrave;
  updateVectorEngrave: UpdateVectorEngrave;
  addBitmapEngrave: AddBitmapEngrave;
  updateBitmapEngrave: UpdateBitmapEngrave;
}

export type ForceSyncronize = () => Promise<void>;

export type ModeCancel = () => Promise<void>;
export type ModeAdd = () => Promise<void>;
export type ModeEdit = (title: string) => Promise<void>;
export type ModeSelect = (title: string) => Promise<void>;

interface Modes {
  modeAdd: ModeAdd;
  modeCancel: ModeCancel
  modeEdit: ModeEdit;
  modeSelect: ModeSelect;
}

interface AppProps {
  cloudStorageBytesUsed: number;
  connected: boolean;
  materials: Material[];
  platform: string;
  rawMaterials: RawMaterial[];
  shouldUpdate: boolean;
  tempMaterial: TempMaterial;
}

interface AppState {
  action: string;
  cloudStorageBytesUsed: number;
  material: TempMaterial;
  materials: Material[];
  message: string;
  messageColor: string | null;
  rawMaterials: RawMaterial[];
  synchronized: boolean;
}

class App extends React.Component<AppProps, AppState> implements Modes, MaterialEditor {
  state: AppState = {
    action: STATE_DISPLAY,
    cloudStorageBytesUsed: 0,
    message: '',
    messageColor: null,
    material: {
      ...EMPTY_MATERIAL,
    },
    materials: [],
    rawMaterials: [],
    synchronized: true,
  };

  componentDidMount() {
    if (this.props.tempMaterial) {
      this.setState({
        action: STATE_ADD,
        cloudStorageBytesUsed: this.props.cloudStorageBytesUsed,
        material: this.props.tempMaterial,
        materials: this.props.materials,
        message: 'Material settings were automatically restored from a previous session.',
        messageColor: null,
        rawMaterials: this.props.rawMaterials,
        synchronized: !this.props.shouldUpdate,
      });
    } else {
      this.setState({
        cloudStorageBytesUsed: this.props.cloudStorageBytesUsed,
        materials: this.props.materials,
        rawMaterials: this.props.rawMaterials,
        synchronized: !this.props.shouldUpdate,
      });
    }

    setInterval(async () => {
      const cloudStorageBytesUsed = await getBytesInUse();
      const shouldUpdate = await getShouldUpdate();
      if (this.state.synchronized === shouldUpdate) {
        this.setState({
          cloudStorageBytesUsed,
          synchronized: !shouldUpdate,
        });
      } else {
        this.setState({
          cloudStorageBytesUsed,
        });
      }
    }, 5000);
  }

  updateMaterial(key: string, value: any) {
    this.setState({
      material: {
        ...this.state.material,
        [key]: value,
      },
    });
  }

  updateCut(cut: CutSetting) {
    this.setState({
      material: {
        ...this.state.material,
        cut,
      },
    });
  }

  addScore() {
    this.setState({
      material: {
        ...this.state.material,
        scores: [ ...this.state.material.scores, EMPTY_SCORE ],
      },
    });
  }

  updateScore(index: number, score: ScoreSetting) {
    const scores = this.state.material.scores;
    scores[index] = score;
    this.setState({
      material: {
        ...this.state.material,
        scores: [...scores],
      }
    });
  }

  addVectorEngrave() {
    this.setState({
      material: {
        ...this.state.material,
        vectors: [ ...this.state.material.vectors, EMPTY_VECTOR_ENGRAVE ],
      },
    });
  }

  updateVectorEngrave(index: number, vector: VectorEngraveSetting) {
    const vectors = this.state.material.vectors;
    vectors[index] = vector;
    this.setState({
      material: {
        ...this.state.material,
        vectors: [...vectors],
      }
    });
  }

  addBitmapEngrave() {
    this.setState({
      material: {
        ...this.state.material,
        bitmaps: [ ...this.state.material.bitmaps, EMPTY_BITMAP_ENGRAVE ],
      },
    });
  }

  updateBitmapEngrave(index: number, bitmap: BitmapEngraveSetting) {
    const bitmaps = this.state.material.bitmaps;
    bitmaps[index] = bitmap;
    this.setState({
      material: {
        ...this.state.material,
        bitmaps: [...bitmaps],
      }
    });
  }

  displayError(message: string) {
    this.setState({
      message,
      messageColor: '#CC3A4B',
    });
  }

  async addMaterial() {
    const nextId = await getNextMaterialId();
    const newMaterial = createMaterial(this.state.material,nextId);
    const duplicate = this.state.materials.find(material => {
      return material.id === newMaterial.id || material.title === newMaterial.title;
    });

    if (duplicate) {
      this.displayError('A material with the same name already exists.');
      return;
    }

    // Create and store.
    const newMaterials: Material[] = [...this.state.materials, newMaterial];
    const newRawMaterials = [...this.state.rawMaterials, this.state.material];
    await storeMaterials(newMaterials)
    await storeRawMaterials(newRawMaterials);
    await clearTempMaterial();

    // Send materials to the cloud
    await sendCloudMaterial(this.state.material);

    this.setState({
      action: STATE_DISPLAY,
      material: { ...EMPTY_MATERIAL },
      materials: newMaterials,
      message: '',
      messageColor: null,
      rawMaterials: newRawMaterials,
      synchronized: false,
    });
  }

  /**
   * Copies an existing material and appends a '(1)' to its name.
   *
   * @param {string} title
   */
  async copyMaterial(title: string) {

    const duplicates = this.state.materials.filter(material => {
      return material.title === title;
    });

    if (duplicates.length < 1) {
      this.displayError('Could not clone the source material was removed.');
      return;
    }

    const material = this.state.rawMaterials.find(rawMaterial => {
      return `${rawMaterial.thickName} ${rawMaterial.name}` === title;
    });

    this.setState({
      action: STATE_ADD,
      material: {
        ...material,
        name: `${material.name} (${duplicates.length})`,
      },
    });
  }

  async editMaterial(title: string) {
    const duplicates = this.state.materials.filter(material => {
      return material.title === `${title}`;
    });

    if (duplicates.length !== 1) {
      this.displayError('Could not update. A material with the same name already exists.');
      return;
    }

    // Update material using the same id.
    const materialId = duplicates[0].id.split(':')[1];
    const newMaterial = createMaterial(this.state.material, materialId)

    // Store
    const newMaterials = this.state.materials.filter(material => {
      return material.title !== `${title}`;
    });
    newMaterials.push(newMaterial)
    const newRawMaterials = this.state.rawMaterials.filter(material => {
      return `${material.thickName} ${material.name}` !== `${title}`;
    });
    newRawMaterials.push(this.state.material);

    await storeMaterials(newMaterials)
    await storeRawMaterials(newRawMaterials);

    // Send updated materials to the cloud
    await removeCloudMaterial(this.state.materials.find(material => {
      return material.title === `${title}`;
    }));
    await sendCloudMaterial(this.state.material);

    this.setState({
      action: STATE_DISPLAY,
      material: { ...EMPTY_MATERIAL },
      materials: newMaterials,
      message: '',
      messageColor: null,
      rawMaterials: newRawMaterials,
      synchronized: false,
    });
  }

  async remove(id: string, title: string) {
    const found = this.state.rawMaterials.find((material: RawMaterial) => {
      return `${material.thickName} ${material.name}` === `${title}`;
    })
    if (!found) {
      return;
    }
    await removeCloudMaterial(found);
    const materials = await removeMaterial(id);
    const rawMaterials = await removeRawMaterial(title);
    this.setState({
      action: STATE_DISPLAY,
      material: {
        ...EMPTY_MATERIAL,
      },
      materials,
      rawMaterials,
      synchronized: false,
    });
    await reload();
  }

  async forceSyncronize() {
    await forceSync();
    this.setState({
      synchronized: false,
    });
  }

  async changeMode(mode: string, material = EMPTY_MATERIAL) {
    await clearTempMaterial();
    this.setState({
      action: mode,
      material: {
        ...material,
      },
      message: '',
      messageColor: null,
    });
  }

  /**
   * Switches to `add material` mode and resets the current material state to
   * a blank material.
   */
  async modeAdd() {
    await this.changeMode(STATE_ADD);
  }

  /**
   * Cancels the current input mode, resetting the materiall state and clearing
   * any system messages.
   */
  async modeCancel() {
    await this.changeMode(STATE_DISPLAY);
  }

  /**
   * Switches to `edit material` mode and opens up an existing material for
   * alterations.
   *
   * @param {string} title The material tile.
   */
  async modeEdit(title: string) {
    const material = this.state.rawMaterials.find(material => {
      return `${material.thickName} ${material.name}` === title;
    });
    await this.changeMode(STATE_EDIT, material);
  }

  /**
   * Switches to `selected mode` opens up a material for viewing its current
   * settings.
   *
   * @param {string} title The material title.
   */
  async modeSelect(title: string) {
    const material = this.state.rawMaterials.find(material => {
      return `${material.thickName} ${material.name}` === title;
    });
    await this.changeMode(STATE_SELECTED, material);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Glowforge Material Manager</h1>
          <SyncStatusProps
            connected={this.props.connected}
            forceSync={this.forceSyncronize.bind(this)}
            synchronized={this.state.synchronized}
          />
          <span>{`Cloud Storage Used ${this.state.cloudStorageBytesUsed} / 102,400`}</span>
        </header>
        <Message message={this.state.message} color={this.state.messageColor} />
        <div className={`App-grid ${(this.props.platform === 'mac') ? 'osx' : ''}`}>
          <div className="col-materials">
            <div className="App-materials">
              <MaterialList
                cloneMaterial={this.copyMaterial.bind(this)}
                editMaterial={this.modeEdit.bind(this)}
                materials={this.state.materials}
                removeMaterial={this.remove.bind(this)}
                selectMaterial={this.modeSelect.bind(this)}
              />
            </div>
          </div>
          <div className="col-contents">
            <div className="App-intro">
              <p style={{float: 'left', width: '250px'}}>
                Add your own custom material settings here.
              </p>
              <div style={{float: 'right', margin: '14px 14px 14px 0'}}>
                <IconPlus click={this.modeAdd.bind(this)} />
              </div>
            </div>
            <MaterialViewer
              action={this.state.action}
              addMaterial={this.addMaterial.bind(this)}
              cancelMaterial={this.modeCancel.bind(this)}
              editMaterial={this.editMaterial.bind(this)}
              material={this.state.material}
            />
            <MaterialEditor
              action={this.state.action}
              addBitmapEngrave={this.addBitmapEngrave.bind(this)}
              addMaterial={this.addMaterial.bind(this)}
              addScore={this.addScore.bind(this)}
              addVectorEngrave={this.addVectorEngrave.bind(this)}
              cancelMaterial={this.modeCancel.bind(this)}
              editMaterial={this.editMaterial.bind(this)}
              material={this.state.material}
              updateBitmapEngrave={this.updateBitmapEngrave.bind(this)}
              updateCut={this.updateCut.bind(this)}
              updateMaterial={this.updateMaterial.bind(this)}
              updateScore={this.updateScore.bind(this)}
              updateVectorEngrave={this.updateVectorEngrave.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
