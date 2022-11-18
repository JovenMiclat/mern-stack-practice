import { NextPage } from "next";

interface Props {
  className?: string;
  value: String;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: NextPage<Props> = ({ value, type, className }) => {
  return (
    <button type={type} className={"px-5 py-2.5 text-center " + className}>
      {value}
    </button>
  );
};

export default Button;
