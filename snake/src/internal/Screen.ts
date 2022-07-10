import { type Game } from "./Game";
import { type Startable } from "./interfaces/Startable";

export default class Screen implements Startable {
  private _isStarted = false;
  private _isResizingTimer: number = 0;

  constructor(public readonly game: Game) {}

  resizeHandler() {
    if (this._isResizingTimer) {
      clearTimeout(this._isResizingTimer);
    }

    this._isResizingTimer = setTimeout(() => {
      this.game.canvas.width = window.innerWidth;
      this.game.canvas.height = window.innerHeight;
    }, 250);
  }

  get isStarted(): boolean {
    return this._isStarted;
  }

  start(): void {
    if (this._isStarted) {
      console.info("[Screen] Restarting...");
      this.stop();
    }

    window.addEventListener("resize", this.resizeHandler.bind(this));
    this._isStarted = true;
    console.info("[Screen] Started");
  }

  stop(): void {
    window.removeEventListener("resize", this.resizeHandler.bind(this));
    this._isStarted = false;
    console.info("[Screen] Stoped");
  }
}
