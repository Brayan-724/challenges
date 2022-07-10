export interface Newable<C, A extends [] = []> {
  new (...args: A): C;
  prototype: C;
  name: string;
}
