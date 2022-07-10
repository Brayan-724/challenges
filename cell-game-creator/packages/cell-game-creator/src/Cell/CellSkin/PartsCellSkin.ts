import { Vec2 } from "src/base";
import { GameState } from "src/system";
import { Cell } from "../Cell";
import { CellSkin } from "./CellSkin";
import { SkinPart } from "./SkinPart";

export class PartsCellSkin extends CellSkin {
  parts: SkinPart[] = [];

  addPart(part: SkinPart) {
    this.parts.push(part);
  }

  render(position: Vec2, size: Vec2, state: GameState, cell: Cell) {
    this.parts.forEach(part => part.render(position, size, state, cell));
  }
}
