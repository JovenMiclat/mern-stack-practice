import { NextPage } from "next";
import { useState, useEffect } from "react";
import Button from "../../components/ui/button";
import cx from "../login/LoginRegister.module.scss";

const Register: NextPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const { name, email, password, cpassword } = formData;

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
  };

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
              placeholder="Name"
              className="p-2 my-3"
              type="text"
              onChange={onChange}
            />
            <input
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              className="p-2 my-3"
              type="email"
            />
            <input
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              className="p-2 my-3"
              type="password"
            />
            <input
              id="cpassword"
              name="cpassword"
              value={cpassword}
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
