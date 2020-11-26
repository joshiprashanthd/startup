import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import fuse from "fuse.js";
import moment from "moment";
import { useParams } from "react-router";

//local
import { Page } from "../../components/core/page";
import { Navbar } from "../../components/navbar";
import { USER } from "../../graphql/user/query";
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
import { EDIT_USER } from "../../graphql/user/mutation";
import { useAuth } from "../../hooks/useAuth";

export const ProfilePage = function (props: any) {
  const auth = useAuth();
  const { userId } = useParams<{ userId?: string }>();
  const { data, error, loading, refetch } = useQuery(USER, {
    variables: {
      userId: userId || auth.user?.id,
    },
  });

  return (
    <Page>
      {loading && <Loader />}
      <Navbar />
      {data && (
        <div className="w-3/6 mx-auto space-y-4">
          <UserNameAndHandler data={data} />
          <PersonalInfoSection data={data} refetchData={refetch} />
        </div>
      )}
    </Page>
  );
};

const Bio = function (props: any) {
  const { edit, data, set } = props;

  if (edit)
    return <InputField onInputChange={set} initialValue={data} label="Bio" />;
  return (
    <div className="mb-4">
      <h1 className="text-sm font-medium text-gray-700 font-body">Bio</h1>
      <span className="font-body">{data || "Add something about you..."}</span>
    </div>
  );
};

const Name = function (props: any) {
  const { edit, data, set } = props;

  if (edit)
    return <InputField onInputChange={set} initialValue={data} label="Name" />;

  return (
    <div className="mb-4">
      <h1 className="text-sm font-medium text-gray-700 font-body">Name</h1>
      <span className="font-body">{data}</span>
    </div>
  );
};

const Email = function (props: any) {
  const { edit, data, set } = props;

  if (edit)
    return <InputField onInputChange={set} initialValue={data} label="Email" />;

  return (
    <div className="mb-4">
      <h1 className="text-sm font-medium text-gray-700 font-body">Email</h1>
      <span className="font-body">{data}</span>
    </div>
  );
};

const Handler = function (props: any) {
  const { edit, data, set } = props;

  if (edit)
    return (
      <InputField onInputChange={set} initialValue={data} label="Handler" />
    );

  return (
    <div className="mb-4">
      <h1 className="text-sm font-medium text-gray-700 font-body">Handler</h1>
      <span className="font-body">{data}</span>
    </div>
  );
};

const BirthDate = function (props: any) {
  const { edit, data, set } = props;

  return (
    <div>
      <h1
        className={`${
          edit && "mb-2"
        } text-sm font-medium text-gray-700 font-body`}
      >
        Birth date
      </h1>
      {edit ? (
        <DatePicker onSelectDate={set} initialValue={data} />
      ) : (
        <span className="font-body">
          {moment.utc(data).format("Do MMM, YYYY") || "Not given"}
        </span>
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

  useEffect(() => {
    props.set(selected.map((skill) => skill.id));
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
        (props.data.length > 0 ? (
          <div className="flex space-x-2">
            {props.data.map((skill: { name: string; id: string }) => (
              <Chip key={skill.name}>{skill.name}</Chip>
            ))}
          </div>
        ) : (
          <span>No interests</span>
        ))}
    </div>
  );
};

const UserNameAndHandler = function (props: any) {
  return (
    <div className="flex items-center w-full px-8 py-4 bg-white border rounded">
      <UserAvatar data={props.data.user.accountInfo.name} />
      <div className="leading-8">
        <h1 className="text-4xl font-normal font-display">
          {props.data.user.accountInfo.name}
        </h1>
        <h1 className="text-xl font-light text-gray-700 text-display">
          @{props.data.user.accountInfo.handler}
        </h1>
      </div>
    </div>
  );
};

const UserAvatar = function (props: any) {
  return (
    <div className="grid w-20 h-20 mr-8 text-2xl font-bold text-white uppercase bg-purple-700 rounded-xl place-items-center">
      {extractInitials(props.data)}
    </div>
  );
};

const PersonalInfoSection = function (props: any) {
  const { data } = props;

  const auth = useAuth();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(data.user.accountInfo.name);
  const [handler, setHandler] = useState(data.user.accountInfo.handler);
  const [email, setEmail] = useState(data.user.accountInfo.email);
  const [birthDate, setBirthDate] = useState(data.user.personalInfo.birthDate);
  const [bio, setBio] = useState(data.user.personalInfo.bio);
  const [skills, setSkills] = useState<string[]>(
    data.user.personalInfo.interests.map((obj: { id: string }) => obj.id)
  );

  const [editUser, { loading }] = useMutation(EDIT_USER);

  const onSaveHandler = () => {
    editUser({
      variables: {
        input: {
          userId: data.user.id,
          accountInfo: {
            name: name.length === 0 ? data.user.acocountInfo.name : name,
            handler:
              handler.length === 0 ? data.user.accountInfo.handler : handler,
            email: email.length === 0 ? data.user.accountInfo.email : email,
          },
          personalInfo: {
            interests: skills.map((id) => ({
              skillId: id,
            })),
            bio,
            birthDate: new Date(birthDate).getTime(),
          },
        },
      },
    })
      .then((resData) => {
        setEdit(false);
        props.refetchData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full px-8 py-4 bg-white border rounded">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-medium font-body">Personal Information</h1>
        {!edit && auth.user?.id === data.user.id && (
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

      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <Name data={data.user.accountInfo.name} edit={edit} set={setName} />
        </div>
        <div className="flex-1">
          <Handler
            data={data.user.accountInfo.handler}
            edit={edit}
            set={setHandler}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Email
            data={data.user.accountInfo.email}
            edit={edit}
            set={setEmail}
          />
        </div>
        <div className="flex-1">
          <BirthDate
            data={data.user.personalInfo.birthDate}
            edit={edit}
            set={setBirthDate}
          />
        </div>
      </div>
      <Bio data={data.user.personalInfo.bio} edit={edit} set={setBio} />
      <Interests
        data={data.user.personalInfo.interests}
        edit={edit}
        set={setSkills}
      />

      {edit && (
        <div className="flex mt-4 space-x-2">
          <SizedBox width={32}>
            <Button variant="secondary" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          </SizedBox>
          <SizedBox width={32}>
            <Button onClick={onSaveHandler}>
              {loading ? <Loader /> : "Save"}
            </Button>
          </SizedBox>
        </div>
      )}
    </div>
  );
};
