import Button from "../../components/ui/button";
import cx from "../login/LoginRegister.module.scss";

const Register = () => {
  return (
    <div className={cx.form__div__outer + " animate__animated animate__fadeIn"}>
      <div className={cx.form__div__inner}>
        <h1 className="font-semibold text-2xl my-5">REGISTER</h1>
        <form className="w-full">
          <div className="flex flex-col">
            <input placeholder="Email" className="p-2 my-3" type="email" />
            <input
              placeholder="Password"
              className="p-2 my-3"
              type="password"
            />
            <input
              placeholder="Confirm Password"
              className="p-2 my-3"
              type="password"
            />
            <Button
              value="CREATE ACCOUNT"
              className="my-5 border-pink-300 border"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
