import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import goalService from "./goalService";

type stateTypes = {
  userGoals: any[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

const initialState: stateTypes = {
  userGoals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addGoal = createAsyncThunk(
  "goals/add",
  async (goalData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.addGoal(goalData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user goals
export const readGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.readGoals(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Goal
export const updateGoal = createAsyncThunk(
  "goals/update",
  async (goalData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.updateGoal(goalData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userGoals.push(action.payload);
      })
      .addCase(addGoal.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(readGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(readGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userGoals = action.payload;
      })
      .addCase(readGoals.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userGoals = state.userGoals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoal.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userGoals[
          state.userGoals.findIndex((goal) => goal._id === action.payload._id)
        ] = action.payload;
      })
      .addCase(updateGoal.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
