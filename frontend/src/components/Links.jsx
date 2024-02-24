import React from "react";
import { Link } from "react-router-dom";

const Links = ({ name, id, path }) => {
  return (
    <ul key={id} className="flex justify-center items-center gap-4">
      <li>
        <Link
          to={`${path}`}
          className="hover:text-slate-200 mx-2 transition-all duration-300"
        >
          {name}
        </Link>
      </li>
    </ul>
  );
};

export default Links;
