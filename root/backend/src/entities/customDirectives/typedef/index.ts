import { gql } from "apollo-server-express";

export default gql`
	directive @guest on FIELD_DEFINITION
	directive @auth on FIELD_DEFINITION
	directive @private on FIELD_DEFINITION
`;
