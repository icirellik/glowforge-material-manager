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
  subscribe: (listener: () => void) => void;
};

export type Window = {
  store?: Store;
};
