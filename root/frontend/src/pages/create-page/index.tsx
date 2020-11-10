import React from "react";
import { Navbar } from "../../components/navbar";

export const CreatePage = function (props: any) {
  return (
    <div className="w-full min-h-screen">
      <Navbar selected="explore" />
      <h1 className="w-full h-screen text-4xl font-display">The create page</h1>
    </div>
  );
};
