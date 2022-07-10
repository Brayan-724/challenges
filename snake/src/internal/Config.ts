import { ColorLike } from "../Render/Color";

export interface ConfigOptions {
  snakeSize: number;
  snakeSpeed: number;
  snakeColor: ColorLike;
  snakeHeadColor: ColorLike;

  foodSize: number;
  foodColor: ColorLike;
}

export class Config implements ConfigOptions {
  readonly snakeSize: number;
  readonly snakeSpeed: number;
  readonly snakeColor: ColorLike;
  readonly snakeHeadColor: ColorLike;

  readonly foodSize: number;
  readonly foodColor: ColorLike;

  constructor(options: ConfigOptions) {
    this.snakeSize = options.snakeSize;
    this.snakeSpeed = options.snakeSpeed;
    this.snakeColor = options.snakeColor;
    this.snakeHeadColor = options.snakeHeadColor;

    this.foodSize = options.foodSize;
    this.foodColor = options.foodColor;
  }
}
