import { type Position } from "./Position";

export class Grid {
  constructor(readonly width: number, readonly height: number) {}

  checkIsInside(position: Position): boolean {
    return (
      position.x >= 0 &&
      position.x < this.width &&
      position.y >= 0 &&
      position.y < this.height
    );
  }
}
