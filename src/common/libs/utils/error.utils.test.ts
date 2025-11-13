import { describe, expect, it } from "vitest";

import type { TApiError } from "@/common/domain/apiError.entity";
import { errorUtils } from "@/common/libs/utils/error.utils";

describe("errorUtils", () => {
  describe("getErrorAPIMessage", () => {
    it("should return message from error.data.message if available", () => {
      const error: TApiError = {
        data: { message: "Something went wrong", code: 400 },
      } as any;

      const result = errorUtils.getErrorAPIMessage(error);
      expect(result).toBe("Something went wrong");
    });

    it("should return error.message if error.data.message is not available", () => {
      const error = { message: "General error" };

      const result = errorUtils.getErrorAPIMessage(error);
      expect(result).toBe("General error");
    });

    it("should return undefined if error has no message", () => {
      const error = {};
      const result = errorUtils.getErrorAPIMessage(error);
      expect(result).toBeUndefined();
    });
  });

  describe("getErrorAPIStatusCode", () => {
    it("should return code from error.data.code if available", () => {
      const error: TApiError = {
        data: { message: "Not found", code: 404 },
      } as any;

      const result = errorUtils.getErrorAPIStatusCode(error);
      expect(result).toBe(404);
    });

    it("should return 500 if error.data.code is not available", () => {
      const error = { message: "Server error" };
      const result = errorUtils.getErrorAPIStatusCode(error);
      expect(result).toBe(500);
    });

    it("should return 500 if error is empty", () => {
      const error = {};
      const result = errorUtils.getErrorAPIStatusCode(error);
      expect(result).toBe(500);
    });
  });
});
