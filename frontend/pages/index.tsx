import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import Dashboard from "./dashboard";
import Login from "./login";

const Home: NextPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return <>{user ? <Dashboard /> : <Login />}</>;
};

export default Home;
