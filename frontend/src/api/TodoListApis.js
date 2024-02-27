import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getTodos = async (userId) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/tasks/get-tasks?userId=${userId}`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const { data } = await axios.post(
      `${API_URL}/tasks/create-task`,
      taskData,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    console.log(taskId, taskData);
    const { data } = await axios.put(
      `${API_URL}/tasks/update-task/${taskId}`,
      taskData,
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    console.log("po lo avar1");
    console.error("Error updating task:", error);
    throw error;
  }
};

export const updateTaskCompleted = async (taskId, taskData) => {
  try {
    const { data } = await axios.put(
      `${API_URL}/tasks/update-task/${taskId}`,
      taskData,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
};
