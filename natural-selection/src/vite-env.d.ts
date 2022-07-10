/// <reference types="vite/client" />
import { HotReloadable } from "./hot"

declare global {
  interface Window {
    hotReloaderInstances: {
      [key: string]: HotReloadable;
    }
  }
}
