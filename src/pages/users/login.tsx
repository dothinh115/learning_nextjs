import { useAppDispatch } from "@/hooks";
import { AppDispatch } from "@/redux/store";
import { loginActionApi } from "@/redux/userReducer";
import axios from "axios";
import React, { useState } from "react";
type Props = {};

const Login = (props: Props) => {
  const [loginData, setLoginData] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useAppDispatch();

  const loginTypeHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(loginData);
    dispatch(loginActionApi(loginData));
  };

  const inputHandle = (event: any) => {
    // const name = event.target.getAttribute("name");
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={loginTypeHandle}>
      <input type="email" name="email" onChange={inputHandle} />
      <br />
      <input type="password" name="mat_khau" onChange={inputHandle} />
      <button type="submit">OK</button>
    </form>
  );
};

export default Login;
