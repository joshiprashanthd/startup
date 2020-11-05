import { gql, useMutation } from "@apollo/client";
import React from "react";
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

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [handler, setHandler] = React.useState("");

  const onSignUp = () => {
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
  };

  return (
    <div className="w-7/12 p-4 rounded-lg shadow-md">
      <InputField label="Name" onInputChange={setName} />
      <InputField label="Handler" onInputChange={setHandler} />
      <InputField label="Email" onInputChange={setEmail} />
      <InputField
        label="Password"
        inputType="password"
        onInputChange={setPassword}
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
