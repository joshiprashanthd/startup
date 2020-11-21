import React, { useState } from "react";
import classnames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  timeout?: number;
  variant?: "success" | "warning" | "info" | "error";
  onClose?: () => void;
}

const ToastStyles = {
  base:
    "fixed bottom-0 right-0 py-2 mb-8 mr-8 shadow-lg text-sm rounded font-body",
  info: "bg-blue-700 text-white",
  warning: "bg-orange-700 text-white",
  success: "bg-green-700 text-white",
  error: "bg-red-700 text-white",
};

const cx = classnames.bind(ToastStyles);

export const Toast: React.FC<IProps> = function ({
  children,
  timeout = 5,
  variant = "info",
  onClose,
}) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  React.useEffect(() => {
    setTimeout(handleClose, timeout * 1000);
    if (onClose) return onClose;
  }, []);

  let icon = faExclamationCircle;

  switch (variant) {
    case "error":
      icon = faTimesCircle;
      break;
    case "warning":
      icon = faExclamationTriangle;
      break;
    case "success":
      icon = faCheckCircle;
      break;
  }

  return (
    <>
      {show && (
        <div
          className={cx({
            base: true,
            info: variant === "info",
            warning: variant === "warning",
            error: variant === "error",
            success: variant === "success",
          })}
        >
          <FontAwesomeIcon icon={icon} className="mx-4" />
          {children}
          <FontAwesomeIcon
            icon={faTimes}
            onClick={handleClose}
            className="mx-4 cursor-pointer"
          />
        </div>
      )}
    </>
  );
};
