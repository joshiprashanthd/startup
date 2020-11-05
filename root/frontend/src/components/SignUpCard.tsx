import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  validateEmail,
  validateHandler,
  validateName,
  validatePassword,
} from "../helpers/validators";
import { InputField } from "../mini-components/InputField";
import { Loader } from "./Loader";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: StrictUserInput!) {
    createUser(input: $input) {
      id
      accountInfo {
        email
        handler
        name
      }
    }
  }
`;

export const SignUpCard = function (props: any) {
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [handler, setHandler] = useState("");

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const onSignUp = () => {
    let errorOccurred = false;

    setValidationErrors([]);
    if (!validateEmail(email)) {
      errorOccurred = true;
      setValidationErrors((prev) => [...prev, "email"]);
    }
    if (!validatePassword(password)) {
      errorOccurred = true;
      setValidationErrors((prev) => [...prev, "password"]);
    }
    if (!validateHandler(handler)) {
      errorOccurred = true;
      setValidationErrors((prev) => [...prev, "handler"]);
    }
    if (!validateName(name)) {
      errorOccurred = true;
      setValidationErrors((prev) => [...prev, "name"]);
    }

    if (!errorOccurred) {
      createUser({
        variables: {
          input: {
            accountInfo: {
              email,
              password,
              handler,
              name,
            },
          },
        },
      })
        .then((resData) => {
          console.log(resData);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="w-7/12 p-4 rounded-lg shadow-md">
      <InputField
        label="Name"
        onInputChange={setName}
        showError={validationErrors.includes("name")}
        errorMessage="Name must contain only alphabets"
      />
      <InputField
        label="Handler"
        onInputChange={setHandler}
        showError={validationErrors.includes("handler")}
        errorMessage="Handler must be alphanumeric"
      />
      <InputField
        label="Email"
        onInputChange={setEmail}
        showError={validationErrors.includes("email")}
        errorMessage="Email is not valid"
      />
      <InputField
        label="Password"
        inputType="password"
        onInputChange={setPassword}
        showError={validationErrors.includes("password")}
        errorMessage="Password must contain at least 8 characters and at least one digit"
      />

      <Button
        onClick={onSignUp}
        disabled={
          email.length === 0 ||
          password.length === 0 ||
          name.length === 0 ||
          handler.length === 0
        }
      >
        {loading && <Loader />}
        Sign Up
      </Button>
      <p className="mt-2 text-center">
        Already have an account? <Link onClick={props.toggleCard}>Sign In</Link>
      </p>
    </div>
  );
};

const Button = function (props: any) {
  return (
    <button
      disabled={props.disabled}
      className="inline-flex items-center justify-center w-full py-2 mt-2 font-semibold text-white duration-200 bg-purple-500 rounded hover:bg-purple-600 focus:outline-none active:bg-purple-700 disabled:opacity-50"
      {...props}
    >
      {props.children}
    </button>
  );
};

const Link = function (props: any) {
  return (
    <span
      className="text-blue-700 border-purple-600 rounded-full cursor-pointer hover:underline border-1"
      {...props}
    >
      {props.children}
    </span>
  );
};
