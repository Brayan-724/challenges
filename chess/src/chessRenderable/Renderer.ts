import { type BoardRenderable } from "./BoardRenderable";
import { type Renderable } from "./Renderable";

export class Renderer {
  readonly ctx: CanvasRenderingContext2D;

  constructor(readonly canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Canvas context is not available");
    }

    this.ctx = ctx;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render(renderable: Renderable | Renderable[], board: BoardRenderable) {
    if (Array.isArray(renderable)) {
      renderable.forEach((r) => r.render(this, board));
    } else {
      renderable.render(this, board);
    }
  }
}
