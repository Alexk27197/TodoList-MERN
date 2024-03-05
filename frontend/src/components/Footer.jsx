import React from "react";
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
    <footer className=" bg-slate-800 w-full flex justify-center items-center text-white ">
      <div className="text-center">
        <p>© {new Date().getFullYear()} TodoList. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          {data.map((li) => {
            return (
              <Links key={li.id} path={li.path} id={li.id} name={li.name} />
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
