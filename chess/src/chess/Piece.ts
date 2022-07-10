import { type Board } from "./Board";
import { type Movement } from "./Movement";
import { type Position } from "./Position";

export enum PieceType {
  Pawn,
  Rook,
  Knight,
  Bishop,
  // Queen,
  // King,
}

export abstract class Piece<PT = PieceType, T extends PT = PT> {
  protected abstract movements: Movement[];

  constructor(
    protected readonly type: T,
    protected readonly position: Position
  ) {}

  getMovements(): Movement[] {
    return this.movements;
  }

  getAvailableMovements(board: Board): Movement[] {
    return this.movements.filter((movement) =>
      movement.isAvailable(this.position, board)
    );
  }

  getType(): T {
    return this.type;
  }

  getPosition(): Position {
    return this.position;
  }

  setPosition(position: Position): void {
    this.position.from(position);
  }
}
