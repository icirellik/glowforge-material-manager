import React from 'react';
import MaterialButtonBar from './MaterialButtonBar';
import MaterialEditor from './editor/MaterialEditor';
import MaterialHome from './MaterialHome';
import MaterialList from './MaterialList';
import MaterialViewer from './viewer/MaterialViewer';
import Message from './Message';
import {
  createMaterial,
  removeCloudMaterial,
  removeRawMaterial,
  replaceCloudMaterial,
  removeMaterialTitle,
  stripCustomPrefix,
} from './material/material';
import {
  clearTempMaterial,
  forceSync,
  getBytesInUse,
  getSynchronizedItemCount,
  getLocalStorage,
  getTabConnection,
  reloadGlowForgeTab,
  storeGlowforgeMaterials,
  storeRawMaterials,
  storeTempMaterial,
  sendMessage,
  getRawMaterials,
  getGlowforgeMaterials,
  StorageLocal,
  TabConnection,
  getBackups,
  storeBackup,
} from './lib/chromeWrappers';
import {
  TempMaterial,
  MultiSettings,
  createEmptyMaterial,
  MultiSettingFunctionsDefaults,
} from './lib/materialHelpers';
import { AppHeader } from './AppHeader';
import { BackupViewer } from './BackupViewer';
import { GFMaterial } from './material/materialGlowforge';
import { PluginMaterial } from './material/materialPlugin';
import { addContentScripts } from './lib/contentScripts';
import {
  hasLidImageAccess,
  removeLidImageAccess,
  requestLidImageAccess,
} from './lib/lidImage';
import { materialIdForTitle } from './material/materialId';
import { syncronizeMaterials } from './material/material.sync';
import './App.css';

// General Material Management Methoods
export type AddMaterial = () => Promise<void>;
export type CopyMaterial = (title: string) => Promise<void>;
export type EditMaterial = (title: string) => Promise<void>;
export type RemoveMaterial = (title: string) => Promise<void>;
export type SetMaterial = (title: string) => Promise<void>;
export type UpdateMaterial = <K extends keyof TempMaterial>(
  key: K,
  value: TempMaterial[K],
) => void;

// General Purpose MultiSetting Methods
export type AddSetting = (prop: keyof MultiSettings) => void;
export type RemoveSetting = <K extends keyof MultiSettings>(
  prop: K,
  index: number,
) => void;
export type UpdateSetting = <K extends keyof MultiSettings>(
  prop: K,
  index: number,
  setting: MultiSettings[K],
) => void;

