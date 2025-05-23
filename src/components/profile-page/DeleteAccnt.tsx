"use client";

import Image from "next/image";
import GradientBorder from "../ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
import { deleteAccount, showProfile } from "@/lib/middleware/profile";
import { useRouter } from "next/navigation";
import DeleteAccountPopup from "./DeleteAccountPopup";
import DeleteAccountPasswordPopup from "./DeleteAccountPasswordPopUp";
import { deleteUser, ResendDeletCode } from "@/lib/middleware/signin";
import { Button } from "../ui/button";

const DeleteAccnt = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);
    dispatch(showProfile(userid));
  }, []);
  const myProfile = useAppSelector(
    (state) => state?.getShowProfile?.myProfile?.data
  );
  const userLoading = useAppSelector((state) => state?.getShowProfile);

  const imageUrl =
    myProfile?.profilePicture?.startsWith("http") ||
    myProfile?.profilePicture?.startsWith("https")
      ? myProfile?.profilePicture
      : "/person3.jpg";

  console.log("image src is", imageUrl);

  async function deleteUser() {
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("my user id", userID);
    const data = {
      userId: userID,
    };

    try {
      dispatch(ResendDeletCode(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);

          // SuccessToast("Account Deleted Successfully");
          setDeleteModalOpen(true);
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
    <>
      {" "}
      {loader && <ScreenLoader />}
      {/* {userLoading.loading && <ScreenLoader />} */}
      <div className="w-full lg:ps-[119px] mt-[45px] lg:w-[70%] md:mx-auto flex flex-col justify-start lg:w-full lg:mt-[90px] lg:mx-0">
        <h2 className="font-bold text-[24px] ms-[24px] lg:ms-[0px] lg:text-[32px]">
          Delete Account
        </h2>
        <div className="flex flex-col justify-start lg:flex-row lg:gap-[62px] gap-[32px] mt-[30px] items-center lg:mt-[32px]">
          <div className="flex flex-col lg:mx-0 gap-4 w-fit">
            <GradientBorder className="rounded-full p-[3px] w-fit">
              <div className="bg-black rounded-full p-[6px]">
                <Image
                  src={
                    myProfile?.profilePicture
                      ? myProfile?.profilePicture
                      : "/person3.jpg "
                  }
                  width={216}
                  height={216}
                  className="size-[216px] w-[156px] h-[156px] sm:w-[216px] sm:h-[216px] object-cover object-top rounded-full"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 1800)
                  )}`}
                  alt="DP"
                />
              </div>
            </GradientBorder>
          </div>
          <div>
            <h2 className="text-[#BFBFBF] text-center lg:text-start text-sm font-extrabold">
              Are you sure you want to delete your account?
              <br className="hidden sm:inline" />
              You will lose all your data by deleting your account.
            </h2>
            <div className="flex flex-col sm:mt-[0px] mb-[68px] w-full lg:w-full items-center justify-center sm:relative sm:w-auto sm:bottom-auto">
              <Button
                className="lg:my-[32px] my-[24px] bg-[#FF1717] text-white w-full lg:w-full xl:w-[428px] p-[12px] rounded-[200px] lg:text-[base] text-sm font-extrabold"
                // onClick={() => deleteUser()}
                onClick={() => deleteUser()}
              >
                Delete Account
              </Button>
              <Button
                className="bg-[#00A849] text-black w-full xl:w-[428px] lg:w-full p-[12px] rounded-[200px] lg:text-[base] text-sm font-extrabold"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        // <DeleteAccountPopup
        //   onClose={() => setDeleteModalOpen(false)}
        //   open={() => setDeleteModalOpen(true)}
        // />
        <DeleteAccountPasswordPopup
          onClose={() => setDeleteModalOpen(false)}
          open={() => setDeleteModalOpen(true)}
        />
      )}
    </>
  );
};

export default DeleteAccnt;
