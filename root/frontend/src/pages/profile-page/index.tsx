import { useQuery } from "@apollo/client";
import React from "react";
import { Navbar } from "../../components/navbar";
import { ME_PROFILE_PAGE } from "../../graphql/user/query";

export const ProfilePage = function (props: any) {
  const { data, loading, error } = useQuery(ME_PROFILE_PAGE);
  console.log(data);
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-display">User profile</h1>
    </div>
  );
};
