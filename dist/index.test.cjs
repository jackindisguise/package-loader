"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// dist/index.test.js
var import_node_test = require("node:test");
var assert = __toESM(require("node:assert"), 1);

// dist/index.js
var loaded = [];
var loading = [];
function isLoaded(p) {
  return loaded.includes(p);
}
function isLoading(p) {
  return loading.includes(p);
}
function _loaded(p) {
  if (isLoading(p))
    _stopLoading(p);
  if (!isLoaded(p))
    loaded.push(p);
}
function _loading(p) {
  if (!isLoading(p))
    loading.push(p);
}
function _stopLoading(p) {
  if (isLoading(p)) {
    const index = loading.indexOf(p);
    loading.splice(index, 1);
  }
}
async function loadPackage(p) {
  if (isLoaded(p))
    return;
  if (isLoading(p))
    throw new Error("cyclical dependency detected");
  _loading(p);
  if (p.dependencies)
    for (let dep of p.dependencies)
      await loadPackage(dep);
  await p.loader();
  _loaded(p);
}

// dist/index.test.js
(0, import_node_test.test)("loadPackage loads package and dependencies in order", async () => {
  const events = [];
  const a = {
    name: "a",
    loader: async () => {
      events.push("a");
    }
  };
  const b = {
    name: "b",
    loader: async () => {
      events.push("b");
    },
    dependencies: [a]
  };
  await loadPackage(b);
  assert.deepStrictEqual(events, ["a", "b"]);
  assert.strictEqual(isLoaded(a), true);
  assert.strictEqual(isLoaded(b), true);
});
(0, import_node_test.test)("loadPackage throws on cyclical dependency", async () => {
  const x = {
    name: "x",
    loader: async () => {
    }
  };
  const y = {
    name: "y",
    loader: async () => {
    }
  };
  x.dependencies = [y];
  y.dependencies = [x];
  await assert.rejects(async () => {
    await loadPackage(x);
  }, { message: "cyclical dependency detected" });
});
