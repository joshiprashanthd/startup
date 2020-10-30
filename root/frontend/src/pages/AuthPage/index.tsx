import React from "react";
import { SignUpCard } from "../../components/SignUpCard";
import { Heading, HeadingSize } from "../../mini-components/Heading";
import { StyledContent, StyledPage } from "./styles";

export default function AuthPage() {
  return (
    <StyledPage>
      <StyledContent>
        <Heading fontSize={HeadingSize.NORMAL}>
          collabs lets you build projects and collaborate with others as a team
        </Heading>
      </StyledContent>
      <StyledContent>
        <SignUpCard></SignUpCard>
      </StyledContent>
    </StyledPage>
  );
}
