import Button from "../../components/ui/button";
import cx from "./LoginRegister.module.scss";

const Login = () => {
  return (
    <div className={cx.form__div__outer + " animate__animated animate__fadeIn"}>
      <div className={cx.form__div__inner}>
        <h1 className="font-semibold text-2xl my-5">LOGIN</h1>
        <form className="w-full">
          <div className="flex flex-col">
            <input placeholder="Email" className="p-2 my-3" type="email" />
            <input
              placeholder="Password"
              className="p-2 my-3"
              type="password"
            />
            <Button value="LOGIN" className={cx.btn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
