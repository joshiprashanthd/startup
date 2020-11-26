import { useMutation, useQuery } from "@apollo/client";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fuse from "fuse.js";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//local
import { Anchor } from "../../components/core/anchor";
import { Button } from "../../components/core/button";
import { Chip } from "../../components/core/chip";
import { DatePicker } from "../../components/core/date-picker";
import { Dropdown } from "../../components/core/dropdown";
import { InputField } from "../../components/core/input-field";
import { Loader } from "../../components/core/loader";
import { Modal } from "../../components/core/modal";
import { Page } from "../../components/core/page";
import { SizedBox } from "../../components/core/sized-box";
import { Toast } from "../../components/core/toast";
import { InputFieldWithDropdown } from "../../components/input-field-with-dropdown";
import { Navbar } from "../../components/navbar";
import {
  EDIT_PROJECT,
  TOGGLE_STAR_PROJECT,
} from "../../graphql/project/mutation";
import { PROJECT_BY_ID } from "../../graphql/project/query";
import {
  ACCEPT_PROJECT_REQUEST,
  TOGGLE_REQUEST_PROJECT,
} from "../../graphql/projectRequest/mutation";
import { SKILLS_WITH_NAME_ID } from "../../graphql/skill/query";
import { useAuth } from "../../hooks/useAuth";

export const ProjectPage = function (props: any) {
  const auth = useAuth();
  const { projectId } = useParams<{ projectId: string }>();
  const { data, loading, refetch } = useQuery(PROJECT_BY_ID, {
    variables: {
      projectId,
    },
  });

  return (
    <Page>
      <Navbar />
      {loading && <Loader />}
      {data && (
        <div className="flex w-8/12 mx-auto space-x-4">
          <div className="w-8/12 space-y-4">
            <div className="px-8 py-4 border rounded">
              <div className="flex justify-between">
                <Title
                  title={data.projectById.details.title}
                  handler={data.projectById.details.creator.accountInfo.handler}
                  userId={data.projectById.details.creator.id}
                />
                {auth.user?.id !== data.projectById.details.creator.id && (
                  <RequestButton
                    projectId={projectId}
                    refetchData={refetch}
                    requested={data.projectById.isRequested}
                  />
                )}
                <StarButton
                  refetchData={refetch}
                  projectId={data.projectById.id}
                  starred={data.projectById.isStarred}
                />
              </div>
              <SizedBox height={2} />
              <StateChip state={data.projectById.state} />
            </div>
            <div className="px-8 py-4 border rounded">
              <Description description={data.projectById.details.description} />
            </div>
            <div className="px-8 py-4 border rounded">
              <ProjectInfo project={data.projectById} refetchData={refetch} />
            </div>
            <div className="px-8 py-4 border rounded">
              <TeamSection project={data.projectById} refetchData={refetch} />
            </div>
          </div>
          <Requests project={data.projectById} />
        </div>
      )}
    </Page>
  );
};

const Requests = function (props: any) {
  return (
    <div className="w-1/4 p-4 border rounded">
      <h1 className="text-lg font-medium font-body">Requests</h1>
      <div className="mt-4 space-y-4">
        {props.project.details.requests.map((request: any) => (
          <UserRequest
            requestId={request.id}
            userId={request.from.id}
            name={request.from.accountInfo.name}
            handler={request.from.accountInfo.handler}
            message={request.message}
          />
        ))}
      </div>
    </div>
  );
};

const UserRequest = function (props: any) {
  const [mutate] = useMutation(ACCEPT_PROJECT_REQUEST);
  const [showModal, setShowModal] = useState(false);

  const acceptRequest = () => {
    mutate({
      variables: {
        projectRequestId: props.requestId,
      },
    })
      .then((resData) => console.log(resData))
      .catch((err) => console.error(err));
  };

  return (
    <>
      {showModal && (
        <Modal>
          <Modal.Title>
            Request from{" "}
            <Anchor>
              <Link to={`/profile/${props.userId}`}>
                <span className="text-lg font-display">{props.name}</span>
              </Link>
            </Anchor>
          </Modal.Title>
          <div className="my-4">
            <h1 className="mb-2 text-sm font-medium font-body">Message</h1>
            <p className="text-sm font-body">
              {props.message || "No message is given"}
            </p>
          </div>
          <div className="flex justify-end space-x-2">
            <SizedBox width={32}>
              <Button onClick={() => setShowModal(false)} variant="secondary">
                Cancel
              </Button>
            </SizedBox>
            <SizedBox width={32}>
              <Button onClick={acceptRequest}>Accept</Button>
            </SizedBox>
          </div>
        </Modal>
      )}
      <div className="flex items-center justify-between">
        <div className="leading-5">
          <p className="font-medium font-body">
            <Anchor fontWeight="medium">
              <Link to={`/profile/${props.userId}`}>{props.name}</Link>
            </Anchor>
          </p>
          <p className="text-sm text-gray-700 font-body">@{props.handler}</p>
        </div>
        <div>
          <Anchor
            fontSize="sm"
            fontWeight="medium"
            onClick={() => setShowModal(true)}
          >
            View request
          </Anchor>
        </div>
      </div>
    </>
  );
};

