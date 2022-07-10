import { Base } from "./extras";
import { FoodEffect } from "./food";

export abstract class Entity<T = any> extends Base<T> {
  abstract maxHealth: number;
  abstract maxBlood: number;
  abstract maxStamina: number;
  abstract maxHunger: number;

  protected effects: Array<FoodEffect> = [];

  constructor() {
    super();
  }
}
