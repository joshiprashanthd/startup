import React from "react";

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  onSelectDate: (value: string) => void;
}

export const DatePicker: React.FC<IProps> = function ({
  onSelectDate = (value: string) => {},
}) {
  const handleStartingDate = (event: React.FormEvent<HTMLInputElement>) => {
    onSelectDate(event.currentTarget.value);
  };

  return (
    <input
      type="date"
      onChange={handleStartingDate}
      className="p-2 text-sm font-medium border rounded shadow-sm cursor-pointer font-body focus:outline-none"
    />
  );
};
