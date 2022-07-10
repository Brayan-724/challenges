import { type BoardRenderable } from "./BoardRenderable";
import { type Renderer } from "./Renderer";

export interface Renderable {
  render(renderer: Renderer, board: BoardRenderable): void;
}
