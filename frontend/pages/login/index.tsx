import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Button from "../../components/ui/button";
import { login, reset } from "../../features/auth/authSlice";
import cx from "./LoginRegister.module.scss";

const Login: NextPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      router.push("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, message, router, dispatch]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    //onChange type (referred to react-typescript-cheatsheet)
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //to know event type, hover over event in  "onChange={event => setMessage(event.target.value)}"
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  return (
    <div className={cx.form__div__outer + " animate__animated animate__fadeIn"}>
      <div className={cx.form__div__inner}>
        <h1 className="font-semibold text-2xl my-5">LOGIN</h1>
        <form className="w-full" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <input
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              className="p-2 my-3 text-black"
              type="email"
              onChange={onChange}
            />
            <input
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              className="p-2 my-3 text-black"
              type="password"
              onChange={onChange}
            />
            <Button value="LOGIN" className={cx.btn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
