import React from "react";
import { Link } from "react-router-dom";
import extractInitials from "../../utils/extractInitials";
import { Anchor } from "../core/anchor";

export const TeamSection = function (props: any) {
  return (
    <div>
      <h1 className="text-lg font-medium font-body">Team</h1>
      <div className="mt-4">
        {props.project.work.team.map((user: any) => (
          <TeamItem
            userId={user.id}
            name={user.accountInfo.name}
            handler={user.accountInfo.handler}
          />
        ))}
      </div>
    </div>
  );
};

const TeamItem = function (props: any) {
  return (
    <div className="flex items-center my-4 space-x-4">
      <div className="grid w-10 h-10 font-bold text-white bg-blue-700 rounded font-body place-items-center">
        {extractInitials(props.name)}
      </div>
      <div>
        <Anchor>
          <Link to={`/profile/${props.userId}`}>
            <span className="font-medium font-body">{props.name}</span>
          </Link>
        </Anchor>
        <p className="text-sm font-medium text-gray-700 font-body">
          {props.handler}
        </p>
      </div>
    </div>
  );
};
