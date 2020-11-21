import moment from "moment";
import React, { useContext, useState } from "react";

//local
import { Button } from "../core/button";
import { InputField } from "../core/input-field";
import { Modal } from "../core/modal";
import { SizedBox } from "../core/sized-box";
import { Toast } from "../core/toast";
import AuthContext from "../../contexts/auth-context";
import { Anchor } from "../core/anchor";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Chip } from "../core/chip";

export const ProjectPostCard = function (props: any) {
  const { project } = props;

  const auth = useAuth();

  const names = project.details.creator.accountInfo.name.split(" ");
  const avatarName = names[0].charAt(0) + names[1].charAt(0);
  const startingDate = moment
    .utc(project.details.startingOn)
    .format("Do MMM, YYYY");
  const skills = project.details.skillSet.map(
    (skill: { name: any }) => skill.name
  );

  return (
    <div className="w-4/5 p-4 my-4 space-y-2 bg-white border rounded shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar name={avatarName} />
          <NameAndHandler
            userId={project.details.creator.id}
            name={project.details.creator.accountInfo.name}
            handler={project.details.creator.accountInfo.handler}
          />
        </div>

        <div className="flex items-center space-x-2">
          {auth.user?.id !== project.details.creator.id && (
            <RequestButton
              project={project}
              callback={props.toggleRequestCallback}
            />
          )}
          <StarButton
            starred={project.isStarred}
            callback={props.toggleStarCallback}
          />
        </div>
      </div>

      <div className="flex space-x-2">
        <Chip
          color={(() => {
            switch (project.state) {
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
          {project.state.toLowerCase()}
        </Chip>
        {auth.user?.id === project.details.creator.id && (
          <Chip color="purple" style="solid">
            Owned
          </Chip>
        )}
        {skills.map((name: any) => (
          <Chip color="blue">{name}</Chip>
        ))}
      </div>

      <div>
        <ProjectTitle>{project.details.title}</ProjectTitle>
        <ProjectDescription>{project.details.description}</ProjectDescription>
      </div>
    </div>
  );
};

const Avatar = function (props: any) {
  return (
    <div className="grid w-10 h-10 font-bold text-white bg-blue-700 rounded font-body place-items-center">
      {props.name}
    </div>
  );
};

const NameAndHandler = function (props: any) {
  return (
    <div className="flex flex-col justify-start ml-2 leading-5">
      <Anchor fontSize="base" fontWeight="medium">
        <Link to={`profile/${props.userId}`}>{props.name}</Link>
      </Anchor>
      <span className="text-sm text-gray-600 font-body">@{props.handler}</span>
    </div>
  );
};

const RequestButton = function (props: any) {
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSendRequestButton = () => {
    props.callback(message);
    setShowModal(false);
  };

  const handleRequestButton = () => {
    if (
      props.project.details.creator.accountInfo.handler ===
      authContext.user?.handler
    )
      setShowToast(true);
    else if (props.project.isRequested) props.callback(message);
    else setShowModal(true);
  };

  return (
    <>
      {showToast && (
        <Toast variant="error" onClose={() => setShowToast(false)}>
          You cannot request your own project
        </Toast>
      )}
      {showModal && !props.project.isRequested && (
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
              <Button onClick={handleSendRequestButton}>Send Request</Button>
            </SizedBox>
          </div>
        </Modal>
      )}
      <SizedBox minWidth={20}>
        <Button
          variant={props.project.isRequested ? "primary" : "secondary"}
          onClick={handleRequestButton}
        >
          {props.project.isRequested ? "Cancel Request" : "Request"}
        </Button>
      </SizedBox>
    </>
  );
};

const StarButton = function (props: any) {
  return (
    <SizedBox width={20}>
      <Button
        variant={props.starred ? "primary" : "secondary"}
        onClick={props.callback}
      >
        {props.starred ? "Unstar" : "Star"}
      </Button>
    </SizedBox>
  );
};

const ProjectTitle = function (props: any) {
  return (
    <span className="text-xl font-medium font-display">{props.children}</span>
  );
};

const ProjectDescription = function (props: any) {
  return <div className="text-sm font-body">{props.children}</div>;
};
