import { Vec2 } from "src/base";
import { GameState } from "src/system";
import { Cell } from "../Cell";
import { CellSkin } from "./CellSkin";

export class ColorCellSkin extends CellSkin {
  static override logger = CellSkin.logger.createChild("ColorSkin");

  readonly color: string;

  constructor(color: string) {
    super();
    this.color = color;
  }

  render(position: Vec2, size: Vec2, _state: GameState, cell: Cell): void {
    const ctx = cell.canvas.raw.ctx;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(
      position.x,
      position.y,
      size.x,
      size.y
    );
    ctx.strokeStyle = "black";
    ctx.strokeRect(
      position.x,
      position.y,
      size.x,
      size.y
    );
    ctx.restore();
  }
}