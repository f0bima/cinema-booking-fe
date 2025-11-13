import { describe, expect, it } from "vitest";

import { dateUtils } from "@/common/libs/utils/date.utils";
import moment from "moment";

describe("dateUtils", () => {
  describe("toString", () => {
    it("should format the date using the default format (DD MMMM YYYY)", () => {
      const date = new Date("2025-01-15T00:00:00Z");
      const expected = moment(date).format("DD MMMM YYYY");

      const result = dateUtils.toString({ date });
      expect(result).toBe(expected);
    });

    it("should format the date using a custom format", () => {
      const date = new Date("2025-01-15T00:00:00Z");
      const customFormat = "YYYY/MM/DD";
      const expected = moment(date).format(customFormat);

      const result = dateUtils.toString({ date, format: customFormat });
      expect(result).toBe(expected);
    });
  });

  describe("toTimeString", () => {
    it("should format time without seconds by default", () => {
      const date = new Date("2025-01-15T13:45:30Z");
      const expected = moment(date).format("hh:mm");

      const result = dateUtils.toTimeString({ date });
      expect(result).toBe(expected);
    });

    it("should format time with seconds when withSecond is true", () => {
      const date = new Date("2025-01-15T13:45:30Z");
      const expected = moment(date).format("hh:mm:ss");

      const result = dateUtils.toTimeString({ date, withSecond: true });
      expect(result).toBe(expected);
    });
  });
});
