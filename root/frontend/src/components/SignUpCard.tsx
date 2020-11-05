import { gql, useMutation } from "@apollo/client";
import React from "react";
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
      <div className="my-4">
        <InputLabel secondary="*">Name</InputLabel>
        <InputField type="text" onChange={setName} />
      </div>
      <div className="my-4">
        <InputLabel secondary="*">Handler</InputLabel>
        <InputField type="text" onChange={setHandler} />
      </div>
      <div className="my-4">
        <InputLabel secondary="*">Email</InputLabel>
        <InputField type="text" onChange={setEmail} />
      </div>
      <div className="my-4">
        <InputLabel secondary="*">Password</InputLabel>
        <InputField type="password" onChange={setPassword} />
      </div>
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

const InputLabel = function (props: any) {
  return (
    <p className="mb-2 text-sm font-semibold">
      {props.children}{" "}
      <span className="text-xs text-gray-500">{props.secondary}</span>
    </p>
  );
};

const InputField = function (props: any) {
  const onChangeHandler = (event: any) => {
    props.onChange(event.currentTarget.value);
  };

  return (
    <input
      className="w-full p-2 duration-200 border border-gray-400 rounded outline-none focus:border-transparent active:border-none focus:shadow-outline "
      spellCheck="false"
      type={props.type}
      onChange={onChangeHandler}
    />
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
