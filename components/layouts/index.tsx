import { NextPage } from "next";
import Link from "next/link";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
import "animate.css";

interface Props {
  children: any;
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>I Need Another Goals App!</title>
      </Head>
      <div className="flex flex-col min-h-screen animate__animated animate__fadeIn">
        <Header />
        <main className="container flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
