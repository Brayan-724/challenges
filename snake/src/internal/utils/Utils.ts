import { Newable } from "../../types";

export class Utils {
  static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  static executeFrom<P, O extends P, K extends keyof P>(
    cons: Newable<P>,
    other: O,
    key: K,
    args: any[]
  ) {
    const prototype = cons.prototype;

    const value = prototype[key];

    if (typeof value === "function") {
      value.call(other, ...args);
    }
  }

  static map(
    value: number,
    min: number,
    max: number,
    min2: number,
    max2: number
  ) {
    return min2 + ((value - min) * (max2 - min2)) / (max - min);
  }
}
