export type TErrorData = {
  code: string;
  message: string;
};

export type TApiError = Error & {
  data?: TErrorData;
};
