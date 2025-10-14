export type Package = {
	name: string;
	loader: () => Promise<void>;
	dependencies?: Package[];
};

const loaded: Package[] = [];
const loading: Package[] = [];

// check if a package is loaded
export function isLoaded(p: Package) {
	return loaded.includes(p);
}

// check if a package is loading
export function isLoading(p: Package) {
	return loading.includes(p);
}

// mark a package as loaded
// if it was marked as loading, unmark it
function _loaded(p: Package) {
	if (isLoading(p)) _stopLoading(p);
	if (!isLoaded(p)) loaded.push(p);
}

// mark a package as loading
function _loading(p: Package) {
	if (!isLoading(p)) loading.push(p);
}

// unmark a package as loading
function _stopLoading(p: Package) {
	if (isLoading(p)) {
		const index = loading.indexOf(p);
		loading.splice(index);
	}
}

export async function loadPackage(p: Package) {
	//	if (p.loaded) throw new Error("package already loaded");
	if (isLoaded(p)) return;
	if (isLoading(p)) throw new Error("cyclical dependency detected");
	_loading(p);
	if (p.dependencies) for (let dep of p.dependencies) await loadPackage(dep);
	await p.loader();
	_loaded(p);
}
