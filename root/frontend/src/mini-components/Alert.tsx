import React from "react";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Alert = function (props: any) {
  return (
    <p
      className="w-full px-2 py-1 text-sm font-medium text-white bg-red-500 rounded"
      {...props}
    >
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        color="white"
        className="mr-1"
      />
      {"  "}
      {props.children}
    </p>
  );
};
