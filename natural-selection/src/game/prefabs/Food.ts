import { GameObject, InstanceType, Vector2 } from "!engine";
import { type World } from "!system";
import { Agent } from "./Agent";

export class Food extends GameObject {
  type = InstanceType.Food;

  checkCollisionPoint(point: Vector2): boolean {
    const position = this.getWorldPosition();
    const scale = this.getWorldScale();

    const size = new Vector2(10, 10).mul(scale);

    const AA = new Vector2(position.x, position.y);
    const BB = new Vector2(position.x + size.x, position.y + size.y);

    if (
      AA.x <= point.x &&
      point.x <= BB.x &&
      AA.y <= point.y &&
      point.y <= BB.y
    ) {
      return true;
    }

    return false;
  }

  checkCollision(other: GameObject): boolean {
    const position = other.getWorldPosition();

    const scale = other.getWorldScale();

    const size = new Vector2(10, 10).mul(scale);

    const AA = new Vector2(position.x, position.y);
    const BA = new Vector2(position.x + size.x, position.y);
    const AB = new Vector2(position.x, position.y + size.y);
    const BB = new Vector2(position.x + size.x, position.y + size.y);

    if (
      this.checkCollisionPoint(AA) ||
      this.checkCollisionPoint(BA) ||
      this.checkCollisionPoint(AB) ||
      this.checkCollisionPoint(BB)
    ) {
      return true;
    }

    return false;
  }

  draw(world: World, ctx: CanvasRenderingContext2D): void {
    this.drawChilds(world, ctx);

    const position = this.getWorldPosition();
    const scale = this.getWorldScale();

    ctx.save();

    ctx.translate(position.x, position.y);
    ctx.scale(scale.x, scale.y);

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 10, 10);

    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, 10, 10);

    ctx.restore();
  }

  update(world: World, delta: number): void {
    this.updateChilds(world, delta);

    const allChilds = world.getAllChilds();

    for (let i = 0; i < allChilds.length; i++) {
      const other = allChilds[i] as Agent;

      if (other.type !== InstanceType.Agent) continue;

      const collision = this.checkCollision(other);

      if (!collision) continue;

      this.parent?.removeChild(this);
      other.timeWithoutFood = 0;

      const newChildAgent = new Agent();
      newChildAgent.speed =
        Math.random() + 0.5 + other.speed * (Math.random() - 0.2);
      newChildAgent.position.set(
        this.position.x + Math.random() * 2 - 1,
        this.position.y + Math.random() * 2 - 1
      );

      world.addChild(newChildAgent);

      break;
    }
  }
}
