import type { ZodError } from "zod";

export const zodUtils = {
  getErrorMessages: (errors: ZodError) => {
    const messages = errors.issues.map((issue) => {
      const path = issue.path[0].toString();
      const message = issue.message;

      return `${path}: ${message}`;
    });
    return messages;
  },
};
