import { CellShape } from "./CellShape";
import { type Position } from "../../chess/Position";
import { type Renderer } from "../Renderer";

export class BoxCellShape extends CellShape {
  render(renderer: Renderer, worldPosition: Position, worldSize: Position) {
    const x = this.position.x * worldSize.x + worldPosition.x;
    const y = this.position.y * worldSize.y + worldPosition.y;
    const width = this.size.x * worldSize.x;
    const height = this.size.y * worldSize.y;

    renderer.ctx.save();

    renderer.ctx.fillStyle = this.color;
    renderer.ctx.fillRect(x, y, width, height);
    if (this.stroke) renderer.ctx.strokeRect(x, y, width, height);

    renderer.ctx.restore();
  }
}
