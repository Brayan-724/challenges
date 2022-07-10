export type StatsList = {
  [key: string]: number;
};

export type StatsEventList = {
  [key: string]: StatCallback[];
};

export type StatCallback = (stat: string, value: number) => void;

export abstract class Stats {
  protected stats: StatsList = {};
  protected events: StatsEventList = {};
  protected statKeys: string[] = [];

  /**
   * Call the `stat` callback and call all stats callbacks
   * @param stat Stat to fire
   */
  protected fireEvent(stat: string): void {
    const value = this.stats[stat] ?? 0;

    if (this.events[stat] !== undefined) {
      this.events[stat].forEach((callback) => callback(stat, value));
    }

    if (this.events["*"] !== undefined) {
      this.events["*"].forEach((callback) => callback(stat, value));
    }
  }

  /**
   *
   * @param stat Target stat
   * @param value Value to add
   */
  add(stat: string, value: number = 1): void {
    this.set(stat, this.get(stat) + value);

    this.fireEvent(stat);
  }

  sub(stat: string, value: number = 1): void {
    this.set(stat, this.get(stat) - value);

    this.fireEvent(stat);
  }

  get(stat: string): number {
    return this.stats[stat] ?? 0;
  }

  getKeys(): string[] {
    return this.statKeys;
  }

  set(stat: string, value: number): void {
    this.stats[stat] = value;

    if (this.statKeys.indexOf(stat) === -1) {
      this.statKeys.push(stat);
    }

    this.fireEvent(stat);
  }

  remove(stat: string): void {
    if (this.stats[stat] === undefined) {
      return;
    }

    delete this.stats[stat];

    const index = this.statKeys.indexOf(stat);

    if (index !== -1) {
      this.statKeys.splice(index, 1);
    }
  }

  has(stat: string): boolean {
    return this.stats[stat] !== undefined;
  }

  on(callback: StatCallback): void;
  on(stat: string, callback: StatCallback): void;
  on(
    statOrCallback: string | StatCallback,
    maybeCallback?: StatCallback
  ): void {
    if (typeof statOrCallback === "string") {
      if (this.events[statOrCallback] === undefined) {
        this.events[statOrCallback] = [];
      }

      this.events[statOrCallback].push(maybeCallback as StatCallback);
    } else {
      if (this.events["*"] === undefined) {
        this.events["*"] = [];
      }

      this.events["*"].push(statOrCallback as StatCallback);
    }
  }

  off(callback: StatCallback): void;
  off(stat: string, callback: StatCallback): void;
  off(
    statOrCallback: string | StatCallback,
    maybeCallback?: StatCallback
  ): void {
    if (typeof statOrCallback === "string") {
      if (this.events[statOrCallback] === undefined) {
        return;
      }

      const index = this.events[statOrCallback].indexOf(
        maybeCallback as StatCallback
      );

      if (index !== -1) {
        this.events[statOrCallback].splice(index, 1);
      }
    } else {
      const index = this.events["*"].indexOf(statOrCallback);

      if (index !== -1) {
        this.events["*"].splice(index, 1);
      }
    }
  }
}
