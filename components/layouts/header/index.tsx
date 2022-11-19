import cx from "./Header.module.scss";
import { AiOutlineLogin, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import Logo from "../../ui/logo";
import Link from "next/link";

const Header = () => {
  return (
    <header className={cx.header}>
      <nav className={cx.nav}>
        <Logo />
        <ul className={cx.ul}>
          <Link href="/login">
            <li className={cx.li}>
              <span className={cx.links}>
                <AiOutlineLogin />
                LOGIN
              </span>
            </li>
          </Link>

          <Link href="/register">
            <li className={cx.li}>
              <span className={cx.links}>
                <AiOutlineUser />
                REGISTER
              </span>
            </li>
          </Link>
        </ul>
      </nav>
      <div className={cx.hr}></div>
    </header>
  );
};

export default Header;
