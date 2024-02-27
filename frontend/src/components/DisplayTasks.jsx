import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

import Spinner from "./Spinner";

const DisplayTasks = ({
  onEdit,
  todos,
  handleUpdateTask,
  isLoading,
  handleDeleteTask,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() מחזיר חודש מ-0 עד 11
    const year = date.getFullYear().toString().substr(-2); // קבלת שנתיים האחרונות של השנה

    return `${day}\\${month}\\${year}`; // החזרת התאריך בפורמט המבוקש
  };

  return (
    <div className="w-[500px] flex flex-wrap gap-5 justify-center items-center ">
      {todos.length ? (
        todos.map((todo) => {
          return (
            <div
              key={todo._id}
              className={`border-[2px] gap-8 w-full rounded-md relative p-6 flex flex-col md:flex-row  justify-center items-center hover:-translate-y-1 transition-all duration-300 border-black  
              shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]
              `}
              style={{
                borderColor: todo.color,
                boxShadow: `0px 0px 10px ${todo.color}`,
              }}
            >
              <div className="flex items-center ">
                <h1 className="text-center place-items-center justify-items-center m-2 text-xl">
                  {formatDate(todo.createdAt)}
                </h1>
              </div>

              <div className="flex  items-center gap-3 flex-grow ">
                {isLoading ? (
                  <>
                    <input
                      className="cursor-pointer text-wrap "
                      type="checkbox"
                      style={{ transform: "scale(1.4)" }}
                      checked={todo.completed}
                      onChange={(e) => handleUpdateTask(todo, e.target.checked)}
                      name=""
                      id=""
                    />
                  </>
                ) : (
                  <>
                    <Spinner />
                  </>
                )}

                <p className={`${todo.completed ? "line-through" : ""}`}>
                  {todo.task}
                </p>
              </div>

              <div className="flex justify-center items-center gap-3">
                <button onClick={() => onEdit(todo)}>
                  {" "}
                  <MdEdit color="#007aff" size={24} />
                </button>
                <button onClick={() => handleDeleteTask(todo._id)}>
                  <MdDelete color="#ff2d55" size={24} />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <>Not Found Tasks</>
      )}
    </div>
  );
};

export default DisplayTasks;
