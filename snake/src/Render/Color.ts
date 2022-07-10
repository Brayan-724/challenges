import { Utils } from "../internal/utils/Utils";

export type ColorLike = string | number | Color;

export class Color {
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public a: number
  ) {}

  darken(amount: number): Color {
    return new Color(this.r - amount, this.g - amount, this.b - amount, this.a);
  }

  from(color: ColorLike) {
    const c = Color.from(color);

    this.r = c.r;
    this.g = c.g;
    this.b = c.b;
    this.a = c.a;
  }

  clone() {
    return new Color(this.r, this.g, this.b, this.a);
  }

  toStringHex(): string {
    return (
      "#" +
      this.r.toString(16).padStart(2, "0") +
      this.g.toString(16).padStart(2, "0") +
      this.b.toString(16).padStart(2, "0") +
      Math.floor(this.a * 255)
        .toString(16)
        .padStart(2, "0")
    );
  }

  static get black(): Color {
    return new Color(0, 0, 0, 1);
  }

  static get white(): Color {
    return new Color(255, 255, 255, 1);
  }

  static get red(): Color {
    return new Color(255, 0, 0, 1);
  }

  static get green(): Color {
    return new Color(0, 255, 0, 1);
  }

  static get blue(): Color {
    return new Color(0, 0, 255, 1);
  }

  static get yellow(): Color {
    return new Color(255, 255, 0, 1);
  }

  static get cyan(): Color {
    return new Color(0, 255, 255, 1);
  }

  static get magenta(): Color {
    return new Color(255, 0, 255, 1);
  }

  static get gray(): Color {
    return new Color(128, 128, 128, 1);
  }

  static get lightGray(): Color {
    return new Color(192, 192, 192, 1);
  }

  static get darkGray(): Color {
    return new Color(64, 64, 64, 1);
  }

  static get random(): Color {
    return new Color(
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      1
    );
  }

  static get randomAlpha(): Color {
    return new Color(
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.random()
    );
  }

  static from(color: ColorLike): Color {
    if (typeof color === "string") {
      return Color.fromHex(color);
    } else if (typeof color === "number") {
      return Color.fromHex(color.toString(16));
    } else {
      return color.clone();
    }
  }

  static fromHex(hex: string): Color {
    hex = hex.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 2 + 2), 16);
    const b = parseInt(hex.slice(4, 4 + 2), 16);
    const a = parseInt(hex.slice(6, 6 + 2) || "FF", 16) / 255;

    return new Color(r, g, b, a);
  }

  static fromGrayScale(index: number, max: number): Color {
    const gray = Utils.map(index, 0, max, 0, 255) | 0;
    return new Color(gray, gray, gray, 1);
  }
}
