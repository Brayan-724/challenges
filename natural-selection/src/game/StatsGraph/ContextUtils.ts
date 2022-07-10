import { Vector2 } from "!engine";

export type CtxType = CanvasRenderingContext2D;

export type CtxTextMeasured = {
  size: Vector2;
  metrics: TextMetrics;
};

export class ContextUtils {
  constructor(private readonly ctx?: CtxType) {}

  getCtx(ctx?: CtxType): CtxType {
    if (ctx) return ctx;
    if (this.ctx) return this.ctx;

    throw new Error("No context");
  }

  getSize(ctx?: CtxType) {
    const c = this.getCtx(ctx);

    return new Vector2(c.canvas.width, c.canvas.height);
  }

  randomColor() {
    return `#${Math.floor(Math.random() * 0x9aaaaa + 0x555555).toString(16)}`;
  }

  getTextSize(text: string, ctx?: CtxType): CtxTextMeasured {
    const c = this.getCtx(ctx);

    const metrics = c.measureText(text);

    return {
      size: new Vector2(
        metrics.width,
        metrics.actualBoundingBoxAscent
      ),
      metrics,
    };
  }

  getCenter(ctx?: CtxType): Vector2;
  getCenter(position: Vector2, size: Vector2): Vector2;
  getCenter(ctxOrPosition?: CtxType | Vector2, size?: Vector2): Vector2 {
    if (ctxOrPosition instanceof Vector2) {
      if (!size) throw new Error("Size is required");
      return new Vector2(
        ctxOrPosition.x + size.x / 2,
        ctxOrPosition.y + size.y / 2
      );
    }

    const c = this.getCtx(ctxOrPosition);

    return new Vector2(c.canvas.width / 2, c.canvas.height / 2);
  }
}
