import React, { useState } from "react";
import { InputField } from "../../components/core/input-field";
import { Navbar } from "../../components/navbar";

export const CreatePage = function (props: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="w-full min-h-screen">
      <Navbar selected="create" />
      <div className="w-2/4 h-screen mx-auto mt-16">
        <h1 className="text-4xl font-semibold font-display">
          Create new project
        </h1>
        <InputField label="Title" onInputChange={setTitle} />
        <InputField label="Description" onInputChange={setDescription} />
        <hr />
        <div className="flex flex-row items-center justify-between my-4">
          <div className="flex flex-col items-start mr-8">
            <p className="font-semibold font-body">Choose starting date</p>
            <p className="text-sm text-gray-600 font-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
              voluptatibus officia nulla ad illo maiores, saepe a.
            </p>
          </div>
          <div className="ml-8">
            <input
              type="date"
              className="p-2 text-sm font-semibold border rounded shadow-sm cursor-pointer font-body focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between my-4"></div>
      </div>
    </div>
  );
};
