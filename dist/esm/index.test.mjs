import { test } from "node:test";
import * as assert from "node:assert";
import { loadPackage, isLoaded } from "./index.mjs";
test("loadPackage loads package and dependencies in order", async () => {
	const events = [];
	const a = {
		name: "a",
		loader: async () => {
			events.push("a");
		},
	};
	const b = {
		name: "b",
		loader: async () => {
			events.push("b");
		},
		dependencies: [a],
	};
	await loadPackage(b);
	assert.deepStrictEqual(events, ["a", "b"]);
	assert.strictEqual(isLoaded(a), true);
	assert.strictEqual(isLoaded(b), true);
});
test("loadPackage throws on cyclical dependency", async () => {
	const x = {
		name: "x",
		loader: async () => {},
	};
	const y = {
		name: "y",
		loader: async () => {},
	};
	x.dependencies = [y];
	y.dependencies = [x];
	await assert.rejects(
		async () => {
			await loadPackage(x);
		},
		{ message: "cyclical dependency detected" }
	);
});
//# sourceMappingURL=index.test.js.map
