export interface Newable<T> {
  new (...args: any[]): T;
  prototype: T;
  name: string;
}
