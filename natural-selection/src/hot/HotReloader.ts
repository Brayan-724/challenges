import { HotReloadable } from "./Reloadable";

type HotInstances = {
  [key: string]: HotReloadable;
};

export class HotReloader {
  constuctor() {}

  getInstances(): HotInstances {
    if (typeof window.hotReloaderInstances !== "object") {
      // If doesn't exist then create it as empty object
      return (window.hotReloaderInstances = {});
    }

    return window.hotReloaderInstances;
  }

  getInstancesName(): string[] {
    return Object.keys(this.getInstances());
  }

  stop(name: string) {
    const instances = this.getInstances();

    if (!(name in instances)) return;

    const instance = instances[name];

    if (typeof instance !== "object") return;

    if (typeof instance.hot_stop !== "function") return;

    instance.hot_stop();

    // Delete key and instance
    delete instances[name];
  }

  cleanup() {
    const instancesName = this.getInstancesName();

    for (const instanceName of instancesName) {
      this.stop(instanceName);
    }
  }

  start<A extends any[]>(instanceName: string, instance: HotReloadable<A>, args: A) {
    this.stop(instanceName);

    const instances = this.getInstances();

    instances[instanceName] = instance;

    instance.hot_start(...args);
  }
}
