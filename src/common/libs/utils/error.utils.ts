import type { TApiError } from "@/common/domain/apiError.entity";

export const errorUtils = {
  getErrorAPIMessage: (error: TApiError | any) => {
    return error?.data?.message ?? error.message;
  },
  getErrorAPIStatusCode: (error: TApiError | any) => {
    return error?.data?.code ?? 500;
  },
};
