export interface Factory<A extends [], R> {
  create(...args: A): R;
}

export * from "./logger";
export * from "./types";
export * from "./nextTick";
