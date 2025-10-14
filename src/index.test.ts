import { test } from "node:test";
import * as assert from "node:assert";
import { loadPackage, type Package, isLoaded } from "./index";

test("loadPackage loads package and dependencies in order", async () => {
	const events: string[] = [];

	const a: Package = {
		name: "a",
		loader: async () => {
			events.push("a");
		},
	};

	const b: Package = {
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
	const x: Package = {
		name: "x",
		loader: async () => {},
	};
	const y: Package = {
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
