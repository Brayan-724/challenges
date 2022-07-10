import { type PieceType, type Piece } from "./Piece";
import { Position } from "./Position";

export class PieceManager<PT = PieceType> {
  protected pieces: Piece<PT>[] = [];

  constructor() {}

  addPiece(piece: Piece<PT>): void {
    this.pieces.push(piece);
  }

  getPieces(): Piece<PT>[] {
    return this.pieces;
  }

  getPiecesByType(pieceType: PT): Piece<PT> | undefined {
    return this.pieces.find((piece) => piece.getType() === pieceType);
  }

  takeColliding(position: Position): number {
    // Count the number of pieces that are colliding with the given position.
    let collideCount = 0;

    for (const piece of this.pieces) {
      if (piece.getPosition().equals(position)) {
        collideCount++;
      }
    }

    return collideCount;
  }
}
