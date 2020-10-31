import React from "react";
import { AuthCard } from "../../components/AuthCard";
import { Text } from "../../mini-components/Text";
import { HeadingSize } from "../../mini-components/Text/Heading";
import { StyledContent, StyledPage } from "./styles";

export default function AuthPage() {
  return (
    <StyledPage>
      <StyledContent>
        <Text.Heading fontSize={HeadingSize.NORMAL}>
          collabs lets you build projects and collaborate with others as a team
        </Text.Heading>
      </StyledContent>
      <StyledContent>
        <AuthCard />
      </StyledContent>
    </StyledPage>
  );
}
