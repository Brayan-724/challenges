import { Vector2 } from "../internal/utils/Vector2";
import { Renderer } from "./Renderer";

export interface Drawable {
  draw(renderer: Renderer, relative?: Vector2, relativeSize?: Vector2): void;
}
