import { useLazyQuery, useQuery } from "@apollo/client";
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import { SKILLS_WITH_NAME_ID } from "../graphql/skill/query";

//local
import { Chip } from "./core/chip";
import { Loader } from "./core/loader";
import { InputFieldWithDropdown } from "./input-field-with-dropdown";

export const SkillSelectorField = function (props: any) {
  const { data, loading } = useQuery(SKILLS_WITH_NAME_ID);
  const [selected, setSelected] = useState<{ name: string; id: string }[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    props.onSelect(selected.map((skill) => skill.id));
  }, [selected]);

  const handleOnDelete = (id: string) =>
    setSelected((prev) => prev.filter((skill) => skill.id !== id));

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value);

  const handleOnSelect = (value: { name: string; id: string }) => {
    setSelected((prev) => [...prev, value]);
    setValue("");
  };

  return (
    <div>
      <h1 className="mb-2 text-sm font-medium text-gray-700 font-body">
        Interests
      </h1>
      <div className="flex space-x-2">
        {selected.length > 0 &&
          selected.map((skill) => (
            <Chip onDelete={handleOnDelete} value={skill.id} key={skill.id}>
              {skill.name}
            </Chip>
          ))}
      </div>
      <InputFieldWithDropdown
        onChange={handleOnChange}
        value={value}
        inputPlaceholder="Enter skill..."
      >
        <InputFieldWithDropdown.Dropdown>
          {loading && <Loader color="purple-700" />}
          {data &&
            new Fuse<any>(
              data.skills.filter(
                (skill: { id: string }) =>
                  !selected.find((obj) => obj.id === skill.id)
              ),
              { keys: ["name", "description"] }
            )
              .search(value)
              .map(
                (skill: {
                  item: {
                    id: string;
                    name: string;
                    description: string;
                  };
                }) => (
                  <InputFieldWithDropdown.DropdownItem
                    onSelect={handleOnSelect}
                    value={{ name: skill.item.name, id: skill.item.id }}
                  >
                    <p className="text-sm font-medium font-body group-hover:text-white">
                      {skill.item.name}
                    </p>
                    <span className="text-xs text-gray-700 group-hover:text-white">
                      {skill.item.description}
                    </span>
                  </InputFieldWithDropdown.DropdownItem>
                )
              )}
        </InputFieldWithDropdown.Dropdown>
      </InputFieldWithDropdown>
    </div>
  );
};
