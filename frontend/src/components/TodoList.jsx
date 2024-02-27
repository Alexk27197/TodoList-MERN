import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import { IoAdd } from "react-icons/io5";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import DisplayTasks from "./DisplayTasks";

const TodoList = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [color, setColor] = useState("#f5a8d9");
  const [task, setTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editableTask, setEditableTask] = useState(null);
  const [editedColor, setEditedColor] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const userId = user.userId;
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const limitTaskText = (str) => {
    let limitedText = str.slice(0, 50);
    if (str.length > 50) {
      toast.warning("You can write text with 50 characters only!");
    }
    return limitedText;
  };

  const openEditModal = (task) => {
    setEditableTask(task);
    setIsEditModalOpen(true);
  };

  const fetchTodos = useCallback(async () => {
    try {
      const { data } = await axios(
        `${process.env.REACT_APP_API_URL}/tasks/get-tasks?userId=${userId}`,
        { withCredentials: true }
      );
      if (!data.success) {
        throw new Error("Network response was not ok");
      }

      setTodos(data.taskLists[0].items);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos, userId]);

  const handleUpdateTask = async (details, checkedBox) => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/tasks/update-task/${
          details._id || editableTask?._id
        }`,
        {
          color: details?.color || editedColor,
          task: details?.task || editedTask,
          completed: editableTask?.completed
            ? editableTask?.completed
            : checkedBox,
        },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Task updated successfully");
        setIsEditModalOpen(false);
        setEditableTask(null);
        fetchTodos();
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks/create-task`,
        { color, completed: false, task, userId },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.msg);
        setIsModalOpen(false);
        fetchTodos();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/tasks/delete-task/${taskId}`,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.msg);
        fetchTodos();
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <button
        className="px-3 text-white py-2 text-lg text-center rounded-lg my-5 font-semibold flex justify-center items-center gap-3 bg-gradient-to-tr from-blue-500 to-blue-700 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-500 transition-all duration-300 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
        onClick={toggleModal}
      >
        Add Task
        <span className="">
          <IoAdd size={24} />
        </span>
      </button>

      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <Modal isOpen={isModalOpen} onClose={toggleModal}>
            <div className="flex justify-center items-center flex-col">
              <h1 className="text-center mb-4 font-bold text-lg">
                Create new task
              </h1>
              <input
                type="text"
                placeholder="Add new task"
                value={task}
                onChange={(e) => setTask(limitTaskText(e.target.value))}
                className="m-4 p-2 border text-center border-b-black border-t-0 border-l-0 border-r-0 outline-none"
              />
              <label
                htmlFor="color"
                className="flex justify-center items-center gap-2"
              >
                Choose color:
                <input
                  id="color"
                  name="color"
                  value={color}
                  className="w-8 h-8 rounded-full cursor-pointer bg-transparent "
                  type="color"
                  onChange={(e) => setColor(e.target.value)}
                />
              </label>

              <button
                onClick={() => handleCreateTask()}
                className="mt-5 font-semibold px-3 py-1 bg-gradient-to-tr from-blue-500 to-blue-700 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-500 transition-all duration-300"
              >
                Create task
              </button>
            </div>
          </Modal>
        </>
      )}

      <div className="w-full h-full flex flex-wrap gap-5 justify-center items-center">
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-center mb-4 font-bold text-lg">
              Update the task
            </h1>
            <input
              type="text"
              placeholder="Add new task"
              value={editedTask || editableTask?.task}
              onChange={(e) => setEditedTask(e.target.value)}
              className="m-4 p-2 border text-center border-b-black border-t-0 border-l-0 border-r-0 outline-none"
            />
            <label
              htmlFor="color"
              className="flex justify-center items-center gap-2"
            >
              Choose color:
              <input
                id="color"
                name="color"
                value={editedColor || editableTask?.color}
                className="w-8 h-8 rounded-full cursor-pointer bg-transparent "
                type="color"
                onChange={(e) => setEditedColor(e.target.value)}
              />
            </label>

            <button
              onClick={() => handleUpdateTask(editableTask._id)}
              className="mt-5 font-semibold px-3 py-1 bg-gradient-to-tr from-blue-500 to-blue-700 hover:bg-gradient-to-tr hover:from-blue-600 hover:to-blue-500 transition-all duration-300"
            >
              Update task
            </button>
          </div>
        </Modal>

        <DisplayTasks
          color={color}
          onEdit={openEditModal}
          todos={todos}
          handleUpdateTask={handleUpdateTask}
          isLoading
          handleDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default TodoList;
