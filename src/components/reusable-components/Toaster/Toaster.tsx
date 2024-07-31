
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ErrorToast = (message:any) => {
    toast.error(message, {
      closeButton: (
        <button className="custom-close-button__error close__btn__common">
          Close
        </button>
      ),
      // icon: () => <Image src={ErrorIcon} alt="Error Icon" />,
    });
    return null;
  };

export const SuccessToast = (message:any) => {
  toast.success(`${message}`, {
    closeButton: (
        <button className="custom-close-button__error close__btn__common">
          Close
        </button>
      ),
    // icon: () => <Image src={successIcon} alt="Success Icon" />,
  });
  return null;
};
