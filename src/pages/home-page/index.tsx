import { useQuery } from "@apollo/client";
import React from "react";

//local
import { Loader } from "../../components/core/loader";
import { Page } from "../../components/core/page";
import { Navbar } from "../../components/navbar";
import ProjectPostCard from "../../components/project-post-card";
import { PROJECTS } from "../../graphql/project/query";

export const HomePage = function (props: any) {
  const { data, loading } = useQuery(PROJECTS);

  return (
    <Page>
      <Navbar selected="explore" />
      <div className="w-2/4 mx-auto">
        {loading && <Loader />}
        {data &&
          data.projects.map((project: any) => (
            <ProjectPostCard project={project} key={project.id} />
          ))}
      </div>
    </Page>
  );
};
