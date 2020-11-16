import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

//local
import AuthContext, { IAuthContext, IAuthInfo } from "../contexts/auth-context";
import { Anchor } from "./core/anchor";
import { Dropdown } from "./core/dropdown";

export const Navbar = function (props: any) {
  const authContext = useContext(AuthContext);
  return (
    <div className="fixed top-0 z-10 flex flex-row w-full h-12 px-6 py-0 bg-white shadow-lg">
      <div className="flex-1"></div>
      <div className="flex flex-row justify-center flex-1 w-auto">
        <Link to="/home">
          <div
            className={`w-24 px-2 py-3 font-bold text-center ${
              props.selected === "explore" && "text-purple-700 bg-purple-100"
            } border-l font-body`}
          >
            Explore
          </div>
        </Link>
        <Link to="/issues">
          <div
            className={`w-24 px-2 py-3 font-bold text-center ${
              props.selected === "issues" && "text-purple-700 bg-purple-100"
            } border-l  font-body`}
          >
            Issues
          </div>
        </Link>
        <Link to="/create">
          <div
            className={`w-24 px-2 py-3 font-bold text-center ${
              props.selected === "create" && "text-purple-700 bg-purple-100"
            } border-l border-r font-body`}
          >
            Create
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-end flex-1">
        <div className="grid w-8 h-8 mr-4 text-base font-bold text-purple-700 bg-purple-100 rounded place-items-center">
          {(authContext.user?.name?.split(" ")[0].charAt(0) as string) +
            authContext.user?.name?.split(" ")[1].charAt(0)}
        </div>
        <div className="mr-4">
          <Anchor fontWeight="semibold">
            <Link to="/profile">{authContext.user?.name}</Link>
          </Anchor>
        </div>
        <div>
          <Dropdown
            icon={<FontAwesomeIcon icon={faAngleDown} />}
            variant="flat"
          >
            <Dropdown.Menu width="48">
              <Dropdown.Item>Your Projects</Dropdown.Item>
              <Dropdown.Item>Your Starred projects</Dropdown.Item>
              <hr />
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item onClick={authContext.signOut}>
                Sign Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
