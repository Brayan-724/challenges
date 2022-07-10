import {
  EventEmitter,
  type EventEmitterListener,
  type EventEmitterList,
} from "./utils/EventEmitter";

export type KeysList =
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "w"
  | "s"
  | "a"
  | "d"
  | "W"
  | "S"
  | "A"
  | "D";

export type KeyEventMap = {
  [key in KeysList]: [key: key, event: KeyboardEvent];
};

export type KeyboardEventListener = (event: KeyboardEvent) => void;
export type KeyEventListener = (key: string) => void;

export class Keyboard {
  private readonly keys = new Map<string, boolean>();
  private readonly keyboardEvents = new Set<KeyboardEventListener>();

  private readonly eventEmmiterKeys = new EventEmitter<KeyEventMap>();

  constructor() {}

  eventsCallback(arg: string): (callback: KeyEventListener) => void;
  eventsCallback(arg: KeyboardEvent): (callback: KeyboardEventListener) => void;
  eventsCallback(arg: KeyboardEvent | string) {
    return function eventCallback(
      callback: KeyboardEventListener | KeyEventListener
    ) {
      if (typeof arg === "string") {
        (callback as KeyEventListener)(arg);
      } else {
        (callback as KeyboardEventListener)(arg);
      }
    };
  }

  protected keyDownHandler(event: KeyboardEvent) {
    this.keys.set(event.key, true);
    this.eventEmmiterKeys.emit<KeysList>(
      event.key as KeysList,
      ...([event.key as KeysList, event] as [
        key: KeysList,
        event: KeyboardEvent
      ])
    );
    this.keyboardEvents.forEach(this.eventsCallback(event));
  }

  protected keyUpHandler(event: KeyboardEvent) {
    this.keys.set(event.key, false);
  }

  protected unfocusHandler() {
    this.keys.clear();
  }

  protected getEvents(): EventEmitterList<KeyEventMap>;
  protected getEvents<K extends keyof KeyEventMap>(
    key: K
  ): EventEmitterListener<KeyEventMap, K>[];
  protected getEvents<K extends keyof KeyEventMap>(
    key?: K
  ): EventEmitterList<KeyEventMap> | EventEmitterListener<KeyEventMap, K>[] {
    return this.eventEmmiterKeys.getEvents(key);
  }

  public on(callback: KeyboardEventListener): void;
  public on<K extends keyof KeyEventMap>(
    key: K,
    callback: EventEmitterListener<KeyEventMap, K>
  ): void;
  public on<K extends (keyof KeyEventMap)[]>(
    key: K,
    callback: EventEmitterListener<KeyEventMap, K extends Array<infer A> ? A : undefined>
  ): void;
  public on<K extends keyof KeyEventMap>(
    keyOrCallback: K | KeyboardEventListener,
    callback?: EventEmitterListener<KeyEventMap, K>
  ) {
    if (typeof keyOrCallback === "string") {
      if (!callback) return;
      this.eventEmmiterKeys.on(keyOrCallback, callback);

      return;
    }

    if (Array.isArray(keyOrCallback)) {
      if (!callback) return;

      keyOrCallback.forEach((key) => {
        this.on(key, callback);
      });
      return;
    }

    this.keyboardEvents.add(keyOrCallback as KeyboardEventListener);
  }

  start() {
    window.addEventListener("keydown", this.keyDownHandler.bind(this));
    window.addEventListener("keyup", this.keyUpHandler.bind(this));
    window.addEventListener("blur", this.unfocusHandler.bind(this));
  }

  stop() {
    window.removeEventListener("keydown", this.keyDownHandler.bind(this));
    window.removeEventListener("keyup", this.keyUpHandler.bind(this));
    window.removeEventListener("blur", this.unfocusHandler.bind(this));
  }

  isDown(key: string) {
    return this.keys.get(key) || false;
  }

  isUp(key: string) {
    return !this.keys.get(key) || false;
  }
}
