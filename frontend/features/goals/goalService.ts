import axios from "axios"; //making the HTTP request and waiting for response

const API_URL = "/api/goals/";

//Add Goal
const addGoal = async (goalData: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

//Read goals
const readGoals = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

//Delete Goal
const deleteGoal = async (goalID: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + goalID, config);

  return response.data;
};

//Update Goal
const updateGoal = async (goalData: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + goalData._id,
    goalData.tempData,
    config
  );

  return response.data;
};

const goalService = {
  addGoal,
  readGoals,
  deleteGoal,
  updateGoal,
};

export default goalService;
