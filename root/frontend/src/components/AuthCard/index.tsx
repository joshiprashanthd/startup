import React from "react";
import { SignInCard } from "../SignInCard";
import { SignUpCard } from "../SignUpCard";

export const AuthCard: React.FC = function (props: any) {
  const [showSignUp, setShowSignUp] = React.useState<boolean>(false);

  return (
    <>
      {showSignUp ? (
        <SignUpCard toggleCardCallback={() => setShowSignUp((prev) => !prev)} />
      ) : (
        <SignInCard toggleCardCallback={() => setShowSignUp((prev) => !prev)} />
      )}
    </>
  );
};
