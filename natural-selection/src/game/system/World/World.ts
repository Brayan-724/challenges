import { GameObject, InstanceType } from "!engine";
import { HotReloadable } from "!hot";
import { Empty } from "./Empty";

export class World implements HotReloadable<[ctx: CanvasRenderingContext2D]> {
  private ctx!: CanvasRenderingContext2D;
  private _width: number = 0;
  private _height: number = 0;

  private timer: number | null = null;

  readonly type = InstanceType.World;

  gameObject = new Empty();

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  addChild(child: GameObject): this {
    this.gameObject.addChild(child);

    return this;
  }

  removeChild(child: GameObject): this {
    this.gameObject.removeChild(child);

    return this;
  }

  getAllChilds(): GameObject[] {
    return this.gameObject.getAllChilds();
  }

  protected draw() {
    this.gameObject.draw(this, this.ctx);
  }

  protected update(delta: number) {
    this.gameObject.update(this, delta);
  }

  start(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this._width = ctx.canvas.width;
    this._height = ctx.canvas.height;

    let lastTime = performance.now();

    this.timer = setInterval(() => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, this._width, this._height);

      this.update(delta);
      this.draw();
    }, 1000 / 60);
  }

  stop() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  hot_start(ctx: CanvasRenderingContext2D): void {
    this.start(ctx);
  }

  hot_stop(): void {
    this.stop();
  }
}
