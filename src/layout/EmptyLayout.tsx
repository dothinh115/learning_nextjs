import { EmptyLayoutType } from "@/utils/types/layoutTypes";
import React, { ReactElement } from "react";

const EmptyLayout = ({ children }: EmptyLayoutType): ReactElement => {
  return <div>{children}</div>;
};

export default EmptyLayout;
