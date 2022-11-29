import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type stateTypes = {
  isOpen: boolean;
  modaltype: string;
  goal: [];
};

const initialState = {
  isOpen: false,
  modalType: "",
  goal: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    addGoalModal: (state) => {
      state.modalType = "addGoal";
    },
    updateGoalModal: (state, action: PayloadAction<any>) => {
      state.modalType = "updateGoal";
      state.goal = action.payload;
    },
  },
});

export const { openModal, closeModal, addGoalModal, updateGoalModal } =
  modalSlice.actions;
export default modalSlice.reducer;
