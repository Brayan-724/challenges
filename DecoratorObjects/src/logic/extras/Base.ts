import { Clonable } from "./Clonable";
import { Newable } from "./Newable";

export class Base<C = any> implements Clonable<C> {
  constructor() {}

  getConstructor(): Newable<C> {
    return this.constructor as Newable<C>;
  }

  clone(): C {
    return new (this.getConstructor())();
  }

  protected _super_base_clone: typeof Base["prototype"]["clone"] = Base.prototype.clone.bind(this);
  protected _super_base_getConstructor: typeof Base["prototype"]["getConstructor"] = Base.prototype.getConstructor.bind(this);
}
