type BedImage = {
  createdAt: string;
  isAuthorized: boolean;
  isInvalidated: boolean;
};

type Machine = {
  bedImage?: BedImage;
  preloadedLidImage?: string;
};

type MachineMap = {
  [key: string]: Machine;
};

type Machines = {
  selectedMachineSerial?: string;
  machineMap?: MachineMap;
};

type PresentObject = {
  loadedDesignIds: string[];
};

type Present = {
  toJSON: () => PresentObject;
};

type WorkSpace = {
  present?: Present;
};

export type ReduxStore = {
  machines?: Machines;
  workspace?: WorkSpace;
};

type StoreObject = {
  toJSON: () => ReduxStore;
}

type Store = {
  dispatch: (message: {[key: string]: unknown}) => void;
  getState(): StoreObject;
  subscribe: (listener: () => void) => void;
};

export type Window = {
  extensionDevMode: boolean;
  extensionId: string;
  store: Store;
};
