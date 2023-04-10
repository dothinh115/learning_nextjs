import { HomeLayoutType } from "@/utils/types/layoutTypes";
import React, { ReactElement, useEffect } from "react";

const HomeLayout = ({ children }: HomeLayoutType): ReactElement => {
  return (
    <div>
      <h1>Home Layout Header</h1>
      <br />
      <div>{children}</div>
      <br />
      <h1>Home Layout Footer</h1>
    </div>
  );
};

export default HomeLayout;
