import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  value?: string;
  onDelete?: (value: string) => void;
}

export const Chip: React.FC<IProps> = function ({
  color = "purple",
  onDelete = null,
  value,
  children,
}) {
  return (
    <div
      className={`flex w-fit-content items-center font-medium text-xs py-1 px-2 rounded-full text-${color}-700 bg-${color}-100`}
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
