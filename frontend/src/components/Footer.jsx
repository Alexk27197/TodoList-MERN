import React from "react";
import { Link } from "react-router-dom";
import Links from "./Links";
const data = [
  {
    id: 1,
    path: "/about-us",
    name: "About",
  },
  {
    id: 2,
    path: "/contact-us",
    name: "Contact",
  },
];
const Footer = () => {
  return (
    <footer className="bg-slate-800 w-full h-[75px] flex justify-center items-center text-white">
      <div className="text-center">
        <p>© {new Date().getFullYear()} TodoList. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          {data.map((li) => {
            return <Links path={li.path} id={li.id} name={li.name} />;
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
