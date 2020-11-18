import React, { useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";

//local
import { Page } from "../../components/core/page";
import { Navbar } from "../../components/navbar";
import { ME_PROFILE_PAGE } from "../../graphql/user/query";
import { Chip } from "../../components/core/chip";
import extractInitials from "../../utils/extractInitials";
import { SKILLS_WITH_NAME_ID } from "../../graphql/skill/query";
import { InputFieldWithDropdown } from "../../components/input-field-with-dropdown";
import { Loader } from "../../components/core/loader";
import { Anchor } from "../../components/core/anchor";
import { Button } from "../../components/core/button";
import { SizedBox } from "../../components/core/sized-box";
import { InputField } from "../../components/core/input-field";

export const ProfilePage = function (props: any) {
  const [edit, setEdit] = useState(false);
  const { data, loading, error } = useQuery(ME_PROFILE_PAGE);
  return (
    <>
      {data && (
        <Page>
          <Navbar />
          <div className="flex w-4/5 mx-auto">
            <LeftPane data={data} />
            <RightPane data={data} edit={edit} setEdit={setEdit} />
          </div>
        </Page>
      )}
    </>
  );
};

const BioEditor = function (props: any) {
  const { edit, data } = props;
  return (
    <>
      <h1 className="text-sm font-medium text-gray-700">Bio</h1>
      {!edit && <span>{data.me.personalInfo.bio || "Add a bio"}</span>}
      {edit && <InputField textareaMode />}
    </>
  );
};

const SkillsEditor = function (props: any) {
  const { data, loading } = useQuery(SKILLS_WITH_NAME_ID);
  const [selected, setSelected] = useState<{ name: string; id: string }[]>(
    props.data.me.personalInfo.interests.map(
      (skill: { name: string; id: string }) => ({
        name: skill.name,
        id: skill.id,
      })
    )
  );
  const [value, setValue] = useState("");

  const handleOnDelete = (id: string) =>
    setSelected((prev) => prev.filter((skill) => skill.id !== id));

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleOnSelect = (value: { name: string; id: string }) => {
    setSelected((prev) => [...prev, value]);
    setValue("");
  };

  return (
    <div className="mt-4">
      <h1 className="text-sm font-medium text-gray-700">Skills</h1>
      {props.edit &&
        selected.map((skill) => (
          <Chip onDelete={handleOnDelete} value={skill.id} key={skill.id}>
            {skill.name}
          </Chip>
        ))}
      {props.edit && (
        <>
          <InputFieldWithDropdown
            onChange={handleOnChange}
            value={value}
            inputPlaceholder="Enter skill..."
          >
            <InputFieldWithDropdown.Dropdown>
              {loading && <Loader color="purple-700" />}
              {data &&
                data.skills.map(
                  (skill: {
                    id: string;
                    name: string;
                    description: string;
                  }) => (
                    <InputFieldWithDropdown.DropdownItem
                      onSelect={handleOnSelect}
                      value={{ name: skill.name, id: skill.id }}
                    >
                      <span className="text-sm font-medium font-body">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-700">
                        {skill.description}
                      </span>
                    </InputFieldWithDropdown.DropdownItem>
                  )
                )}
            </InputFieldWithDropdown.Dropdown>
          </InputFieldWithDropdown>
        </>
      )}
      {!props.edit &&
        props.data.me.personalInfo.interests.map(
          (skill: { name: string; id: string }) => (
            <Chip key={skill.name}>{skill.name}</Chip>
          )
        )}
    </div>
  );
};

const LeftPane = function (props: any) {
  return (
    <div className="w-1/5 p-4 text-left border left">
      <div className="grid w-40 h-40 text-6xl font-bold text-white uppercase bg-purple-700 rounded-xl place-items-center">
        {extractInitials(props.data.me.accountInfo.name)}
      </div>
      <div className="mt-4 leading-8">
        <h1 className="text-4xl font-normal font-display">
          {props.data.me.accountInfo.name}
        </h1>
        <h1 className="text-xl font-light text-gray-700 text-display">
          @{props.data.me.accountInfo.handler}
        </h1>
      </div>
    </div>
  );
};

const RightPane = function (props: any) {
  const { edit, setEdit } = props;
  return (
    <div className="w-full px-8 py-4 bg-white border right">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium font-body">Personal Information</h1>
        {!edit && (
          <Anchor fontSize="sm" fontWeight="medium" textColor="gray-700">
            Edit
          </Anchor>
        )}
      </div>

      {edit && (
        <div className="flex mt-4 space-x-2">
          <SizedBox width={24}>
            <Button variant="secondary" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          </SizedBox>
          <SizedBox width={24}>
            <Button onClick={() => setEdit(false)}>Save</Button>
          </SizedBox>
        </div>
      )}
    </div>
  );
};
