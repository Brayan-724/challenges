import { Utils } from "../internal/utils/Utils";
import { Vector2 } from "../internal/utils/Vector2";

export enum Direction {
  None,
  Up,
  Down,
  Left,
  Right,
}

export class DirectionUtils {
  static transformDirectionAsVector(direction: Direction): Vector2 {
    switch (direction) {
      case Direction.Up:
        return Vector2.y.negate();
      case Direction.Down:
        return Vector2.y;
      case Direction.Left:
        return Vector2.x.negate();
      case Direction.Right:
        return Vector2.x;
      default:
        return Vector2.zero;
    }
  }

  static transformVectorAsDirection(vector: Vector2): Direction {
    if (vector.equals(Vector2.y)) {
      return Direction.Up;
    }

    if (vector.equals(Vector2.y.negate())) {
      return Direction.Down;
    }

    if (vector.equals(Vector2.x)) {
      return Direction.Right;
    }

    if (vector.equals(Vector2.x.negate())) {
      return Direction.Left;
    }

    return Direction.None;
  }

  static getOppositeDirection(direction: Direction): Direction {
    switch (direction) {
      case Direction.Up:
        return Direction.Down;
      case Direction.Down:
        return Direction.Up;
      case Direction.Left:
        return Direction.Right;
      case Direction.Right:
        return Direction.Left;
      default:
        return Direction.None;
    }
  }

  static randomDirection(): Direction {
    const random = Utils.getRandomInt(Direction.Up, Direction.Right);

    return random;
  }
}
