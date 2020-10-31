import React from "react";
import { gql, useMutation } from "@apollo/client";

//local
import { Button } from "../../mini-components/Button";
import { InputGroup } from "../../mini-components/InputGroup";
import { Text } from "../../mini-components/Text";
import { Card } from "../../mini-components/Card";
import {
  validateEmail,
  validateHandler,
  validateName,
  validatePassword,
} from "../../helpers/validators";
import AuthContext, { IUserAccountInfo } from "../../context/AuthContext";
import { Spinner } from "../../mini-components/Spinner";

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: StrictUserInput!) {
    createUser(input: $input) {
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

export const SignUpCard: React.FC<IProps> = ({ toggleCardCallback }) => {
  const authContext = React.useContext(AuthContext);

  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION);

  const [validationErrors, setValidationErrors] = React.useState<string[]>([]);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [handler, setHandler] = React.useState<string>("");

  const signUpHandler = () => {
    setValidationErrors([]);
    if (!validateEmail(email))
      setValidationErrors((prevState) => [...prevState, "email"]);
    if (!validatePassword(password))
      setValidationErrors((prevState) => [...prevState, "password"]);
    if (!validateName(name))
      setValidationErrors((prevState) => [...prevState, "name"]);
    if (!validateHandler(handler))
      setValidationErrors((prevState) => [...prevState, "handler"]);

    if (validationErrors.length === 0) {
      createUser({
        variables: {
          input: {
            accountInfo: {
              email,
              password,
              name,
              handler,
            },
          },
        },
      })
        .then((res) => {
          const user: IUserAccountInfo = {
            ...res.data.createUser.accountInfo,
            id: res.data.id,
          };
          (authContext.signIn as any)(user);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <Card
      direction="column"
      justify="space-between"
      alignItems="center"
      width="50%"
    >
      <InputGroup
        label="Email"
        onChange={setEmail}
        inputErrorOccurred={validationErrors.includes("email")}
        validatorMessage="Email is not correct"
      />
      <InputGroup
        label="Password"
        onChange={setPassword}
        obscure
        inputErrorOccurred={validationErrors.includes("password")}
        validatorMessage="Password must be at least 8 characters long and must contain one digit."
      />
      <InputGroup
        label="Name"
        onChange={setName}
        inputErrorOccurred={validationErrors.includes("name")}
        validatorMessage="Names must not contain any numeric digit"
      />
      <InputGroup
        label="Handler"
        onChange={setHandler}
        inputErrorOccurred={validationErrors.includes("handler")}
        validatorMessage="Handler must be alphanumeric with no spaces"
      />
      <Button
        onClick={signUpHandler}
        disabled={
          email.length === 0 ||
          password.length === 0 ||
          handler.length === 0 ||
          name.length === 0
        }
      >
        {loading ? "Loading..." : "Sign Up"}
      </Button>
      <Text margin="8px 0">
        Already have an account?{" "}
        <Text.Link onClick={toggleCardCallback} hoverTextDecoration="none">
          Sign In
        </Text.Link>
      </Text>
    </Card>
  );
};
