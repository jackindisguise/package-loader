var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

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
function loadPackage(p) {
  return __async(this, null, function* () {
    if (isLoaded(p))
      return;
    if (isLoading(p))
      throw new Error("cyclical dependency detected");
    _loading(p);
    if (p.dependencies)
      for (let dep of p.dependencies)
        yield loadPackage(dep);
    yield p.loader();
    _loaded(p);
  });
}
export {
  isLoaded,
  isLoading,
  loadPackage
};
