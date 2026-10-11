/**
 * The parts of the GFUI's Immutable.js state that content.js uses.
 */
type ImmutableMap = {
  getIn(path: (string | number)[]): unknown;
  has(key: string): boolean;
};

export type Store = {
  dispatch: (message: {[key: string]: unknown}) => void;
  getState(): ImmutableMap;
  // Redux returns a function that unsubscribes.
  subscribe: (listener: () => void) => (() => void) | void;
};

export type Window = {
  store?: Store;
  // The running copy of content.js.
  glowforgeMaterialManagerContent?: object;
};
