import React from "react";
import { Button } from "../../mini-components/Button";
import { InputGroup } from "../../mini-components/InputGroup";
import { Text } from "../../mini-components/Text";
import { Card } from "../../mini-components/Card";
import {
  validateEmail,
  validateHandler,
  validateName,
  validatePassword,
} from "./validators";

export const SignUpCard: React.FC = () => {
  const [validationErrors, setValidationErrors] = React.useState<string[]>([]);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [handler, setHandler] = React.useState<string>("");

  const signUpHandler = () => {
    setValidationErrors([]);
    if (!validateEmail(email))
      setValidationErrors((prevState) => [...prevState, "email"]);
    if (!validatePassword(password))
      setValidationErrors((prevState) => [...prevState, "password"]);
    if (!validateName(name))
      setValidationErrors((prevState) => [...prevState, "name"]);
    if (!validateHandler(handler))
      setValidationErrors((prevState) => [...prevState, "handler"]);
  };

  return (
    <Card
      direction="column"
      justify="space-between"
      alignItems="center"
      width="50%"
    >
      <InputGroup
        label="Email"
        onChange={setEmail}
        inputErrorOccurred={validationErrors.includes("email")}
        validatorMessage="Email is not correct"
      />
      <InputGroup
        label="Password"
        onChange={setPassword}
        obscure
        inputErrorOccurred={validationErrors.includes("password")}
        validatorMessage="Password must be at least 8 characters long and must contain one digit."
      />
      <InputGroup
        label="Name"
        onChange={setName}
        inputErrorOccurred={validationErrors.includes("name")}
        validatorMessage="Names must not contain any numeric digit"
      />
      <InputGroup
        label="Handler"
        onChange={setHandler}
        inputErrorOccurred={validationErrors.includes("handler")}
        validatorMessage="Handler must be alphanumeric with no spaces"
      />
      <Button
        onClick={signUpHandler}
        disabled={
          email.length === 0 ||
          password.length === 0 ||
          handler.length === 0 ||
          name.length === 0
        }
      >
        Sign Up
      </Button>
      <Text margin="8px 0">Already have an account? Sign Up</Text>
    </Card>
  );
};
