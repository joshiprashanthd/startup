import React from "react";
import { SignUpCard } from "../../components/SignUpCard";
import { StyledContent, StyledPage } from "./styles";

export default function AuthPage() {
  return (
    <StyledPage>
      <StyledContent>
        collabs lets you find team for you project and implement your ideas.
      </StyledContent>
      <StyledContent>
        <SignUpCard></SignUpCard>
      </StyledContent>
    </StyledPage>
  );
}
