import { Game } from "../internal/Game";
import { Drawable } from "../Render/Renderable";
import { Renderer } from "../Render/Renderer";
import { Vector2 } from "../internal/utils/Vector2";
import { Color } from "../Render/Color";

export class Food implements Drawable {
  constructor(public readonly game: Game, public readonly pos: Vector2) {
    pos.from(game.grid.constrain(pos));
  }

  draw(renderer: Renderer): void {
    renderer.ctx.fillStyle = Color.from(
      this.game.config.foodColor
    ).toStringHex();
    renderer.ctx.fillRect(
      this.pos.x,
      this.pos.y,
      this.game.config.snakeSize,
      this.game.config.snakeSize
    );
  }
}
