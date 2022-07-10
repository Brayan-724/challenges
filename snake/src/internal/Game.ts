import { Config } from "./Config";
import { Direction } from "../Snake/Direction";
import { Food } from "../Snake/Food";
import { Grid } from "../Render/Grid";
import { Keyboard } from "./Keyboard";
import { Color } from "../Render/Color";
import { Renderer } from "../Render/Renderer";
import { Snake } from "../Snake";
import { Utils } from "./utils/Utils";
import { Vector2 } from "./utils/Vector2";
import Screen from "./Screen";
import { Logger, LogLevel } from "./Logger";
import { type Drawable } from "../Render/Renderable";

export class Game implements Drawable {
  static instance: Game;
  snake: Snake;
  timer: number | undefined;
  canvas: HTMLCanvasElement;
  renderer: Renderer;
  grid: Grid;
  keyboard: Keyboard;
  screen: Screen;

  isStarted: boolean = false;
  isGameOver: boolean = false;

  food: Food[] = [];

  logger = new Logger(LogLevel.Debug);
  gameLogger = this.logger.register("[Game] ");

  constructor(public readonly config: Config) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    document.body.appendChild(this.canvas);

    this.screen = new Screen(this);
    this.keyboard = new Keyboard();
    this.grid = new Grid(
      new Vector2(this.config.snakeSize, this.config.snakeSize)
    );
    this.renderer = new Renderer(config, this.canvas);
    this.snake = new Snake(
      this,
      new Vector2(this.canvas.width / 2, this.canvas.height / 2)
    );

    this.randomFood();
  }

  cleanup() {
    if (window.gameInstance) {
      window.gameInstance.stop();
    }
  }

  removeFood(food: Food) {
    this.food = this.food.filter((f) => f !== food);
  }

  randomFood() {
    this.food.push(
      new Food(
        this,
        new Vector2(
          Utils.getRandomInt(1, this.canvas.width),
          Utils.getRandomInt(1, this.canvas.height)
        )
      )
    );
  }

  start() {
    this.gameLogger.debug("Starting");

    window.gameInstance = this;
    Game.instance = this;

    this.keyboard.start();
    this.screen.start();

    let lastTime = Date.now();
    let speedTimeCounter = 0;

    let canChangeDirection = true;

    this.timer = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTime;
      lastTime = now;
      speedTimeCounter += delta;

      if (this.isStarted && !this.isGameOver) {
        if (speedTimeCounter > 1000 / this.config.snakeSpeed) {
          speedTimeCounter = 0;
          this.snake.update(1);

          this.draw(this.renderer);

          canChangeDirection = true;
        }
      } else {
        this.draw(this.renderer);

        if (this.isGameOver) {
          const textPos = new Vector2(
            this.canvas.width / 2,
            this.canvas.height / 2
          );
          const textColor = Color.from("#F00");
          this.renderer.ctx.font = "bold 50px Arial";
          this.renderer.ctx.fillStyle = textColor.toStringHex();
          const textInfo = this.renderer.ctx.measureText("Game Over");

          this.renderer.ctx.fillText(
            "Game Over",
            textPos.x - textInfo.width / 2,
            textPos.y
          );
        }
      }
    }, 1000 / 60);

    this.keyboard.on(
      ["ArrowUp", "w", "W"],
      this.keyPressedHandler(Direction.Up, () => canChangeDirection).bind(this)
    );
    this.keyboard.on(
      ["ArrowDown", "s", "S"],
      this.keyPressedHandler(Direction.Down, () => canChangeDirection).bind(
        this
      )
    );
    this.keyboard.on(
      ["ArrowLeft", "a", "A"],
      this.keyPressedHandler(Direction.Left, () => canChangeDirection).bind(
        this
      )
    );
    this.keyboard.on(
      ["ArrowRight", "d", "D"],
      this.keyPressedHandler(Direction.Right, () => canChangeDirection).bind(
        this
      )
    );
  }

  draw(renderer: Renderer): void {
    renderer.clear();
    this.grid.draw(renderer);
    this.snake.draw(renderer);
    this.food.forEach((food) => food.draw(renderer));
  }

  keyPressedHandler(direction: Direction, canChangeDirection: () => boolean) {
    return () => {
      if (this.isStarted && !this.isGameOver && canChangeDirection()) {
        this.snake.goDirection(direction);
      }

      if (!this.isStarted || this.isGameOver) {
        this.isStarted = true;
        this.snake.goDirection(direction);
      }
    };
  }

  gameOver() {
    this.isGameOver = true;
  }

  stop() {
    this.gameLogger.debug("Stopping");

    this.keyboard.stop();
    this.screen.stop();

    clearInterval(this.timer);
  }

  getInstance() {
    return Game.instance;
  }
}
