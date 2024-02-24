import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-800 text-white">
      <h1 className="text-6xl font-bold animate-bounce">404</h1>
      <p className="text-2xl mt-5">Oops! Page not found.</p>
    </div>
  );
};

export default NotFound;
