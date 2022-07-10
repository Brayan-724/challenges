import { Position } from "./Position";
import { type Board } from "./Board";

export type MovementValidator = (
  board: Board,
  position: Position,
  movement: Movement
) => boolean | MovementValitationResult | Position;

export enum MovementValitationResult {
  Invalid,
  Relocated,
  Valid,
  Collision,
  EnemyCollision,
  FriendCollision,
}

export class Movement {
  constructor(
    private readonly relativePosition: Position,
    private readonly validator?: MovementValidator
  ) {}

  getRelativePosition(): Position {
    return this.relativePosition;
  }

  getAbsolutePosition(position: Position): Position {
    return position.clone().add(this.relativePosition);
  }

  getValidator(): MovementValidator | undefined {
    return this.validator;
  }

  getValidation(
    position: Position,
    board: Board
  ): boolean | MovementValitationResult | Position {
    if (this.validator) {
      return this.validator(board, position, this);
    }

    return true;
  }

  IsDiagonal(): boolean {
    return this.relativePosition.getIsDiagonal();
  }

  IsInside(position: Position, board: Board): boolean {
    const absolutePosition = this.getAbsolutePosition(position);

    return board.grid.checkIsInside(absolutePosition);
  }

  isAvailable(
    position: Position,
    board: Board
  ): MovementValitationResult | [MovementValitationResult.Relocated, Position] {
    if (!this.IsInside(position, board))
      return MovementValitationResult.Invalid;

    const validation = this.getValidation(position, board);

    if (validation === false) return MovementValitationResult.Invalid;

    if (validation instanceof Position) {
      return [MovementValitationResult.Relocated, validation];
    }

    if (
      typeof validation === "number" &&
      validation !== MovementValitationResult.Valid
    )
      return validation;

    if (!board.grid.checkIsInside(this.getAbsolutePosition(position)))
      return MovementValitationResult.Collision;

    return MovementValitationResult.Valid;
  }
}
