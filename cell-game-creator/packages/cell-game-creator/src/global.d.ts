import { Canvas } from "./Canvas/Canvas";

declare global {
  interface Window {
    _cell_usedCanvas_: Canvas;
  }
}