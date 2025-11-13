import moment from "moment";

export const dateUtils = {
  toString: ({
    format = "DD MMMM YYYY",
    ...props
  }: {
    date: Date;
    format?: string;
  }) => moment(props.date).format(format),
  toTimeString: ({
    withSecond = false,
    ...props
  }: {
    date: Date;
    withSecond?: boolean;
  }) => moment(props.date).format(withSecond ? "hh:mm:ss" : "hh:mm"),
};
