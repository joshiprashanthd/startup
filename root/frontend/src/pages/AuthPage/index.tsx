import React from "react";
import { SignInCard } from "../../components/SignInCard";
import { SignUpCard } from "../../components/SignUpCard";

export const AuthPage = function (props: any) {
  const [showSignIn, setShowSignIn] = React.useState(true);

  return (
    <div className="flex flex-row items-center justify-center w-4/5 min-h-screen mx-auto">
      <div className="w-full text-center md:w-1/2">
        <h1 className="text-xl md:text-5xl font-display">
          collabs lets you find amazing people from all over the world to work
          with
        </h1>
      </div>
      <div className="grid w-1/2 place-items-center">
        {showSignIn ? (
          <SignInCard toggleCard={() => setShowSignIn((prev) => !prev)} />
        ) : (
          <SignUpCard toggleCard={() => setShowSignIn((prev) => !prev)} />
        )}
      </div>
    </div>
  );
};
