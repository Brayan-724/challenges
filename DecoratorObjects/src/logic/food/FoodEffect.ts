import { Base, Newable } from "../extras";

export abstract class FoodEffect<F = any> extends Base<F> {
  static description: string = "";
  onEat(): void {}
  onEatStart(): void {}

  get description(): string {
    return (this.getConstructor() as unknown as typeof FoodEffect).description;
  }
}
