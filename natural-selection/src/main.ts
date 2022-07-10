import { Vector2 } from "!engine";
import { Agent, KillZone, Spawner, Food, World, StatsGraph } from "!game";
import { HotReloader } from "./hot";

import "./style.css";

const hotReloader = new HotReloader();

hotReloader.cleanup();

const canvasStats = document.getElementById("stats") as HTMLCanvasElement;
const ctxStats = canvasStats.getContext("2d")!;

canvasStats.width = parseFloat(window.getComputedStyle(canvasStats).width);
canvasStats.height = canvasStats.width / 2;

const stats = new StatsGraph(ctxStats, {
  count: {
    position: new Vector2(0, 0),
    size: new Vector2(0.5, 0.5),
  },
  speed: {
    position: new Vector2(0.5, 0),
    size: new Vector2(0.5, 0.5),
  },
  focus: {
    position: new Vector2(0, 0.5),
    size: new Vector2(0.5, 0.5),
  },
});

stats.attach(Agent.stats);

const world = new World();
const killZone = new KillZone(new Vector2(0, 0), new Vector2(100, 100));

const spawnerFood = new Spawner((position: Vector2) => {
  const food = new Food();
  food.position.set(position);

  return food;
});

const spawnerAgent = new Spawner((position: Vector2) => {
  const agent = new Agent();
  agent.position.set(position);

  return agent;
});

world.addChild(killZone);
world.addChild(spawnerFood);
world.addChild(spawnerAgent);

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;


canvas.width = parseFloat(window.getComputedStyle(canvas).width);
canvas.height = canvas.width / 2;

hotReloader.start("world", world, [ctx]);
