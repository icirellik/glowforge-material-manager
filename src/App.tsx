import React from 'react';
import MaterialEditor from './MaterialEditor';
import MaterialList from './MaterialList';
import MaterialViewer from './viewer/MaterialViewer';
import Message from './Message';
import SyncStatusProps from './SyncStatus';
import {
  createMaterial,
  removeCloudMaterial,
  removeRawMaterial,
  sendCloudMaterial,
  removeMaterialTitle,
} from './lib/material';
import { IconPlus } from './Icons';
import {
  clearTempMaterial,
  forceSync,
  getBytesInUse,
  getLocalStorage,
  getShouldUpdate,
  reloadGlowForgeTab,
  storeGlowforgeMaterials,
  storeRawMaterials,
} from './lib/chromeWrappers';
import {
  EMPTY_BITMAP_ENGRAVE,
  EMPTY_MATERIAL,
  EMPTY_SCORE,
  EMPTY_VECTOR_ENGRAVE,
  TempMaterial,
} from './lib/constants';
import './App.css';
import logo from './logo.svg';
import {
  PluginBitmapEngraveSetting,
  PluginCutSetting,
  PluginScoreSetting,
  PluginVectorEngraveSetting,
  PluginMaterial,
} from './lib/materialRaw';
import { GFMaterial } from './lib/materialGlowforge';
import { sha1 } from './lib/utils';
import { readQrCode } from './lib/qrCode';

export type AddMaterial = () => Promise<void>;
export type CopyMaterial = (title: string) => Promise<void>;
export type EditMaterial = (title: string) => Promise<void>;
export type RemoveMaterial = (title: string) => Promise<void>;
export type SetMaterial = (title: string) => Promise<void>;
export type UpdateMaterial = (key: keyof TempMaterial, value: any) => void;

export type UpdateCut = (cut: PluginCutSetting) => void;

export type AddScore = () => void;
export type UpdateScore = (index: number, score: PluginScoreSetting) => void;

export type AddBitmapEngrave = () => void;
export type UpdateBitmapEngrave = (index: number, bitmap: PluginBitmapEngraveSetting) => void;

export type AddVectorEngrave = () => void;
export type UpdateVectorEngrave = (index: number, vector: PluginVectorEngraveSetting) => void;

