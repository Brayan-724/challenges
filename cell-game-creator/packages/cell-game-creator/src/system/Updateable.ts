import { GameState } from "./GameState";

export interface Updateable {
  update(state: GameState): void;
}