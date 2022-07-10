import { FoodEffect } from "./FoodEffect";
import { Newable, Base } from "../extras/";

export abstract class Food<F = any> extends Base<F extends Food ? F : Food> {
  private effects: FoodEffect[] = [];
  abstract eatTime: number;

  abstract eat(): void;

  /**
   * Add effect to the food using a reference of instance.
   */
  protected addEffect(effect: FoodEffect): void;
  /**
   * Add effect to the food using a generated reference and return it.
   */
  protected addEffect<T extends FoodEffect>(effect: Newable<T, []>): T;
  protected addEffect<T extends FoodEffect = FoodEffect>(
    effect: FoodEffect | Newable<T, []>
  ): void | T;
  protected addEffect<T extends FoodEffect = FoodEffect>(
    effect: FoodEffect | Newable<T, []>
  ): void | T {
    if (effect instanceof FoodEffect) {
      if (!this.effects.includes(effect)) {
        this.effects.push(effect);
      }
    } else {
      const instancedEffect = new effect();
      this.addEffect(instancedEffect);
      return instancedEffect;
    }
  }

  /**
   * Remove effect to the food using a reference of instance.
   */
  protected remEffect(effect: FoodEffect): void;
  /**
   * Remove effect to the food using the class type.
   */
  protected remEffect<T extends FoodEffect>(effect: Newable<T, []>): T;
  protected remEffect<T extends FoodEffect = FoodEffect>(
    effect: FoodEffect | Newable<T, []>
  ): void;
  protected remEffect<T extends FoodEffect = FoodEffect>(
    effect: FoodEffect | Newable<T, []>
  ): void {
    if (effect instanceof FoodEffect) {
      const index = this.effects.indexOf(effect);

      if (index === -1) return;

      this.effects.splice(index, 1);
      return;
    }

    const triedEffect = this.getEffect(effect);

    if (triedEffect === null) return;

    this.remEffect(triedEffect);
  }

  hasEffect<T extends FoodEffect>(effect: T | Newable<T, []>): boolean {
    return Boolean(this.getEffect(effect));
  }

  getEffect<T extends FoodEffect>(effect: T): T | null;
  getEffect<T extends FoodEffect>(effect: Newable<T, []>): T | null;
  getEffect<T extends FoodEffect>(effect: T | Newable<T, []>): T | null;
  getEffect<T extends FoodEffect>(effect: T | Newable<T, []>): T | null {
    if (effect instanceof FoodEffect) {
      return (this.effects.find((e) => e === effect) as T) ?? null;
    }

    return (this.effects.find((e) => e instanceof effect) as T) ?? null;
  }

  getEffects(): FoodEffect[] {
    return [...this.effects];
  }

  getEffectsNames(): string[] {
    return this.effects.map((e) => e.getConstructor().name);
  }
}
