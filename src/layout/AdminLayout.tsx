import { AdminLayoutType } from "@/utils/types/layoutTypes";
import React, { ReactElement } from "react";

const AdminLayout = ({ children }: AdminLayoutType): ReactElement => {
  return (
    <div>
      <h1>Admin Layout</h1>
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
