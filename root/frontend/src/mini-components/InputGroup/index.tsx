import React from "react";
import { StyledInputGroup } from "./styles";

import { FontSize, FontWeight, Text } from "../Text";
import { Input } from "../Input";

interface IProps {
  label: string;
  secondaryLabel?: string;
  obscure?: boolean;
  inputErrorOccurred?: boolean;
  validatorMessage?: string;
  onChange: (value: string) => void;
}

export const InputGroup: React.FC<IProps> = function ({
  label = null,
  secondaryLabel = null,
  obscure = false,
  inputErrorOccurred = false,
  validatorMessage = null,
  onChange = (value: string) => {},
}) {
  const [value, setValue] = React.useState<string>("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    onChange(event.currentTarget.value);
  };

  return (
    <StyledInputGroup>
      <Text fontWeight={FontWeight.SEMIBOLD}>{label} </Text>
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
      {inputErrorOccurred ? (
        <Text fontSize={FontSize.SMALL} fontColor="red">
          {validatorMessage}
        </Text>
      ) : null}
    </StyledInputGroup>
  );
};
