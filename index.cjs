var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/esm/index.mjs
var index_exports = {};
__export(index_exports, {
  isLoaded: () => isLoaded,
  isLoading: () => isLoading,
  loadPackage: () => loadPackage
});
module.exports = __toCommonJS(index_exports);
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
    loading.splice(index);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isLoaded,
  isLoading,
  loadPackage
});
