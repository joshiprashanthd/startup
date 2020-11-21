import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IProps {
  style?: "light" | "solid";
  color?: string;
  value?: string;
  onDelete?: (value: string) => void;
}

export const Chip: React.FC<IProps> = function ({
  style = "light",
  color = "purple",
  onDelete = null,
  value,
  children,
}) {
  return (
    <div
      className={`flex w-fit-content items-center font-medium text-xs py-1 px-2 rounded-full ${
        style === "light" && `text-${color}-700 bg-${color}-100`
      } ${style === "solid" && `text-white bg-${color}-700`} capitalize`}
    >
      {children}
      {onDelete && (
        <FontAwesomeIcon
          icon={faTimes}
          className={`ml-2 cursor-pointer text-${color}-700`}
          onClick={() => {
            onDelete(value || "");
          }}
        />
      )}
    </div>
  );
};
