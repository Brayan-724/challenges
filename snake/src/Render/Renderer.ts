import { type Config } from "../internal/Config";

export class Renderer {
  public readonly ctx: CanvasRenderingContext2D;
  constructor(
    public readonly config: Config,
    public readonly canvas: HTMLCanvasElement
  ) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not get 2D context");
    }

    this.ctx = ctx;
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
