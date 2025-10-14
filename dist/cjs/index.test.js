"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const assert = require("node:assert");
const index_1 = require("./index");
(0, node_test_1.test)("loadPackage loads package and dependencies in order", async () => {
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
    await (0, index_1.loadPackage)(b);
    assert.deepStrictEqual(events, ["a", "b"]);
    assert.strictEqual((0, index_1.isLoaded)(a), true);
    assert.strictEqual((0, index_1.isLoaded)(b), true);
});
(0, node_test_1.test)("loadPackage throws on cyclical dependency", async () => {
    const x = {
        name: "x",
        loader: async () => { },
    };
    const y = {
        name: "y",
        loader: async () => { },
    };
    x.dependencies = [y];
    y.dependencies = [x];
    await assert.rejects(async () => {
        await (0, index_1.loadPackage)(x);
    }, { message: "cyclical dependency detected" });
});
//# sourceMappingURL=index.test.js.map