import { gql, useMutation } from "@apollo/client";
import React from "react";

//local
import AuthContext, { IUserAccountInfo } from "../../context/AuthContext";
import { Alert } from "../../mini-components/Alert";
import { Button } from "../../mini-components/Button";
import { Card } from "../../mini-components/Card";
import { InputGroup } from "../../mini-components/InputGroup";
import { Text } from "../../mini-components/Text";

const SIGNIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      accountInfo {
        email
        handler
        password
        name
      }
    }
  }
`;

interface IProps {
  toggleCardCallback: () => void;
}

export const SignInCard: React.FC<IProps> = function ({ toggleCardCallback }) {
  const authContext = React.useContext(AuthContext);

  const [signIn, { loading, error }] = useMutation(SIGNIN_MUTATION);

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const signInHandler = () => {
    signIn({
      variables: {
        email,
        password,
      },
    })
      .then((res) => {
        const user: IUserAccountInfo = {
          ...res.data.signIn.accountInfo,
          id: res.data.signIn.id,
        };

        (authContext.signIn as any)(user);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Card
      direction="column"
      justify="space-between"
      alignItems="center"
      width="50%"
    >
      <Alert show={error !== undefined}>Incorrect email or password.</Alert>
      <InputGroup label="Email" onChange={setEmail}></InputGroup>
      <InputGroup label="Password" onChange={setPassword} obscure />
      <Button
        disabled={email.length === 0 || password.length === 0}
        onClick={signInHandler}
      >
        {loading ? "Loading..." : "Sign In"}
      </Button>
      <Text margin="8px 0">
        Don't have an account?{" "}
        <Text.Link hoverTextDecoration="none" onClick={toggleCardCallback}>
          Sign Up
        </Text.Link>
      </Text>
    </Card>
  );
};
