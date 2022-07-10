import type { World } from "!game"

export interface Drawable {
  draw(world: World, ctx: CanvasRenderingContext2D): void;
}
