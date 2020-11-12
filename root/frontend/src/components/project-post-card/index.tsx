import React from "react";

//local
import { ProjectPostCard } from "./project-post-card";

export default function (props: any) {
  const { project } = props;
  return <ProjectPostCard project={project} />;
}
