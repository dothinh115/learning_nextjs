import EmptyLayout from "@/layout/EmptyLayout";
import store from "@/redux/store";
import "@/styles/globals.css";
import { API } from "@/utils/config";
import { AppPropsWithLayout } from "@/utils/types/layoutTypes";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <SWRConfig
      value={{ fetcher: (url) => API.get(url), shouldRetryOnError: false }}
    >
      <Layout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    </SWRConfig>
  );
}
