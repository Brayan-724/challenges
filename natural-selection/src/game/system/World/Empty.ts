import { GameObject, InstanceType } from "!engine";
import { World } from "./World";

export class Empty extends GameObject {
  readonly type = InstanceType.World;

  draw(world: World, ctx: CanvasRenderingContext2D): void {
    this.drawChilds(world, ctx);
  }

  update(world: World, delta: number): void {
    this.updateChilds(world, delta);
  }
}
