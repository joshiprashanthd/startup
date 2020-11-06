import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

//local
import { InputField } from "../mini-components/InputField";
import { Loader } from "./Loader";

const SIGN_IN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      accountInfo {
        name
        handler
        email
      }
    }
  }
`;

export const SignInCard = function (props: any) {
  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION);

  const [showError, setShowError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    setShowError(false);
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
        setShowError(true);
      });
  };

  return (
    <div className="w-7/12 p-4 rounded-lg shadow-md">
      {showError && <Alert>Incorrect email or password</Alert>}
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
        {loading && <Loader />} Sign In
      </Button>
      <p className="mt-2 text-center">
        New here? <Link onClick={props.toggleCard}>Sign Up</Link>
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
    <span className="text-blue-700 cursor-pointer hover:underline" {...props}>
      {props.children}
    </span>
  );
};

const Alert = function (props: any) {
  return (
    <p className="w-full p-1 text-sm font-medium text-center text-white bg-red-500 rounded">
      {props.children}
    </p>
  );
};
