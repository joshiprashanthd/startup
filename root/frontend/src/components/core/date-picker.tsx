import React from "react";

export const DatePicker = function (props: any) {
  const handleStartingDate = (event: React.FormEvent<HTMLInputElement>) => {
    props.onSelectDate(event.currentTarget.value);
  };

  return (
    <input
      type="date"
      onChange={handleStartingDate}
      className="p-2 text-sm font-medium border rounded shadow-sm cursor-pointer font-body focus:outline-none"
    />
  );
};
