import React from "react";
import { StyledInputGroup } from "./styles";

import { FontSize, FontWeight, Text } from "../Text";
import { Input } from "../Input";

interface IProps {
  label: string;
  secondaryLabel?: string;
  obscure?: boolean;
  onChange: (value: string) => void;
  validator?: (value: string) => string | null;
}

export const InputGroup: React.FC<IProps> = function ({
  label = null,
  secondaryLabel = null,
  obscure = false,
  validator = null,
  onChange = (value: string) => {},
}) {
  const [error, setError] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    if (validator)
      if (validator(event.currentTarget.value) !== null) setError(true);
    onChange(event.currentTarget.value);
  };

  return (
    <StyledInputGroup>
      <Text fontWeight={FontWeight.BOLD}>{label} </Text>
      <Text
        fontSize={FontSize.SMALL}
        fontWeight={FontWeight.BOLD}
        fontColor="grey"
      >
        {secondaryLabel}
      </Text>
      <Input
        padding="10px"
        onChange={onChangeHandler}
        value={value}
        type={obscure ? "password" : "text"}
      />
      {error && validator ? (
        <Text fontSize={FontSize.SMALL} fontColor="red">
          {validator(value)}
        </Text>
      ) : null}
    </StyledInputGroup>
  );
};
