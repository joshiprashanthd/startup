import React, { ChangeEvent, useState } from "react";

interface IProps {
  label?: string;
  secondaryLabel?: string;
  inputType?: string;
  showError?: boolean;
  errorMessage?: string;
  onInputChange?: (value: string) => void;
  textareaMode?: boolean;
  initialValue?: string;
}

export const InputField: React.FC<IProps> = function ({
  label,
  secondaryLabel,
  inputType = "text",
  showError = false,
  errorMessage,
  onInputChange,
  textareaMode = false,
  initialValue = "",
}) {
  return (
    <div className={`${label && "my-4"}`}>
      {label && <Label secondary={secondaryLabel}>{label}</Label>}
      {!textareaMode && (
        <Input
          type={inputType}
          onChange={onInputChange}
          error={showError}
          initialValue={initialValue}
        />
      )}
      {textareaMode && (
        <Textarea onChange={onInputChange} initialValue={initialValue} />
      )}
      {showError && <Error>{errorMessage}</Error>}
    </div>
  );
};

const Label = function (props: any) {
  return (
    <p className="mb-2 text-sm font-medium font-body">
      {props.children}{" "}
      <span className="text-xs text-gray-500">{props.secondary}</span>
    </p>
  );
};

const Input = function (props: any) {
  const [value, setValue] = useState(props.initialValue);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    props.onChange(event.currentTarget.value);
  };

  return (
    <input
      className={`w-full p-2 text-sm duration-200 bg-gray-100 ${
        props.error ? "border-red-600" : ""
      } border-gray-400 rounded outline-none focus:border-transparent focus:bg-white active:border-none focus:shadow-outline${
        props.error ? "-red" : ""
      } font-body`}
      spellCheck="false"
      type={props.type}
      value={value}
      onChange={onChangeHandler}
    />
  );
};

const Textarea = function (props: any) {
  const [value, setValue] = useState(props.initialValue);

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
    props.onChange(event.currentTarget.value);
  };

  return (
    <textarea
      className="h-24 min-w-full p-2 text-sm duration-200 bg-gray-100 border-gray-400 rounded outline-none appearance-none focus:shadow-outline focus:bg-white font-body focus:outline-none"
      onChange={onChangeHandler}
      value={value}
    ></textarea>
  );
};

const Error = function (props: any) {
  return <p className="text-xs font-medium text-red-600">{props.children}</p>;
};
