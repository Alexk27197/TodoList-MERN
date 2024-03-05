import React from "react";
import { AiOutlineClose } from "react-icons/ai";
const Filter = ({
  clearAll,
  setFilterTask,
  fetchFilteredTasks,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
  filterTask,
  isOpenFilter,
  setIsOpenFilter,
}) => {
  return (
    <div
      className={`absolute ${
        isOpenFilter ? "right-full ease-in-out" : "left-[-100%]"
      } w-[250px] py-4 min-h-[40vh] z-50 px-4  bg-slate-600 left-0 top-[63px] overflow-auto transition-all duration-500`}
    >
      <div
        onClick={() => setIsOpenFilter(false)}
        className="absolute right-4 cursor-pointer"
      >
        <AiOutlineClose size={20} color="white" />
      </div>
      <div className="">
        <h1 className="text-center m-2 text-2xl text-white">Filter</h1>
      </div>
      <button
        onClick={() => clearAll()}
        className="text-white hover:text-gray-300 hover:underline transition-all duration-300"
      >
        Clear All
      </button>
      <div className="flex text-white  flex-col">
        <div className="my-4 w-full">
          <h2 className="underline text-xl mb-2">Date</h2>
          <div className="flex flex-col">
            <label htmlFor="startDate" className="">
              From:
            </label>

            <input
              className="my-2 text-black cursor-pointer p-2 opacity-80"
              type="date"
              name="startDate"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="endDate" className="">
              To:
            </label>
            <input
              className="my-2 text-black cursor-pointer p-2 opacity-80"
              type="date"
              name="endDate"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="my-4 w-full">
          <h2 className="underline text-xl mb-2">Task</h2>
          <form>
            <input
              type="text"
              className="pl-2 py-2 text-white w-full border-1 outline-0 border-b-2 border-t-0 border-l-0 border-r-0 bg-transparent"
              placeholder="Search for tasks..."
              value={filterTask}
              onChange={(e) => setFilterTask(e.target.value)}
            />
          </form>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-5 text-white font-semibold rounded-md bg-blue-500 hover:bg-blue-600 transition-all duration-300 h-[40px] text-center"
        onClick={() => {
          fetchFilteredTasks();
          setIsOpenFilter(false);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Filter;
