import React from "react";
import { InputField } from "../mini-components/InputField";

export const SignInCard = function (props: any) {
  return (
    <div className="w-7/12 p-4 rounded-lg shadow-md">
      <InputField label="Email" />
      <InputField label="Password" inputType="password" />
      <Button>Sign In</Button>
      <p className="mt-2 text-center">
        Create a new account <Link onClick={props.toggleCard}>Sign Up</Link>
      </p>
    </div>
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
    <span className="text-blue-700 cursor-pointer hover:underline" {...props}>
      {props.children}
    </span>
  );
};
