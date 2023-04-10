import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {};

const logout = (props: Props) => {
  const router = useRouter();
  const { logout } = useAuth();
  useEffect(() => {
    logout();
    router.push("/users/login");
  }, []);
  return <div>logout</div>;
};

export default logout;
