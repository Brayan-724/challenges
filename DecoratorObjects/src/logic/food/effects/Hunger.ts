import { FoodEffect } from "../FoodEffect";

export class Hunger extends FoodEffect<Hunger> {
  static description: string = "Apply Hunger to the player";
}
