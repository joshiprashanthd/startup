import React from "react";
import {
  faCheckCircle,
  faExclamation,
  faExclamationCircle,
  faExclamationTriangle,
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
      variantIcon = faExclamationTriangle;
      break;
    case "warning":
      variantColor = "orange";
      variantIcon = faExclamationCircle;
      break;
    case "success":
      variantColor = "green";
      variantIcon = faCheckCircle;
      break;
  }
  return (
    <p
      className={`w-full px-2 py-1 text-sm font-medium font-body text-white bg-${variantColor}-500 rounded`}
      {...restProps}
    >
      <FontAwesomeIcon icon={variantIcon} color="white" className="mr-1" />{" "}
      {children}
    </p>
  );
};
