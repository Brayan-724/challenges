import { QuadTree, QuadTreeSet } from "fast-quadtree-ts";
import { Vec2 } from "..";
import { CanvasClass, CanvasNames, CanvasType, canvasTypes } from "../Canvas";
import { createLogger, Newable } from "../utils";
import { GameState } from "./GameState";
import { Renderable } from "./Renderable";
import { Updateable } from "./Updateable";

export abstract class Entity<C extends CanvasNames = "used">
  implements Renderable, Updateable
{
  static logger = createLogger("Entity", { backgroundColor: "blue" });

  id = -1;
  canvas!: CanvasType<C>;
  position: Vec2 = new Vec2();
  protected requiredCanvasType: CanvasNames = "any";

  protected requireCanvasType(canvasType: C): void {
    this.requiredCanvasType = canvasType;
  }

  setPosition(position: Vec2): void {
    this.position.x = position.x;
    this.position.y = position.y;
  }

  setCanvas(canvas: CanvasType<C>): void {
    const requiredCanvas = canvasTypes[this.requiredCanvasType]
      .constructor as Newable<CanvasClass>;

    if (
      this.requiredCanvasType !== "any" &&
      requiredCanvas !== canvas.constructor
    ) {
      Entity.logger.warn("Canvas type mismatch for entity", this);

      throw new Error(
        `Entity requires canvas of type ${this.requiredCanvasType}`
      );
    }

    this.canvas = canvas;
  }

  abstract render(state: GameState): void;

  update(state: GameState): void {}

  onAttach(qt: QuadTreeSet<Entity<CanvasNames>>) {
    this.position.listen("both", (_, __, vec, before) => {
      const has = qt.has(this);
      // const hasNow = qt.has(vec);

      if (has) {
        // Entity.logger.debug("Is in quadtree", this.id, has);
        // qt.move(before.toObject(), vec.toObject(), this);
      }

      // @ts-ignore
      let a;
      // const moved = qt.quardTree._move(qt.unitPositionGetter(this), vec, this);
      const moved = qt.delete(this) && qt.add(this);
      if (moved) 
        Entity.logger.debug(
          "Move: ",
          "\n  moved:",
          moved,
          "\n  axis: ",
          __,
          "\n  id:   ",
          this.id,
          "\n  to:   ",
          vec.toString(),
          "\n  from: ",
          before.toString()
        );
    });
  }
  onDettach(qt: QuadTree<Entity<CanvasNames>>) {}
}
