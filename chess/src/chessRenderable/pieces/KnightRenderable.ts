import { PieceType } from "../../chess/Piece";
import { KnightPiece } from "../../chess/pieces/Knight";
import { Position } from "../../chess/Position";
import { PieceRenderable } from "../PieceRenderable";
import { type BoardRenderable } from "../BoardRenderable";
import { type CellShape } from "../shapes/CellShape";
import { type Movement } from "../../chess/Movement";
import { type PieceMap } from "../../chess/Board";
import { type Renderer } from "../Renderer";
import { BoxCellShape } from "../shapes/BoxCellShape";
import { TriangleCellShape } from "../shapes/TriangleCellShape";
import { CircleCellShape } from "../shapes/CircleCellShape";

export class KnightRenderable extends PieceRenderable<
  PieceType,
  PieceType.Knight
> {
  protected movements: Movement[];
  shape: CellShape[];

  constructor(position: Position, color: string) {
    super(PieceType.Knight, position, color);

    this.movements = KnightPiece.getMovements();

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

      new BoxCellShape(
        new Position(0.1, 0.875),
        new Position(0.8, 0.08),
        color,
        true
      ),
      //#endregion

      //#region - Base
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
      //#endregion

      //#region - Body

      new CircleCellShape(
        new Position(0.22, 0.2),
        new Position(0.15, 0.15),
        color,
        true
      ),
      new CircleCellShape(
        new Position(0.65, 0.2),
        new Position(0.15, 0.15),
        color,
        true
      ),

      new BoxCellShape(
        new Position(0.3, 0.45),
        new Position(0.4, 0.1),
        color,
        true
      ),
      new CircleCellShape(
        new Position(0.22, 0.44),
        new Position(0.1, 0.1),
        color,
        true
      ),
      new CircleCellShape(
        new Position(0.65, 0.44),
        new Position(0.1, 0.1),
        color,
        true
      ),

      //#endregion

      //#region - Stroke
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
      //#endregion
    ];
  }

  render(
    renderer: Renderer,
    board: BoardRenderable<PieceType, PieceMap<PieceType>>
  ): void {
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
