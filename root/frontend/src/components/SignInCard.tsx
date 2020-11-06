import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

//local
import { InputField } from "../mini-components/InputField";
import { Loader } from "./Loader";
import { Button } from "../mini-components/Button";
import { Alert } from "../mini-components/Alert";
import { SIGN_IN_MUTATION } from "../graphql/user/mutation";

export const SignInCard = function (props: any) {
  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION);

  const [emailOrPasswordError, setEmailOrPasswordError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    setEmailOrPasswordError(false);
    setServerError(false);
    signIn({
      variables: {
        email,
        password,
      },
    })
      .then((resData) => {
        console.log(resData);
      })
      .catch((err) => {
        if ((err.message as string).includes("email"))
          setEmailOrPasswordError(true);
        else setServerError(true);
      });
  };

  return (
    <div className="w-7/12 p-4 rounded-lg shadow-md">
      {emailOrPasswordError && <Alert>Incorrect email or password</Alert>}
      {serverError && <Alert>Server Error</Alert>}
      <InputField label="Email" onInputChange={setEmail} />
      <InputField
        label="Password"
        inputType="password"
        onInputChange={setPassword}
      />
      <Button
        disabled={email.length === 0 || password.length === 0}
        onClick={onSignIn}
      >
        {loading ? <Loader /> : "Sign In"}
      </Button>
      <p className="mt-2 text-center">
        New here? <Link onClick={props.toggleCard}>Sign Up</Link>
      </p>
    </div>
  );
};

const Link = function (props: any) {
  return (
    <span className="text-blue-700 cursor-pointer hover:underline" {...props}>
      {props.children}
    </span>
  );
};
