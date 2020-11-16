import React from "react";
import { useQuery } from "@apollo/client";

//local
import { Page } from "../../components/core/page";
import { Navbar } from "../../components/navbar";
import { ME_PROFILE_PAGE } from "../../graphql/user/query";

export const ProfilePage = function (props: any) {
  const { data } = useQuery(ME_PROFILE_PAGE);
  return (
    <Page>
      <Navbar />
      <h1 className="text-4xl font-display">User profile</h1>
    </Page>
  );
};
