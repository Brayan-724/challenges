import { Vec2 } from "src/base";
import { Entity, GameState } from "../system";
import { CellSkin, ColorCellSkin } from "./CellSkin";

export class Cell extends Entity<"grid"> {
  static override logger = Entity.logger.createChild("Cell");
  protected skin: CellSkin = new ColorCellSkin("#999");

  constructor(position: Vec2, public readonly size: Vec2) {
    super();
    this.setPosition(position);
    this.requireCanvasType("grid");
  }

  setSkin(skin: CellSkin) {
    this.skin = skin;
  }

  getSkin(): CellSkin {
    return this.skin;
  }

  goLeft() {
    this.position.x--;
  }

  render(state: GameState) {
    const absPosition = this.canvas.fromResponsive(this.position);
    const absSize = this.canvas.fromResponsive(this.size);

    this.skin.render(absPosition, absSize, state, this);
  }
}
