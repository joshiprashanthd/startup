import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { Loader } from "../../components/core/loader";
import { Page } from "../../components/core/page";
import { PROJECT_BY_ID } from "../../graphql/project/query";

export const ProjectPage = function (props: any) {
  const { projectId } = useParams<{ projectId: string }>();
  const { data, loading, error } = useQuery(PROJECT_BY_ID, {
    variables: {
      projectId,
    },
  });

  return (
    <>
      {loading && <Loader />}
      {data && (
        <Page>
          <div className="w-4/5 mx-auto">
            <h1>{data.projectById.details.title}</h1>
          </div>
        </Page>
      )}
    </>
  );
};
