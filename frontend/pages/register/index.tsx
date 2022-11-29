import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks"; //used to select from the states and dispatch actions (reducers)
import { useState, useEffect } from "react";
import { register, reset } from "../../features/auth/authSlice";

import Button from "../../components/ui/button";
import cx from "../login/LoginRegister.module.scss";
import { toast } from "react-toastify";
import Spinner from "../../components/ui/spinner";

const Register: NextPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { name, email, password, cpassword } = formData;
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //to know event type, hover over event in  "onChange={event => setMessage(event.target.value)}"
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //to know event type, hover over event in  "onChange={event => setMessage(event.target.value)}"
    e.preventDefault();

    if (password !== cpassword) {
      toast.error("Passwords do not match!");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={cx.form__div__outer + " animate__animated animate__fadeIn"}>
      <div className={cx.form__div__inner}>
        <h1 className="font-semibold text-2xl my-5">REGISTER</h1>
        <form className="w-full" onSubmit={onSubmit}>
          {/*Action to do once submit button is pressed*/}
          <div className="flex flex-col">
            <input
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              className="p-2 my-3 text-black"
              type="text"
            />
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
            <input
              id="cpassword"
              name="cpassword"
              value={cpassword}
              placeholder="Confirm Password"
              className="p-2 my-3 text-black"
              type="password"
              onChange={onChange}
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
