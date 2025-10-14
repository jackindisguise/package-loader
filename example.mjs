import { loadPackage } from "./dist/cjs/index.js";
import { config, pkg } from "./package/config.mjs";
console.log(config);
await loadPackage(pkg);
console.log(config);
