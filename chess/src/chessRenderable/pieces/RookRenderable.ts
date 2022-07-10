import { PieceType } from "../../chess/Piece";
import { RookPiece } from "../../chess/pieces/Rook";
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

export class RookRenderable extends PieceRenderable<PieceType, PieceType.Rook> {
  protected movements: Movement[];
  shape: CellShape[];

  constructor(position: Position, color: string) {
    super(PieceType.Rook, position, color);

    this.movements = RookPiece.getMovements();

    this.shape = [
      //#region - Sub Base
      new BoxCellShape(
        new Position(0.3, 0.72),
        new Position(0.4, 0.08),
        color,
        true
      ),

      new TriangleCellShape(
        new Position(0.2, 0.8),
        new Position(0.2, 0.08),
        color
      ),
      new TriangleCellShape(
        new Position(0.6, 0.8),
        new Position(0.2, 0.08),
        color
      ),

      new BoxCellShape(
        new Position(0.2, 0.79),
        new Position(0.6, 0.08),
        color,
        true
      ),

      new BoxCellShape(
        new Position(0.15, 0.875),
        new Position(0.7, 0.08),
        color,
        true
      ),
      //#endregion

      //#region - Body
      new BoxCellShape(
        new Position(0.3, 0.35),
        new Position(0.4, 0.08),
        color,
        true
      ),

      new TriangleCellShape(
        new Position(0.2, 0.35),
        new Position(0.2, -0.08),
        color
      ),
      new TriangleCellShape(
        new Position(0.6, 0.35),
        new Position(0.2, -0.08),
        color
      ),
      new BoxCellShape(
        new Position(0.2, 0.27),
        new Position(0.6, 0.08),
        color,
        true
      ),

      new BoxCellShape(
        new Position(0.3, 0.43),
        new Position(0.4, 0.3),
        color,
        true
      ),
      //#endregion

      //#region - Head
      new BoxCellShape(
        new Position(0.2, 0.2),
        new Position(0.15, 0.08),
        color,
        true
      ),
      new BoxCellShape(
        new Position(0.4, 0.2),
        new Position(0.2, 0.08),
        color,
        true
      ),
      new BoxCellShape(
        new Position(0.65, 0.2),
        new Position(0.15, 0.08),
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
