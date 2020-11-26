import { useMutation, useQuery } from "@apollo/client";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fuse from "fuse.js";
import moment from "moment";
import React, { useEffect, useState } from "react";

//local
import { EDIT_PROJECT } from "../../graphql/project/mutation";
import { SKILLS_WITH_NAME_ID } from "../../graphql/skill/query";
import { useAuth } from "../../hooks/useAuth";
import { Anchor } from "../core/anchor";
import { Button } from "../core/button";
import { Chip } from "../core/chip";
import { DatePicker } from "../core/date-picker";
import { Dropdown } from "../core/dropdown";
import { InputField } from "../core/input-field";
import { Loader } from "../core/loader";
import { SizedBox } from "../core/sized-box";
import { InputFieldWithDropdown } from "../input-field-with-dropdown";

export const ProjectInfoSection = function (props: any) {
  const auth = useAuth();

  const [mutate, { loading }] = useMutation(EDIT_PROJECT);

  const [edit, setEdit] = useState(false);

  const [title, setTitle] = useState(props.project.details.title);
  const [description, setDescription] = useState(
    props.project.details.description
  );
  const [maxTeamMembers, setMaxTeamMembers] = useState(
    props.project.details.maxTeamMembers
  );
  const [startingDate, setStartingDate] = useState(
    props.project.details.startingOn
  );
  const [duration, setDuration] = useState(props.project.details.duration);
  const [skills, setSkills] = useState(
    props.project.details.skillSet.map((obj: { id: string }) => obj.id)
  );

  const onSaveHandler = () => {
    mutate({
      variables: {
        input: {
          projectId: props.project.id,
          details: {
            title: title.length > 0 ? title : props.project.details.title,
            description:
              description.length > 0
                ? description
                : props.project.details.description,
            maxTeamMembers,
            startingOn: new Date(startingDate).getTime(),
            duration,
            skillSet: skills.map((id: any) => ({
              skillId: id,
            })),
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
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-medium font-body">Project Information</h1>
        {!edit && auth.user?.id === props.project.details.creator.id && (
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

      <div className="space-y-4">
        {edit && (
          <InputField
            initialValue={title}
            label="Title"
            onInputChange={setTitle}
          />
        )}
        {edit && (
          <InputField
            initialValue={description}
            textareaMode
            label="Description"
            onInputChange={setDescription}
          />
        )}
        <div className="flex items-start">
          <div className="flex-1">
            <MaxTeamMembers
              data={props.project.details.maxTeamMembers}
              edit={edit}
              set={setMaxTeamMembers}
            />
          </div>
          <div className="flex-1">
            <StartingDate
              data={props.project.details.startingOn}
              edit={edit}
              set={setStartingDate}
            />
          </div>
          <div className="flex-1">
            <Duration
              data={props.project.details.duration}
              edit={edit}
              set={setDuration}
            />
          </div>
        </div>
        <ProjectSkills
          data={props.project.details.skillSet}
          edit={edit}
          set={setSkills}
        />
      </div>

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

const Duration = function (props: any) {
  const [value, setValue] = useState(props.data);

  return (
    <div>
      <p
        className={`${
          props.edit && "mb-2"
        } text-sm font-medium text-gray-700 font-body`}
      >
        Duration
      </p>
      {props.edit ? (
        <Dropdown
          variant="secondary"
          icon={<FontAwesomeIcon icon={faAngleDown} className="ml-4" />}
          label={`${value} Weeks`}
          onSelected={(value) => {
            setValue(value);
            props.set(value);
          }}
        >
          <Dropdown.Menu width="32">
            {[1, 2, 3, 4, 5, 6].map((week) => (
              <Dropdown.Item key={week} value={week}>
                {week} weeks
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <p className="font-body">{props.data} weeks</p>
      )}
    </div>
  );
};

const StartingDate = function (props: any) {
  const { edit, data, set } = props;

  return (
    <div className="mb-4">
      <h1
        className={`${
          edit && "mb-2"
        } text-sm font-medium text-gray-700 font-body`}
      >
        Starting date
      </h1>
      {edit ? (
        <DatePicker onSelectDate={set} initialValue={data} />
      ) : (
        <span className="font-body">
          {moment.utc(data).format("Do MMM, YYYY")}
        </span>
      )}
    </div>
  );
};

const MaxTeamMembers = function (props: any) {
  const [value, setValue] = useState(props.data);

  return (
    <div>
      <p
        className={`${
          props.edit && "mb-2"
        } text-sm font-medium text-gray-700 font-body`}
      >
        Max team members
      </p>
      {props.edit ? (
        <Dropdown
          variant="secondary"
          icon={<FontAwesomeIcon icon={faAngleDown} className="ml-4" />}
          label={`${value} Members`}
          onSelected={(value) => {
            setValue(value);
            props.set(value);
          }}
        >
          <Dropdown.Menu width="32" height="48">
            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((week) => (
              <Dropdown.Item key={week} value={week}>
                {week} members
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <p className="font-body">{props.data}</p>
      )}
    </div>
  );
};

const ProjectSkills = function (props: any) {
  const { data, loading } = useQuery(SKILLS_WITH_NAME_ID);
  const [selected, setSelected] = useState<{ name: string; id: string }[]>(
    props.data.map((skill: { name: string; id: string }) => ({
      name: skill.name,
      id: skill.id,
    }))
  );
  const [value, setValue] = useState("");

  useEffect(() => {
    if (props.set) props.set(selected.map((skill) => skill.id));
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
        Skill Set
      </h1>
      <div className="flex flex-wrap items-center space-x-2">
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
          <span>No skills required</span>
        ))}
    </div>
  );
};
