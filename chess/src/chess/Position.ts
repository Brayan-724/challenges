export class Position {
  constructor(public x: number, public y: number) {}

  getLetter(): string {
    return String.fromCharCode(this.x + 97);
  }

  getNumber(): number {
    return this.y + 1;
  }

  getIsDiagonal(): boolean {
    return Math.abs(this.x) - Math.abs(this.y) === 0;
  }

  add(other: Position): this {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  subtract(other: Position): this {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  equals(other: Position) {
    return this.x === other.x && this.y === other.y;
  }

  clone(): Position {
    return new Position(this.x, this.y);
  }

  //#region - Transformations

  toString(): string {
    return this.getLetter() + this.getNumber();
  }

  from(str: string): this;
  from(other: Position): this;
  from(target: string | Position): this;
  from(target: string | Position): this {
    if (typeof target === "string") {
      return this.fromString(target);
    } else {
      return this.fromOther(target);
    }
  }

  fromOther(other: Position): this {
    this.x = other.x;
    this.y = other.y;
    return this;
  }

  fromString(str: string): this {
    this.x = str.charCodeAt(0) - 97;
    this.y = str.charCodeAt(1) - 49;
    return this;
  }
  //#endregion

  //#region - Static
  static from(str: string): Position;
  static from(other: Position): Position;
  static from(target: string | Position): Position;
  static from(target: string | Position): Position {
    if (typeof target === "string") {
      return Position.fromString(target);
    } else {
      return Position.fromOther(target);
    }
  }

  static fromOther(other: Position): Position {
    return new Position(other.x, other.y);
  }

  static fromString(str: string): Position {
    return new Position(str.charCodeAt(0) - 97, str.charCodeAt(1) - 49);
  }
  //#endregion
}
