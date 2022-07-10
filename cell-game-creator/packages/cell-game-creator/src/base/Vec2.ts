import { createLogger } from "../utils";
import { Vec2 as QuadVec2 } from "fast-quadtree-ts";

type Listener<A extends "x" | "y" = "x" | "y"> = (
  value: number,
  axis: A,
  vec: Vec2,
  before: Vec2
) => void | boolean;

type Listeners = {
  x: Listener<"x">;
  y: Listener<"y">;
  both: Listener<"x" | "y">;
};

export class Vec2 {
  static logger = createLogger("Vec2", {
    backgroundColor: "green",
    color: "black",
  });

  protected listeners = {
    x: new Set<Listener<"x">>(),
    y: new Set<Listener<"y">>(),
    both: new Set<Listener<"x" | "y">>(),
  };

  constructor(protected _x: number = 0, protected _y: number = 0) {}

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    const before = new Vec2(this.x, this.y);
    this.notify("x", value, before);
  }

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    const before = new Vec2(this.x, this.y);
    this.notify("y", value, before);
  }

  //#region Operators
  add(other: Vec2): this {
    this.x += other.x;
    this.y += other.y;

    return this;
  }

  sub(other: Vec2): this {
    this.x -= other.x;
    this.y -= other.y;

    return this;
  }

  mul(other: Vec2): this {
    this.x *= other.x;
    this.y *= other.y;

    return this;
  }

  div(other: Vec2): this {
    if (this.x === 0 || other.x === 0) {
      Vec2.logger.debug("Division by zero: x axis");
    } else {
      this.x /= other.x;
    }

    if (this.y === 0 || other.y === 0) {
      Vec2.logger.debug("Division by zero: y axis");
    } else {
      this.y /= other.y;
    }

    return this;
  }

  scale(factor: number): this {
    this.x *= factor;
    this.y *= factor;

    return this;
  }
  //#endregion

  //#region Formulas
  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  mag(): number {
    return this.length();
  }

  normalize(): this {
    const mag = this.mag();

    if (mag === 0) {
      Vec2.logger.debug("Cannot normalize zero vector");
      return this;
    }

    return this.scale(1 / mag);
  }

  dot(other: Vec2): number {
    return this.x * other.x + this.y * other.y;
  }

  cross(other: Vec2): number {
    return this.x * other.y - this.y * other.x;
  }

  angle(other: Vec2): number {
    return Math.atan2(this.cross(other), this.dot(other));
  }

  rotate(angle: number): this {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const x = this.x;
    const y = this.y;

    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;

    return this;
  }

  rotateAround(angle: number, center: Vec2): this {
    this.sub(center);
    this.rotate(angle);
    this.add(center);

    return this;
  }

  distanceSq(other: Vec2): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;

    return dx * dx + dy * dy;
  }

  distance(other: Vec2): number {
    return Math.sqrt(this.distanceSq(other));
  }
  //#endregion

  protected getListeners<A extends keyof Listeners>(
    axis: A
  ): Set<Listeners[A]> {
    return this.listeners[axis] as Set<Listeners[A]>;
  }
  protected notify<A extends "x" | "y">(
    axis: A,
    value: number,
    before: Vec2
  ): void {
    let stopped = false;
    const newVec = new Vec2(this.x, this.y);
    this[("_" + axis) as "x"] = value;

    this.getListeners(axis).forEach((listener) => {
      if (stopped) return;
      const a = (listener as Listener)(value, axis, newVec, before);
      if (a === false) stopped = true;
    });
    if (!stopped) {
      this.getListeners("both").forEach((listener) => {
        if (stopped) return;
        const a = (listener as Listener)(value, axis, newVec, before);
        if (a === false) stopped = true;
      });
    }

    if (stopped) {
      this._x = before.x;
      this._y = before.y;
    }
  }

  listen<A extends keyof Listeners>(
    axis: A,
    callback: Listeners[A]
  ): () => void {
    this.getListeners(axis).add(callback);

    return () => {
      this.getListeners(axis).delete(callback);
    };
  }

  unListen<A extends keyof Listeners>(axis: A, callback: Listeners[A]): void {
    this.getListeners(axis).delete(callback);
  }

  toString(): string {
    return `Vec2(${this.x}, ${this.y})`;
  }

  toObject(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  toQuadVec(): QuadVec2 {
    return {
      x: this.x,
      y: this.y,
    };
  }

  //#region `From` methods
  static from(x: number, y: number): Vec2;
  static from<A extends [x: number | undefined, y: number | undefined]>(
    arr: A
  ): Vec2;
  static from<O extends { x?: number; y?: number }>(obj: O): Vec2;
  static from(angle: number): Vec2;
  static from(
    XArrObjAngle: number | number[] | { x: number; y: number },
    y?: number
  ): Vec2 {
    if (typeof XArrObjAngle === "number" && typeof y === "number") {
      return Vec2.fromPos(XArrObjAngle);
    } else if (Array.isArray(XArrObjAngle)) {
      return Vec2.fromArray(XArrObjAngle as [number, number]);
    } else if (typeof XArrObjAngle === "object") {
      return Vec2.fromObject(XArrObjAngle as { x: number; y: number });
    } else {
      return Vec2.fromAngle(XArrObjAngle);
    }
  }

  static fromPos(x?: number, y?: number): Vec2 {
    return new Vec2(x, y);
  }

  static fromArray<A extends [x: number | undefined, y: number | undefined]>(
    arr: A
  ): Vec2 {
    return new Vec2(arr[0], arr[1]);
  }

  static fromObject<O extends { x?: number; y?: number }>(obj: O): Vec2 {
    return new Vec2(obj.x, obj.y);
  }

  static fromPolar(r: number, theta: number): Vec2 {
    return new Vec2(r * Math.cos(theta), r * Math.sin(theta));
  }

  static fromAngle(angle: number): Vec2 {
    return new Vec2(Math.cos(angle), Math.sin(angle));
  }

  static fromAngleAndMagnitude(angle: number, magnitude: number): Vec2 {
    return new Vec2(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
  }
  //#endregion
}
