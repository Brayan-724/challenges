import { Board, PieceMap } from "../chess/Board";
import { PieceType } from "../chess/Piece";
import { type PieceManager } from "../chess/PieceManager";
import { type GridRenderable } from "./GridRenderable";
import { type Renderable } from "./Renderable";
import { type Renderer } from "./Renderer";

export class BoardRenderable<
    PT extends number = PieceType,
    PM extends PieceMap<PT> = PieceMap<PT>
  >
  extends Board<PT, PM>
  implements Renderable
{
  declare readonly grid: GridRenderable;

  constructor(grid: GridRenderable, pieceManager: PieceManager, pieceMap: PM) {
    super(grid, pieceManager, pieceMap);
  }

  render(renderer: Renderer): void {
    //@ts-expect-error - this is a hack
    renderer.render(this.grid, this);
    //@ts-expect-error - this is a hack
    renderer.render(this.pieceManager, this);
  }
}
