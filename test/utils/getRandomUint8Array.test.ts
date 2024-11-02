import { describe, expect, test } from "vitest";
import NexusCrypto from "@/index";

describe("getRandomUint8Array", () => {
  test("light", () => {
    const simpleTest = NexusCrypto.utils.getRandomUint8Array(5);

    expect(simpleTest).toBeDefined();
    expect(simpleTest.length).toBe(5);
    expect(simpleTest[0]).toBeGreaterThan(0);
    expect(simpleTest[0]).toBeLessThan(256);
  });
});
