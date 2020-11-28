import { useMutation } from "@apollo/client";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

//local
import { SIGN_OUT } from "../graphql/user/mutation";
import { useAuth } from "../hooks/useAuth";
import extractInitials from "../utils/extractInitials";
import { Anchor } from "./core/anchor";
import { Dropdown } from "./core/dropdown";

export const Navbar = function (props: any) {
  const location = useLocation<any>();
  const history = useHistory();
  const [mutate, { client }] = useMutation(SIGN_OUT);
  const auth = useAuth();

  const handleSignOut = () => {
    mutate()
      .then((resData) => {
        if (auth.signOut) {
          auth.signOut();
          client.resetStore();
          history.push("/auth");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="fixed top-0 z-10 flex flex-row w-full h-16 px-6 py-0 bg-white shadow">
      <div className="flex-1"></div>
      <div className="flex flex-row justify-center flex-1 w-auto">
        <Link to="/home">
          <div
            className={`w-24 h-full px-2 py-3 grid place-items-center font-bold ${
              props.selected === "explore" && "text-purple-700 bg-purple-100"
            } border-l font-body`}
          >
            Explore
          </div>
        </Link>
        <Link to="/issues">
          <div
            className={`w-24 h-full px-2 py-3 grid place-items-center font-bold ${
              props.selected === "issues" && "text-purple-700 bg-purple-100"
            } border-l  font-body`}
          >
            Issues
          </div>
        </Link>
        <Link to="/create">
          <div
            className={`w-24 h-full grid place-items-center px-2 py-3 font-bold  ${
              props.selected === "create" && "text-purple-700 bg-purple-100"
            } border-l border-r font-body`}
          >
            Create
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-end flex-1">
        <div className="grid w-8 h-8 mr-4 text-base font-bold text-purple-700 bg-purple-100 rounded place-items-center font-body">
          {extractInitials(auth.user?.name as string)}
        </div>
        <div className="mr-4">
          <Anchor fontWeight="semibold">
            <Link to="/profile">{auth.user?.name}</Link>
          </Anchor>
        </div>
        <div>
          <Dropdown
            icon={<FontAwesomeIcon icon={faAngleDown} />}
            variant="flat"
          >
            <Dropdown.Menu>
              <Dropdown.Item>Your Projects</Dropdown.Item>
              <Dropdown.Item>Your Starred projects</Dropdown.Item>
              <hr />
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
