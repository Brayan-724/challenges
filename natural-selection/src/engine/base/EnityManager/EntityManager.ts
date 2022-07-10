import { QuadTreeSet, Shape, Vec2 } from "fast-quadtree-ts";
import { Vector2 } from "!engine";
import { InstanceType } from "../InstanceType";

/**
 * @internal
 */
function QuadTreeUnitKeyGetter(pos: Vec2, entity: Entity | undefined) {
  if (entity) {
    return `${pos.x},${pos.y}:${entity.id}`;
  }

  return `${pos.x},${pos.y}`;
}

/**
 * @internal
 */
function QuadTreeUnitPositionGetter(entity: Entity) {
  return {
    x: entity.position.x,
    y: entity.position.y,
  };
}

export enum EntityNearRadius {
  Large = 0.7,
  Medium = 0.5,
  Small = 0.3,
  XSmall = 0.1,
}

export interface Entity {
  readonly id: number;
  readonly type: InstanceType;
  position: Vector2;

  _setId(id: number): void;
}

export class EntityManager<E extends Entity> {
  protected _tree: QuadTreeSet<E> = new QuadTreeSet<E>(
    {
      center: { x: 0, y: 0 },
      size: { x: 1, y: 1 },
    },
    {
      unitKeyGetter: QuadTreeUnitKeyGetter,
      unitPositionGetter: QuadTreeUnitPositionGetter,
    }
  );

  protected _entityIds: number[] = [];
  protected _entities: { [id: number]: E } = {};
  protected _lastId = -1;

  /**
   * @internal
   */
  getNextId(): number {
    return this._lastId + 1;
  }

  add(entity: E): number {
    const id = this.getNextId();

    entity._setId(id);

    this._tree.add(entity);

    this._entityIds.push(id);
    this._entities[id] = entity;
    this._lastId = id;

    return id;
  }

  remove(entity: E): this {
    const id = entity.id;

    this._tree.delete(entity);

    const index = this._entityIds.indexOf(id);

    if (index !== -1) {
      this._entityIds.splice(index, 1);
      delete this._entities[id];
    }

    return this;
  }

  has(id: number): boolean {
    return this._entityIds.indexOf(id) !== -1;
  }

  get(id: number): E | undefined {
    if (!this.has(id)) {
      return undefined;
    }

    return this._entities[id];
  }

  getAll(): E[] {
    return this._entityIds.map((id) => this._entities[id]);
  }

  getNear(
    position: Vector2,
    radius: number | EntityNearRadius = EntityNearRadius.Small
  ): E[] {
    const shape: Shape = {
      center: { x: position.x, y: position.y },
      size: radius,
      type: "circle",
    };

    return this._tree.queryMap(shape, ({ unit }: { unit: E }) => unit);
  }

  getByIds(ids: number[]): E[] {
    return ids.map((id) => this.get(id)).filter((entity) => !!entity) as E[];
  }

  *getByIdsIterable(ids: number[]): Generator<[id: number, entity: E]> {
    for (const id of ids) {
      const entity = this.get(id);

      if (entity) {
        yield [id, entity];
      }
    }
  }
}
