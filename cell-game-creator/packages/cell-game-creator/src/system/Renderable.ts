import { GameState } from "./GameState";

export interface Renderable {
  render(state: GameState): void;
}