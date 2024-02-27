import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GrMenu } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import Links from "./Links";

const data = [
  {
    id: 1,
    path: "/",
    name: "Home",
  },
  {
    id: 2,
    path: "/about-us",
    name: "About",
  },
  {
    id: 3,
    path: "/contact-us",
    name: "Contact",
  },
];

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <section className="relative bg-slate-800 w-full p-4 flex-wrap text-white flex justify-center gap-5 items-center px-10">
      <div className="text-2xl hover:text-slate-200 transition-all duration-300">
        <Link
          to="/"
          className="hover:text-slate-200 transition-all duration-300"
        >
          TodoList
        </Link>
      </div>

      <nav className="hidden justify-center items-center md:flex">
        {data.map((li) => {
          return <Links key={li.id} path={li.path} id={li.id} name={li.name} />;
        })}
      </nav>
      <div
        className={`md:hidden flex justify-center flex-col fixed right-0 top-0 z-20 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } w-screen bg-pink-600 h-screen transition-transform duration-300 ease-in-out`}
      >
        {data.map((li) => {
          return <Links key={li.id} path={li.path} id={li.id} name={li.name} />;
        })}
      </div>

      <div className="flex justify-center items-center gap-5">
        {user ? (
          <div className="flex gap-4">
            <div>Hi,{user.username}</div>
            <button
              className="hover:text-slate-200 transition-all duration-300"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to={"/register"}
            className="hover:text-slate-200 transition-all duration-300"
          >
            Sign-Up/In
          </Link>
        )}

        <div className="md:hidden flex justify-center items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:text-slate-200 transition-all duration-300 z-50"
          >
            {isMenuOpen ? <AiOutlineClose /> : <GrMenu />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
