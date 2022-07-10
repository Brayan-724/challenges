import { Hunger } from "..";
import { Food } from "../Food"; 

export class Meat extends Food<Meat> {
  
  constructor() {
    super();

    this.addEffect(new Hunger());
  }

  eatTime = 5000;

  eat() {
    console.log("Apple eated");
  }
}
