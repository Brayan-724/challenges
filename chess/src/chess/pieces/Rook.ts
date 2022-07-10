import { Movement } from "../Movement";
import { Piece, PieceType } from "../Piece";
import { Position } from "../Position";

export class RookPiece extends Piece<PieceType, PieceType.Knight> {
  protected movements: Movement[];

  constructor(position: Position) {
    super(PieceType.Knight, position);

    this.movements = RookPiece.getMovements();
  }

  private static getMovement(x: number, y: number): Movement[] {
    return new Array(8).fill(0).map((_, i) => {
      const position = new Position(i * x, i * y);
      return new Movement(position);
    });
  }

  static getMovements(): Movement[] {
    return [
      ...this.getMovement(0, 1),
      ...this.getMovement(0, -1),
      ...this.getMovement(1, 0),
      ...this.getMovement(-1, 0),
    ];
  }
}
