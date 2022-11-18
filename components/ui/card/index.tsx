import { NextPage } from "next";
import cx from "./card.module.scss";

interface Props {
  title: string;
  desc: string;
}

const card: NextPage<Props> = ({ title, desc }) => {
  return (
    <div className={cx.card}>
      <div className={cx.card__outer}>
        <div className={cx.card__inner}>
          <h1 className={cx.card__title}>{title}</h1>
          <div className={cx.card__line}></div>
          <p className={cx.card__desc}>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default card;
