import { AntiPartial } from "src/utils";
import { Vec2 } from "../base";
import { Canvas } from "./Canvas";
import { RawCanvas } from "./RawCanvas";

type gcoX = { xCells: number };
type gcoY = { yCells: number };
type gcoXY = gcoX & gcoY;
type gcoS = { cellSize: number };

/** @internal */
export type _GridCanvasOptions = { showGrid?: boolean };
export type GridCanvasOptions = _GridCanvasOptions &
  (gcoX | gcoY | gcoXY | gcoS);
/** @internal */
export type GridCanvasOptionsInternal = AntiPartial<_GridCanvasOptions> &
  gcoXY &
  gcoS;

export class GridCanvas extends Canvas {
  static logger = RawCanvas.logger.createChild("GridCanvas");
  readonly raw: RawCanvas;
  protected rawOptions: GridCanvasOptions;
  readonly options: GridCanvasOptionsInternal;

  constructor(
    canvas: HTMLCanvasElement | RawCanvas,
    options: GridCanvasOptions
  ) {
    super();

    if (canvas instanceof RawCanvas) {
      this.raw = canvas;
    } else {
      this.raw = new RawCanvas(canvas);
    }

    this.rawOptions = { ...options };
    this.options = { showGrid: true, ...options } as GridCanvasOptionsInternal;
    this.normalizeOptions();

    const resizeObserver = new ResizeObserver(() => {
      this.normalizeOptions();
      GridCanvas.logger.debug("resize");
    });

    resizeObserver.observe(this.raw.canvas);
  }

  protected normalizeOptions(): this {
    const internalOptions = { ...this.rawOptions } as GridCanvasOptionsInternal;

    if (internalOptions.cellSize !== undefined) {
      this.options.xCells = Math.round(
        this.raw.canvas.width / internalOptions.cellSize
      );
      this.options.yCells = Math.round(
        this.raw.canvas.height / internalOptions.cellSize
      );
    } else if (
      internalOptions.xCells !== undefined &&
      internalOptions.yCells == undefined
    ) {
      this.options.cellSize = this.raw.canvas.width / internalOptions.xCells;
      this.options.yCells = Math.round(
        this.raw.canvas.height / this.options.cellSize
      );
    } else if (
      internalOptions.xCells == undefined &&
      internalOptions.yCells !== undefined
    ) {
      this.options.cellSize = this.raw.canvas.height / internalOptions.yCells;
      this.options.xCells = Math.round(
        this.raw.canvas.width / this.options.cellSize
      );
    } else if (
      internalOptions.xCells !== undefined &&
      internalOptions.yCells !== undefined
    ) {
      this.options.cellSize = Math.max(
        this.raw.canvas.width / internalOptions.xCells,
        this.raw.canvas.height / internalOptions.yCells
      );
    } else {
      GridCanvas.logger.warn(
        "No cell size or cell count specified. This could explode."
      );
      throw new Error("No cell size or cell count specified.");
    }

    return this;
  }

  fromResponsive(position: Vec2): Vec2 {
    return new Vec2(
      Math.floor(position.x * this.options.cellSize),
      Math.floor(position.y * this.options.cellSize)
    );
  }

  drawCell(position: Vec2) {
    const noramlizedPosition = this.fromResponsive(position);

    this.raw.ctx.fillRect(
      noramlizedPosition.x,
      noramlizedPosition.y,
      this.options.cellSize,
      this.options.cellSize
    );
  }

  drawGrid() {
    const ctx = this.raw.ctx;
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 0.5;

    for (let i = 0; i <= this.options.xCells; i++) {
      ctx.beginPath();
      ctx.moveTo(i * this.options.cellSize, 0);
      ctx.lineTo(i * this.options.cellSize, this.raw.canvas.height);
      ctx.stroke();
    }

    for (let i = 0; i <= this.options.yCells; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * this.options.cellSize);
      ctx.lineTo(this.raw.canvas.width, i * this.options.cellSize);
      ctx.stroke();
    }

    ctx.restore();
  }

  clear() {
    this.raw.clear();
    
    if (this.options.showGrid) {
      this.drawGrid();
    }
  }
}
