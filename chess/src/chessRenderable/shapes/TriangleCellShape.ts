import { CellShape } from "./CellShape";
import { Position } from "../../chess/Position";
import { type Renderer } from "../Renderer";

export class TriangleCellShape extends CellShape {
  render(
    renderer: Renderer,
    worldPosition: Position,
    worldSize: Position
  ): void {
    const x = this.position.x * worldSize.x + worldPosition.x;
    const y = this.position.y * worldSize.y + worldPosition.y;
    const width = this.size.x * worldSize.x;
    const height = this.size.y * worldSize.y;

    renderer.ctx.save();

    renderer.ctx.fillStyle = this.color;
    renderer.ctx.beginPath();
    renderer.ctx.moveTo(x, y);
    renderer.ctx.lineTo(x + width, y);
    renderer.ctx.lineTo(x + width / 2, y - height);
    renderer.ctx.closePath();
    renderer.ctx.fill();

    renderer.ctx.restore();
  }
}