interface IMaterialEditor {
  addMaterial: AddMaterial;
  copyMaterial: CopyMaterial;
  editMaterial: EditMaterial;
  removeMaterial: RemoveMaterial;
  // setMaterial: SetMaterial;
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
export type Reconnect = () => Promise<void>;
export type ToggleCloudSync = (material: TempMaterial) => Promise<void>;
export type ToggleQrAutoSelect = () => Promise<void>;
export type Connection = TabConnection['state'];

// Editor Modes
export type EditorMode =
  'BACKUP' | 'DISPLAY' | 'ADD' | 'EDIT' | 'DUPLICATE' | 'SELECTED';
export type EditorModeChange = (
  mode: EditorMode,
  material: TempMaterial,
) => Promise<void>;
export type ModeAdd = (material?: TempMaterial) => Promise<void>;
export type ModeBackup = () => Promise<void>;
export type ModeDefault = () => Promise<void>;
export type ModeEdit = (title: string) => Promise<void>;
export type ModeSelect = (title: string) => Promise<void>;

interface IEditorMode {
  changeEditorMode: EditorModeChange;
  setEditorModeAdd: ModeAdd;
  setEditorModeBackup: ModeBackup;
  setEditorModeDefault: ModeDefault;
  setEditorModeEdit: ModeEdit;
  setEditorModeSelect: ModeSelect;
}

// Backups
export type CreateBackup = () => void;

// App Props + State
interface AppProps {
  platform: string;
}

interface AppState {
  // The current editor mode.
  action: EditorMode;
  // Tracks all the backups that have been taken.
  backups: { [key: string]: StorageLocal } | void;
  // The number of cloud bytes that are currently being used.
  cloudStorageBytesUsed: number;
  // The number of cloud items in use, one per material, of Chrome's 512.
  cloudItemsUsed: number;
  // Whether the active tab is a Glowforge tab, and the extension is running in
  // it, and which tab it is.
  connection: Connection;
  tabId: number | null;
  // Whether QR auto-select is on.
  qrAutoSelect: boolean;
  // The last time a cloud sync modified the local data.
  lastCloudSync: number | null;
  materials: GFMaterial[];
  message: IMessage | null;
  previousTitle: string | null;
  rawMaterials: PluginMaterial[];
  // The active tab's trace and machine.
  rawSvg: string | null;
  serial: string | null;
  // Does the active tab have the latest materials.
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

class App
  extends React.Component<AppProps, AppState>
  implements IEditorMode, IMaterialEditor, IMessenger
{
  constructor(props: AppProps) {
    super(props);
    this.state = {
      action: 'DISPLAY',
      backups: {},
      cloudStorageBytesUsed: 0,
      cloudItemsUsed: 0,
      connection: 'none',
      tabId: null,
      qrAutoSelect: false,
      lastCloudSync: null,
      message: null,
      tempMaterial: {
        ...createEmptyMaterial(),
      },
      materials: [],
      previousTitle: null,
      rawMaterials: [],
      rawSvg: null,
      serial: null,
      synchronized: false,
    };

    // Modes
    this.setEditorModeAdd = this.setEditorModeAdd.bind(this);
    this.setEditorModeBackup = this.setEditorModeBackup.bind(this);
    this.setEditorModeDefault = this.setEditorModeDefault.bind(this);
    this.setEditorModeEdit = this.setEditorModeEdit.bind(this);
    this.setEditorModeSelect = this.setEditorModeSelect.bind(this);

    // Material
    this.addMaterial = this.addMaterial.bind(this);
    this.copyMaterial = this.copyMaterial.bind(this);
    this.editMaterial = this.editMaterial.bind(this);
    this.removeMaterial = this.removeMaterial.bind(this);
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
    this.reconnect = this.reconnect.bind(this);
    this.setMaterial = this.setMaterial.bind(this);
    this.toggleQrAutoSelect = this.toggleQrAutoSelect.bind(this);
    this.toggleCloundSync = this.toggleCloundSync.bind(this);

    // Validaton
    this.validationHandler = this.validationHandler.bind(this);

    // Backups
    this.createBackup = this.createBackup.bind(this);
  }

  private displayRef: React.RefObject<HTMLDivElement> = React.createRef();

  async componentDidMount() {
    // Track the bytes and items used.
    const cloudStorageBytesUsed = await getBytesInUse();
    const cloudItemsUsed = await getSynchronizedItemCount();

    // Get the initial state from local storage.
    const localStorage = await getLocalStorage();

    // Check for any backuos.
    const backups = await getBackups();

    // What the active tab reports.
    const tab = tabState(await getTabConnection());
    const qrAutoSelect = await hasLidImageAccess();

    if (localStorage.tempMaterial) {
      // Clear any old validations
      localStorage.tempMaterial.propValidation = {};
      this.setState({
        action: 'ADD',
        backups,
        cloudItemsUsed,
        cloudStorageBytesUsed,
        materials: localStorage.materials!,
        message: {
          message:
            'Material settings were automatically restored from a previous session.',
        },
        rawMaterials: localStorage.rawMaterials!,
        tempMaterial: localStorage.tempMaterial,
        qrAutoSelect,
        ...tab,
      });
    } else {
      this.setState({
        cloudItemsUsed,
        cloudStorageBytesUsed,
        backups,
        materials: localStorage.materials!,
        rawMaterials: localStorage.rawMaterials!,
        qrAutoSelect,
        ...tab,
      });
    }

    /**
     * Start an interval to handle messaging with the background process.
     */
    setInterval(async () => {
      const {
        cloudItemsUsed,
        cloudStorageBytesUsed,
        connection,
        tabId,
        rawSvg,
        serial,
        synchronized,
        tempMaterial,
      } = this.state;
      let stateUpdates: Partial<AppState> = {};

      // Refresh the cloud storage in use
      const cloudStorageBytesUsedLocal = await getBytesInUse();
      const cloudItemsUsedLocal = await getSynchronizedItemCount();

      // Synchronize and materials.
      // TODO: should we run this on every loop.
      const updated = await syncronizeMaterials();
      if (updated) {
        const pluginMaterials = await getRawMaterials();
        const glowforgeMaterials = await getGlowforgeMaterials();

        let tempMaterialLocal: PluginMaterial | undefined;
        if (tempMaterial) {
          tempMaterialLocal = pluginMaterials.find((pluginMaterial) => {
            const tempMaterialTitle = `${tempMaterial.thickName} ${tempMaterial.name}`;
            const pluginMaterialTitle = `${pluginMaterial.thickName} ${pluginMaterial.name}`;
            return pluginMaterialTitle === tempMaterialTitle;
          });
        }

        stateUpdates = {
          ...stateUpdates,
          lastCloudSync: +new Date(),
          materials: glowforgeMaterials,
          rawMaterials: pluginMaterials,
          tempMaterial: {
            ...createEmptyMaterial(),
            ...tempMaterialLocal,
          },
        };
      }

      // Refresh what the active tab reports.
      const tab = tabState(await getTabConnection());
      if (
        tab.connection !== connection ||
        tab.tabId !== tabId ||
        tab.synchronized !== synchronized ||
        tab.rawSvg !== rawSvg ||
        tab.serial !== serial
      ) {
        stateUpdates = {
          ...stateUpdates,
          ...tab,
        };
      }
      if (
        cloudStorageBytesUsedLocal !== cloudStorageBytesUsed ||
        cloudItemsUsedLocal !== cloudItemsUsed
      ) {
        stateUpdates = {
          ...stateUpdates,
          cloudItemsUsed: cloudItemsUsedLocal,
          cloudStorageBytesUsed: cloudStorageBytesUsedLocal,
        };
      }

      if (Object.keys(stateUpdates).length > 0) {
        this.setState(stateUpdates as AppState);
      }
    }, 750);
  }

  componentDidUpdate(prevProps: AppProps, prevState: AppState) {
    const { action } = this.state;
    if (this.displayRef && prevState.action !== action) {
      this.displayRef.current!.scrollTop = 0;
    }

    // Object.entries(this.props).forEach(([key, val]) =>
    //   (prevProps as any)[key] !== val && console.log(`Prop '${key}' changed`)
    // );
    // Object.entries(this.state).forEach(([key, val]) =>
    //   (prevState as any)[key] !== val && console.log(`State '${key}' changed \n${JSON.stringify((prevState as any)[key])}\n${JSON.stringify(val)}`)
    // );
  }

  // Temporary Material State
  // =================================================================

  /**
   * Updates the base material properties: thickName, name, thickness
   */
  updateMaterial<K extends keyof TempMaterial>(key: K, value: TempMaterial[K]) {
    this.setState((state) => ({
      tempMaterial: {
        ...state.tempMaterial,
        [key]: value,
      },
    }));
  }

  addSetting(prop: keyof MultiSettings) {
    this.setState((state) => {
      const emptySetting = MultiSettingFunctionsDefaults[prop];
      return {
        tempMaterial: {
          ...state.tempMaterial,
          [prop]: [...state.tempMaterial[prop], emptySetting()],
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

  updateSetting<K extends keyof MultiSettings>(
    prop: K,
    index: number,
    setting: MultiSettings[K],
  ) {
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
    const { materials, rawMaterials, tempMaterial } = this.state;
    const isValid = Object.keys(tempMaterial.propValidation)
      .map((key) => tempMaterial.propValidation[key])
      .reduce((prev, cur) => prev && cur, true);

    if (!isValid) {
      this.displayMessage(errorMessage('A material property is invalid.'));
      this.setState((state) => {
        const updateValidation: { [key: string]: boolean | null } = {};
        for (const key of Object.keys(state.tempMaterial.propValidation)) {
          updateValidation[key] =
            state.tempMaterial.propValidation[key] === null
              ? false
              : state.tempMaterial.propValidation[key];
        }
        return {
          tempMaterial: {
            ...state.tempMaterial,
            propValidation: updateValidation,
          },
        };
      });
      return;
    }

    const { thickName, name } = tempMaterial;
    const title = `${thickName} ${name}`;
    const id = await materialIdForTitle(title);

    // Create the new material.
    const newMaterial = createMaterial(tempMaterial, id);

    // Double check for duplicates
    const duplicate = materials.find(
      (material) =>
        material.id === newMaterial.id || material.title === newMaterial.title,
    );

    if (duplicate) {
      this.displayMessage(
        errorMessage('A material with the same name already exists.'),
      );
      return;
    }

    // Create and store.
    const newMaterials: GFMaterial[] = [...materials, newMaterial];
    const newRawMaterials = [...rawMaterials, tempMaterial];
    await storeGlowforgeMaterials(newMaterials);
    await storeRawMaterials(newRawMaterials);
    await clearTempMaterial();

    // Send materials to the cloud
    const message = await this.changeCloud(() =>
      replaceCloudMaterial(tempMaterial),
    );

    // Update the application state.
    this.setState({
      materials: newMaterials,
      message,
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
    const { materials, rawMaterials } = this.state;
    // Look for any duplicates.
    const duplicates = materials.filter((material) => material.title === title);

    // There should be at least one since we are cloning.
    if (duplicates.length < 1) {
      this.displayMessage(
        defaultMessage('Could not clone the source material was removed.'),
      );
      return;
    }

    // Get the material so we can clone it.
    const material = rawMaterials.find(
      (rawMaterial) => `${rawMaterial.thickName} ${rawMaterial.name}` === title,
    );

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
    const { materials, rawMaterials, tempMaterial } = this.state;
    const isValid = Object.keys(tempMaterial.propValidation)
      .map((key) => tempMaterial.propValidation[key])
      .reduce((prev, cur) => prev && cur, true);

    if (!isValid) {
      this.displayMessage(errorMessage('A material property is invalid.'));
      this.setState((state) => {
        const updateValidation: { [key: string]: boolean | null } = {};
        for (const key of Object.keys(state.tempMaterial.propValidation)) {
          updateValidation[key] =
            state.tempMaterial.propValidation[key] === null
              ? false
              : state.tempMaterial.propValidation[key];
        }
        return {
          tempMaterial: {
            ...state.tempMaterial,
            propValidation: updateValidation,
          },
        };
      });
      return;
    }

    const duplicates = materials.filter(
      (material) => material.title === `${title}`,
    );

    if (duplicates.length !== 1) {
      this.displayMessage(
        errorMessage(
          'Could not update. A material with the same name already exists.',
        ),
      );
      return;
    }

    // Update material using the same id.
    const materialId = stripCustomPrefix(duplicates[0].id);
    const newMaterial = createMaterial(tempMaterial, materialId);

    // Store
    const newMaterials = materials.filter(
      (material) => material.title !== `${title}`,
    );
    newMaterials.push(newMaterial);
    const newRawMaterials = rawMaterials.filter(
      (material) => `${material.thickName} ${material.name}` !== `${title}`,
    );
    newRawMaterials.push(tempMaterial);

    await storeGlowforgeMaterials(newMaterials);
    await storeRawMaterials(newRawMaterials);

    // Send updated materials to the cloud
    const rawMaterial = rawMaterials.find(
      (rawMaterial) =>
        `${rawMaterial.thickName} ${rawMaterial.name}` === `${title}`,
    );
    const message = await this.changeCloud(() =>
      replaceCloudMaterial(tempMaterial, rawMaterial),
    );

    // Update the application state.
    this.setState({
      materials: newMaterials,
      message,
      rawMaterials: newRawMaterials,
      synchronized: false,
    });

    // Select it by its new title, in case it was renamed.
    this.setEditorModeSelect(getMaterialTitle(tempMaterial));
  }

  async removeMaterial(title: string) {
    const { rawMaterials } = this.state;
    // Look for the material.
    const found = rawMaterials.find(
      (material: PluginMaterial) =>
        `${material.thickName} ${material.name}` === `${title}`,
    );

    // If there is no material exit.
    if (!found) {
      return;
    }

    // Remove from cloud, local, and glowforge.
    await removeCloudMaterial(found);
    const materials = await removeMaterialTitle(title);
    const updateRawMaterials = await removeRawMaterial(title);

    // Update the application state.
    this.setState({
      materials,
      rawMaterials: updateRawMaterials,
      synchronized: false,
    });

    this.setEditorModeDefault();

    // Reload the tab to ensure everything is up to date.
    // TOOD: Do we need this.
    await reloadGlowForgeTab();
  }

  // Cloud Sync
  // =================================================================

  async forceSyncronize() {
    await forceSync();
    this.setState({
      synchronized: false,
    });
  }

  // Glowforge Tab
  // =================================================================

  /**
   * Adds the extension's scripts to the active Glowforge tab again, or
   * reloads it if they can't be added.
   */
  async reconnect() {
    const { tabId } = this.state;
    if (tabId === null) {
      return;
    }
    if (await addContentScripts(tabId)) {
      this.displayMessage(defaultMessage('Reconnected to the Glowforge tab.'));
    } else {
      await reloadGlowForgeTab();
    }
  }

  /**
   * Sets the selected material in the GFUI.
   */
  async setMaterial(title: string) {
    const sent = await sendMessage({
      type: 'selectMaterial',
      materialId: await materialIdForTitle(title),
    });
    if (!sent) {
      this.displayMessage(
        errorMessage(
          "Couldn't reach the Glowforge tab. Reconnect to it, or reload it.",
        ),
      );
    }
  }

  /**
   * Turns QR auto-select on or off. Turning it on asks for access to
   * Glowforge's lid camera images, so this must run from a click.
   */
  async toggleQrAutoSelect() {
    const { qrAutoSelect } = this.state;
    const enabled = qrAutoSelect
      ? !(await removeLidImageAccess())
      : await requestLidImageAccess();
    this.setState({
      qrAutoSelect: enabled,
    });
  }

  async toggleCloundSync(material: TempMaterial) {
    const { rawMaterials } = this.state;
    const title = getMaterialTitle(material);

    const updatedMaterial = {
      ...material,
      sync: !material.sync,
    };

    if (material.sync) {
      // Update the current material.
      const pluginMaterials = rawMaterials.filter(
        (material) => getMaterialTitle(material) !== title,
      );
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
      const pluginMaterials = rawMaterials.filter(
        (material) => getMaterialTitle(material) !== title,
      );
      pluginMaterials.push(updatedMaterial);

      await storeRawMaterials(pluginMaterials);
      await storeTempMaterial(updatedMaterial);
      const message = await this.changeCloud(() =>
        replaceCloudMaterial(updatedMaterial),
      );

      // Update the application state.
      this.setState({
        message,
        rawMaterials: pluginMaterials,
        tempMaterial: updatedMaterial,
        synchronized: false,
      });
    }
  }

  /**
   * Changes a material's copy in the cloud. Gives the message to show when
   * Chrome refuses, like when the cloud storage is full, and the material is
   * only on this computer.
   */
  async changeCloud(change: () => Promise<unknown>): Promise<IMessage | null> {
    try {
      await change();
      return null;
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      return errorMessage(
        `Saved on this computer only, the cloud refused it: ${reason}`,
      );
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
  async changeEditorMode(
    mode: EditorMode,
    material: TempMaterial | null = null,
  ) {
    const { tempMaterial } = this.state;
    const previousTitle = `${tempMaterial.thickName} ${tempMaterial.name}`;

    await clearTempMaterial();

    this.setState({
      action: mode,
      previousTitle,
      tempMaterial: {
        ...(material === null ? createEmptyMaterial() : material),
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
   * Sets the editor mode to backup.
   */
  async setEditorModeBackup() {
    await this.changeEditorMode('BACKUP');
  }

  /**
   * Cancels the current input mode, resetting the material state and clearing
   * any system messages.
   */
  async setEditorModeDefault() {
    await this.changeEditorMode('DISPLAY');
  }

  /**
   * Changes the editor mode to duplication.
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
    const { rawMaterials } = this.state;
    const rawMaterial = rawMaterials.find(
      (rawMaterial) => `${rawMaterial.thickName} ${rawMaterial.name}` === title,
    );
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
    const { rawMaterials } = this.state;
    const rawMaterial = rawMaterials.find(
      (rawMaterial) => `${rawMaterial.thickName} ${rawMaterial.name}` === title,
    );

    if (!rawMaterial) {
      this.displayMessage(
        defaultMessage('The selected material could not be found.'),
      );
      await this.setEditorModeDefault();
      return;
    }

    await this.changeEditorMode('SELECTED', {
      ...rawMaterial,
      propValidation: {},
    });
  }

  validationHandler(id: string, isValid: boolean | null) {
    this.setState((state) => {
      const tempMaterial = {
        ...state.tempMaterial,
      };
      tempMaterial.propValidation[id] = isValid;
      return {
        tempMaterial: {
          ...tempMaterial,
        },
      };
    });
  }

  // Backups
  // =================================================================
  async createBackup() {
    const backupName = `${new Date().toISOString()}`;
    const backup = await getLocalStorage();
    await storeBackup(backupName, backup);
    const backups = await getBackups();

    this.setState({
      backups,
    });
  }

  render() {
    const {
      action,
      backups,
      cloudItemsUsed,
      cloudStorageBytesUsed,
      connection,
      message,
      previousTitle,
      qrAutoSelect,
      rawMaterials,
      rawSvg,
      serial,
      synchronized,
      tempMaterial,
    } = this.state;

    const { platform } = this.props;

    let displayPanel: JSX.Element;
    switch (action) {
      default:
      case 'DISPLAY':
        displayPanel = (
          <MaterialHome
            connection={connection}
            forceSyncronize={this.forceSyncronize}
            qrAutoSelect={qrAutoSelect}
            rawSvg={rawSvg}
            reconnect={this.reconnect}
            toggleQrAutoSelect={this.toggleQrAutoSelect}
            setEditorModeAdd={this.setEditorModeAdd}
            setEditorModeBackup={this.setEditorModeBackup}
          />
        );
        break;
      case 'BACKUP':
        displayPanel = <BackupViewer backups={backups} />;
        break;
      case 'SELECTED':
        displayPanel = (
          <MaterialViewer
            material={tempMaterial}
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
            editorMode={action}
            addSetting={this.addSetting}
            removeSetting={this.removeSetting}
            updateSetting={this.updateSetting}
            material={tempMaterial}
            updateMaterial={this.updateMaterial}
            validationHandler={this.validationHandler}
          />
        );
    }

    return (
      <div className="App">
        <AppHeader
          cloudItemsUsed={cloudItemsUsed}
          cloudStorageBytesUsed={cloudStorageBytesUsed}
          connection={connection}
          forceSyncronize={this.forceSyncronize}
          reconnect={this.reconnect}
          serial={serial}
          synchronized={synchronized}
        />
        <div className={`columns ${platform === 'mac' ? 'osx' : ''}`}>
          <div className="col-materials">
            <MaterialList
              materials={rawMaterials}
              selectMaterial={this.setEditorModeSelect}
              setEditorModeAdd={this.setEditorModeAdd}
              setMaterial={this.setMaterial}
              tempMaterial={tempMaterial}
            />
          </div>
          <div className="column__right">
            <div className="buttonBar">
              <MaterialButtonBar
                addMaterial={this.addMaterial}
                copyMaterial={this.copyMaterial}
                createBackup={this.createBackup}
                editMaterial={this.editMaterial}
                editorMode={action}
                previousTitle={previousTitle}
                setEditorModeAdd={this.setEditorModeAdd}
                setEditorModeDefault={this.setEditorModeDefault}
                setEditorModeEdit={this.setEditorModeEdit}
                setEditorModeSelect={this.setEditorModeSelect}
                setMaterial={this.setMaterial}
                title={`${tempMaterial.thickName} ${tempMaterial.name}`}
              />
            </div>
            <div className="col-contents" ref={this.displayRef}>
              <div className="col-contents-container">{displayPanel}</div>
            </div>
          </div>
        </div>
        {message !== null ? (
          <Message clearMessage={this.clearMessage} {...message} />
        ) : null}
      </div>
    );
  }
}

export default App;

/**
 * What the popup shows for the active tab.
 */
function tabState(tab: TabConnection) {
  const status = tab.state === 'connected' ? tab.status : null;
  return {
    connection: tab.state,
    tabId: tab.state === 'none' ? null : tab.tabId,
    // Until the page's store is found, it can't have the materials.
    synchronized: !!status && status.ready && status.synchronized,
    rawSvg:
      status && status.designId
        ? `https://storage.googleapis.com/glowforge-files/designs/${status.designId}/svgf/svgf_file.gzip.svg`
        : null,
    serial: status ? status.serial : null,
  };
}

function getMaterialTitle(material: PluginMaterial) {
  return `${material.thickName} ${material.name}`;
}
