import { Piece, type PieceType } from "../chess/Piece";
import { type Renderable } from "./Renderable";
import { type Renderer } from "./Renderer";
import { type BoardRenderable } from "./BoardRenderable";
import { type Position } from "../chess/Position";

export abstract class PieceRenderable<PT = PieceType, T extends PT = PT>
  extends Piece<PT, T>
  implements Renderable
{
  constructor(type: T, position: Position, readonly color: string) {
    super(type, position);
  }

  abstract render(renderer: Renderer, board: BoardRenderable): void;
}
