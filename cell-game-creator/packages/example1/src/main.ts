import "./style.css";
import {
  GridCanvas,
  Cell,
  Vec2,
  GameState,
  ColorCellSkin,
  EntityManager,
} from "@apika_luca/cell-game-creator";
import {
  Logger,
  LogLevel,
  nextTick,
} from "@apika_luca/cell-game-creator/utils";

Logger.minLogLevel = import.meta.env.PROD ? LogLevel.WARN : LogLevel.DEBUG;

const app = document.querySelector<HTMLDivElement>("#app")!;

const canvas = document.createElement("canvas");
app.appendChild(canvas);

const gridCanvas = new GridCanvas(canvas, {
  yCells: 20,
});

const entityManager = new EntityManager(gridCanvas);
/// @ts-ignore
globalThis.entities = entityManager;

const cells = createCells();

const gameState = new GameState();

nextTick(() => {
  const renderCell = (cell: Cell) => {
    cell.render(gameState);

    if (cell.position.x + 1 >= gridCanvas.options.xCells) {
      cell.position.x = 0;

      if (cell.position.y + 1 >= gridCanvas.options.yCells) {
        cell.position.y = 0;
      } else {
        cell.position.y += 1;
      }
    } else {
      cell.position.x += 1;
    }
  };

  const render = () => {
    gridCanvas.clear();

    cells.forEach(renderCell);

    setTimeout(render, 20);
  };

  render();
});

function createCells() {
  const cells: Cell[] = [];
  const cellsCount = 10;

  for (let i = 0; i < cellsCount; i++) {
    const cell = new Cell(new Vec2(i, 0), new Vec2(1, 1));

    const randomColor = `#${Math.floor(Math.random() * 0x555577 + 0x999988).toString(16)}`;

    cell.setSkin(new ColorCellSkin(randomColor));

    cell.setCanvas(gridCanvas);

    entityManager.add(cell);

    cells.push(cell);
  }

  return cells;
}
