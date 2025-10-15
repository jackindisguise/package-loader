# package-loader

A tiny TypeScript utility that loads packages (units of work) with dependency ordering and cycle detection.

This project defines a small `Package` type and a `loadPackage` function that ensures all dependencies are loaded before a package's loader runs. It prevents double-loading and detects cyclical dependencies.

## Key features

- Load packages in dependency order (dependencies first).
- Detect cyclical dependencies and throw an error.
- Prevents re-running loaders for already-loaded packages.

## Install

```cmd
npm install jackindisguise/package-loader
```

## Usage

### CommonJS
```javascript
// packages/config.cjs
const config = {
	motionBlur: true,
};

const pkg = {
	name: "config",
	loader: async () => {
		// read data from a savefile
		config.motionBlur = false;
	},
};

module.exports = {
	config,
	pkg,
};


// index.cjs
(()=>{
(async () => {
	const { loadPackage } = require("package-loader");
	const { config, pkg } = require("./packages/config.cjs");
	const assert = require("assert");
	await loadPackage(pkg);
	assert(config.motionBlur === false);
})();
```

### ESM
```javascript
// packages/config.mjs
export const config = {
	motionBlur: true,
};

export const pkg = {
	name: "config",
	loader: async () => {
		// read data from a savefile
		config.motionBlur = false;
	},
};

// index.mjs
import { loadPackage } from "package-loader";
import { config, pkg } from "./packages/config.mjs";
import assert from "assert";
await loadPackage(pkg);
assert(config.motionBlur === false);
```

## Contributing

## License
