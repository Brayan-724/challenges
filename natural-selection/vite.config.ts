import { defineConfig } from "vite";
// @ts-expect-error - No types for built-in modules with node
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "~": resolve("./src"),
      "!abstract": resolve("./src/abstract"),
      "!engine": resolve("./src/engine"),
      "!game": resolve("./src/game"),
      "!system": resolve("./src/game/system"),
      "!base": resolve("./src/game/base"),
      "!prefabs": resolve("./src/game/prefabs"),
      "!hot": resolve("./src/hot"),
      "!internal": resolve("./src/internal"),
    },
  },
});
