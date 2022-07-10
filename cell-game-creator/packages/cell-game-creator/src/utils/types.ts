export type AntiPartial<T> = { [P in keyof T]-?: T[P] };

export type UsedCanvas = typeof window._cell_usedCanvas_;

export interface Newable<T> {
  new (...args: any[]): T;
  prototype: T;
}
