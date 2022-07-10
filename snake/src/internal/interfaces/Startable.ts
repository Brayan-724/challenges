export abstract class Startable {
  abstract get isStarted(): boolean;

  abstract start(): void;
  abstract stop(): void;
}
