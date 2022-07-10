import type { World } from "!game";

export interface Updateable {
  update(world: World, delta: number): void;
}
