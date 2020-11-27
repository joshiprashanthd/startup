import React from "react";

export const Page = function (props: any) {
  return <div className="w-full min-h-screen py-20">{props.children};</div>;
};
