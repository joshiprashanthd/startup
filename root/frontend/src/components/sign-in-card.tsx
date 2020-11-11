import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";

//local
import { InputField } from "./core/input-field";
import { Loader } from "./core/loader";
import { Button } from "./core/button";
import { Alert } from "./core/alert";
import { SIGN_IN_MUTATION } from "../graphql/user/mutation";
import AuthContext, { IAuthInfo } from "../contexts/auth-context";

export const SignInCard = function (props: any) {
  const authContext = useContext(AuthContext);

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
        const user: IAuthInfo = {
          id: resData.data.signIn.id,
          ...resData.data.signIn.accountInfo,
        };

        (authContext as any).signIn(user);
      })
      .catch((err) => {
        if ((err.message as string).includes("email"))
          setEmailOrPasswordError(true);
        else setServerError(true);
      });
  };

  return (
    <div className="w-7/12 p-4 rounded-lg shadow-md">
      {emailOrPasswordError && (
        <Alert variant="error">Incorrect email or password</Alert>
      )}
      {serverError && <Alert variant="error">Server Error</Alert>}

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
      <p className="mt-2 text-sm text-center font-body">
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
