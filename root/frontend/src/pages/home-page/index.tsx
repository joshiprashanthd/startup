import { useQuery } from "@apollo/client";
import React from "react";
import { Loader } from "../../components/core/loader";
import { Navbar } from "../../components/navbar";
import ProjectPostCard from "../../components/project-post-card";
import { PROJECTS } from "../../graphql/project/query";

export const HomePage = function (props: any) {
  const { data, loading, error } = useQuery(PROJECTS);

  return (
    <div className="w-full min-h-screen">
      <Navbar selected="explore" />
      <div className="w-2/4 min-h-screen py-16 mx-auto">
        {loading && <Loader />}
        {data &&
          data.projects.map((project: any) => (
            <ProjectPostCard project={project} key={project.id} />
          ))}
      </div>
    </div>
  );
};
