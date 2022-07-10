import { type Grid } from "./Grid";
import { Piece, type PieceType } from "./Piece";
import { type PieceManager } from "./PieceManager";
import { Position } from "./Position";
import { Team } from "./Team";

export type PieceMap<PT extends number> = {
  [key in PT]: (position: Position, team: Team) => Piece<PT, key>;
};

export class Board<
  PT extends number = PieceType,
  PM extends PieceMap<PT> = PieceMap<PT>
> {
  protected _round: number = 0;

  constructor(
    readonly grid: Grid,
    readonly pieceManager: PieceManager,
    protected readonly pieceMap: PM
  ) {}

  createPiece<T extends PT>(
    type: T,
    position: Position,
    team: Team
  ): Piece<PT, T> {
    const piece = this.pieceMap[type];

    return piece(position, team) as Piece<PT, T>;
  }

  addPiece<T extends PT>(piece: Piece<PT, T>): void {
    this.pieceManager.addPiece(piece);
  }

  getRound(): number {
    return this._round;
  }
}
