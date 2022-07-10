import { Color } from "./Color";
import { Renderer } from "./Renderer";
import { Vector2 } from "../internal/utils/Vector2";
import { Drawable } from "./Renderable";
import { Shapeable } from "./Shapeable";

export interface RectOptions {
  pos?: Vector2;
  size?: Vector2;
  color?: Color;
  strokeColor?: Color;

  fill?: boolean;
  stroke?: boolean;
}

export class Rect implements Drawable, Shapeable {
  public readonly pos: Vector2;
  private readonly size: Vector2;
  private readonly _color: Color;
  private readonly strokeColor: Color;

  private fill?: boolean;
  private stroke?: boolean;

  constructor(options: RectOptions) {
    this.pos = options.pos || new Vector2(0, 0);
    this.size = options.size || new Vector2(0, 0);
    this._color = options.color || Color.white;
    this.strokeColor = options.strokeColor || Color.black;

    this.fill = options.fill ?? true;
    this.stroke = options.stroke ?? true;
  }

  get color(): Color {
    return this._color;
  }

  set color(color: Color) {
    this._color.from(color);
  }

  draw(renderer: Renderer, relative?: Vector2, relativeSize?: Vector2) {
    const pos = this.pos.clone().add(Vector2.or(relative, Vector2.zero));
    const size = this.size.clone().add(Vector2.or(relativeSize, Vector2.zero));

    if (this.fill) {
      renderer.ctx.fillStyle = this.color.toStringHex();
      renderer.ctx.fillRect(pos.x, pos.y, size.x, size.y);
    }

    if (this.stroke) {
      renderer.ctx.strokeStyle = this.strokeColor.toStringHex();
      renderer.ctx.strokeRect(pos.x, pos.y, size.x, size.y);
    }
  }
}
