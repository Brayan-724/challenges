import { Grid } from "../chess/Grid";
import { type Renderer } from "./Renderer";
import { type Renderable } from "./Renderable";

export class GridRenderable extends Grid implements Renderable {
  constructor(width: number, height: number) {
    super(width, height);
  }

  getColor(x: number, y: number): string {
    if (x % 2 === 0 && y % 2 === 0) {
      return "#000000";
    } else if (x % 2 === 0 && y % 2 !== 0) {
      return "#FFFFFF";
    } else if (x % 2 !== 0 && y % 2 === 0) {
      return "#FFFFFF";
    } else if (x % 2 !== 0 && y % 2 !== 0) {
      return "#000000";
    }

    return "KKKKK";
  }

  render(renderer: Renderer): void {
    const ctx = renderer.ctx;
    const widthSize = this.getWidthSize(renderer);
    const heightSize = this.getHeightSize(renderer);

    ctx.save();
    for (let x = 0; x <= this.width; x++) {
      for (let y = 0; y <= this.height; y++) {
        ctx.fillStyle = this.getColor(x, y);
        ctx.fillRect(x * widthSize, y * heightSize, widthSize, heightSize);
      }
    }

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, this.width * widthSize, this.height * heightSize);

    ctx.restore();
  }

  getWidthSize(renderer: Renderer): number {
    return renderer.canvas.width / this.width;
  }

  getHeightSize(renderer: Renderer): number {
    return renderer.canvas.height / this.height;
  }
}
