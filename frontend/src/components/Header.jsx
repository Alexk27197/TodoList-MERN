// import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Header = () => {
  const { user, logout } = useAuth();

  return (
    <section className="bg-slate-800 w-full p-4 text-white flex justify-between items-center px-10">
      <div className="text-2xl hover:text-slate-200 transition-all duration-300">
        <Link
          to="/"
          className="hover:text-slate-200 transition-all duration-300"
        >
          TodoList
        </Link>
      </div>
      <nav className="flex justify-center items-center">
        <ul className="  flex justify-center items-center gap-4">
          <li>
            <Link
              to="/"
              className="hover:text-slate-200 transition-all duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="hover:text-slate-200 transition-all duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="hover:text-slate-200 transition-all duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex justify-center items-center">
        {user ? (
          <div className="flex flex-col">
            <div>Hi,{user.username}</div>
            <button onClick={() => logout()}>Logout</button>
          </div>
        ) : (
          <Link
            to={"/register"}
            className="hover:text-slate-200 transition-all duration-300"
          >
            Sign-Up/In
          </Link>
        )}
      </div>
    </section>
  );
};

export default Header;
