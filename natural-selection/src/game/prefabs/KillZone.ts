import { GameObject, InstanceType, Vector2 } from "!engine";
import { type World } from "!system";

export class KillZone extends GameObject {
  readonly type = InstanceType.KillZone;

  size: Vector2 = Vector2.one;

  constructor(position: Vector2, size: Vector2) {
    super();

    this.position.set(position.x, position.y);
    this.size.set(size.x, size.y);
  }

  checkCollisionPoint(point: Vector2): boolean {
    const position = this.getWorldPosition();
    const scale = this.getWorldScale();

    const size = this.size.mul(scale);

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

  draw(_world: World, ctx: CanvasRenderingContext2D) {
    const position = this.getWorldPosition();
    const scale = this.getWorldScale();

    ctx.save();

    ctx.translate(position.x, position.y);
    ctx.scale(scale.x, scale.y);

    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, this.size.x, this.size.y);

    ctx.restore();

    this.drawChilds(_world, ctx);
  }

  update(world: World, delta: number) {
    this.updateChilds(world, delta);

    const allChilds = world.getAllChilds();

    for (let i = 0; i < allChilds.length; i++) {
      const other = allChilds[i];

      if (other.type !== InstanceType.Agent) continue;

      if (!this.checkCollision(other)) continue;

      other.parent?.removeChild(other);
    }
  }
}