const Title = function (props: any) {
  return (
    <div>
      <h1 className="text-3xl font-medium font-display">{props.title}</h1>
      <p>
        Posted by{" "}
        <Anchor>
          <Link to={`/profile/${props.userId}`}>
            <span className="font-medium text-gray-700">@{props.handler}</span>
          </Link>
        </Anchor>
      </p>
    </div>
  );
};

const RequestButton = function (props: any) {
  const [mutate, { loading }] = useMutation(TOGGLE_REQUEST_PROJECT);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSendRequestButton = () => {
    mutate({
      variables: {
        message,
        projectId: props.projectId,
      },
    })
      .then((resData) => {
        setShowModal(false);
        props.refetchData();
      })
      .catch((error) => {
        setShowToast(true);
      });
  };

  const handleRequestButton = () => {
    if (props.requested) {
      mutate({
        variables: {
          message,
          projectId: props.projectId,
        },
      })
        .then((resData) => {
          props.refetchData();
        })
        .catch((err) => {
          setShowToast(true);
        });
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      {showToast && (
        <Toast variant="error" onClose={() => setShowToast(false)}>
          Server error occurred
        </Toast>
      )}
      {showModal && !props.requested && (
        <Modal>
          <Modal.Title>Request for collaboration</Modal.Title>
          <InputField
            textareaMode={true}
            label="Message for project owner"
            secondaryLabel="(optional)"
            onInputChange={setMessage}
          />
          <div className="flex justify-end space-x-3">
            <SizedBox width={32}>
              <Button onClick={() => setShowModal(false)} variant="secondary">
                Cancel
              </Button>
            </SizedBox>
            <SizedBox width={32}>
              <Button onClick={handleSendRequestButton}>
                {loading ? <Loader /> : "Send Request"}
              </Button>
            </SizedBox>
          </div>
        </Modal>
      )}
      <SizedBox minWidth={20}>
        <Button
          variant={props.requested ? "primary" : "secondary"}
          onClick={handleRequestButton}
        >
          {loading ? (
            <Loader />
          ) : props.requested ? (
            "Cancel Request"
          ) : (
            "Request"
          )}
        </Button>
      </SizedBox>
    </>
  );
};

const StarButton = function (props: any) {
  const [mutate] = useMutation(TOGGLE_STAR_PROJECT);

  const handleClick = () => {
    mutate({
      variables: {
        projectId: props.projectId,
      },
    }).then((resData) => {
      props.refetchData();
    });
  };

  return (
    <SizedBox width={20}>
      <Button
        variant={props.starred ? "primary" : "secondary"}
        onClick={handleClick}
      >
        {props.starred ? "Unstar" : "Star"}
      </Button>
    </SizedBox>
  );
};

const Description = function (props: any) {
  return (
    <div>
      <h1 className="mb-4 text-lg font-medium font-body">Description</h1>
      <p className="text-base font-body">{props.description}</p>
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

const StateChip = function (props: any) {
  return (
    <Chip
      color={(() => {
        switch (props.state) {
          case "OPEN":
            return "green";
          case "CLOSED":
            return "red";
          case "STARTED":
            return "purple";
          case "ENDED":
            return "black";
        }
      })()}
      style="solid"
    >
      {props.state.toLowerCase()}
    </Chip>
  );
};

const ProjectInfo = function (props: any) {
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

const TeamSection = function (props: any) {
  return (
    <div>
      <h1 className="text-lg font-medium font-body">Team</h1>
      <div className="mt-4">
        {props.project.work.team.map((user: any) => (
          <User userId={user.id} name={user.name} handler={user.handler} />
        ))}
      </div>
    </div>
  );
};

const User = function (props: any) {
  return (
    <div className="my-4">
      <Anchor>
        <Link to={`/profile/${props.userId}`}>
          <span className="font-medium font-body">{props.name}</span>
          <span className="text-sm font-medium text-gray-700 font-body">
            {props.handler}
          </span>
        </Link>
      </Anchor>
    </div>
  );
};
