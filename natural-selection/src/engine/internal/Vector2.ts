export class Vector2 {
  static get zero(): Vector2 {
    return new Vector2(0, 0);
  }

  static get one(): Vector2 {
    return new Vector2(1, 1);
  }

  constructor(public x: number, public y: number) {}

  set(v: Vector2): this;
  set(x: number, y: number): this;
  set(vOrX: number | Vector2, y?: number): this {
    if (typeof vOrX === "number") {
      this.x = vOrX;
      this.y = y || 0;
    } else {
      this.x = vOrX.x;
      this.y = vOrX.y;
    }

    return this;
  }

  setX(x: number): this {
    this.x = x;

    return this;
  }

  setY(y: number): this {
    this.y = y;

    return this;
  }

  add(v: Vector2): this {
    this.x += v.x;
    this.y += v.y;

    return this;
  }

  sub(v: Vector2): this {
    this.x -= v.x;
    this.y -= v.y;

    return this;
  }

  mul(v: Vector2): this {
    this.x *= v.x;
    this.y *= v.y;

    return this;
  }

  div(v: Vector2): this {
    this.x /= v.x;
    this.y /= v.y;

    return this;
  }

  scale(s: number): this {
    this.x *= s;
    this.y *= s;

    return this;
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): this {
    const length = this.length;

    if (length === 0) {
      return this;
    }

    this.x /= length;
    this.y /= length;

    return this;
  }

  distance(v: Vector2): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;

    return Math.sqrt(dx * dx + dy * dy);
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public static from(v: Vector2): Vector2 {
    return new Vector2(v.x, v.y);
  }
}
