import { describe, expect, test } from "vitest";
import NexusCrypto from "@/index";

describe("stringToUint8Array", () => {
  test("light", () => {
    const simpleTest = NexusCrypto.utils.stringToUint8Array("Hello");

    expect(simpleTest).toBeDefined();
    expect(simpleTest.length).toBe(5);
    expect(simpleTest[0]).toBe(72);
    expect(simpleTest[4]).toBe(111);
  });
});
