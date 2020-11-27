import React, { useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface IProps {
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  inputPlaceholder?: string;
}

export const InputFieldWithDropdown: React.FC<IProps> & {
  Dropdown: React.FC<any>;
  DropdownItem: React.FC<any>;
} = function ({
  children = null,
  onChange,
  value,
  inputPlaceholder = "Enter text",
}) {
  const ref = useRef(null);

  useOnClickOutside(ref, () =>
    onChange({
      currentTarget: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>)
  );

  return (
    <div className="relative w-full text-left" ref={ref}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full p-2 text-sm placeholder-gray-400 duration-200 rounded outline-none focus:outline-none font-body"
        placeholder={inputPlaceholder}
      />
      {value.length > 0 && children}
    </div>
  );
};

const Dropdown: React.FC = function ({ children }) {
  return (
    <div className="absolute object-left-top w-56 py-1 mt-2 mb-4 overflow-y-auto text-sm bg-white border rounded shadow-lg max-h-48 font-body">
      {children}
    </div>
  );
};

interface IDropdownItemProps {
  onSelect: (value: any) => void;
  value: any;
}

const DropdownItem: React.FC<IDropdownItemProps> = function ({
  children,
  onSelect,
  value,
}) {
  return (
    <div
      className="w-full p-2 text-sm bg-white cursor-pointer group hover:bg-purple-700 font-body"
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
};

InputFieldWithDropdown.Dropdown = Dropdown;
InputFieldWithDropdown.DropdownItem = DropdownItem;
