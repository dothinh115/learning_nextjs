import { useAuth } from "@/hooks";
import AuthLayout from "@/layout/AuthLayout";
import { LoginInterface } from "@/utils/types/authType";
import React, { useState } from "react";
type Props = {};

const Login = (props: Props) => {
  const [loginData, setLoginData] = useState<LoginInterface>({
    email: "",
    mat_khau: "",
  });
  const { login } = useAuth({
    revalidateOnMount: false,
  });

  const loginTypeHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(loginData);
    } catch (error) {
      console.log(error);
    }
  };

  const inputHandle = (event: any) => {
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

Login.Layout = AuthLayout;

export default Login;
