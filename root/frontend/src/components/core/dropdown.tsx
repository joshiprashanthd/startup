import React, { createContext, useContext, useState } from "react";
import { Button } from "./button";

interface IDropdownContext {
  onSelected: ((value: any) => void) | null;
  showDropdown: ((value: any) => void) | null;
}

const DropdownContext = createContext<IDropdownContext>({
  onSelected: null,
  showDropdown: null,
});

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelected?: (value: any) => void;
  label?: string;
  icon?: any;
  variant?: any;
}

export const Dropdown: React.FC<IProps> & {
  Menu: React.FC<any>;
  ItemHeader: React.FC<any>;
  Item: React.FC<any>;
} = function ({
  children,
  onSelected = null,
  label = null,
  icon = null,
  variant = "primary",
}) {
  const [show, setShow] = useState(false);

  return (
    <DropdownContext.Provider
      value={{
        onSelected: onSelected,
        showDropdown: setShow,
      }}
    >
      <div className="relative inline-block text-left">
        <div>
          <Button variant={variant} onClick={() => setShow((prev) => !prev)}>
            {label}
            {icon}
          </Button>
        </div>
        {show && children}
      </div>
    </DropdownContext.Provider>
  );
};

const Menu: React.FC<{ width?: any; height?: any }> = function ({
  children,
  width = "auto",
  height = "auto",
}) {
  return (
    <div
      className={`absolute border right-0 z-10 py-1 w-${width} h-${height} overflow-y-auto mt-2 mb-4 text-sm origin-top-right bg-white rounded-md shadow-lg font-body whitespace-no-wrap`}
    >
      {children}
    </div>
  );
};

const ItemHeader: React.FC = function ({ children }) {
  return (
    <div className="p-2 text-sm font-semibold text-gray-700 uppercase">
      <span>{children}</span>
    </div>
  );
};

const Item: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { value: any }
> = function ({ children, value, onClick, ...restProps }) {
  const dropdownContext = useContext(DropdownContext);
  return (
    <div
      className="w-full px-3 py-1 text-sm cursor-pointer hover:bg-purple-700 hover:text-white"
      onClick={(event) => {
        if (dropdownContext.onSelected) dropdownContext.onSelected(value);
        if (dropdownContext.showDropdown) dropdownContext.showDropdown(false);
        if (onClick) onClick(event);
      }}
      {...restProps}
    >
      <span>{children}</span>
    </div>
  );
};

Dropdown.Menu = Menu;
Dropdown.ItemHeader = ItemHeader;
Dropdown.Item = Item;
