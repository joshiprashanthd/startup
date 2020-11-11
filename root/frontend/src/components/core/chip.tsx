import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  value: string;
  onDelete: (value: string) => void;
}

export const Chip: React.FC<IProps> = function ({
  color = "purple",
  onDelete = (value: string) => {},
  value,
  children,
}) {
  return (
    <div
      className={`flex items-center mx-1 font-medium text-sm py-1 px-2 rounded text-white bg-${color}-500`}
    >
      {children}
      <FontAwesomeIcon
        icon={faTimes}
        color="white"
        className="ml-2 cursor-pointer"
        onClick={() => onDelete(value)}
      />
    </div>
  );
};
