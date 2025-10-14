export async function loadPackage(p) {
    if (p.loaded)
        throw new Error("package already loaded");
    if (p.loading)
        throw new Error("cyclical dependency detected");
    p.loading = true;
    if (p.dependencies)
        for (let dep of p.dependencies)
            await loadPackage(dep);
    await p.loader();
    p.loading = false;
    p.loaded = true;
}
//# sourceMappingURL=index.js.map