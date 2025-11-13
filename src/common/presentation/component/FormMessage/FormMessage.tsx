import type { FieldError } from "react-hook-form";

type Props = { error: FieldError };

const FormMessage = ({ error }: Props) => {
  return error && <p className="text-sm text-red-500">{error.message}</p>;
};

export default FormMessage;
