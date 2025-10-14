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

## Behavior and edge-cases
- Cycles: if a package is in the process of loading and is requested again (via dependencies), the implementation considers that a cycle and throws an error.

## Contributing

## License
