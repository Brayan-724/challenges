import { Stats } from "./Stats";

export type StatsHistoryList = {
  [key: string]: number[];
};

export class StatsHistory extends Stats {
  protected history: StatsHistoryList = {};

  override set(stat: string, value: number): void {
    this.stats[stat] = value;
    
    if (!this.history[stat]) {
      this.history[stat] = [];
    }

    this.history[stat].push(value);

    if (this.statKeys.indexOf(stat) === -1) {
      this.statKeys.push(stat);
    }

    this.fireEvent(stat);
  }

  getHistory(): StatsHistoryList;
  getHistory(stat: string): number[];
  getHistory(stat?: string): StatsHistoryList | number[] {
    if (stat) {
      return this.history[stat];
    }

    return this.history;
  }
}
