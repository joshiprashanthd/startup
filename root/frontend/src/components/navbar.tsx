import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = function (props: any) {
  return (
    <div className="flex flex-row w-full h-12 px-6 py-0 bg-white shadow-sm">
      <div className="flex-1"></div>
      <div className="flex flex-row justify-center flex-1 w-auto">
        <Link to="/home">
          <div
            className={`w-24 px-2 py-3 font-bold text-center ${
              props.selected === "explore" && "text-purple-700 bg-purple-200"
            } border-l font-body`}
          >
            Explore
          </div>
        </Link>
        <Link to="/issues">
          <div
            className={`w-24 px-2 py-3 font-bold text-center ${
              props.selected === "issues" && "text-purple-700 bg-purple-200"
            } border-l  font-body`}
          >
            Issues
          </div>
        </Link>
        <Link to="/create">
          <div
            className={`w-24 px-2 py-3 font-bold text-center ${
              props.selected === "create" && "text-purple-700 bg-purple-200"
            } border-l border-r font-body`}
          >
            Create
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-end flex-1">
        <div className="grid w-8 h-8 mr-4 text-base font-semibold text-black bg-purple-300 rounded place-items-center">
          JJ
        </div>
        <div className="mr-4">
          <span className="font-medium">Jastor J</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>
    </div>
  );
};
