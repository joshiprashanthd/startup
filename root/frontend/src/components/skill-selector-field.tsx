import { useLazyQuery, useQuery } from "@apollo/client";
import Fuse from "fuse.js";
import React, { useState } from "react";
import { SKILLS_WITH_NAME_ID } from "../graphql/skill/query";

//local
import { Chip } from "./core/chip";
import { Loader } from "./core/loader";

export const SkillSelectorField = function (props: any) {
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);

  const handleOnSelect = (skill: any) => {
    setSelectedSkills((prev) => [...prev, skill]);
  };

  const handleOnDelete = (value: string) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill.id !== value));
  };

  return (
    <div className="flex items-center w-full my-2 text-left border rounded shadow-sm">
      {selectedSkills.map((skill) => (
        <Chip onDelete={handleOnDelete} key={skill.id} value={skill.id}>
          {" "}
          {skill.name}{" "}
        </Chip>
      ))}
      <InputField onSelect={handleOnSelect} selectedSkills={selectedSkills} />
    </div>
  );
};

const InputField = function (props: any) {
  const [loadSkills, { called, loading, data }] = useLazyQuery(
    SKILLS_WITH_NAME_ID
  );

  const [value, setValue] = useState("");

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (!data) loadSkills();
    setValue(event.currentTarget.value);
  };

  const handleOnSelect = (skill: any) => {
    props.onSelect(skill);
    setValue("");
  };

  return (
    <div className="relative w-full text-left">
      <input
        type="text"
        value={value}
        onChange={handleInput}
        className="w-full p-2 text-sm placeholder-gray-400 focus:outline-none font-body"
        placeholder="Enter required skills"
      />
      {value.length > 0 && (
        <Dropdown
          called={called}
          loading={loading}
          data={data}
          value={value}
          onSelect={handleOnSelect}
          selectedSkills={props.selectedSkills}
        />
      )}
    </div>
  );
};

const Dropdown = function (props: any) {
  return (
    <div className="absolute object-left-top w-56 py-1 mt-2 overflow-y-auto text-sm bg-white rounded shadow-lg max-h-48 font-body">
      {props.called && props.loading && <Loader color="purple-500" />}
      {props.data &&
        new Fuse(props.data.skills, {
          keys: ["name", "description"],
        })
          .search(props.value)
          .map((skill: any) =>
            props.selectedSkills.find(
              (skillObj: { id: any }) => skillObj.id === skill.item.id
            ) ? null : (
              <DropdownItem
                key={skill.item.id}
                onSelected={props.onSelect}
                skill={skill.item}
              />
            )
          )}
    </div>
  );
};

const DropdownItem = function (props: any) {
  return (
    <div
      className="w-full p-2 text-sm bg-white cursor-pointer group hover:bg-purple-500 font-body"
      onClick={() =>
        props.onSelected({ id: props.skill.id, name: props.skill.name })
      }
    >
      <span className="font-medium group-hover:text-white">
        {props.skill.name}
      </span>
      <p className="text-xs text-gray-600 group-hover:text-white">
        {props.skill.description}
      </p>
    </div>
  );
};
