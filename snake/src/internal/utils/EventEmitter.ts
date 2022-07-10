export type EventEmitterGeneric = {
  [key: string]: Array<any>;
};

export type EventEmitterListener<
  E extends EventEmitterGeneric,
  K extends keyof E
> = (...args: E[K]) => void | Promise<void>;

export type EventEmitterList<E extends EventEmitterGeneric> = {
  [key in keyof E]?: Array<EventEmitterListener<E, key>>;
};

export class EventEmitter<E extends EventEmitterGeneric = {}> {
  private events: EventEmitterList<E> = {};

  on<K extends keyof E>(event: K, listener: EventEmitterListener<E, K>): void {
    let events = this.events[event];

    // If no listeners have been added yet, create a new array
    if (!events) {
      this.events[event] = events = [];
    }

    events.push(listener);
  }

  off<K extends keyof E>(event: K, listener: EventEmitterListener<E, K>): void {
    const events = this.events[event];

    if (!events) {
      return;
    }

    const index = events.indexOf(listener);

    if (index !== -1) {
      events.splice(index, 1);
    }
  }

  emit<K extends keyof E>(event: K, ...args: E[K]): void {
    const events = this.events[event] as Array<EventEmitterListener<E, K>>;

    if (!events) {
      return;
    }

    for (const listener of events) {
      listener(...args);
    }
  }

  once<K extends keyof E>(
    event: K,
    listener: EventEmitterListener<E, K>
  ): void {
    const events = this.events[event];

    if (!events) {
      return;
    }

    const index = events.indexOf(listener);

    if (index !== -1) {
      events.splice(index, 1);
    }

    this.on(event, (...args) => {
      listener(...args);
      this.off(event, listener);
    });
  }

  removeAllListeners<K extends keyof E>(event: K): void {
    if (!this.events[event]) {
      return;
    }

    this.events[event] = [];
  }

  getEvents(): EventEmitterList<E>;
  getEvents<K extends keyof E>(event: K): Array<EventEmitterListener<E, K>>;
  getEvents<K extends keyof E>(
    event?: K
  ): EventEmitterList<E> | Array<EventEmitterListener<E, K>>;
  getEvents<K extends keyof E>(
    event?: K
  ): EventEmitterList<E> | Array<EventEmitterListener<E, K>> {
    if (event) {
      return this.events[event] ?? [];
    }

    return this.events;
  }
}
