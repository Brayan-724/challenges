import { Vector2, Maths } from "!engine";
import { StatsHistory } from "!abstract";
import { ContextUtils } from "./ContextUtils";

export type StatsArea = {
  position: Vector2;
  size: Vector2;
};

export type StatsAreaGetted =
  | {
      area: StatsArea;
      position: Vector2;
      size: Vector2;
    }
  | {
      area: null;
      position: null;
      size: null;
    };

export type StatsAreaList = {
  [key: string]: StatsArea;
};

export class StatsGraph {
  stats: StatsHistory | null = null;
  statsColor: { [key: string]: string } = {};
  ourStats = new StatsHistory();

  readonly areaList: StatsAreaList;
  readonly isSpecefic: boolean;

  contextUtils: ContextUtils;

  constructor(ctx: CanvasRenderingContext2D, position: StatsArea);
  constructor(ctx: CanvasRenderingContext2D, positionList: StatsAreaList);

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    areaList: StatsArea | StatsAreaList
  ) {
    this.contextUtils = new ContextUtils(ctx);

    if (this.verifyArea(areaList)) {
      this.areaList = {
        "*": areaList,
      };
      this.isSpecefic = false;
    } else if (this.verifyAreaList(areaList)) {
      this.areaList = areaList;
      this.isSpecefic = true;
    } else {
      throw new Error("Invalid position list");
    }
  }

  protected verifyAreaList(positionList: any): positionList is StatsAreaList {
    const keys = Object.keys(positionList);

    if (keys.length === 0) return false;

    for (const key of keys) {
      if (!this.verifyArea(positionList[key])) return false;
    }

    return true;
  }

  protected verifyArea(position: any): position is StatsArea {
    return (
      typeof position === "object" &&
      "position" in position &&
      "size" in position &&
      position["position"] instanceof Vector2 &&
      position["size"] instanceof Vector2
    );
  }

  attach(stats: StatsHistory) {
    this.stats = stats;
    this.stats.on(this.handler.bind(this));
    this.draw();
  }

  dettach() {
    if (!this.stats) return;

    this.stats.off(this.handler);
    this.stats = null;
  }

  normalizeData(data: number[], length: number) {
    const dataLength = data.length;
    const dataClone = [...data];

    if (dataLength > length) {
      dataClone.splice(0, dataLength - length);
    }

    if (dataLength < length) {
      for (let i = 0; i < length - dataLength; i++) {
        dataClone.unshift(0);
      }
    }

    return dataClone;
  }

  handler(_stat: string, _value: number) {
    if (!this.stats) return;

    this.draw();
  }

  protected getKey(stat: string) {
    return this.isSpecefic ? stat : "*";
  }

  protected getArea(stat: string): StatsAreaGetted {
    const area = this.areaList[this.getKey(stat)];

    if (!area)
      return {
        area: null,
        position: null,
        size: null,
      };

    const canvasSize = this.contextUtils.getSize();
    const position = area.position.clone().mul(canvasSize);
    const size = area.size.clone().mul(canvasSize);

    return {
      area,
      position,
      size,
    };
  }

  draw() {
    if (!this.stats) return;

    const keys = this.stats.getKeys();

    if (!this.isSpecefic) this.clear("*");

    for (const key of keys) {
      this.drawStat(key, this.isSpecefic);
    }
  }

  clear(stat: string) {
    if (!this.stats) return;

    const { area, position, size } = this.getArea(stat);

    if (!area || !position || !size) return;

    // Clear area
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(position.x, position.y, size.x, size.y);

    // Draw area borders
    this.ctx.strokeStyle = "white";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(position.x, position.y, size.x, size.y);
  }

  drawStat(stat: string, clear = true) {
    if (!this.stats) return;

    const { area, position, size } = this.getArea(stat);

    if (!area || !position || !size) return;

    const center = this.contextUtils.getCenter(position, size);

    const color = this.statsColor[stat] ?? this.contextUtils.randomColor();
    this.statsColor[stat] = color;

    const history = this.stats.getHistory(stat);
    const hasData = history && history.length > 0;

    if (clear) this.clear(stat);

    // Draw title

    this.ctx.fillStyle = "white";
    this.ctx.font = `${
      16 *
      (this.ctx.canvas.width / 300) *
      Maths.clamp(Math.min(area.size.x, area.size.y), 0.5, 1)
    }px Arial`;

    const title = this.isSpecefic
      ? `${stat} = ${hasData ? history[history.length - 1].toFixed(3) : "-"}`
      : "";
    const titleSize = this.contextUtils.getTextSize(title).size;
    this.ctx.textAlign = "center";
    this.ctx.fillText(title, center.x, position.y + titleSize.y);

    if (hasData) {
      // Draw history
      this.drawHistory(
        stat,
        {
          area,
          position,
          size,
        },
        history
      );
    } else {
      // Draw no data
      this.ctx.fillStyle = "white";
      this.ctx.font = "16px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText("No data", center.x, center.y);
    }
  }

  drawHistory(stat: string, area: StatsAreaGetted, history: number[]) {
    if (!this.stats) return;

    const { position, size } = area;

    if (!position || !size) return;

    const data = this.normalizeData(history, 100);
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;

    const chartSize = size.clone().scale(0.9);
    const sizeDiff = size.clone().sub(chartSize);
    const chartPosition = position.clone().add(sizeDiff.clone().scale(0.5));

    const color = this.statsColor[stat] ?? this.contextUtils.randomColor();
    this.statsColor[stat] = color;

    // Draw grid
    const numbersCount = 10;
    const numbersStep = range / numbersCount;

    this.ctx.strokeStyle = "#555";
    this.ctx.lineWidth = 1;

    for (let i = 0; i <= numbersCount; i++) {
      this.ctx.beginPath();

      this.ctx.moveTo(
        chartPosition.x,
        chartPosition.y + (i * chartSize.y) / numbersCount
      );
      this.ctx.lineTo(
        chartPosition.x + chartSize.x,
        chartPosition.y + (i * chartSize.y) / numbersCount
      );

      this.ctx.stroke();
    }

    // Draw chart
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();

    for (let i = 0; i < data.length; i++) {
      const x = chartPosition.x + (chartSize.x * i) / data.length;
      const y =
        chartPosition.y +
        chartSize.y -
        (chartSize.y * (data[i] - minValue)) / range;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    this.ctx.stroke();

    // Draw chart borders
    this.ctx.strokeStyle = "#999";
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(
      chartPosition.x,
      chartPosition.y,
      chartSize.x,
      chartSize.y
    );

    // Draw chart numbers
    const maxValueString =
      maxValue >= 10 ? maxValue.toFixed(0) : maxValue.toFixed(1);
    const minValueString =
      minValue >= 10 ? minValue.toFixed(0) : minValue.toFixed(1);

    this.ctx.fillStyle = "white";
    this.ctx.font = `${
      9 *
      (this.ctx.canvas.width / 600) *
      Maths.clamp(Math.min(area.size.x, area.size.y), 0.5, 1)
    }px Arial`;

    const maxValueSize = this.contextUtils.getTextSize(maxValueString).size;

    this.ctx.textAlign = "right";
    this.ctx.fillText(
      maxValueString,
      chartPosition.x - 2,
      chartPosition.y + maxValueSize.y,
      sizeDiff.x
    );
    this.ctx.textAlign = "right";
    this.ctx.fillText(
      minValueString,
      chartPosition.x - 2,
      chartPosition.y + chartSize.y,
      sizeDiff.x
    );

    for (let i = 1; i < numbersCount; i++) {
      const number = minValue + (numbersCount - i) * numbersStep;

      const numberString = number >= 10 ? number.toFixed(0) : number.toFixed(1);

      const numberSize = this.contextUtils.getTextSize(numberString).size;

      this.ctx.textAlign = "right";

      this.ctx.fillText(
        numberString,
        chartPosition.x - 2,
        chartPosition.y + (i * chartSize.y) / numbersCount + numberSize.y / 2,
        sizeDiff.x
      );
    }
  }
}
