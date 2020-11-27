import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";

//local
import { ACCEPT_PROJECT_REQUEST } from "../../graphql/projectRequest/mutation";
import { Anchor } from "../core/anchor";
import { Button } from "../core/button";
import { Modal } from "../core/modal";
import { SizedBox } from "../core/sized-box";

export const RequestSection = function (props: any) {
  return (
    <div className="w-1/4 p-4 border rounded">
      <h1 className="text-lg font-medium font-body">Requests</h1>
      <div className="mt-4 space-y-4">
        {props.project.details.requests
          .filter((request: any) => request.status !== "ACCEPTED")
          .map((request: any) => (
            <RequestItem
              refetchData={props.refetchData}
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

const RequestItem = function (props: any) {
  const [mutate] = useMutation(ACCEPT_PROJECT_REQUEST);
  const [showModal, setShowModal] = useState(false);

  const acceptRequest = () => {
    mutate({
      variables: {
        projectRequestId: props.requestId,
      },
    })
      .then((resData) => {
        setShowModal(false);
        props.refetchData();
      })
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
