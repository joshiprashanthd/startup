import { printSourceLocation } from "graphql";
import React, { createContext, useContext, useState } from "react";

const DropdownContext = createContext({
  onSelected: (value: any) => {},
  showDropdown: (value: any) => {},
});

export const Dropdown = function (props: any) {
  const [show, setShow] = useState(false);

  return (
    <DropdownContext.Provider
      value={{
        onSelected: props.onSelected || ((value: any) => {}),
        showDropdown: setShow,
      }}
    >
      <div className="relative inline-block text-left">
        <div>
          <button
            onClick={() => setShow((prev) => !prev)}
            className="px-3 py-2 text-sm font-medium transition duration-200 ease-in-out border rounded shadow-sm focus:outline-none focus:bg-gray-100"
          >
            {props.label}
            {props.icon}
          </button>
        </div>
        {show && props.children}
      </div>
    </DropdownContext.Provider>
  );
};

Dropdown.Menu = function (props: any) {
  return (
    <div
      className={
        `absolute right-0 z-10 py-1 w-${
          props.width || "auto"
        } mt-2 text-sm origin-top-right bg-white rounded-md shadow-lg font-body` +
        " " +
        (props.additionalClasses || "")
      }
    >
      {props.children}
    </div>
  );
};

Dropdown.ItemHeader = function (props: any) {
  return (
    <div className="p-2 text-xs font-semibold text-gray-700">
      <span>{props.children}</span>
    </div>
  );
};

Dropdown.Item = function (props: any) {
  const dropdownContext = useContext(DropdownContext);
  return (
    <div
      className="w-full p-2 text-sm cursor-pointer hover:bg-purple-500 hover:text-white"
      onClick={() => {
        if (dropdownContext.onSelected) dropdownContext.onSelected(props.value);
        dropdownContext.showDropdown(false);
        if (props.onClick) props.onClick();
      }}
    >
      <span>{props.children}</span>
    </div>
  );
};
