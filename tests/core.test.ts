import { describe, it, expect } from "vitest";
import { Cloudq } from "../src/core.js";
describe("Cloudq", () => {
  it("init", () => { expect(new Cloudq().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Cloudq(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Cloudq(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
