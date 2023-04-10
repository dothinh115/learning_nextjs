import EmptyLayout from "@/layout/EmptyLayout";
import store from "@/redux/store";
import "@/styles/globals.css";
import { AppPropsWithLayout } from "@/utils/types/layoutTypes";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <Layout>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}
