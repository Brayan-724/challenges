import { Hunger } from "..";
import { Food } from "../Food"; 

export class Apple extends Food<Apple> {
  
  constructor() {
    super();

    this.addEffect(new Hunger());
  }

  eatTime = 1000;

  eat() {
    console.log("Apple eated");
  }
}
