import React, { useState } from "react";
import { Dropdown } from "../../components/core/dropdown";
import { InputField } from "../../components/core/input-field";
import { Navbar } from "../../components/navbar";
import { SkillSelectorField } from "../../components/skill-selector-field";

export const CreatePage = function (props: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(1);
  const [maxTeamMembers, setMaxTeamMembers] = useState(2);

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
        <InputItem>
          <DescriptionItem>
            <DescriptionHeading>
              Choose project starting date
            </DescriptionHeading>
            <DescriptionBody>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi
              corporis architecto odit.
            </DescriptionBody>
          </DescriptionItem>
          <SelectorItem>
            <input
              type="date"
              className="p-2 text-sm font-medium border rounded shadow-sm cursor-pointer font-body focus:outline-none"
            />
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
          </SelectorItem>
        </InputItem>
        <InputItem>
          <DescriptionItem>
            <DescriptionHeading>
              Choose max number of team members
            </DescriptionHeading>
            <DescriptionBody>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
              adipisci nihil minima eligendi!
            </DescriptionBody>
          </DescriptionItem>
          <SelectorItem>
            <Dropdown
              label={`${maxTeamMembers} Members`}
              onSelected={setMaxTeamMembers}
            >
              <Dropdown.Menu additionalClasses="overflow-y-scroll h-56">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <Dropdown.Item value={num}>{`${num} Members`}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </SelectorItem>
        </InputItem>
        <div>
          <DescriptionItem>
            <DescriptionHeading>
              Choose skill set for this project
            </DescriptionHeading>
            <DescriptionBody>
              Skill set is the basically a requirement for team members to
              possess one of the skills from the skill set
            </DescriptionBody>
          </DescriptionItem>
          <div>
            <SkillSelectorField />
          </div>
        </div>
        <hr />
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
