import { Movement } from "../Movement";
import { Piece, PieceType } from "../Piece";
import { Position } from "../Position";

export class KnightPiece extends Piece<PieceType, PieceType.Knight> {
  protected movements: Movement[];

  constructor(position: Position) {
    super(PieceType.Knight, position);

    this.movements = KnightPiece.getMovements();
  }

  static getMovements(): Movement[] {
    return [
      new Movement(new Position(1, 2)),
      new Movement(new Position(-1, 2)),
      new Movement(new Position(1, -2)),
      new Movement(new Position(-1, -2)),
      new Movement(new Position(-2, -1)),
      new Movement(new Position(-2, 1)),
      new Movement(new Position(2, 1)),
      new Movement(new Position(2, -1)),
    ];
  }
}
