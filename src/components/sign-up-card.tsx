import { useMutation } from "@apollo/client";
import React, { useState } from "react";

//local
import { CREATE_USER_MUTATION } from "../graphql/user/mutation";
import {
  validateEmail,
  validateHandler,
  validateName,
  validatePassword,
} from "../utils/input/validators";
import { Alert } from "./core/alert";
import { Anchor } from "./core/anchor";
import { Button } from "./core/button";
import { InputField } from "./core/input-field";
import { Loader } from "./core/loader";

export const SignUpCard = function (props: any) {
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [handler, setHandler] = useState("");

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [exists, setExists] = useState<string[]>([]);

  const [sentEmail, setSentEmail] = useState(false);

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
          setExists([]);
          setSentEmail(true);
          console.log(resData);
        })
        .catch((err) => {
          setExists([]);
          if ((err.message as string).includes("email"))
            setExists((prev) => [...prev, "email"]);
          if ((err.message as string).includes("handler"))
            setExists((prev) => [...prev, "handler"]);
        });
    }
  };

  return (
    <div className="w-7/12 p-4 rounded-lg shadow-md">
      {sentEmail && (
        <Alert variant="info">Verification link sent to your email</Alert>
      )}
      <InputField
        label="Name"
        onInputChange={setName}
        showError={validationErrors.includes("name")}
        errorMessage="Name must contain only alphabets"
      />
      <InputField
        label="Handler"
        onInputChange={setHandler}
        showError={
          validationErrors.includes("handler") || exists.includes("handler")
        }
        errorMessage={
          exists.includes("handler")
            ? "Handler already exist. Try a different one"
            : "Handler must be alphanumeric"
        }
      />
      <InputField
        label="Email"
        onInputChange={setEmail}
        showError={
          validationErrors.includes("email") || exists.includes("email")
        }
        errorMessage={
          exists.includes("email")
            ? "Email already registered"
            : "Email is not valid"
        }
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
        {loading ? <Loader /> : "Sign Up"}
      </Button>
      <p className="mt-2 text-sm text-center font-body">
        Already have an account?{" "}
        <Anchor
          onClick={props.toggleCard}
          textColor="purple-700"
          fontWeight="medium"
        >
          Sign In
        </Anchor>
      </p>
    </div>
  );
};
