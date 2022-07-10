import { Canvas } from "./Canvas";
import { GridCanvas } from "./GridCanvas";
import { RawCanvas } from "./RawCanvas";

export const canvasTypes = {
  any: Canvas.prototype,
  raw: RawCanvas.prototype,
  grid: GridCanvas.prototype,
  used: window._cell_usedCanvas_,
};

export type CanvasNames = keyof typeof canvasTypes;
export type CanvasClass = Canvas | RawCanvas | GridCanvas;
export type CanvasType<N extends CanvasNames> = typeof canvasTypes[N];
