import React from "react";
import { SignInCard } from "../../components/sign-in-card";
import { SignUpCard } from "../../components/sign-up-card";

export const AuthPage = function (props: any) {
  const [showSignIn, setShowSignIn] = React.useState(true);

  return (
    <div className="flex flex-row items-center justify-center w-4/5 min-h-screen mx-auto ">
      <div className="w-1/2">
        <h1 className="text-6xl font-bold leading-none font-display">
          <span className="text-purple-500">collabs</span>
          <span className="text-black"> lets you collaborate</span>
        </h1>
        <p className="w-8/12 text-lg text-gray-600">
          A platform where you can share your idea and build team
        </p>
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
