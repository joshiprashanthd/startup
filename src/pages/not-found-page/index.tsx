import React from "react";

//local
import { Page } from "../../components/core/page";

export const NotFoundPage = function (props: any) {
  return (
    <div className="grid w-full h-screen place-items-center">
      <h1 className="text-4xl font-light font-display">
        Page not found. <br />
        Try /auth route
      </h1>
    </div>
  );
};
