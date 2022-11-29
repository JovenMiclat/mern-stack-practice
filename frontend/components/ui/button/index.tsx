import { NextPage } from "next";

type Props = {
  className?: string;
  value: String;
  type?: "submit" | "reset" | "button" | undefined;
};

const Button = ({ value, type, className }: Props) => {
  return (
    <button type={type} className={"px-5 py-2.5 text-center " + className}>
      {value}
    </button>
  );
};

export default Button;
