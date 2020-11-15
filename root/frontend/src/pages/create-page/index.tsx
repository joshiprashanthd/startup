import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

//local
import { DatePicker } from "../../components/core/date-picker";
import { Dropdown } from "../../components/core/dropdown";
import { InputField } from "../../components/core/input-field";
import { Navbar } from "../../components/navbar";
import { SkillSelectorField } from "../../components/skill-selector-field";
import { CREATE_PROJECT } from "../../graphql/project/mutation";
import { Button } from "../../components/core/button";
import { SizedBox } from "../../components/core/sized-box";

export const CreatePage = function (props: any) {
  const [createProject, { loading }] = useMutation(CREATE_PROJECT);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [duration, setDuration] = useState(1);
  const [maxTeamMembers, setMaxTeamMembers] = useState(2);
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);

  const handleOnClick = () => {
    const startingDateInNumber = new Date(startingDate).getTime();
    const modSkillSet = selectedSkills.map((skill) => ({ skillId: skill.id }));

    createProject({
      variables: {
        input: {
          details: {
            title,
            description,
            startingOn: startingDateInNumber,
            maxTeamMembers,
            duration,
            skillSet: modSkillSet,
          },
        },
      },
    })
      .then((resData) => console.log(resData))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full min-h-screen">
      <Navbar selected="create" />
      <div className="w-2/4 min-h-screen py-16 mx-auto">
        <h1 className="text-4xl font-semibold font-display">
          Create new project
        </h1>
        <InputField
          label="Title"
          secondaryLabel="(required)"
          onInputChange={setTitle}
        />
        <InputField
          textareaMode={true}
          label="Description"
          secondaryLabel="(required)"
          onInputChange={setDescription}
        />
        <hr />
        <InputItem>
          <DescriptionItem>
            <DescriptionHeading>
              Choose project starting date{" "}
              <span className="text-xs font-medium text-gray-600">
                (required)
              </span>
            </DescriptionHeading>
            <DescriptionBody>
              Generally, in industry, before starting any project, there's a
              planning session where team discuss agree upon things to do in
              future.
            </DescriptionBody>
          </DescriptionItem>
          <SelectorItem>
            <DatePicker onSelectDate={setStartingDate} />
          </SelectorItem>
        </InputItem>
        <InputItem>
          <DescriptionItem>
            <DescriptionHeading>
              Choose duration of project in weeks
            </DescriptionHeading>
            <DescriptionBody>
              Generally, with team of 5 to 10, project should be near 3 to 5
              weeks in duration.
            </DescriptionBody>
          </DescriptionItem>
          <SelectorItem>
            <Dropdown
              variant="secondary"
              icon={<FontAwesomeIcon icon={faAngleDown} className="ml-4" />}
              label={`${duration} Weeks`}
              onSelected={(value: any) => setDuration(value)}
            >
              <Dropdown.Menu width="32">
                {[1, 2, 3, 4, 5, 6].map((week) => (
                  <Dropdown.Item value={week}>{week} weeks</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </SelectorItem>
        </InputItem>
        <InputItem>
          <DescriptionItem>
            <DescriptionHeading>
              Choose max number of team members
            </DescriptionHeading>
            <DescriptionBody>
              If you are beginners, it's a good idea to start with a small team.
              A group 5 to 10 members is sufficient to learn team work
            </DescriptionBody>
          </DescriptionItem>
          <SelectorItem>
            <Dropdown
              variant="secondary"
              icon={<FontAwesomeIcon icon={faAngleDown} className="ml-4" />}
              label={`${maxTeamMembers} Members`}
              onSelected={setMaxTeamMembers}
            >
              <Dropdown.Menu height={64} width={32}>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <Dropdown.Item value={num}>{`${num} Members`}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </SelectorItem>
        </InputItem>
        <hr />
        <div className="my-4">
          <DescriptionItem>
            <DescriptionHeading>
              Choose skill set for this project{" "}
              <span className="text-xs font-medium text-gray-600">
                (required)
              </span>
            </DescriptionHeading>
            <DescriptionBody>
              Skill set will attract relevant individuals to work on this
              project. It also means, only those who have required skills, will
              be able to request for collaboration
            </DescriptionBody>
          </DescriptionItem>
          <div>
            <SkillSelectorField
              selectedSkills={selectedSkills}
              onSelect={setSelectedSkills}
            />
          </div>
        </div>
        <SizedBox width={32}>
          <Button
            onClick={handleOnClick}
            disabled={
              title.length === 0 ||
              description.length === 0 ||
              startingDate.length === 0 ||
              selectedSkills.length === 0
            }
          >
            Create Project
          </Button>
        </SizedBox>
      </div>
    </div>
  );
};

const InputItem = function (props: any) {
  return (
    <div className="flex flex-row items-center justify-between my-4">
      {props.children}
    </div>
  );
};

const DescriptionItem = function (props: any) {
  return (
    <div className="flex flex-col items-start flex-1">{props.children}</div>
  );
};

const DescriptionHeading = function (props: any) {
  return <p className="text-sm font-medium font-body">{props.children}</p>;
};

const DescriptionBody = function (props: any) {
  return <p className="text-xs text-gray-600 font-body">{props.children}</p>;
};

const SelectorItem = function (props: any) {
  return <div className="flex-1 text-right">{props.children}</div>;
};
