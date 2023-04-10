import { PropsWithChildren, ReactElement } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";

export type AdminLayoutType = {
  children: ReactElement;
};

export type HomeLayoutType = {
  children: ReactElement;
};

export type EmptyLayoutType = {
  children: ReactElement;
};

export type NextPageWithLayout = NextPage & {
  Layout?: (props: any) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
