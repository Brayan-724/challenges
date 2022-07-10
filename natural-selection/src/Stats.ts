export class Stats {
  static instance: Stats;

  private stats: { [key: string]: number } = {};
  private historyStats: { [key: string]: number[] } = {};
  private statColor: { [key: string]: string } = {};

  constructor(private readonly ctx: CanvasRenderingContext2D) {
    Stats.instance = this;
    //@ts-ignore
    window.stats = this;
  }

  randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  add(key: string) {
    this.stats[key] = (this.stats[key] || 0) + 1;

    if (this.historyStats[key] === undefined) {
      this.historyStats[key] = [];
    }

    this.historyStats[key].push(this.stats[key]);
    this.drawGraph(this.ctx);
  }

  sub(key: string) {
    this.stats[key] = (this.stats[key] || 0) - 1;

    if (this.historyStats[key] === undefined) {
      this.historyStats[key] = [];
    }

    this.historyStats[key].push(this.stats[key]);

    this.drawGraph(this.ctx);
  }

  drawGraph(ctx: CanvasRenderingContext2D) {
    const keys = Object.keys(this.historyStats);

    if (keys.length === 0) {
      return;
    }

    const maxByStat = keys.map((key) => Math.max(...this.historyStats[key]));

    const maxHistories = Math.max(
      ...keys.map((key) => this.historyStats[key].length)
    );

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "black";

    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "white";

    ctx.font = "20px Arial";

    ctx.fillText(
      `${keys.join(", ")}`,
      ctx.canvas.width / 2 - ctx.measureText(`${keys.join(", ")}`).width / 2,
      20
    );

    for (const key of keys) {
      const history = this.historyStats[key];
      const max = maxByStat[keys.indexOf(key)];

      ctx.beginPath();

      const color = this.statColor[key] || this.randomColor();

      this.statColor[key] = color;

      ctx.strokeStyle = color;

      ctx.moveTo(0, ctx.canvas.height - (history[0] / max) * ctx.canvas.height);

      for (let i = 1; i < maxHistories; i++) {
        ctx.lineTo(
          (i * ctx.canvas.width) / maxHistories,
          ctx.canvas.height - (history[i] / max) * ctx.canvas.height
        );
      }

      ctx.stroke();
    }
  }
}
