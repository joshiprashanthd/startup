import React from "react";
import { Button } from "../../mini-components/Button";
import { InputGroup } from "../../mini-components/InputGroup";
import { Padding } from "../../mini-components/Padding";
import { FontSize, FontWeight, Text } from "../../mini-components/Text";
import { Card } from "../../mini-components/Card";

export const SignUpCard: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [handler, setHandler] = React.useState<string>("");

  return (
    <Card
      direction="column"
      justify="space-between"
      alignItems="center"
      width="50%"
    >
      <InputGroup label="Email" onChange={setEmail} />
      <InputGroup
        label="Password"
        onChange={setPassword}
        obscure
        validator={(value: string) => {
          if (value.length < 8 && value.length !== 0)
            return "Password must be 8 characters long.";
          return null;
        }}
      />
      <InputGroup label="Name" onChange={setName} />
      <InputGroup label="Handler" onChange={setHandler} />
      <Button>Sign Up</Button>
      <Text margin="8px 0">Already have an account? Sign Up</Text>
    </Card>
  );
};