interface IMaterialEditor {
  addMaterial: AddMaterial;
  copyMaterial: CopyMaterial;
  editMaterial: EditMaterial;
  removeMaterial: RemoveMaterial;
  setMaterial: SetMaterial;
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

export type EditorMode =  'DISPLAY' | 'ADD' | 'EDIT' | 'SELECTED';
export type EditorModeChange = (mode: EditorMode, material: TempMaterial) => Promise<void>;
export type ModeAdd = () => Promise<void>;
export type ModeCancel = () => Promise<void>;
export type ModeEdit = (title: string) => Promise<void>;
export type ModeSelect = (title: string) => Promise<void>;

interface IEditorMode {
  changeEditorMode: EditorModeChange;
  setEditorModeAdd: ModeAdd;
  setEditorModeCancel: ModeCancel
  setEditorModeEdit: ModeEdit;
  setEditorModeSelect: ModeSelect;
}

interface AppProps {
  connected: boolean;
  platform: string;
}

interface AppMessage {
  message: string;
  color: string | null;
}

interface AppState {
  action: EditorMode;
  cloudStorageBytesUsed: number;
  materials: GFMaterial[];
  message: AppMessage | null;
  rawMaterials: PluginMaterial[];
  synchronized: boolean;
  tempMaterial: TempMaterial;
}

function sendMessage(message: object) {
  // Forward the request to the GFUI
  window.chrome.runtime.getBackgroundPage((window) => {
    if (window) {
      if (!(window as any).inboundQueue) {
        (window as any).inboundQueue = [];
      }
      (window as any).inboundQueue.push(message);
    }
  });
}

class App extends React.Component<AppProps, AppState> implements IEditorMode, IMaterialEditor {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      action: 'DISPLAY',
      cloudStorageBytesUsed: 0,
      message: null,
      tempMaterial: {
        ...EMPTY_MATERIAL,
      },
      materials: [],
      rawMaterials: [],
      synchronized: true,
    };
  }

  async componentDidMount() {
    // Track the bytes used.
    const cloudStorageBytesUsed = await getBytesInUse();

    // Get the initial state from local storage.
    const localStorage = await getLocalStorage();

    if (localStorage.tempMaterial) {
      this.setState({
        action: 'ADD',
        cloudStorageBytesUsed,
        materials: localStorage.materials!,
        message: {
          message: 'Material settings were automatically restored from a previous session.',
          color: null,
        },
        rawMaterials: localStorage.rawMaterials!,
        synchronized: !localStorage.shouldUpdate,
        tempMaterial: localStorage.tempMaterial,
      });
    } else {
      this.setState({
        cloudStorageBytesUsed,
        materials: localStorage.materials!,
        rawMaterials: localStorage.rawMaterials!,
        synchronized: !localStorage.shouldUpdate,
      });
    }

    /**
     * Start an interval to handle messaging with the background process.
     */
    setInterval(async () => {
      // Refresh the cloud storage in use
      const cloudStorageBytesUsed = await getBytesInUse();

      // Refresh the sync status.
      const shouldUpdate = await getShouldUpdate();

      // Update teh state.
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

      // Check background threads for messages.
      window.chrome.runtime.getBackgroundPage(async (window) => {
        if (window) {
          const outboundQueue = (window as any).outboundQueue;

          if (outboundQueue.length > 0) {
            const messages = outboundQueue.splice(0);

            for (let i = 0; i < messages.length; i += 1) {
              const message = messages[i];

              const image = `https://app.glowforge.com${message.image}`;

              const qrCodeData = await readQrCode(image);
              console.log(qrCodeData);

              if (qrCodeData && qrCodeData.startsWith('Glowforge')) {
                this.setState({
                  message: {
                    message: 'Proofgrade material detected.',
                    color: null,
                  },
                });
              } else if (qrCodeData && qrCodeData.startsWith('Custom')) {
                sendMessage({
                  type: 'selectMaterial',
                  materialId: qrCodeData,
                });
                this.setState({
                  message: {
                    message: 'Custom material detected.',
                    color: null,
                  },
                });
              }
            }
          }
        }
      });
    }, 750);
  }

  // Temporary Material State
  // =================================================================

  /**
   * Updates the base material properties: thickName, name, thickness
   */
  updateMaterial(key: keyof TempMaterial, value: string | number) {
    this.setState({
      tempMaterial: {
        ...this.state.tempMaterial,
        [key]: value,
      },
    });
  }

  updateCut(cut: PluginCutSetting) {
    this.setState({
      tempMaterial: {
        ...this.state.tempMaterial,
        cut,
      },
    });
  }

  addScore() {
    this.setState({
      tempMaterial: {
        ...this.state.tempMaterial,
        scores: [ ...this.state.tempMaterial.scores, EMPTY_SCORE ],
      },
    });
  }

  updateScore(index: number, score: PluginScoreSetting) {
    const scores = this.state.tempMaterial.scores;
    scores[index] = score;
    this.setState({
      tempMaterial: {
        ...this.state.tempMaterial,
        scores: [...scores],
      }
    });
  }

  addVectorEngrave() {
    this.setState({
      tempMaterial: {
        ...this.state.tempMaterial,
        vectors: [ ...this.state.tempMaterial.vectors, EMPTY_VECTOR_ENGRAVE ],
      },
    });
  }

  updateVectorEngrave(index: number, vector: PluginVectorEngraveSetting) {
    const vectors = this.state.tempMaterial.vectors;
    vectors[index] = vector;
    this.setState({
      tempMaterial: {
        ...this.state.tempMaterial,
        vectors: [...vectors],
      }
    });
  }

  addBitmapEngrave() {
    this.setState({
      tempMaterial: {
        ...this.state.tempMaterial,
        bitmaps: [ ...this.state.tempMaterial.bitmaps, EMPTY_BITMAP_ENGRAVE ],
      },
    });
  }

  updateBitmapEngrave(index: number, bitmap: PluginBitmapEngraveSetting) {
    const bitmaps = this.state.tempMaterial.bitmaps;
    bitmaps[index] = bitmap;
    this.setState({
      tempMaterial: {
        ...this.state.tempMaterial,
        bitmaps: [...bitmaps],
      }
    });
  }

  // Material Management
  // =================================================================

  /**
   *
   */
  async addMaterial() {
    // Hash the title and take the first seven for the id.
    const { thickName, name } = this.state.tempMaterial;
    const title = `${thickName} ${name}`
    const hash = await sha1(title);
    const id = hash.substring(0, 7);

    // Create the new material.
    const newMaterial = createMaterial(this.state.tempMaterial, id);

    // Double check for duplicates
    const duplicate = this.state.materials.find(material => {
      return material.id === newMaterial.id || material.title === newMaterial.title;
    });

    if (duplicate) {
      this.displayError('A material with the same name already exists.');
      return;
    }

    // Create and store.
    const newMaterials: GFMaterial[] = [...this.state.materials, newMaterial];
    const newRawMaterials = [...this.state.rawMaterials, this.state.tempMaterial];
    await storeGlowforgeMaterials(newMaterials)
    await storeRawMaterials(newRawMaterials);
    await clearTempMaterial();

    // Send materials to the cloud
    await sendCloudMaterial(this.state.tempMaterial);

    // Update the application state.
    this.setState({
      action: 'DISPLAY',
      tempMaterial: { ...EMPTY_MATERIAL },
      materials: newMaterials,
      message: null,
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
    // Look for any duplicates.
    const duplicates = this.state.materials.filter(material => {
      return material.title === title;
    });

    // There should be at least one since we are cloning.
    if (duplicates.length < 1) {
      this.displayError('Could not clone the source material was removed.');
      return;
    }

    // Get the material so we can clone it.
    const material = this.state.rawMaterials.find(rawMaterial => {
      return `${rawMaterial.thickName} ${rawMaterial.name}` === title;
    });

    // Update the application state.
    if (material) {
      this.setState({
        action: 'ADD',
        tempMaterial: {
          ...material,
          name: `${material.name} (${duplicates.length})`,
        },
      });
    }
  }

  /**
   *
   * @param title
   */
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
    const newMaterial = createMaterial(this.state.tempMaterial, materialId)

    // Store
    const newMaterials = this.state.materials.filter(material => {
      return material.title !== `${title}`;
    });
    newMaterials.push(newMaterial)
    const newRawMaterials = this.state.rawMaterials.filter(material => {
      return `${material.thickName} ${material.name}` !== `${title}`;
    });
    newRawMaterials.push(this.state.tempMaterial);

    await storeGlowforgeMaterials(newMaterials)
    await storeRawMaterials(newRawMaterials);

    // Send updated materials to the cloud
    const rawMaterial = this.state.rawMaterials.find(rawMaterial => {
      return `${rawMaterial.thickName} ${rawMaterial.name}` === `${title}`;
    });
    if (rawMaterial) {
      await removeCloudMaterial(rawMaterial);
    }
    await sendCloudMaterial(this.state.tempMaterial);

    // Update the application state.
    this.setState({
      action: 'DISPLAY',
      tempMaterial: { ...EMPTY_MATERIAL },
      materials: newMaterials,
      message: null,
      rawMaterials: newRawMaterials,
      synchronized: false,
    });
  }

  async removeMaterial(title: string) {
    // Look for the material.
    const found = this.state.rawMaterials.find((material: PluginMaterial) => {
      return `${material.thickName} ${material.name}` === `${title}`;
    });

    // If there is no material exit.
    if (!found) {
      return;
    }

    // Remove from cloud, local, and glowforge.
    await removeCloudMaterial(found);
    const materials = await removeMaterialTitle(title);
    const rawMaterials = await removeRawMaterial(title);

    // Update the application state.
    this.setState({
      action: 'DISPLAY',
      tempMaterial: { ...EMPTY_MATERIAL },
      materials,
      rawMaterials,
      synchronized: false,
    });

    // Reload the tab to ensure everything is up to date.
    // TOOD: Do we need this.
    await reloadGlowForgeTab();
  }

  /**
   * Sets the selected material in the GFUI.
   *
   * @param title
   */
  async setMaterial(title: string) {
    // Hash the title and take the first seven for the id.
    const hash = await sha1(title);
    const id = `Custom:${hash.substring(0, 7)}`;

    sendMessage({
      type: 'selectMaterial',
      materialId: id,
    });
  }

  async forceSyncronize() {
    await forceSync();
    this.setState({
      synchronized: false,
    });
  }

  // Messaging
  //

  displayError(message: string) {
    this.setState({
      message: {
        message,
        color: '#CC3A4B',
      },
    });
  }

  // Modes
  // =================================================================

  /**
   * Changes the edit mode and clears any temporary material set in local
   * storage along with resetting the current in progress material.
   *
   * @param mode
   * @param material
   */
  async changeEditorMode(mode: EditorMode, material = EMPTY_MATERIAL) {
    await clearTempMaterial();

    this.setState({
      action: mode,
      tempMaterial: {
        ...material,
      },
      message: null,
    });
  }

  /**
   * Switches to `add material` mode and resets the current material state to
   * a blank material.
   */
  async setEditorModeAdd() {
    await this.changeEditorMode('ADD');
  }

  /**
   * Cancels the current input mode, resetting the materiall state and clearing
   * any system messages.
   */
  async setEditorModeCancel() {
    await this.changeEditorMode('DISPLAY');
  }

  /**
   * Switches to `edit material` mode and opens up an existing material for
   * alterations.
   *
   * @param title The material title in the form `thickName name`
   */
  async setEditorModeEdit(title: string) {
    const rawMaterial = this.state.rawMaterials.find(rawMaterial => {
      return `${rawMaterial.thickName} ${rawMaterial.name}` === title;
    });
    await this.changeEditorMode('EDIT', rawMaterial);
  }

  /**
   * Switches to `selected mode` opens up a material for viewing its current
   * settings.
   *
   * @param title The material title in the form `thickName name`
   */
  async setEditorModeSelect(title: string) {
    const rawMaterial = this.state.rawMaterials.find(rawMaterial => {
      return `${rawMaterial.thickName} ${rawMaterial.name}` === title;
    });
    await this.changeEditorMode('SELECTED', rawMaterial);
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <div>
            <img src={logo} className="header__logo" alt="logo" />
            <h1 className="header__title">Glowforge Material Manager</h1>
            <SyncStatusProps
              connected={this.props.connected}
              forceSync={this.forceSyncronize.bind(this)}
              synchronized={this.state.synchronized}
            />
          </div>
          <span>{`Cloud Storage Used ${this.state.cloudStorageBytesUsed} / 102,400`}</span>
        </header>
        <div className={`App-grid ${(this.props.platform === 'mac') ? 'osx' : ''}`}>
          <div className="col-materials">
            <MaterialList
              cloneMaterial={this.copyMaterial.bind(this)}
              editMaterial={this.setEditorModeEdit.bind(this)}
              materials={this.state.rawMaterials}
              removeMaterial={this.removeMaterial.bind(this)}
              selectMaterial={this.setEditorModeSelect.bind(this)}
              setMaterial={this.setMaterial.bind(this)}
            />
          </div>
          <div className="col-contents">
            <div className="App-intro">
              <p style={{float: 'left', width: '250px'}}>
                Add your own custom material settings here.
              </p>
              <div style={{float: 'right', margin: '14px 14px 14px 0'}}>
                <IconPlus click={this.setEditorModeAdd.bind(this)} />
              </div>
            </div>
            <MaterialViewer
              editorMode={this.state.action}
              cancelMaterial={this.setEditorModeCancel.bind(this)}
              material={this.state.tempMaterial}
            />
            <MaterialEditor
              action={this.state.action}
              addBitmapEngrave={this.addBitmapEngrave.bind(this)}
              addMaterial={this.addMaterial.bind(this)}
              addScore={this.addScore.bind(this)}
              addVectorEngrave={this.addVectorEngrave.bind(this)}
              cancelMaterial={this.setEditorModeCancel.bind(this)}
              editMaterial={this.editMaterial.bind(this)}
              material={this.state.tempMaterial}
              updateBitmapEngrave={this.updateBitmapEngrave.bind(this)}
              updateCut={this.updateCut.bind(this)}
              updateMaterial={this.updateMaterial.bind(this)}
              updateScore={this.updateScore.bind(this)}
              updateVectorEngrave={this.updateVectorEngrave.bind(this)}
            />
          </div>
        </div>
        {this.state.message !== null ? <Message {...this.state.message} /> : null }
      </div>
    );
  }
}

export default App;
