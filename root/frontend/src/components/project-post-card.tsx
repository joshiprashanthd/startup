import React from "react";

export const ProjectPostCard = function (props: any) {
  return (
    <div className="w-4/5 p-4 rounded shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar />
          <NameAndHandler />
        </div>

        <div className="flex items-center">
          <RequestButton />
          <StarButton />
        </div>
      </div>
      <div className="mt-2">
        <ProjectTitle />
        <ProjectDescription />
      </div>
      <div className="flex items-center mt-4">
        <ExtraInfo />
        <ExtraInfo />
        <ExtraInfo />
      </div>
    </div>
  );
};

const Avatar = function (props: any) {
  return (
    <div className="grid w-10 h-10 font-bold text-white bg-blue-300 rounded-full font-body place-items-center">
      PJ
    </div>
  );
};

const NameAndHandler = function (props: any) {
  return (
    <div className="flex flex-col justify-start ml-2 leading-4">
      <span className="text-base font-medium font-body">Prashant Joshi</span>
      <span className="text-sm text-gray-600 font-body">@jastorj</span>
    </div>
  );
};

const RequestButton = function (props: any) {
  return (
    <button className="px-2 py-1 border rounded shadow-sm outline-none hover:bg-gray-100 focus:outline-none">
      Request
    </button>
  );
};

const StarButton = function (props: any) {
  return (
    <button className="px-2 py-1 border rounded shadow-sm outline-none hover:bg-gray-100 focus:outline-none">
      Star
    </button>
  );
};

const ProjectTitle = function (props: any) {
  return (
    <span className="text-xl font-medium font-display">
      Generative Adversarial Networks
    </span>
  );
};

const ProjectDescription = function (props: any) {
  return (
    <div className="text-sm font-body">
      <span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
        facere dignissimos ea odio, ullam veniam ad quaerat odit porro animi
        rerum illo eligendi maxime vero mollitia a laboriosam fuga incidunt?
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum
        voluptatum deserunt perspiciatis tenetur voluptas at suscipit blanditiis
        dignissimos, libero eius id nobis error, placeat velit reiciendis.
        Blanditiis repellendus fugiat in.
      </span>
    </div>
  );
};

const ExtraInfo = function (props: any) {
  return (
    <div className="flex-1 p-2 mr-2 text-center bg-gray-100 rounded">
      <span className="text-sm font-medium font-body">Starting On</span>
      <br />
      <span className="text-sm font-body">9 Oct, 2020</span>
    </div>
  );
};
