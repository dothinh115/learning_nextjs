import { useAuth } from "@/hooks";
import { EmptyLayoutType } from "@/utils/types/layoutTypes";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AuthLayout = ({ children }: EmptyLayoutType) => {
  const { profile, isLoading, firstLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!firstLoading && profile) router.push("/");
  }, [profile, firstLoading]);

  if (isLoading) return <div>Loading!!</div>;

  if (!profile) return <div>{children}</div>;
};

export default AuthLayout;
