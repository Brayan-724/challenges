import { PieceType } from "../../chess/Piece";
import { PieceRenderable } from "../PieceRenderable";
import { Position } from "../../chess/Position";
import { Movement } from "../../chess/Movement";
import { BoxCellShape } from "../shapes/BoxCellShape";
import { type Renderer } from "../Renderer";
import { type BoardRenderable } from "../BoardRenderable";
import { type CellShape } from "../shapes/CellShape";
import { CircleCellShape } from "../shapes/CircleCellShape";
import { PawnPiece } from "../../chess/pieces/Pawn";
import { TriangleCellShape } from "../shapes/TriangleCellShape";

export class PawnRenderable extends PieceRenderable<PieceType, PieceType.Pawn> {
  protected movements: Movement[];
  private shape: CellShape[];

  constructor(position: Position, color: string) {
    super(PieceType.Pawn, position, color);

    this.movements = PawnPiece.getMovements();

    this.shape = [
      //#region - Sub Base
      new BoxCellShape(
        new Position(0.2, 0.8),
        new Position(0.6, 0.08),
        color,
        true
      ),

      new TriangleCellShape(
        new Position(0.1, 0.88),
        new Position(0.2, 0.08),
        color
      ),
      new TriangleCellShape(
        new Position(0.7, 0.88),
        new Position(0.2, 0.08),
        color
      ),
      //#endregion

      new CircleCellShape(
        new Position(0.18, 0.68),
        new Position(0.15, 0.15),
        color
      ),
      new CircleCellShape(
        new Position(0.67, 0.68),
        new Position(0.15, 0.15),
        color
      ),

      new BoxCellShape(
        new Position(0.25, 0.68),
        new Position(0.47, 0.15),
        color
      ),

      new TriangleCellShape(
        new Position(0.25, 0.69),
        new Position(0.3, 0.05),
        color
      ),
      new TriangleCellShape(
        new Position(0.45, 0.69),
        new Position(0.3, 0.05),
        color
      ),

      new CircleCellShape(
        new Position(0.33, 0.58),
        new Position(0.15, 0.15),
        color
      ),
      new CircleCellShape(
        new Position(0.53, 0.58),
        new Position(0.15, 0.15),
        color
      ),

      new CircleCellShape(
        new Position(0.3, 0.05),
        new Position(0.4, 0.4),
        color
      ),
      new BoxCellShape(
        new Position(0.375, 0.38),
        new Position(0.25, 0.4),
        color
      ),

      new BoxCellShape(
        new Position(0.2, 0.8),
        new Position(0.6, 0.01),
        color,
        true
      ),
      new BoxCellShape(
        new Position(0.33, 0.665),
        new Position(0.35, 0.01),
        color,
        true
      ),
      new BoxCellShape(
        new Position(0.36, 0.59),
        new Position(0.28, 0.01),
        color,
        true
      ),
      new BoxCellShape(
        new Position(0.1, 0.875),
        new Position(0.8, 0.08),
        color,
        true
      ),
      new BoxCellShape(
        new Position(0.35, 0.38),
        new Position(0.3, 0.05),
        color,
        true
      ),
    ];
  }

  render(renderer: Renderer, board: BoardRenderable): void {
    const width = board.grid.getWidthSize(renderer);
    const height = board.grid.getHeightSize(renderer);

    const x = this.position.x * width;
    const y = this.position.y * height;

    const position = new Position(x, y);
    const size = new Position(width, height);

    this.shape.forEach((shape) => {
      shape.render(renderer, position, size);
    });

    renderer.ctx.save();
    renderer.ctx.strokeStyle = this.color;
    renderer.ctx.lineWidth = 1;
    renderer.ctx.strokeRect(x, y, width, height);
    renderer.ctx.restore();
  }
}
