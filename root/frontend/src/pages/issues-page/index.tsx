import React from "react";
import { Navbar } from "../../components/navbar";

export const IssuesPage = function (props: any) {
  return (
    <div className="w-full min-h-screen">
      <Navbar selected="issues" />
      <div className="grid w-full h-screen text-4xl place-items-center font-display">
        Coming Soon...
      </div>
    </div>
  );
};
