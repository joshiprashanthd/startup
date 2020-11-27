import React from "react";

//local
import { Page } from "../../components/core/page";
import { Navbar } from "../../components/navbar";

export const IssuesPage = function (props: any) {
  return (
    <Page>
      <Navbar selected="issues" />
      <div className="grid w-full h-screen text-4xl place-items-center font-display">
        Coming Soon...
      </div>
    </Page>
  );
};
