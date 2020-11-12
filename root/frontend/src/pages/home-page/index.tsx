import React from "react";
import { Navbar } from "../../components/navbar";
import { ProjectPostCard } from "../../components/project-post-card";

export const HomePage = function (props: any) {
  return (
    <div className="w-full min-h-screen">
      <Navbar selected="explore" />
      <div className="w-2/4 min-h-screen py-16 mx-auto">
        <ProjectPostCard />
      </div>
    </div>
  );
};
