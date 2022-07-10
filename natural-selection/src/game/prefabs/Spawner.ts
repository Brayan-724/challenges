import { GameObject, InstanceType, Vector2 } from "!engine";
import type { World } from "!system";

export class Spawner extends GameObject {
  readonly type = InstanceType.Spawner;

  time: number = 0;
  threadhold: number = 500;

  constructor(private readonly factory: (position: Vector2) => GameObject) {
    super();
  }

  draw() {}

  update(world: World, delta: number) {
    this.time += delta;

    if (this.time > this.threadhold) {
      this.time = 0;

      const position = new Vector2(
        Math.random() * world.width,
        Math.random() * world.height
      );

      const agent = this.factory(position);

      if (agent.type === InstanceType.Food) {
        this.time = 250;
      }

      world.addChild(agent);
    }
  }
}
