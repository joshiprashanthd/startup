import { useMutation } from "@apollo/client";
import React, { useState } from "react";

//local
import { TOGGLE_STAR_PROJECT } from "../../graphql/project/mutation";
import { TOGGLE_REQUEST_PROJECT } from "../../graphql/projectRequest/mutation";
import { ProjectPostCard } from "./project-post-card";

export default function (props: any) {
  const { project } = props;

  const [starred, setStarred] = useState(project.isStarred);
  const [requested, setRequested] = useState(project.isRequested);

  const [toggleRequestProject] = useMutation(TOGGLE_REQUEST_PROJECT, {
    onCompleted: (data) => {
      setRequested(data.toggleRequestProject);
    },
    onError: (err) => console.log(err),
  });

  const [toggleStarProject] = useMutation(TOGGLE_STAR_PROJECT, {
    onCompleted: (data) => {
      setStarred(data.toggleStarProject);
    },
  });

  const toggleStarCallback = () => {
    toggleStarProject({
      variables: {
        projectId: project.id,
      },
    });
  };

  const toggleRequestCallback = (message: string) => {
    toggleRequestProject({
      variables: {
        message,
        projectId: project.id,
      },
    });
  };
  return (
    <ProjectPostCard
      project={Object.assign(
        { ...project },
        { isStarred: starred, isRequested: requested }
      )}
      toggleStarCallback={toggleStarCallback}
      toggleRequestCallback={toggleRequestCallback}
    />
  );
}
