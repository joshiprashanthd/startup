import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import fuse from "fuse.js";

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
import { DatePicker } from "../../components/core/date-picker";

export const ProfilePage = function (props: any) {
  const { data, loading } = useQuery(ME_PROFILE_PAGE);
  return (
    <Page>
      {data && (
        <>
          <Navbar />
          <div className="flex w-4/5 mx-auto">
            <LeftPane data={data} />
            <RightPane data={data} />
          </div>
        </>
      )}
    </Page>
  );
};

const Bio = function (props: any) {
  const { edit, data } = props;
  return (
    <div className="mb-2">
      <h1 className="text-sm font-medium text-gray-700 font-body">Bio</h1>
      {edit ? (
        <SizedBox width={56}>
          <InputField />
        </SizedBox>
      ) : (
        <span className="font-body">
          {data || "Add something about you..."}
        </span>
      )}
    </div>
  );
};

const Name = function (props: any) {
  const { edit, data } = props;
  return (
    <div className="mb-2">
      <h1 className="text-sm font-medium text-gray-700 font-body">Name</h1>
      {edit ? (
        <SizedBox width={56}>
          <InputField />
        </SizedBox>
      ) : (
        <span className="font-body">{data}</span>
      )}
    </div>
  );
};

const Email = function (props: any) {
  const { edit, data } = props;
  return (
    <div className="mb-2">
      <h1 className="text-sm font-medium text-gray-700 font-body">Email</h1>
      {edit ? (
        <SizedBox width={56}>
          <InputField />
        </SizedBox>
      ) : (
        <span className="font-body">{data}</span>
      )}
    </div>
  );
};

const Handler = function (props: any) {
  const { edit, data } = props;

  return (
    <div className="mb-2">
      <h1 className="text-sm font-medium text-gray-700 font-body">Handler</h1>
      {edit ? (
        <SizedBox width={56}>
          <InputField />
        </SizedBox>
      ) : (
        <span className="font-body">{data}</span>
      )}
    </div>
  );
};

const BirthDate = function (props: any) {
  const { edit, data } = props;

  return (
    <div className="mb-2">
      <h1 className="text-sm font-medium text-gray-700 font-body">
        Birth date
      </h1>
      {edit ? (
        <SizedBox width={64}>
          <DatePicker onSelectDate={props.set} />
        </SizedBox>
      ) : (
        <span className="font-body">{data || "Not given"}</span>
      )}
    </div>
  );
};

const Interests = function (props: any) {
  const { data, loading } = useQuery(SKILLS_WITH_NAME_ID);
  const [selected, setSelected] = useState<{ name: string; id: string }[]>(
    props.data.map((skill: { name: string; id: string }) => ({
      name: skill.name,
      id: skill.id,
    }))
  );
  const [value, setValue] = useState("");

  const handleOnDelete = (id: string) => {
    setSelected((prev) => prev.filter((skill) => skill.id !== id));
    props.set(selected.map((skill) => skill.id));
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleOnSelect = (value: { name: string; id: string }) => {
    setSelected((prev) => [...prev, value]);
    props.set(selected.map((skill) => skill.id));
    setValue("");
  };

  return (
    <div>
      <h1 className="mb-1 text-sm font-medium text-gray-700 font-body">
        Skills
      </h1>
      <div className="flex space-x-2">
        {props.edit &&
          selected.map((skill) => (
            <Chip onDelete={handleOnDelete} value={skill.id} key={skill.id}>
              {skill.name}
            </Chip>
          ))}
      </div>
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
                new fuse<any>(
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
        </>
      )}
      {!props.edit &&
        props.data.map((skill: { name: string; id: string }) => (
          <Chip key={skill.name}>{skill.name}</Chip>
        ))}
    </div>
  );
};

const LeftPane = function (props: any) {
  return (
    <div className="p-4 text-left border left">
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
  const { data } = props;
  return (
    <div className="w-full px-8 py-4 bg-white border right">
      <PersonalInformationSection data={data} />
    </div>
  );
};

const PersonalInformationSection = function (props: any) {
  const { data, loading } = props;
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(data.me.accountInfo.name);
  const [handler, setHandler] = useState(data.me.accountInfo.handler);
  const [email, setEmail] = useState(data.me.accountInfo.email);
  const [birthDate, setBirthDate] = useState(data.me.personalInfo.birthDate);
  const [bio, setBio] = useState(data.me.personalInfo.bio);
  const [skills, setSkills] = useState<string[]>([]);

  return (
    <div className="my-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium font-body">Personal Information</h1>
        {!edit && (
          <Anchor
            fontSize="sm"
            fontWeight="medium"
            textColor="gray-700"
            onClick={() => setEdit(true)}
          >
            Edit
          </Anchor>
        )}
      </div>

      <Name data={data.me.accountInfo.name} edit={edit} set={setName} />
      <Handler
        data={data.me.accountInfo.handler}
        edit={edit}
        set={setHandler}
      />
      <Email data={data.me.accountInfo.email} edit={edit} set={setEmail} />
      <BirthDate
        data={data.me.personalInfo.birthDate}
        edit={edit}
        set={setBirthDate}
      />
      <Bio data={data.me.personalInfo.bio} edit={edit} set={setBio} />
      <Interests
        data={data.me.personalInfo.interests}
        edit={edit}
        set={setSkills}
      />

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
