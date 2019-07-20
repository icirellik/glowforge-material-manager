import React from 'react';
import MaterialEditor from './editor/MaterialEditor';
import MaterialList from './MaterialList';
import MaterialViewer from './viewer/MaterialViewer';
import Message from './Message';
import {
  createMaterial,
  removeCloudMaterial,
  removeRawMaterial,
  sendCloudMaterial,
  removeMaterialTitle,
} from './material/material';
import {
  clearTempMaterial,
  forceSync,
  getBytesInUse,
  getLocalStorage,
  getShouldUpdate,
  reloadGlowForgeTab,
  storeGlowforgeMaterials,
  storeRawMaterials,
  getUISettings,
  storeTempMaterial,
  sendMessage,
  getRawMaterials,
  getGlowforgeMaterials,
} from './lib/chromeWrappers';
import {
  TempMaterial,
  MultiSettings,
  createEmptyMaterial,
  MultiSettingFunctionsDefaults,
} from './lib/materialHelpers';
import './App.css';
import { PluginMaterial } from './material/materialPlugin';
import { GFMaterial } from './material/materialGlowforge';
import { sha1 } from './lib/crypto';
import { AppHeader } from './AppHeader';
import MaterialButtonBar from './MaterialButtonBar';
import MaterialHome from './MaterialHome';
import { syncronizeMaterials } from './material/material.sync';

// General Material Management Methoods
export type AddMaterial = () => Promise<void>;
export type CopyMaterial = (title: string) => Promise<void>;
export type EditMaterial = (title: string) => Promise<void>;
export type RemoveMaterial = (title: string) => Promise<void>;
export type SetMaterial = (title: string) => Promise<void>;
export type UpdateMaterial = <K extends keyof TempMaterial>(key: K, value: TempMaterial[K]) => void;

// General Purpose MultiSetting Methods
export type AddSetting = (prop: keyof MultiSettings) => void;
export type RemoveSetting = <K extends keyof MultiSettings>(prop: K, index: number) => void;
export type UpdateSetting = <K extends keyof MultiSettings>(prop: K, index: number, setting: MultiSettings[K]) => void;

interface IMaterialEditor {
  addMaterial: AddMaterial;
  copyMaterial: CopyMaterial;
  editMaterial: EditMaterial;
  removeMaterial: RemoveMaterial;
  setMaterial: SetMaterial;
  updateMaterial: UpdateMaterial;

  addSetting: AddSetting;
  removeSetting: RemoveSetting;
  updateSetting: UpdateSetting;
}

// Messaging Methods
export type ClearMessage = () => void;
export type DisplayMessage = (message: IMessage) => void;

interface IMessage {
  backgroundColor?: string;
  color?: string;
  message: string;
}

interface IMessenger {
  clearMessage: ClearMessage;
  displayMessage: DisplayMessage;
}

export type ForceSyncronize = () => Promise<void>;

// Editor Modes
export type EditorMode =  'DISPLAY' | 'ADD' | 'EDIT' | 'DUPLICATE' | 'SELECTED';
export type EditorModeChange = (mode: EditorMode, material: TempMaterial) => Promise<void>;
export type ModeAdd = (material?: TempMaterial) => Promise<void>;
export type ModeDefault = () => Promise<void>;
export type ModeEdit = (title: string) => Promise<void>;
export type ModeSelect = (title: string) => Promise<void>;

interface IEditorMode {
  changeEditorMode: EditorModeChange;
  setEditorModeAdd: ModeAdd;
  setEditorModeDefault: ModeDefault
  setEditorModeEdit: ModeEdit;
  setEditorModeSelect: ModeSelect;
}

// App Props + State
interface AppProps {
  connected: boolean;
  platform: string;
}

interface AppState {
  // The current editor mode.
  action: EditorMode;
  // The number of cloud bytes that are currently being used.
  cloudStorageBytesUsed: number;
  // The last time a cloud sync modified the local data.
  lastCloudSync: number | null;
  materials: GFMaterial[];
  message: IMessage | null;
  previousTitle: string | null;
  rawMaterials: PluginMaterial[];
  rawSvg: string | null;
  // Is the plugin in sync wit the GFUI.
  synchronized: boolean;
  tempMaterial: TempMaterial;
}

function defaultMessage(message: string): IMessage {
  return {
    backgroundColor: '#2541B2',
    color: '#CC3A4B',
    message,
  };
}

function errorMessage(message: string): IMessage {
  return {
    backgroundColor: '#DE6060',
    color: '#060606',
    message,
  };
}

