import { SecureFloor } from "./SecureFloor.ts"
import { GDom } from "../../internal/GDom.ts"

export class Floor {
  number: number;
  isLast: boolean = false;

  constructor(n: number) {
    this.number = n;
  }

  getSecureFloor(): SecureFloor {
    return new SecureFloor({
      number: this.number,
      isLast: this.isLast
    });
  }

  calculateIsLast(otherFloors: Floor[]): this {
    this.isLast = this.number === otherFloors.length - 1;
    return this;
  }

  render(): HTMLElement {
    const isFirst = this.number === 0;
    const isLast = this.isLast;

    return GDom({
      classes: "floor",
      childs: [
        {
          classes: "floor-info",
          childs: [
            {
              classes: "floor-num",
              childs: [this.number]
            },
            {
              classes: "floor-buttons",
              childs: {
                structures: ["up", "down"],
                factory: (v: string) => ({
                  classes: [
                    "floor-button", 
                    v, 
                    (isFirst && v === "down") || (isLast && v === "up") 
                      ? "invisible" 
                      : ""
                  ],
                  childs: [
                    {
                      dom: "i",
                      classes: "mat",
                      childs: ["arrow_circle_" + v]
                    }
                  ]
                })
              }
            }
          ]
        },
        {
          classes: "floor-persons-space",
          childs: [
            {
              classes: "floor-persons-counter",
              childs: ["05"]
            }
          ]
        },
        {
          classes: "floor-space"
        }
      ]
    })
  }
}

