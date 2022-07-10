import { Vec2 } from "src/base";
import { GameState } from "src/system";
import { Cell } from "../Cell";

export abstract class SkinPart {
  abstract render(
    position: Vec2,
    size: Vec2,
    state: GameState,
    cell: Cell
  ): void;
}
