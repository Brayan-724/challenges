import { Movement } from "../Movement";
import { Piece, PieceType } from "../Piece";
import { Position } from "../Position";

export class Bishop extends Piece<PieceType, PieceType.Bishop> {
  protected movements: Movement[];

  constructor(position: Position) {
    super(PieceType.Bishop, position);

    this.movements = Bishop.getMovements();
  }

  private static getMovement(x: number, y: number): Movement[] {
    return new Array(8).fill(0).map((_, i) => {
      const position = new Position(i * x, i * y);
      return new Movement(position);
    });
  }

  static getMovements(): Movement[] {
    return [
      ...this.getMovement(1, 1),
      ...this.getMovement(1, -1),
      ...this.getMovement(-1, 1),
      ...this.getMovement(-1, -1),
    ];
  }
}
