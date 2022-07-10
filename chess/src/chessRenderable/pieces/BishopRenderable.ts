import { PieceMap } from "../../chess/Board";
import { Movement } from "../../chess/Movement";
import { PieceType } from "../../chess/Piece";
import { Bishop } from "../../chess/pieces/Bishop";
import { Position } from "../../chess/Position";
import { BoardRenderable } from "../BoardRenderable";
import { PieceRenderable } from "../PieceRenderable";
import { Renderer } from "../Renderer";
import { BoxCellShape } from "../shapes/BoxCellShape";
import { CellShape } from "../shapes/CellShape";
import { CircleCellShape } from "../shapes/CircleCellShape";
import { TriangleCellShape } from "../shapes/TriangleCellShape";

export class BishopRenderable extends PieceRenderable<
  PieceType,
  PieceType.Bishop
> {
  protected movements: Movement[];
  shape: CellShape[];

  constructor(position: Position, color: string) {
    super(PieceType.Bishop, position, color);

    this.movements = Bishop.getMovements();

    this.shape = [
      new TriangleCellShape(
        new Position(0.44, 0.35),
        new Position(0.17, -0.6),
        color
      ),

      new CircleCellShape(
        new Position(0.56, 0.72),
        new Position(0.25, 0.25),
        color,
        true
      ),
      new CircleCellShape(
        new Position(0.2, 0.72),
        new Position(0.25, 0.25),
        color,
        true
      ),
      new BoxCellShape(
        new Position(0.25, 0.72),
        new Position(0.5, 0.25),
        color
      ),

      new BoxCellShape(
        new Position(0.22, 0.9),
        new Position(0.6, 0.08),
        color,
        true
      ),
      new CircleCellShape(
        new Position(0.16, 0.9),
        new Position(0.08, 0.08),
        color
      ),
      new CircleCellShape(
        new Position(0.76, 0.9),
        new Position(0.08, 0.08),
        color
      ),

      new TriangleCellShape(
        new Position(0.32, 0.7),
        new Position(0.4, 0.3),
        color
      ),
      new TriangleCellShape(
        new Position(0.36, 0.7),
        new Position(0.2, 0.25),
        color
      ),
      new TriangleCellShape(
        new Position(0.48, 0.7),
        new Position(0.2, 0.25),
        color
      ),

      new BoxCellShape(
        new Position(0.2, 0.7),
        new Position(0.6, 0.08),
        color,
        true
      ),
      new CircleCellShape(
        new Position(0.16, 0.7),
        new Position(0.08, 0.08),
        color
      ),
      new CircleCellShape(
        new Position(0.76, 0.7),
        new Position(0.08, 0.08),
        color
      ),

      new CircleCellShape(
        new Position(0.4, 0.12),
        new Position(0.23, 0.23),
        color
      ),

      new CircleCellShape(
        new Position(0.435, 0.03),
        new Position(0.15, 0.15),
        color,
        true
      ),

      new BoxCellShape(
        new Position(0.35, 0.3),
        new Position(0.33, 0.08),
        color,
        true
      ),
      new CircleCellShape(
        new Position(0.65, 0.3),
        new Position(0.08, 0.08),
        color
      ),
      new CircleCellShape(
        new Position(0.3, 0.3),
        new Position(0.08, 0.08),
        color
      ),
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
