import { Color } from "./Color";
import { Drawable } from "./Renderable";
import { Renderer } from "./Renderer";
import { Vector2 } from "../internal/utils/Vector2";

export class Grid implements Drawable {
  constructor(private readonly size: Vector2) {}

  draw(renderer: Renderer): void {
    const ctx = renderer.ctx;
    const canvas = renderer.canvas;

    // Draw grid
    const color = Color.lightGray;
    color.a = 0.2;
    ctx.strokeStyle = color.toStringHex();
    for (let i = 0; i < canvas.width; i += this.size.x) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }

    for (let i = 0; i < canvas.height; i += this.size.y) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
  }

  constrain(pos: Vector2): Vector2 {
    const diffX = pos.x % this.size.x;
    const diffY = pos.y % this.size.y;

    return new Vector2(pos.x - diffX, pos.y - diffY);
  }
}
