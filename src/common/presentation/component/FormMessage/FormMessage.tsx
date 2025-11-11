import type { FieldError } from "react-hook-form";

type Props = { error: FieldError };

const FormMessage = ({ error }: Props) => {
  return error && <p>{error.message}</p>;
};

export default FormMessage;
