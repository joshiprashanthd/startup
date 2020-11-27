import React from "react";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: "error" | "info" | "warning" | "success";
}

export const Alert: React.FC<IProps> = function ({
  variant = "info",
  children,
  ...restProps
}) {
  let variantColor = "blue";
  let variantIcon = faExclamationCircle;

  switch (variant) {
    case "error":
      variantColor = "red";
      variantIcon = faTimesCircle;
      break;
    case "warning":
      variantColor = "orange";
      variantIcon = faExclamationTriangle;
      break;
    case "success":
      variantColor = "green";
      variantIcon = faCheckCircle;
      break;
  }
  return (
    <p
      className={`inline-flex items-center w-full p-2 text-sm font-medium font-body text-${variantColor}-600 bg-${variantColor}-100 rounded`}
      {...restProps}
    >
      <FontAwesomeIcon
        icon={variantIcon}
        className={`mr-2 text-${variantColor}-400`}
      />{" "}
      {children}
    </p>
  );
};
