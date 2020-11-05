import React from "react";
import { SignInCard } from "../../components/SignInCard";
import { SignUpCard } from "../../components/SignUpCard";

export const AuthPage = function (props: any) {
  const [showSignIn, setShowSignIn] = React.useState(true);

  return (
    <div className="flex flex-row items-center justify-center w-4/5 min-h-screen mx-auto ">
      <div className="w-1/2">
        <h1 className="text-xl font-semibold md:text-5xl font-display ">
          <span className="text-purple-500 ">collabs</span>
          <span className="text-black"> lets you collaborate</span>
        </h1>
        <p className="w-8/12 text-lg text-gray-600">
          Collabs is the platform where you can turn your dream into reality by
          working together with skilled people all over the world.
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
