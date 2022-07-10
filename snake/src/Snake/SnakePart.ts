import { Rect } from "../Render/Rect";
import { Vector2 } from "../internal/utils/Vector2";
import { type Renderer } from "../Render/Renderer";
import { type Drawable } from "../Render/Renderable";
import { type Updateable } from "../internal/interfaces/Updateable";
import { type Game } from "../internal/Game";
import { Color } from "../Render/Color";
import { Shapeable } from "../Render/Shapeable";

export class SnakePart implements Drawable, Updateable {
  public readonly pos: Vector2;
  public readonly size: Vector2;
  protected renderParts: (Drawable & Shapeable)[] = [];

  constructor(
    public readonly game: Game,
    private readonly frontOrPos: SnakePart | Vector2 | null
  ) {
    if (frontOrPos instanceof SnakePart) {
      this.pos = frontOrPos.pos.clone();
    } else if (frontOrPos instanceof Vector2) {
      this.pos = frontOrPos.clone();
    } else {
      this.pos = Vector2.zero;
    }

    this.renderParts.push(
      new Rect({
        pos: new Vector2(0, 0),
        size: new Vector2(1, 1),
        color: Color.from(this.game.config.snakeColor),
      })
    );

    this.size = new Vector2(
      this.game.config.snakeSize,
      this.game.config.snakeSize
    );
  }

  get color(): Color {
    return this.renderParts[0].color;
  }

  set color(value: Color) {
    this.renderParts.forEach((renderPart, _index) => {
      renderPart.color = value;
    });
  }

  update(_delta: number) {
    const front = this.frontOrPos;

    if (front instanceof SnakePart) {
      this.pos.from(front.pos);
    }
  }

  draw(renderer: Renderer, relative?: Vector2, relativeSize?: Vector2) {
    for (const renderPart of this.renderParts) {
      // const partPos = renderPart.pos.clone();

      renderPart.draw(
        renderer,
        this.pos.clone().add(Vector2.or(relative, Vector2.zero)),
        this.size.clone().add(Vector2.or(relativeSize, Vector2.zero))
      );
    }
  }
}
