import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useContext, useState } from "react";

const DropdownContext = createContext({
  onSelected: (value: any) => {},
  showDropdown: (value: any) => {},
});

export const Dropdown = function (props: any) {
  const [show, setShow] = useState(false);

  return (
    <DropdownContext.Provider
      value={{ onSelected: props.onSelected, showDropdown: setShow }}
    >
      <div className="relative inline-block text-left">
        <div>
          <button
            onClick={() => setShow((prev) => !prev)}
            className="px-3 py-2 text-sm font-medium transition duration-200 ease-in-out border rounded shadow-sm focus:outline-none focus:bg-gray-100"
          >
            {props.label}
            <FontAwesomeIcon icon={faAngleDown} className="ml-4" />
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
        "absolute right-0 z-10 min-w-full mt-2 text-sm origin-top-right bg-white rounded-md shadow-lg font-body" +
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
    <span className="block p-2 text-xs font-semibold text-gray-800">
      {props.children}
    </span>
  );
};

Dropdown.Item = function (props: any) {
  const dropdownContext = useContext(DropdownContext);
  return (
    <p
      className="block min-w-full p-2 text-sm rounded cursor-pointer hover:bg-gray-300"
      onClick={() => {
        dropdownContext.onSelected(props.value);
        dropdownContext.showDropdown(false);
      }}
    >
      {props.children}
    </p>
  );
};
