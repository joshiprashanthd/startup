import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Anchor } from "../../components/core/anchor";
import { Button } from "../../components/core/button";
import { Chip } from "../../components/core/chip";
import { InputField } from "../../components/core/input-field";
import { Loader } from "../../components/core/loader";
import { Modal } from "../../components/core/modal";
import { Page } from "../../components/core/page";
import { SizedBox } from "../../components/core/sized-box";
import { Toast } from "../../components/core/toast";
import { Navbar } from "../../components/navbar";
import { TOGGLE_STAR_PROJECT } from "../../graphql/project/mutation";
import { PROJECT_BY_ID } from "../../graphql/project/query";
import { TOGGLE_REQUEST_PROJECT } from "../../graphql/projectRequest/mutation";
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
        <div className="w-1/2 mx-auto space-y-4">
          <div className="px-8 py-4 border rounded">
            <div className="flex justify-between">
              <ProjectTitle
                title={data.projectById.details.title}
                handler={data.projectById.details.creator.accountInfo.handler}
                userId={data.projectById.details.creator.id}
              />
              {auth.user?.id !== data.projectById.details.creator.id && (
                <ProjectRequestButton
                  projectId={projectId}
                  refetchData={refetch}
                  requested={data.projectById.isRequested}
                />
              )}
              <ProjectStarButton
                refetchData={refetch}
                projectId={data.projectById.id}
                starred={data.projectById.isStarred}
              />
            </div>
            <SizedBox height={2} />
            <ProjectStateChip state={data.projectById.state} />
          </div>
          <div className="px-8 py-4 border rounded">
            <ProjectDescription
              description={data.projectById.details.description}
            />
          </div>
          <div className="px-8 py-4 border rounded">
            <ProjectInfo />
          </div>
        </div>
      )}
    </Page>
  );
};

const ProjectTitle = function (props: any) {
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

const ProjectRequestButton = function (props: any) {
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

const ProjectStarButton = function (props: any) {
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
const ProjectDescription = function (props: any) {
  return (
    <div>
      <h1 className="mb-4 text-lg font-medium font-body">Description</h1>
      <p className="text-base font-body">{props.description}</p>
    </div>
  );
};

const Duration = function (props: any) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 font-body">Duration</p>
      <p className="font-body">6 weeks</p>
    </div>
  );
};

const ProjectStateChip = function (props: any) {
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
  return (
    <div>
      <h1 className="mb-4 text-lg font-medium font-body">
        Project Information
      </h1>
      <Duration />
    </div>
  );
};
