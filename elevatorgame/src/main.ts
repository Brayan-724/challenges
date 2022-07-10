import "./styles/index.ts"
import { Floor, Elevator } from "./game/index.ts"

const floors = Array(5).fill(0).map((_, i) => {
  return new Floor(i);
});

floors.forEach(floor => floor.calculateIsLast(floors))

const renderedFloors = floors.map(floor => floor.render())

const floorsDiv = document.getElementById("floors");

renderedFloors.forEach(renderedFloor => {
  floorsDiv.append(renderedFloor)
});

const elevator = new Elevator(0);

elevator.floorsCount = floors.length;

const elevatorsDiv = document.getElementById("elevators");

const elevatorX = Elevator.getElevatorX(floors[0]);

elevatorsDiv.style.left = elevatorX + "px";

elevatorsDiv.append(elevator.render())
