import { Position } from "../../chess/Position";
import { type Renderer } from "../Renderer";

export abstract class CellShape {
  constructor(
    readonly position: Position,
    readonly size: Position,
    readonly color: string,
    readonly stroke: boolean = false
  ) {}

  abstract render(renderer: Renderer, worldPosition: Position, worldSize: Position): void;
}
