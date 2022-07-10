import { Vector2 } from "!engine";
import { InstanceType } from "../InstanceType";
import { GameObjectStats } from "./GameObjectStats";
import type { Drawable, Updateable } from "!abstract";
import type {  Entity } from "../EnityManager";

export abstract class GameObject implements Drawable, Updateable, Entity {
  abstract readonly type: InstanceType;

  private _id: number = -1;

  stats = new GameObjectStats();

  protected _parent: GameObject | null = null;
  readonly position: Vector2 = Vector2.zero;
  readonly scale: Vector2 = Vector2.one;

  protected readonly childsIds: number[] = [];
  protected readonly childs: GameObject[] = [];

  get id(): number {
    return this._id;
  }

  protected set id(newId: number) {
    this._id = newId;
  }

  _setId(id: number): void {
    this.id = id;
  }

  get parent(): GameObject | null {
    return this._parent;
  }

  set parent(newParent: GameObject | null) {
    if (this._parent) {
      this._parent.removeChild(this);
    }

    this._parent = newParent;

    if (newParent) {
      this.onAdd();
    } else {
      this.onDestroy();
    }
  }

  getWorldPosition(): Vector2 {
    const position = this.position.clone();

    if (this.parent) {
      position.add(this.parent.getWorldPosition());
    }

    return position.mul(this.getWorldScale());
  }

  getWorldScale(): Vector2 {
    const scale = this.scale.clone();

    if (this.parent) {
      scale.mul(this.parent.getWorldScale());
    }

    return scale;
  }

  addChild(child: GameObject): this {
    this.childs.push(child);
    child.parent = this;

    return this;
  }

  removeChild(child: GameObject): this {
    const index = this.childs.indexOf(child);

    if (index !== -1) {
      this.childs.splice(index, 1);
      child.parent = null;
    }

    return this;
  }

  getAllChilds(): GameObject[] {
    return this.childs.flatMap((child) => [child, ...child.getAllChilds()]);
  }

  drawChilds(...args: Parameters<Drawable["draw"]>): this {
    for (const child of this.childs) {
      child.draw(...args);
    }

    return this;
  }

  updateChilds(...args: Parameters<Updateable["update"]>): this {
    for (const child of this.childs) {
      child.update(...args);
    }

    return this;
  }

  onAdd() {}
  onDestroy() {}
  abstract draw(...args: Parameters<Drawable["draw"]>): void;
  abstract update(...args: Parameters<Updateable["update"]>): void;
}
