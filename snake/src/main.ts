import { Config } from "./internal/Config";
import { Game } from "./internal/Game";
import "./style.css";

const config = new Config({
  snakeSize: 30,
  snakeSpeed: 15,
  snakeColor: "#FFFFFF",
  snakeHeadColor: "#FF0000",

  foodSize: 10,
  foodColor: "#00FF00",
});

const game = new Game(config);

game.cleanup();

game.start();
