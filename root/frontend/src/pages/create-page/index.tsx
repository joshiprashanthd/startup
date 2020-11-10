import React, { useState } from "react";
import { Dropdown } from "../../components/core/dropdown";
import { InputField } from "../../components/core/input-field";
import { Navbar } from "../../components/navbar";

export const CreatePage = function (props: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(1);

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
            <p className="text-sm font-medium font-body">
              Choose project starting date
            </p>
            <p className="text-xs text-gray-600 font-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
              voluptatibus officia nulla ad illo maiores, saepe a.
            </p>
          </div>
          <div className="ml-8">
            <input
              type="date"
              className="p-2 text-sm font-medium border rounded shadow-sm cursor-pointer font-body focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-between my-4">
          <Dropdown
            label={`${duration} Weeks`}
            onSelected={(value: any) => setDuration(value)}
          >
            <Dropdown.Menu>
              <Dropdown.Item value={1}>1 weeks</Dropdown.Item>
              <Dropdown.Item value={2}>2 weeks</Dropdown.Item>
              <Dropdown.Item value={3}>3 weeks</Dropdown.Item>
              <Dropdown.Item value={4}>4 weeks</Dropdown.Item>
              <Dropdown.Item value={5}>5 weeks</Dropdown.Item>
              <Dropdown.Item value={6}>6 weeks</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