class App extends React.Component<AppProps, AppState> implements IEditorMode, IMaterialEditor, IMessenger {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      action: 'DISPLAY',
      cloudStorageBytesUsed: 0,
      lastCloudSync: null,
      message: null,
      tempMaterial: {
        ...createEmptyMaterial(),
      },
      materials: [],
      previousTitle: null,
      rawMaterials: [],
      rawSvg: null,
      synchronized: true,
    };

    // Modes
    this.setEditorModeAdd = this.setEditorModeAdd.bind(this);
    this.setEditorModeDefault = this.setEditorModeDefault.bind(this);
    this.setEditorModeEdit = this.setEditorModeEdit.bind(this)
    this.setEditorModeSelect = this.setEditorModeSelect.bind(this)

    // Material
    this.addMaterial = this.addMaterial.bind(this);
    this.copyMaterial = this.copyMaterial.bind(this);
    this.editMaterial = this.editMaterial.bind(this);
    this.removeMaterial = this.removeMaterial.bind(this);
    this.setMaterial = this.setMaterial.bind(this);
    this.updateMaterial = this.updateMaterial.bind(this);

    // MultiSettings
    this.addSetting = this.addSetting.bind(this);
    this.removeSetting = this.removeSetting.bind(this);
    this.updateSetting = this.updateSetting.bind(this);

    // Messaging
    this.displayMessage = this.displayMessage.bind(this);
    this.clearMessage = this.clearMessage.bind(this);

    // Synchronization
    this.forceSyncronize = this.forceSyncronize.bind(this);
    this.toggleCloundSync = this.toggleCloundSync.bind(this);

    // Validaton
    this.validationHandler = this.validationHandler.bind(this);
  }

  private displayRef: React.RefObject<HTMLDivElement> = React.createRef();

  async componentDidMount() {
    // Track the bytes used.
    const cloudStorageBytesUsed = await getBytesInUse();

    // Get the initial state from local storage.
    const localStorage = await getLocalStorage();

    if (localStorage.tempMaterial) {
      // Clear any old validations
      localStorage.tempMaterial.propValidation = {};
      this.setState({
        action: 'ADD',
        cloudStorageBytesUsed,
        materials: localStorage.materials!,
        message: {
          message: 'Material settings were automatically restored from a previous session.',
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
      let stateUpdates: Partial<AppState> = {};

      // Refresh the cloud storage in use
      const cloudStorageBytesUsed = await getBytesInUse();

      // Refresh the sync status.
      const shouldUpdate = await getShouldUpdate();

      // Synchronize and materials.
      // TODO: should we run this on every loop.
      const updated = await syncronizeMaterials();
      if (updated) {
        const pluginMaterials = await getRawMaterials();
        const glowforgeMaterials = await getGlowforgeMaterials();

        let tempMaterial: PluginMaterial | undefined;
        if (this.state.tempMaterial) {
          tempMaterial = pluginMaterials.find(pluginMaterial => {
            const tempMaterialTitle =
              `${this.state.tempMaterial.thickName} ${this.state.tempMaterial.name}`;
            const pluginMaterialTitle =
              `${pluginMaterial.thickName} ${pluginMaterial.name}`;
            return pluginMaterialTitle === tempMaterialTitle;
          });
        };

        stateUpdates = {
          ...stateUpdates,
          lastCloudSync: +new Date(),
          materials: glowforgeMaterials,
          rawMaterials: pluginMaterials,
          tempMaterial: {
            ...createEmptyMaterial(),
            ...tempMaterial,
          }
        };
      }

      const uiSettings = await getUISettings();
      const rawSvg = (uiSettings && uiSettings.loadedDesignId) ? `https://storage.googleapis.com/glowforge-files/designs/${uiSettings.loadedDesignId}/svgf/svgf_file.gzip.svg` : null;

      // Update thr state.
      if (this.state.synchronized === shouldUpdate) {
        stateUpdates = {
          ...stateUpdates,
          cloudStorageBytesUsed,
          rawSvg,
          synchronized: !shouldUpdate,
        };
      } else if (
        cloudStorageBytesUsed !== this.state.cloudStorageBytesUsed ||
        rawSvg !== this.state.rawSvg
      ) {
        stateUpdates = {
          ...stateUpdates,
          cloudStorageBytesUsed,
          rawSvg,
        };
      }

      if (Object.keys(stateUpdates).length > 0) {
        this.setState(stateUpdates as AppState);
      }

      // Check background thread for messages.
      window.chrome.runtime.getBackgroundPage(async (window) => {
        if (!window) {
          return;
        }
        const outboundQueue = (window as any).outboundQueue;
        if (outboundQueue.length > 0) {
          const messages = outboundQueue.splice(0);
          for (let i = 0; i < messages.length; i += 1) {
            const message = messages[i];
            switch (message.type) {
              default:
                console.log('inbound message');
                // Example: Send message back.
                // sendMessage({
                //   type: 'selectMaterial',
                //   materialId: qrCodeData,
                // });
                break;
            }
          }
        }
      });
    }, 750);
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    if(this.displayRef && prevState.action !== this.state.action) {
      (this.displayRef.current as any).scrollTop = 0;
    }
  }

  // Temporary Material State
  // =================================================================

  /**
   * Updates the base material properties: thickName, name, thickness
   */
  updateMaterial<K extends keyof TempMaterial>(key: K, value: TempMaterial[K]) {
    this.setState({
      tempMaterial: {
        ...this.state.tempMaterial,
        [key]: value,
      },
    });
  }

  addSetting(prop: keyof MultiSettings) {
    this.setState((state) => {
      const emptySetting = MultiSettingFunctionsDefaults[prop];
      return {
        tempMaterial: {
          ...state.tempMaterial,
          [prop]: [ ...state.tempMaterial[prop], emptySetting() ],
        },
      };
    });
  }

  removeSetting<K extends keyof MultiSettings>(prop: K, index: number) {
    this.setState((state) => {
      state.tempMaterial[prop].splice(index, 1);
      return {
        tempMaterial: {
          ...state.tempMaterial,
          [prop]: [...state.tempMaterial[prop]],
        },
      };
    });
  }

  updateSetting<K extends keyof MultiSettings>(prop: K, index: number, setting: MultiSettings[K]) {
    this.setState((state) => {
      const settings = state.tempMaterial[prop];
      settings[index] = setting;
      return {
        tempMaterial: {
          ...state.tempMaterial,
          [prop]: [...settings],
        },
      };
    });
  }

  // Material Management
  // =================================================================

  /**
   *
   */
  async addMaterial() {

    const isValid = Object.keys(this.state.tempMaterial.propValidation).map((key) => {
      return this.state.tempMaterial.propValidation[key];
    }).reduce((prev, cur) => {
      return prev && cur;
    }, true);

    if (!isValid) {
      this.displayMessage(errorMessage('A material property is invalid.'));
      return;
    }

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
      this.displayMessage(errorMessage('A material with the same name already exists.'));
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
      materials: newMaterials,
      message: null,
      rawMaterials: newRawMaterials,
      synchronized: false,
    });

    this.setEditorModeSelect(title);
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
      this.displayMessage(defaultMessage('Could not clone the source material was removed.'));
      return;
    }

    // Get the material so we can clone it.
    const material = this.state.rawMaterials.find(rawMaterial => {
      return `${rawMaterial.thickName} ${rawMaterial.name}` === title;
    });

    // Update the application state.
    if (material) {
      this.setEditorModeDuplicate({
        ...material,
        name: `${material.name} (${duplicates.length})`,
        propValidation: {},
      });
    } else {
      // TOOD: Error message copy failed;
    }
  }

  /**
   *
   * @param title
   */
  async editMaterial(title: string) {

    const isValid = Object.keys(this.state.tempMaterial.propValidation).map((key) => {
      return this.state.tempMaterial.propValidation[key];
    }).reduce((prev, cur) => {
      return prev && cur;
    }, true);

    if (!isValid) {
      this.displayMessage(errorMessage('A material property is invalid.'));
      return;
    }

    const duplicates = this.state.materials.filter(material => {
      return material.title === `${title}`;
    });

    if (duplicates.length !== 1) {
      this.displayMessage(errorMessage('Could not update. A material with the same name already exists.'));
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
      materials: newMaterials,
      message: null,
      rawMaterials: newRawMaterials,
      synchronized: false,
    });

    this.setEditorModeSelect(title);
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
      materials,
      rawMaterials,
      synchronized: false,
    });

    this.setEditorModeDefault();

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

  // Cloud Sync
  // =================================================================

  async forceSyncronize() {
    await forceSync();
    this.setState({
      synchronized: false,
    });
  }

  async toggleCloundSync(material: TempMaterial) {
    const title = getMaterialTitle(material);

    const updatedMaterial = {
      ...material,
      sync: !material.sync,
    };

    if (material.sync) {
      // Update the current material.
      const pluginMaterials = this.state.rawMaterials.filter(material => {
        return getMaterialTitle(material) !== title;
      });
      pluginMaterials.push(updatedMaterial);

      await storeRawMaterials(pluginMaterials);
      await storeTempMaterial(updatedMaterial);
      await removeCloudMaterial(updatedMaterial);

      // Update the application state.
      this.setState({
        message: null,
        rawMaterials: pluginMaterials,
        tempMaterial: updatedMaterial,
        synchronized: false,
      });

    } else {
      // Update the current material.
      const pluginMaterials = this.state.rawMaterials.filter(material => {
        return getMaterialTitle(material) !== title;
      });
      pluginMaterials.push(updatedMaterial);

      await storeRawMaterials(pluginMaterials);
      await storeTempMaterial(updatedMaterial);
      await sendCloudMaterial(updatedMaterial);

      // Update the application state.
      this.setState({
        message: null,
        rawMaterials: pluginMaterials,
        tempMaterial: updatedMaterial,
        synchronized: false,
      });
    }
  }

  // Messaging
  // =================================================================

  displayMessage(message: IMessage) {
    this.setState({
      message,
    });
  }

  clearMessage() {
    this.setState({
      message: null,
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
  async changeEditorMode(mode: EditorMode, material: TempMaterial | null = null) {
    const previousTitle = `${this.state.tempMaterial.thickName} ${this.state.tempMaterial.name}`;

    await clearTempMaterial();

    this.setState({
      action: mode,
      previousTitle,
      tempMaterial: {
        ...(material === null) ? createEmptyMaterial() : material,
      },
    });
  }

  /**
   * Switches to `add material` mode and resets the current material state to
   * a blank material.
   */
  async setEditorModeAdd(material: TempMaterial | null = null) {
    await this.changeEditorMode('ADD', material);
  }

  /**
   * Cancels the current input mode, resetting the material state and clearing
   * any system messages.
   */
  async setEditorModeDefault() {
    await this.changeEditorMode('DISPLAY');
  }

  /**
   * Chenges the editor mode to duplication.
   *
   * @param material The duplicate material.
   */
  async setEditorModeDuplicate(material: TempMaterial) {
    await this.changeEditorMode('DUPLICATE', material);
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
    await this.changeEditorMode('EDIT', {
      ...rawMaterial!,
      propValidation: {},
    });
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

    if (!rawMaterial) {
      this.displayMessage(defaultMessage('The selected material could not be found.'));
      await this.setEditorModeDefault();
      return;
    }

    await this.changeEditorMode('SELECTED', {
      ...rawMaterial,
      propValidation: {},
    });
  }

  validationHandler(id: string, isValid: boolean) {
    const tempMaterial = {
      ...this.state.tempMaterial,
    };
    tempMaterial.propValidation[id] = isValid;

    this.setState({
      tempMaterial,
    });
  }

  render() {
    let displayPanel: JSX.Element | null = null;
    switch (this.state.action) {
      default:
      case 'DISPLAY':
          displayPanel = (
          <MaterialHome
            materials={this.state.rawMaterials}
            rawSvg={this.state.rawSvg}
            setEditorModeAdd={this.setEditorModeAdd}
          />
        );
        break;
      case 'SELECTED':
          displayPanel = (
          <MaterialViewer
            material={this.state.tempMaterial}
            removeMaterial={this.removeMaterial}
            toggleCloundSync={this.toggleCloundSync}
          />
        );
        break;
      case 'ADD':
      case 'DUPLICATE':
      case 'EDIT':
        displayPanel = (
          <MaterialEditor
            editorMode={this.state.action}
            addSetting={this.addSetting}
            removeSetting={this.removeSetting}
            updateSetting={this.updateSetting}
            material={this.state.tempMaterial}
            updateMaterial={this.updateMaterial}
            validationHandler={this.validationHandler}
          />
        );
    }

    return (
      <div className="App">
        <AppHeader
          connected={this.props.connected}
          forceSyncronize={this.forceSyncronize}
          synchronized={this.state.synchronized}
          cloudStorageBytesUsed={this.state.cloudStorageBytesUsed}
        />
        <div className={`columns ${(this.props.platform === 'mac') ? 'osx' : ''}`}>
          <div className="col-materials">
            <MaterialList
              materials={this.state.rawMaterials}
              selectMaterial={this.setEditorModeSelect}
              setEditorModeAdd={this.setEditorModeAdd}
              setMaterial={this.setMaterial}
              tempMaterial={this.state.tempMaterial}
            />
          </div>
          <div className="column__right">
            <div className="buttonBar">
              <MaterialButtonBar
                addMaterial={this.addMaterial}
                copyMaterial={this.copyMaterial}
                editMaterial={this.editMaterial}
                editorMode={this.state.action}
                previousTitle={this.state.previousTitle}
                setEditorModeAdd={this.setEditorModeAdd}
                setEditorModeDefault={this.setEditorModeDefault}
                setEditorModeEdit={this.setEditorModeEdit}
                setEditorModeSelect={this.setEditorModeSelect}
                setMaterial={this.setMaterial}
                title={`${this.state.tempMaterial.thickName} ${this.state.tempMaterial.name}`}
              />
            </div>
            <div className="col-contents" ref={this.displayRef}>
              <div className="col-contents-container">
                {displayPanel}
              </div>
            </div>
          </div>
        </div>
        {
          this.state.message !== null ?
            <Message clearMessage={this.clearMessage} {...this.state.message} /> : null
        }
      </div>
    );
  }
}

export default App;

function getMaterialTitle(material: PluginMaterial) {
  return `${material.thickName} ${material.name}`;
}
