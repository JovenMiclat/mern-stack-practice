import cx from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={cx.footer}>
      <div className={cx.footer__hr}></div>
      <h1 className="text-sm">© JOVEN MICLAT</h1>
      <Link href="https://github.com/JovenMiclat">
        <h1 className=" text-sm cursor-pointer">
          https://github.com/JovenMiclat
        </h1>
      </Link>
    </footer>
  );
};

export default Footer;
