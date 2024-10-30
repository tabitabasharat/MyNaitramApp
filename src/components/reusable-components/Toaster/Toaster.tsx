import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessIcon from "@/assets/Wallet/Success-icon-toast.svg";
import Image from "next/image";
import ErrorIcon from "@/assets/Wallet/Error-icon-toast.svg";
import warningIcon from "@/assets/warningtoast.svg"

export const ErrorToast = (message: any) => {
  toast.error(`${message}`, {
    style: {
      backgroundImage: "linear-gradient(to top, #0f0f0f, #1a1a1a)",
      color: "#ffffff",
    },
    icon: (
      <Image
        src={ErrorIcon}
        alt="Error"
        style={{ width: "40px", height: "40px" }}
        priority
      />
    ),

    closeButton: false,
    // closeToast: (
    //   <button className="custom-close-button__error close__btn__common">
    //     Close
    //   </button>
    // ),
  });
  return null;
};
export const WarningToast = (message: any) => {
  toast.warn(`${message}`, {
    style: {
      backgroundImage: "linear-gradient(to top, #0f0f0f, #1a1a1a)",
       color: "#ffff",
    },
    icon: (
      <Image
        src={warningIcon}
        alt="warning"
        style={{ width: "30px", height: "30px", marginRight: "20px" }}
        priority
      />
    ),
    closeButton: false,
    // closeToast: (
    //   <button className="custom-close-button__success close__btn__common">
    //     Close

    //   </button>
    // ),
    // icon: () => <Image src={successIcon} alt="Success Icon" />,
  });
  return null;
};

export const SuccessToast = (message: any) => {
  toast.success(`${message}`, {
    style: {
      backgroundImage: "linear-gradient(to top, #0f0f0f, #1a1a1a)",
      color: "#ffffff",
    },
    icon: (
      <Image
        src={SuccessIcon}
        alt="Success"
        style={{ width: "30px", height: "30px", marginRight: "20px" }}
        priority
      />
    ),
    closeButton: false,

    // closeToast: (
    //   <button className="custom-close-button__success close__btn__common">
    //     Close

    //   </button>
    // ),
    // icon: () => <Image src={successIcon} alt="Success Icon" />,
  });
  return null;
};
