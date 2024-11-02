import { describe, expect, test } from "vitest";
import NexusCrypto from "@/index";

describe("getRandomString", () => {
  test("light", () => {
    const simpleTest = NexusCrypto.utils.getRandomString(5);

    expect(simpleTest).toBeDefined();
    expect(simpleTest.length).toBe(5);
    expect(simpleTest.charCodeAt(0)).toBeGreaterThan(0);
    expect(simpleTest.charCodeAt(0)).toBeLessThan(256);
  });
});
