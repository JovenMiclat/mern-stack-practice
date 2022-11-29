import Link from "next/link";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
import "animate.css";
import Modal from "../../components/ui/modal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { setUserOnLoad } from "../../features/auth/authSlice";

type Props = {
  children: any;
};

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    dispatch(setUserOnLoad(user));
  });

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
