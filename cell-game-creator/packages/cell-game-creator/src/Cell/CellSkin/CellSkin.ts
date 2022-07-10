import { Vec2 } from "src/base";
import { GameState } from "src/system";
import { createLogger } from "src/utils";
import { Cell } from "../Cell";

export abstract class CellSkin {
  static logger = createLogger("CellSkin", { backgroundColor: "salmon" });
  
  abstract render(
    position: Vec2,
    size: Vec2,
    state: GameState,
    cell: Cell
  ): void;
}
