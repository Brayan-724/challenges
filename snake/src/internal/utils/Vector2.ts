export class Vector2 {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  set x(value: number) {
    this._x = value;
  }

  set y(value: number) {
    this._y = value;
  }

  add(vector: Vector2): this {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  subtract(vector: Vector2): this {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  multiply(vector: Vector2): this {
    this.x *= vector.x;
    this.y *= vector.y;

    return this;
  }

  divide(vector: Vector2): this {
    this.x /= vector.x;
    this.y /= vector.y;

    return this;
  }

  scale(value: number): this {
    this.x *= value;
    this.y *= value;

    return this;
  }

  scaleInv(value: number): this {
    this.x /= value;
    this.y /= value;

    return this;
  }

  equals(vector: Vector2): boolean {
    return this.x === vector.x && this.y === vector.y;
  }

  negate(): this {
    this.x = -this.x;
    this.y = -this.y;

    return this;
  }

  isZero(): boolean {
    return this.x === 0 && this.y === 0;
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  from(vector: Vector2): Vector2 {
    this.x = vector.x;
    this.y = vector.y;

    return this;
  }

  toString(): string {
    return `Vector2{${this.x}, ${this.y}}`;
  }

  static get zero(): Vector2 {
    return new Vector2(0, 0);
  }

  static get one(): Vector2 {
    return new Vector2(1, 1);
  }

  static get y(): Vector2 {
    return new Vector2(0, 1);
  }

  static get x(): Vector2 {
    return new Vector2(1, 0);
  }

  static or(vectorA: Vector2 | null | undefined, vectorB: Vector2): Vector2 {
    if (vectorA instanceof Vector2) {
      return vectorA;
    }

    return vectorB;
  }
}
