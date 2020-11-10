import React from "react";
import { Navbar } from "../../components/navbar";

export const HomePage = function (props: any) {
  return (
    <div className="w-full min-h-screen">
      <Navbar selected="explore" />
      <h1 className="w-full h-screen text-4xl font-display"> The home page</h1>
    </div>
  );
};
