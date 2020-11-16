import React from "react";
import { useQuery } from "@apollo/client";

//local
import { Page } from "../../components/core/page";
import { Navbar } from "../../components/navbar";
import { ME_PROFILE_PAGE } from "../../graphql/user/query";
import { Chip } from "../../components/core/chip";

export const ProfilePage = function (props: any) {
  const { data, loading, error } = useQuery(ME_PROFILE_PAGE);

  console.log(data);
  console.log(loading);
  console.log(error);
  return (
    <>
      {data && (
        <Page>
          <Navbar />
          <div className="flex w-4/5 mx-auto border">
            <div className="w-1/5 p-4 left">
              <div className="grid w-56 h-56 text-6xl font-bold text-white bg-purple-700 rounded-xl place-items-center">
                PJ
              </div>
            </div>
            <div className="w-full px-8 py-4 bg-white right">
              <div className="leading-8">
                <h1 className="text-4xl font-normal text-display">
                  Prashant Joshi
                </h1>
                <h1 className="text-xl font-light text-gray-700 text-display">
                  @jastorj
                </h1>
              </div>
              <div>
                {data.me.personalInfo.interests.map((skill: any) => (
                  <Chip onDelete={() => {}} key={skill.name} value={skill.name}>
                    {" "}
                    {skill.name}{" "}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </Page>
      )}
    </>
  );
};
