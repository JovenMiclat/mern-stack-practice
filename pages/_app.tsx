import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { Provider } from "react-redux";
import Layout from "../components/layouts/index";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default MyApp;
