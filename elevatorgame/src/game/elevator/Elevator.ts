import { GDom } from "../../internal/GDom.ts";

export class Elevator {
  protected _floorNumPercent: number = 0;

  floorsCount: number = 1;

  constructor(public readonly id: number) {

  }

  getAbsolutePosition() {
    const elevatorSize = 52;
    const gap = 5;
    const floorSize = 64;
    const worldSize = floorSize * this.floorsCount;

    const yPos = worldSize * this._floorNumPercent;
    const xPos = ( elevatorSize + gap ) * this.id + gap;

    return [xPos, yPos];
  }


  get floorNum() {
    return Math.round(this._floorNumPercent * this.floorsCount);
  }

  render() {
    const [ xPos, yPos ] = this.getAbsolutePosition();

    return GDom({
      classes: ["elevator"],
      attr: {
        "style": `top: ${yPos}px; left: ${xPos}px;`
      },
      childs: []
    })
  }

  static getElevatorX(floor: Floor): number {
    const rendered = floor.render();

    const simDiv = document.createElement('div');
    simDiv.style.opacity = "0";

    simDiv.append(rendered);

    document.body.append(simDiv);

    const infoZone = rendered.querySelector(".floor-info");
    const infoWidth = parseFloat(window.getComputedStyle(infoZone).width);

    const personsZone = rendered.querySelector(".floor-persons-space");
    const personsWidth = parseFloat(window.getComputedStyle(personsZone).width);

    //document.body.removeChild(simDiv);

    console.log(infoWidth, personsWidth)

    return infoWidth + personsWidth;
  }
}

// calc(60px * 0 + 60.84px + 125.25px + 5px)
