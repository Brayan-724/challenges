import { PieceManager } from "../chess/PieceManager";
import { type BoardRenderable } from "./BoardRenderable";
import { type PieceRenderable } from "./PieceRenderable";
import { type Renderable } from "./Renderable";
import { type Renderer } from "./Renderer";

export class PieceManagerRenderable<PT>
  extends PieceManager<PT>
  implements Renderable
{
  protected declare pieces: PieceRenderable<PT>[];

  constructor() {
    super();
  }

  override addPiece(piece: PieceRenderable<PT, PT>): void {
    super.addPiece(piece);
  }

  override getPieces(): PieceRenderable<PT>[] {
    return this.pieces;
  }

  override getPiecesByType(pieceType: PT): PieceRenderable<PT> | undefined {
    return this.pieces.find((piece) => piece.getType() === pieceType);
  }

  render(renderer: Renderer, board: BoardRenderable): void {
    renderer.render(this.pieces, board);
  }
}
