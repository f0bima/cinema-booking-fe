import { zodUtils } from "@/common/libs/utils/zod.utils";
import { describe, expect, it } from "vitest";

import { ZodError } from "zod";

describe("zodUtils", () => {
  describe("getErrorAPIMessages", () => {
    it("should return an array of formatted error messages", () => {
      const error = new ZodError([
        {
          code: "invalid_type",
          expected: "string",
          path: ["username"],
          message: "Username must be a string",
        },
        {
          code: "too_small",
          minimum: 3,
          origin: "",
          inclusive: true,
          path: ["password"],
          message: "Password must be at least 3 characters long",
        },
      ]);

      const result = zodUtils.getErrorAPIMessages(error);

      expect(result).toEqual([
        "username: Username must be a string",
        "password: Password must be at least 3 characters long",
      ]);
    });

    it("should return an empty array if there are no issues", () => {
      const error = new ZodError([]);
      const result = zodUtils.getErrorAPIMessages(error);
      expect(result).toEqual([]);
    });

    it("should convert non-string path values to string", () => {
      const error = new ZodError([
        {
          code: "custom",
          message: "Invalid value",
          path: [0],
        } as any,
      ]);

      const result = zodUtils.getErrorAPIMessages(error);
      expect(result).toEqual(["0: Invalid value"]);
    });
  });
});
