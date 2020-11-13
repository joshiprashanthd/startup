import { useMutation } from "@apollo/client";
import React, { useState } from "react";

//local
import { TOGGLE_STAR_PROJECT } from "../../graphql/project/mutation";
import { ProjectPostCard } from "./project-post-card";

export default function (props: any) {
  const { project } = props;

  const [starred, setStarred] = useState(project.isStarred);
  const [toggleStarProject] = useMutation(TOGGLE_STAR_PROJECT, {
    onCompleted: (data) => {
      setStarred(data.toggleStarProject);
    },
  });

  const toggleStarCallback = async () => {
    toggleStarProject({
      variables: {
        projectId: project.id,
      },
    });
  };
  return (
    <ProjectPostCard
      project={Object.assign({ ...project }, { isStarred: starred })}
      toggleStarCallback={toggleStarCallback}
    />
  );
}
