import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { store } from "../app/store";
import { Provider } from "react-redux";
import Layout from "../components/layouts/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../app/hooks";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  );
};

export default MyApp;
