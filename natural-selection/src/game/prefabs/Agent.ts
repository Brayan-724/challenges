import { GameObject, GameObjectStats, InstanceType, Vector2 } from "!engine";
import type { World } from "!system";

export class Agent extends GameObject {
  readonly type = InstanceType.Agent;

  static stats = new GameObjectStats();
  static instances: Agent[] = [];

  private _speed: number = 0;
  private _focus: number = 0;

  timeWithoutFood = 0;

  get speed() {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
    this.stats.set("speed", value);
  }

  get focus() {
    return this._focus;
  }

  set focus(value: number) {
    this._focus = value;
    this.stats.set("focus", value);
  }

  constructor() {
    super();

    Agent.stats.add("count");
    Agent.instances.push(this);
    this.stats.on(this._statHandler.bind(this));

    this.speed = Math.random() + 10;
    this.focus = Math.random() * 3 + 2;
  }

  getMostCloseFood(world: World): GameObject | null {
    const position = this.getWorldPosition();

    const foods = world
      .getAllChilds()
      .filter((child) => child.type === InstanceType.Food);

    let closestFood: GameObject | null = null;

    let closestDistance = Number.MAX_VALUE;

    for (const food of foods) {
      const distance = position.distance(food.getWorldPosition());

      if (distance < closestDistance) {
        closestFood = food;
        closestDistance = distance;
      }
    }

    return closestFood;
  }

  protected _getPromediate(values: number[]): number {
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  protected _statHandler(stat: string, _value: number) {
    const instancesStat = Agent.instances.map((instance) =>
      instance.stats.get(stat)
    );

    const promediate = this._getPromediate(instancesStat);

    Agent.stats.set(stat, promediate);
  }

  override onAdd() {}

  override onDestroy() {
    Agent.stats.sub("count");
    const idx = Agent.instances.indexOf(this);
    Agent.instances.splice(idx, 1);

    this.stats.off(this._statHandler.bind(this));
  }

  draw(_world: World, ctx: CanvasRenderingContext2D) {
    this.drawChilds(_world, ctx);

    const position = this.getWorldPosition();
    const scale = this.getWorldScale();

    ctx.save();

    ctx.translate(position.x, position.y);
    ctx.scale(scale.x, scale.y);

    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 10, 10);

    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, 10, 10);

    ctx.restore();
  }

  update(world: World, delta: number) {
    this.updateChilds(world, delta);

    this.timeWithoutFood += delta;

    const position = this.getWorldPosition();

    if (position.x < 0) {
      this.parent?.removeChild(this);
      return;
    }

    if (position.x > world.width) {
      this.parent?.removeChild(this);
      return;
    }

    if (position.y < 0) {
      this.parent?.removeChild(this);
      return;
    }

    if (position.y > world.height) {
      this.parent?.removeChild(this);
      return;
    }

    if (this.timeWithoutFood > 3000) {
      this.parent?.removeChild(this);
      return;
    }

    const closestFood = this.getMostCloseFood(world);

    const target = closestFood?.getWorldPosition() ?? null;

    if (target) {
      const direction = target.sub(position);

      const halfFocus = this.focus / 2;
      const patchedFocus = this.focus * 2;

      const totalRandomPosition = new Vector2(
        (Math.random() * 2) / patchedFocus - 1 / patchedFocus,
        (Math.random() * 2) / patchedFocus - 1 / patchedFocus
      );

      const directionRandomPosition = new Vector2(
        direction.x * (Math.random() * this.focus - halfFocus * 0.75),
        direction.y * (Math.random() * this.focus - halfFocus * 0.75)
      );

      const randomPosition = totalRandomPosition
        .add(directionRandomPosition)
        .normalize();

      const randomWithDelta = randomPosition.scale(delta / 20);
      const randomWithDeltaAndSpeed = randomWithDelta.scale(this.speed);

      this.position.add(randomWithDeltaAndSpeed);

      return;
    }

    const randomPosition = new Vector2(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    );

    const randomWithDelta = randomPosition.scale(delta / 20);
    const randomWithDeltaAndSpeed = randomWithDelta.scale(this.speed);

    this.position.add(randomWithDeltaAndSpeed);
  }
}
