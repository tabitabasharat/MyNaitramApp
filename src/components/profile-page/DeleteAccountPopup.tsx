"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogPortal,
} from "@/components/ui/newdialog";

import Image from "next/image";
import Iconpop from "@/assets/delete-icon.svg";
import { Button } from "../ui/button";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
import { deleteAccount } from "@/lib/middleware/profile";
import { useRouter } from "next/navigation";
import { close } from "fs";


const DeleteAccountPopup = ({ onClose, open }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

 
  const myProfile = useAppSelector(
    (state) => state?.getShowProfile?.myProfile?.data
  );
  const userLoading = useAppSelector((state) => state?.getShowProfile);

  const imageUrl = myProfile?.profilePicture?.startsWith("http" || "https")
    ? myProfile?.profilePicture
    : "/person3.jpg";
  console.log("image src is", imageUrl);

  async function deleteUser() {
    setLoader(true);
    const userID = localStorage.getItem("_id");
    console.log("my user id", userID);

    try {
      dispatch(deleteAccount(userID)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);

          SuccessToast("Account Deleted Successfully");
          localStorage.clear();
          router.push("/");
        } else {
          setLoader(false);
          console.log(res?.payload?.message);

          ErrorToast(
            res?.payload?.message || "An error occurred during deletion."
          );
        }
      });
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred.";
      ErrorToast(errorMessage);
    }
  }

  return (
   
    <Dialog open={open} onOpenChange={onClose}>
      {/* <DialogTrigger>Open Dialog</DialogTrigger> */}
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          showCloseIcon={false}
          style={{
            background:
              "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
          }}
          className="sm:max-w-md lg:max-w-[500px] text-white py-[44px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div>
            <DialogHeader className="mb-5">
              <DialogTitle className="font-bold text-2xl mb-1"></DialogTitle>
            </DialogHeader>

            <div className="flex items-center flex-col">
              <Image src={Iconpop} alt="icon" />
              <p className="mt-[16px] font-weight[700] leading-[24px] whitelist-txt text-center">
                Are you sure you want to<br></br> delete your account?
              </p>
              <div className="flex items-center gap-[20px] mt-[32px] ">
                <Button
                  style={{
                    background:
                      "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                  }}
                  className="flex bg-[#0F0F0F] text-[#00D059] py-[12px] px-[25px] rounded-full gap-[20px] 
                 w-[100%]  border-[0.86px] border-transparent text-[14px] font-extrabold leading-[19.6px] text-center"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className=" py-[12px] px-[25px] text-[14px] font-extrabold leading-[19.6px]
                 text-center  w-full text-[#030303] "
                  onClick={() => deleteUser()}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DeleteAccountPopup;
