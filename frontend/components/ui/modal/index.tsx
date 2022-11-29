import cx from "./modal.module.scss";

import { closeModal } from "../../../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import React, { MouseEventHandler, useEffect, useState } from "react";
import {
  addGoal,
  deleteGoal,
  updateGoal,
} from "../../../features/goals/goalSlice";
import { AiOutlineDelete, AiOutlineSave } from "react-icons/ai";
import { useRouter } from "next/router";

type Props = {
  modalType: string;
  modal?: JSX.Element;
};

const Modal = ({ modalType, modal }: Props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const { title, description } = formData;
  const dispatch = useAppDispatch();
  const { goal } = useAppSelector((state) => state.modal);
  const _id = goal._id;

  useEffect(() => {
    if (modalType === "updateGoal" || goal) {
      setFormData({ ...goal });
    }

    if (modalType === "addGoal") {
      setFormData({ title: "", description: "" });
    }

    const keyDownHandler = (e: any) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dispatch(closeModal());
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [goal]);

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    //to know event type, hover over event in  "onChange={event => setMessage(event.target.value)}"
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const addGoalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const goalData = {
      title,
      description,
    };

    dispatch(addGoal(goalData));
    setFormData({ title: "", description: "" });
    dispatch(closeModal());
  };

  const updateGoalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();

    const tempData = {
      title,
      description,
    };

    const goalData = {
      _id,
      tempData,
    };

    dispatch(updateGoal(goalData));
    setFormData({ title: "", description: "" });
    dispatch(closeModal());
  };

  if (modalType == "addGoal") {
    modal = (
      <div className={cx.modal__overlay}>
        <div className={cx.modal__border}>
          <div className="flex justify-end">
            <span
              onClick={() => dispatch(closeModal())}
              className={cx.modal__close}
            >
              &#10005;
            </span>
          </div>
          <form onSubmit={addGoalSubmit}>
            <div className={cx.modal_form_title}>
              <h1>Add a Goal</h1>
            </div>
            <div className="p-5">
              <div className="flex flex-col">
                <label htmlFor="title">Title:</label>
                <input
                  className={cx.modal__input}
                  id="title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  type="text"
                />
              </div>
              <div className="my-5 flex flex-col">
                <label htmlFor="description">Description:</label>
                <textarea
                  className={cx.modal__input}
                  rows={5}
                  id="description"
                  name="description"
                  value={description}
                  onChange={onChange}
                />
              </div>
              <div className="flex justify-end items-center">
                <button className={cx.modal__button} type="submit">
                  <AiOutlineSave className="mr-1" />
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else if (modalType == "updateGoal") {
    modal = (
      <div className={cx.modal__overlay}>
        <div className={cx.modal__border}>
          <div className="flex justify-end">
            <span
              onClick={() => dispatch(closeModal())}
              className={cx.modal__close}
            >
              &#10005;
            </span>
          </div>
          <form onSubmit={updateGoalSubmit}>
            <div className={cx.modal_form_title}>
              <h1>Update Goal</h1>
            </div>
            <div className="p-5">
              <div className="flex flex-col">
                <label>Title:</label>
                <input
                  id="title"
                  name="title"
                  className={cx.modal__input}
                  value={title}
                  onChange={onChange}
                />
              </div>
              <div className="my-5 flex flex-col">
                <label>Description:</label>
                <textarea
                  id="description"
                  name="description"
                  onChange={onChange}
                  value={description}
                  className={cx.modal__input}
                  rows={5}
                />
              </div>
              <div className="flex justify-end items-center">
                <button
                  className={"mr-4 " + cx.modal__button}
                  onClick={() => {
                    dispatch(deleteGoal(goal._id));
                    dispatch(closeModal());
                  }}
                >
                  <AiOutlineDelete className="mr-1" /> Delete
                </button>
                <button className={cx.modal__button} type="submit">
                  <AiOutlineSave className="mr-1" />
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else modal = <></>;

  return <>{modal}</>;
};

export default Modal;
