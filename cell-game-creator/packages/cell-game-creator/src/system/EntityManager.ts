// import { QuadTree } from "fast-quadtree-ts";
// import { createLogger } from "src/utils";
// import { GridCanvas, CanvasNames } from "../Canvas";
// import { Entity } from "./Entity";

// type AnyEntity = Entity<CanvasNames>;

// export class EntityManager {
//   static logger = createLogger("EntityManager", {
//     backgroundColor: "#999",
//   });
//   readonly qt: QuadTree<AnyEntity>;
//   readonly entities = new Map<number, AnyEntity>();
//   protected lastId = 0;

//   constructor(gridCanvas: GridCanvas) {
//     this.qt = new QuadTree(
//       {
//         center: { x: 0, y: 0 },
//         size: { x: gridCanvas.options.xCells, y: gridCanvas.options.yCells },
//       },
//       {
//         unitKeyGetter: QuadTree.UniqueUnitAtPositionKeyFunc,
//         // integerCoordinate: true,
//       }
//       // {
//       //   unitKeyGetter: (entity) => `${entity.x} - ${entity.y}`,
//       // }
//     );
//   }

//   add(entity: AnyEntity): number {
//     const id = this.lastId++;

//     this.entities.set(id, entity);
//     entity.id = id;

//     const qt = this.qt.add(entity.position.toObject(), entity);

//     entity.onAttach(this.qt);

//     EntityManager.logger.debug(`Added entity ${entity.id}`);

//     EntityManager.logger.debug(this.qt.size, this.qt);

//     return id;
//   }

//   remove(entity: AnyEntity): void {
//     this.qt.delete(entity.position.toObject());
//     this.entities.delete(entity.id);
//     entity.id = -1;

//     entity.onDettach(this.qt);
//   }

//   getByID(id: number): AnyEntity | undefined {
//     return this.entities.get(id);
//   }

//   getAll(): AnyEntity[] {
//     return Array.from(this.entities.values());
//   }

//   getNear(entity: AnyEntity, radius: number): AnyEntity[] {
//     return this.qt.queryReduce<AnyEntity[]>(
//       {
//         center: entity.position,
//         size: radius,
//         type: "circle",
//       },
//       (acc, { unit }) => acc.concat(unit as Exclude<typeof unit, undefined>),
//       []
//     );
//   }
// }

import { QuadTreeSet, Shape, Vec2 as QuadVec2 } from "fast-quadtree-ts";
import { CanvasNames, GridCanvas } from "../Canvas";
import { Vec2 } from "../base";
import { Entity } from "./Entity";

/**
 * @internal
 */
function QuadTreeUnitKeyGetter(pos: QuadVec2, entity: E | undefined) {
  if (entity) {
    return `${pos.x},${pos.y}:${entity.id}`;
  }

  return `${pos.x},${pos.y}`;
}

/**
 * @internal
 */
function QTPFactory(gridCanvas: GridCanvas) {
  return function QuadTreeUnitPositionGetter(entity: E) {
    return {
      x: entity.position.x, // / gridCanvas.options.xCells,
      y: entity.position.y, // / gridCanvas.options.yCells,
    };
  };
}

export enum EntityNearRadius {
  Large = 0.7,
  Medium = 0.5,
  Small = 0.3,
  XSmall = 0.1,
}

// export interface Entity {
//   readonly id: number;
//   position: Vec2;
//   _setId(id: number): void;
// }

type E = Entity<CanvasNames>;

export class EntityManager {
  protected _tree: QuadTreeSet<E>;

  protected _entityIds: number[] = [];
  protected _entities: { [id: number]: E } = {};
  protected _lastId = -1;

  constructor(gridCanvas: GridCanvas) {
    this._tree = new QuadTreeSet<E>(
      {
        center: { x: 0, y: 0 },
        size: { x: gridCanvas.options.xCells * 4, y: gridCanvas.options.yCells * 4 },
      },
      {
        unitKeyGetter: QuadTreeUnitKeyGetter,
        unitPositionGetter: QTPFactory(gridCanvas),
      }
    );

    console.log(this._tree);
  }

  /**
   * @internal
   */
  getNextId(): number {
    return this._lastId + 1;
  }

  add(entity: E): number {
    const id = this.getNextId();

    entity.id = id;

    this._tree.add(entity);

    this._entityIds.push(id);
    this._entities[id] = entity;
    this._lastId = id;

    entity.onAttach(this._tree);

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
    return this._entityIds
      .map((id) => this._entities[id])
      .filter((a) => Boolean(a)) as E[];
  }

  getNear(
    position: Vec2,
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
