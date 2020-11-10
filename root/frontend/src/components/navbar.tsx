import React from "react";
import { Link } from "react-router-dom";

export const Navbar = function (props: any) {
  return (
    <div className="flex flex-row w-full h-12 px-6 py-0 bg-white shadow-lg">
      <div className="flex flex-row w-48 mx-auto">
        <div
          className={`w-24 px-2 py-3 font-bold text-center ${
            props.selected === "explore" && "text-blue-700 bg-blue-200"
          } border-l border-r font-body`}
        >
          <Link to="/home">Explore</Link>
        </div>
        <div
          className={`w-24 px-2 py-3 font-bold text-center ${
            props.selected === "issues" && "text-blue-700 bg-blue-200"
          } border-l border-r font-body`}
        >
          <Link to="/issues">Issues</Link>
        </div>
      </div>
    </div>
  );
};
