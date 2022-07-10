import { createLogger, nextTick } from "../utils";
import { Canvas } from "./Canvas";

export class RawCanvas extends Canvas {
  static logger = createLogger("RawCanvas", {
    backgroundColor: "yellow",
    color: "black",
  });

  readonly ctx: CanvasRenderingContext2D;

  constructor(public readonly canvas: HTMLCanvasElement) {
    super();

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      RawCanvas.logger.warn("Cannot get 2d context");
      throw new Error("Canvas context is not available");
    }

    window.addEventListener("resize", () => {
      this.resize();
    });

    this.resize();

    nextTick(this.resize.bind(this));

    this.ctx = ctx;
  }

  resize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientWidth / 2;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
