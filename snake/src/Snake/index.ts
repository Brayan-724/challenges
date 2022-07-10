import { Direction, DirectionUtils } from "./Direction";
import { Vector2 } from "../internal/utils/Vector2";
import { SnakePart } from "./SnakePart";
import { SnakeHead } from "./SnakeHead";
import { Color } from "../Render/Color";
import { type Game } from "../internal/Game";
import { type Renderer } from "../Render/Renderer";
import { type Drawable } from "../Render/Renderable";
import { type Updateable } from "../internal/interfaces/Updateable";
import { type Food } from "./Food";

export class Snake implements Drawable, Updateable {
  private head: SnakeHead;
  private parts: SnakePart[] = [];

  constructor(public readonly game: Game, pos: Vector2) {
    this.head = new SnakeHead(game, this.game.grid.constrain(pos));

    //@ts-ignore
    window.snake = this;
  }

  get direction(): Direction {
    return this.head.direction;
  }

  protected set direction(value: Direction) {
    this.head.direction = value;
  }

  get pos(): Vector2 {
    return this.head.pos;
  }

  canChangeDirection(newDirection: Direction): boolean {
    const oldDirection = this.direction;

    if (oldDirection === newDirection) {
      return false;
    }

    const oldDirectionVector = this.head.getDirectionAsVector();

    if (oldDirectionVector.isZero()) return true;

    const newDirectionVector =
      DirectionUtils.transformDirectionAsVector(newDirection);

    if (newDirectionVector.isZero()) return false;

    const diffVector = newDirectionVector.clone().add(oldDirectionVector);

    if (diffVector.isZero()) return false;

    return true;
  }

  goDirection(direction: Direction) {
    if (this.canChangeDirection(direction)) {
      this.direction = direction;
    }
  }

  applyGrayScale() {
    const max = this.parts.length;
    this.parts.forEach((part, index) => {
      part.color = Color.fromGrayScale(index, max);
    });
  }

  addPart() {
    const lastPart = this.parts[0];
    const newPart = new SnakePart(this.game, lastPart ?? this.head);

    newPart.color = Color.random;

    this.parts.unshift(newPart);

    // this.applyGrayScale();
  }

  checkCollision(pos: Vector2): boolean {
    return this.parts.some((part) => part.pos.equals(pos));
  }

  checkFoodCollision(food: Food): boolean {
    return this.head.pos.equals(food.pos);
  }

  checkFoodsCollision(foods: Food[]): Food | undefined {
    return foods.find((food) => this.checkFoodCollision(food));
  }

  update(_delta: number) {
    if (this.game.isGameOver) return;

    if (this.checkCollision(this.pos)) {
      this.game.gameOver();
    }

    const food = this.checkFoodsCollision(this.game.food);

    if (food) {
      this.addPart();
      this.game.removeFood(food);
      this.game.randomFood();
    }

    this.parts.forEach((part) => part.update(_delta));
    this.head.update(_delta);
  }

  draw(renderer: Renderer): void {
    const positions: Vector2[] = [];
    this.parts.forEach((part) => {
      positions.unshift(part.pos);
      part.draw(renderer);
    });
    this.head.draw(renderer);

    // Draw debug line from head to tail

    const ctx = renderer.ctx;

    ctx.beginPath();
    ctx.moveTo(this.head.pos.x + 15, this.head.pos.y + 15);

    positions.forEach((pos) => {
      ctx.lineTo(pos.x + 15, pos.y + 15);
    });

    ctx.strokeStyle = "green";
    ctx.stroke();
  }
}
