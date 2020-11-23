import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { Loader } from "../../components/core/loader";
import { Page } from "../../components/core/page";
import { Navbar } from "../../components/navbar";
import { PROJECT_BY_ID } from "../../graphql/project/query";

export const ProjectPage = function (props: any) {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, loading } = useQuery(PROJECT_BY_ID, {
    variables: {
      projectId,
    },
  });

  return (
    <Page>
      <Navbar />
      {loading && <Loader />}
      {data && (
        <div className="w-4/5 mx-auto bg-gray-100">
          <ProjectTitle
            title={data.projectById.details.title}
            handler={data.projectById.details.creator.accountInfo.handler}
          />
          <ProjectDescription
            description={data.projectById.details.description}
          />
        </div>
      )}
    </Page>
  );
};

const ProjectTitle = function (props: any) {
  return (
    <div>
      <h1 className="text-3xl font-medium font-display">{props.title}</h1>
      <p>
        Posted by{" "}
        <span className="font-medium text-gray-700">@{props.handler}</span>
      </p>
    </div>
  );
};

const ProjectDescription = function (props: any) {
  return (
    <div>
      <p className="w-1/2 text-base font-body">{props.description}</p>
    </div>
  );
};
