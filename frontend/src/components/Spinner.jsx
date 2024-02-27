import React from "react";
import { RingLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex z-[999999999999] justify-center items-center">
      <RingLoader color="#4A90E2" />
    </div>
  );
};

export default Spinner;
