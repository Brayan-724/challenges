export interface HotReloadable<A extends any[] = any[]> {
  hot_start(...args: A): void;
  hot_stop(): void;
}
