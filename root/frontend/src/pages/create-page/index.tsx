import React, { useState } from "react";
import { DatePicker } from "../../components/core/date-picker";
import { Dropdown } from "../../components/core/dropdown";
import { InputField } from "../../components/core/input-field";
import { Navbar } from "../../components/navbar";
import { SkillSelectorField } from "../../components/skill-selector-field";

export const CreatePage = function (props: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [duration, setDuration] = useState(1);
  const [maxTeamMembers, setMaxTeamMembers] = useState(2);
  const [selectedSkills, setSelectedSkills] = useState<any[]>([]);

  return (
    <div className="w-full min-h-screen">
      <Navbar selected="create" />
      <div className="w-2/4 h-screen mx-auto mt-16">
        <h1 className="text-4xl font-semibold font-display">
          Create new project
        </h1>
        <InputField label="Title" onInputChange={setTitle} />
        <InputField
          textareaMode={true}
          label="Description"
          onInputChange={setDescription}
        />
        <hr />
        <InputItem>
          <DescriptionItem>
            <DescriptionHeading>
              Choose project starting date
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
              label={`${duration} Weeks`}
              onSelected={(value: any) => setDuration(value)}
            >
              <Dropdown.Menu>
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
              label={`${maxTeamMembers} Members`}
              onSelected={setMaxTeamMembers}
            >
              <Dropdown.Menu additionalClasses="overflow-y-auto max-h-56">
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
              Choose skill set for this project
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
