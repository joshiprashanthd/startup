import moment from "moment";
import React, { useContext, useState } from "react";

//local
import { Button } from "../core/button";
import { InputField } from "../core/input-field";
import { Modal } from "../core/modal";
import { SizedBox } from "../core/sized-box";
import { Toast } from "../core/toast";
import AuthContext from "../../contexts/auth-context";
import projectPostCard from ".";

export const ProjectPostCard = function (props: any) {
  const { project } = props;

  const names = project.details.creator.accountInfo.name.split(" ");
  const avatarName = names[0].charAt(0) + names[1].charAt(0);
  const startingDate = moment
    .utc(project.details.startingOn)
    .format("Do MMM, YYYY");
  const skills = project.details.skillSet
    .map((skill: { name: any }) => skill.name)
    .join(", ");

  return (
    <div className="w-4/5 p-4 my-4 bg-white border rounded shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar name={avatarName} />
          <NameAndHandler
            name={project.details.creator.accountInfo.name}
            handler={project.details.creator.accountInfo.handler}
          />
        </div>

        <div className="flex items-center space-x-2">
          <RequestButton
            project={project}
            callback={props.toggleRequestCallback}
          />
          <StarButton
            starred={project.isStarred}
            callback={props.toggleStarCallback}
          />
        </div>
      </div>

      <div className="mt-2">
        <ProjectTitle>{project.details.title}</ProjectTitle>
        <ProjectDescription>{project.details.description}</ProjectDescription>
      </div>

      <div className="flex items-center mt-4">
        <ExtraInfo header="Starting On" info={startingDate} />
        <ExtraInfo header="Required Skills" info={skills} />
        <ExtraInfo
          header="Duration"
          info={`${project.details.duration} Weeks`}
        />
      </div>
    </div>
  );
};

const Avatar = function (props: any) {
  return (
    <div className="grid w-10 h-10 font-bold text-white bg-blue-300 rounded font-body place-items-center">
      {props.name}
    </div>
  );
};

const NameAndHandler = function (props: any) {
  return (
    <div className="flex flex-col justify-start ml-2 leading-5">
      <span className="text-base font-medium font-body">{props.name}</span>
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
  const [readMore, setReadMore] = useState(false);

  return (
    <div>
      <div
        className={`relative ${
          !readMore && "h-32"
        } overflow-hidden font-body text-sm`}
      >
        {props.children}
        {!readMore && (
          <div className="absolute bottom-0 left-0 w-full h-10 text-sm text-right text-purple-500 origin-top-right font-body bg-gradient-to-t from-white" />
        )}
      </div>
      {!readMore && (
        <span
          className="text-sm font-medium text-purple-500 cursor-pointer hover:underline"
          onClick={() => setReadMore(true)}
        >
          Read More
        </span>
      )}
    </div>
  );
};

const ExtraInfo = function (props: any) {
  return (
    <div className="flex-1 p-2 mr-2 text-center duration-200 border rounded cursor-default hover:bg-purple-500 group">
      <span className="text-sm font-medium text-gray-600 group-hover:text-white font-body">
        {props.header}
      </span>
      <br />
      <span className="text-sm group-hover:text-white font-body">
        {props.info}
      </span>
    </div>
  );
};
