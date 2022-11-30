import cx from "./Dashboard.module.scss";
import Card from "../../components/ui/card";
// import goals from "../goals/goals";
import React, { useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

import {
  addGoalModal,
  updateGoalModal,
  openModal,
} from "../../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useRouter } from "next/router";
import { readGoals, reset } from "../../features/goals/goalSlice";
import Modal from "../../components/ui/modal";

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpen, modalType } = useAppSelector((state) => state.modal);
  const { user } = useAppSelector((state) => state.auth);
  const { userGoals, isError, message } = useAppSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      router.push("/login");
    }

    if (user) {
      dispatch(readGoals());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, router, isError, message, dispatch]);

  return (
    <div className="w-11/12 mx-auto animate__animated animate__fadeIn">
      {isOpen && <Modal modalType={modalType} />}

      <div className="flex items-center mt-5 justify-between">
        <h1 className="text-3xl font-semibold">GOALS</h1>
        <button
          className="flex items-center rounded p-2 text-white hover:text-pink-400 hover:border-pink-400 transition ease-linear delay-75"
          onClick={() => {
            dispatch(openModal());
            dispatch(addGoalModal());
          }}
        >
          <IoAddCircleOutline className="mr-2  text-3xl" />
          <h1>Add Goal</h1>
        </button>
      </div>
      {userGoals.length > 0 ? (
        <div className={cx.cards}>
          {userGoals.map((goal) => {
            return (
              <Card
                key={goal._id}
                title={goal.title}
                description={goal.description}
                date={goal.updatedAt}
                event={() => {
                  dispatch(openModal());
                  dispatch(updateGoalModal(goal));
                }}
              />
            );
          })}
        </div>
      ) : (
        <h1 className="mt-3 ml-2 text-lg">
          You have not set any goals, add a goal now!
        </h1>
      )}
    </div>
  );
};

export default Dashboard;
