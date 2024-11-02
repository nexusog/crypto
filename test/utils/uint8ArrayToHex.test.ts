import { describe, expect, test } from "vitest";
import NexusCrypto from "@/index";

describe("uint8ArrayToHex", () => {
  test("light", () => {
    const simpleTest = NexusCrypto.utils.uint8ArrayToHex(
      NexusCrypto.utils.stringToUint8Array("Hello")
    );

    expect(simpleTest).toBeDefined();
    expect(simpleTest.length).toBe(5 * 2);
    expect(simpleTest.slice(0, 2)).toBe("48");
  });
});
