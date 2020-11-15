import React from "react";

interface IProps {
  label?: string;
  secondaryLabel?: string;
  inputType?: string;
  showError?: boolean;
  errorMessage?: string;
  onInputChange?: (value: string) => void;
  textareaMode?: boolean;
}

export const InputField: React.FC<IProps> = function ({
  label,
  secondaryLabel,
  inputType = "text",
  showError = false,
  errorMessage,
  onInputChange,
  textareaMode = false,
}) {
  return (
    <div className="my-4">
      <Label secondary={secondaryLabel}>{label}</Label>
      {!textareaMode && (
        <Input type={inputType} onChange={onInputChange} error={showError} />
      )}
      {textareaMode && <Textarea onChange={onInputChange} />}
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
  const onChangeHandler = (event: any) => {
    props.onChange(event.currentTarget.value);
  };

  return (
    <input
      className={`w-full p-2 text-sm duration-200 border ${
        props.error ? "border-red-600" : ""
      } border-gray-400 rounded outline-none focus:border-transparent active:border-none focus:shadow-outline${
        props.error ? "-red" : ""
      } font-body`}
      spellCheck="false"
      type={props.type}
      onChange={onChangeHandler}
    />
  );
};

const Textarea = function (props: any) {
  const onChangeHandler = (event: any) => {
    props.onChange(event.currentTarget.value);
  };

  return (
    <textarea
      className="h-24 min-w-full p-2 text-sm duration-200 border border-gray-400 rounded outline-none appearance-none focus:shadow-outline font-body focus:outline-none"
      onChange={onChangeHandler}
    ></textarea>
  );
};

const Error = function (props: any) {
  return <p className="text-xs font-medium text-red-600">{props.children}</p>;
};
