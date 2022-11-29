import { NextPage } from "next";
import cx from "./card.module.scss";

type Props = {
  key?: any;
  title?: any;
  description?: any;
  event?: any;
  date?: any;
};

const card = ({ title, description, event, date }: Props) => {
  return (
    <div className={cx.card} onClick={event}>
      <div className={cx.card__outer}>
        <div className={cx.card__inner}>
          <p className={cx.card__date}>
            {new Date(date).toLocaleString("en-US", {
              dateStyle: "short",
              hour12: true,
              timeStyle: "short",
            })}
          </p>
          <h1 className={cx.card__title}>{title}</h1>
          <div className={cx.card__line}></div>
          <p className={cx.card__desc}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default card;
