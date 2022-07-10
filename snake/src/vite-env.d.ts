/// <reference types="vite/client" />

import { Game } from "./internal/Game";

declare global {
  interface Window {
    gameInstance: Game;
  }
}
