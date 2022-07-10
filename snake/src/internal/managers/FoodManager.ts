import { Food } from "../../Snake/Food";
import { type Drawable } from "../../Render/Renderable";
import { type Game } from "../Game";
import { type Logger } from "../Logger";
import { type Startable } from "../interfaces/Startable";
import { type Updateable } from "../interfaces/Updateable";
import { Renderer } from "../../Render/Renderer";

export class FoodManager implements Startable, Updateable, Drawable {
  logger: Logger;

  private food: Food[] = [];

  private _isStarted: boolean = false;

  constructor(readonly game: Game) {
    this.logger = game.logger.register("[FoodManager] ");
  }

  get isStarted(): boolean {
    return this._isStarted;
  }

  start(): void {
    if (this._isStarted) {
      this.logger.warn("FoodManager is already started. Restarting...");
      this.stop();
    }

    this.food = [];
    this._isStarted = true;
  }

  stop(): void {
    this.food = [];
    this._isStarted = false;
    this.logger.debug("Stopped.");
  }

  update(): void {
    if (!this._isStarted) {
      return;
    }

    this.food.forEach((_food) => {
      // food.update();
    });
  }

  draw(renderer: Renderer): void {
    if (!this._isStarted) {
      return;
    }

    this.food.forEach((food) => {
      food.draw(renderer);
    });
  }
}
