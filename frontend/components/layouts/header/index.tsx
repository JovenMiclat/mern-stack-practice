import cx from "./Header.module.scss";
import { AiOutlineLogin, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import Logo from "../../ui/logo";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { logout, reset } from "../../../features/auth/authSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  return (
    <header className={cx.header}>
      <nav className={cx.nav}>
        <Logo />
        <ul className={cx.ul}>
          {user ? (
            <>
              <li className={cx.li}>
                <button onClick={onLogout}>
                  <span className={cx.links}>
                    <AiOutlineLogout />
                    LOGOUT
                  </span>
                </button>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </nav>
      <div className={cx.hr}></div>
    </header>
  );
};

export default Header;
