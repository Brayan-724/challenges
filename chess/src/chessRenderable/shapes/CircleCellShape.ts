import { CellShape } from "./CellShape";
import { type Position } from "../../chess/Position";
import { type Renderer } from "../Renderer";

export class CircleCellShape extends CellShape {
  render(renderer: Renderer, worldPosition: Position, worldSize: Position) {
    const x = this.position.x * worldSize.x + worldPosition.x;
    const y = this.position.y * worldSize.y + worldPosition.y;
    const width = this.size.x * worldSize.x;
    const height = this.size.y * worldSize.y;

    renderer.ctx.save();

    renderer.ctx.fillStyle = this.color;
    renderer.ctx.beginPath();
    renderer.ctx.ellipse(
      x + width / 2,
      y + height / 2,
      width / 2,
      height / 2,
      0,
      0,
      2 * Math.PI
    );
    renderer.ctx.fill();
    if (this.stroke) renderer.ctx.stroke();

    renderer.ctx.restore();
  }
}
