import React from "react";

export const SignUpCard = function (props: any) {
  return (
    <div className="w-7/12 p-4 mt-8 rounded-lg shadow-xl">
      <div className="my-4">
        <InputLabel secondary="*">Email</InputLabel>
        <InputField type="text" />
      </div>
      <div className="my-4">
        <InputLabel secondary="*">Password</InputLabel>
        <InputField type="password" />
      </div>
      <div className="my-4">
        <InputLabel secondary="*">Name</InputLabel>
        <InputField type="text" />
      </div>
      <div className="my-4">
        <InputLabel secondary="*">Handler</InputLabel>
        <InputField type="text" />
      </div>
      <Button>Sign Up</Button>
      <p className="mt-2 text-center">
        Already have an account? <Link onClick={props.toggleCard}>Sign In</Link>
      </p>
    </div>
  );
};

const InputLabel = function (props: any) {
  return (
    <p className="mb-2">
      {props.children}{" "}
      <span className="text-xs text-gray-500">{props.secondary}</span>
    </p>
  );
};

const InputField = function (props: any) {
  return (
    <input
      className="w-full p-2 duration-200 border border-gray-400 rounded outline-none focus:border-transparent active:border-none focus:shadow-outline "
      spellCheck="false"
      type={props.type}
    />
  );
};

const Button = function (props: any) {
  return (
    <button className="w-full py-2 mt-2 font-semibold text-white duration-200 bg-purple-500 rounded hover:bg-purple-600 focus:outline-none active:bg-purple-700">
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
