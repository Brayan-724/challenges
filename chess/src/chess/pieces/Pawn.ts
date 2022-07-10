import { Movement } from "../Movement";
import { Piece, PieceType } from "../Piece";
import { Position } from "../Position";

export class PawnPiece extends Piece<PieceType, PieceType.Pawn> {
  protected movements: Movement[];

  constructor(position: Position) {
    super(PieceType.Pawn, position);

    this.movements = PawnPiece.getMovements();
  }

  static getMovements(): Movement[] {
    return [
      new Movement(new Position(0, 1)),
      new Movement(new Position(0, 2), (board) => {
        return board.getRound() === 1;
      }),
    ];
  }
}
