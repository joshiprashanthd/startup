import React, { useState } from "react";
import moment from "moment";

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
  onSelectDate: (value: string) => void;
  initialValue?: number;
}

export const DatePicker: React.FC<IProps> = function ({
  onSelectDate = (value: string) => {},
  initialValue = moment.now(),
}) {
  const [value, setValue] = useState(
    moment.utc(initialValue).format("YYYY-MM-DD")
  );

  const handleStartingDate = (event: React.FormEvent<HTMLInputElement>) => {
    onSelectDate(event.currentTarget.value);
    setValue(event.currentTarget.value);
  };

  return (
    <input
      type="date"
      value={value}
      onChange={handleStartingDate}
      className="p-2 text-sm font-medium border rounded shadow-sm cursor-pointer font-body focus:outline-none"
    />
  );
};
