"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoaded = isLoaded;
exports.isLoading = isLoading;
exports.loadPackage = loadPackage;
const loaded = [];
const loading = [];
// check if a package is loaded
function isLoaded(p) {
    return loaded.includes(p);
}
// check if a package is loading
function isLoading(p) {
    return loading.includes(p);
}
// mark a package as loaded
// if it was marked as loading, unmark it
function _loaded(p) {
    if (isLoading(p))
        _stopLoading(p);
    if (!isLoaded(p))
        loaded.push(p);
}
// mark a package as loading
function _loading(p) {
    if (!isLoading(p))
        loading.push(p);
}
// unmark a package as loading
function _stopLoading(p) {
    if (isLoading(p)) {
        const index = loading.indexOf(p);
        loading.splice(index);
    }
}
async function loadPackage(p) {
    //	if (p.loaded) throw new Error("package already loaded");
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
//# sourceMappingURL=index.js.map