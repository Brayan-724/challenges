import { Vector2 } from "../internal/utils/Vector2";
import { SnakePart } from "./SnakePart";
import { Direction, DirectionUtils } from "./Direction";
import { type Drawable } from "../Render/Renderable";
import { type Updateable } from "../internal/interfaces/Updateable";
import { type Game } from "../internal/Game";
import { Color } from "../Render/Color";
import { Rect } from "../Render/Rect";

export class SnakeHead extends SnakePart implements Drawable, Updateable {
  private dir: Direction = Direction.None;

  constructor(game: Game, pos: Vector2) {
    super(game, pos);

    this.renderParts = [
      new Rect({
        pos: new Vector2(0, 0),
        size: new Vector2(1, 1),
        color: Color.from(game.config.snakeHeadColor),
      }),
    ];
  }

  get direction(): Direction {
    return this.dir;
  }

  set direction(value: Direction) {
    this.dir = value;
  }

  override update(_delta: number) {
    // If the position if outside the grid, then we need to wrap it
    const direction = this.getDirectionAsVector();

    this.pos.add(direction.multiply(this.size));

    if (this.pos.x < 0) {
      this.pos.x = this.game.canvas.width - 1;
    }

    if (this.pos.y < 0) {
      this.pos.y = this.game.canvas.height - 1;
    }

    if (this.pos.x >= this.game.canvas.width) {
      this.pos.x = 0;
    }

    if (this.pos.y >= this.game.canvas.height) {
      this.pos.y = 0;
    }

    this.pos.from(this.game.grid.constrain(this.pos));
  }

  getDirectionAsVector(): Vector2 {
    return DirectionUtils.transformDirectionAsVector(this.direction);
  }
}
