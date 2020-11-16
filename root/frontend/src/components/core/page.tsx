import React from "react";

export const Page = function (props: any) {
  return <div className="w-full min-h-screen py-16">{props.children};</div>;
};
