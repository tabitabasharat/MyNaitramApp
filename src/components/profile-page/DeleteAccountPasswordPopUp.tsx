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
import "../auth/AccountVerificationModal.css";

import Image from "next/image";
import Iconpop from "@/assets/delete-icon.svg";
import { Button } from "../ui/button";

import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
import { deleteAccount } from "@/lib/middleware/profile";
import { useRouter } from "next/navigation";
import { close } from "fs";
import { PasswordInput } from "@/components/ui/password-input";
import { Envelope, GoogleLogo, Lock } from "@phosphor-icons/react/dist/ssr";
import { deleteUser, ResendDeletCode } from "@/lib/middleware/signin";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteAccountPopup from "./DeleteAccountPopup";
import { signin } from "@/lib/middleware/signin";

const formSchema = z.object({
  textbox: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .max(1, { message: "Only one character or number is allowed." })
    .regex(/^[a-zA-Z0-9]$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
  textbox1: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
  textbox2: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
  textbox3: z
    .string()
    .min(1, { message: "Input cannot be empty." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Invalid input. Only letters and numbers are allowed.",
    }),
});

const DeleteAccountPasswordPopup = ({ onClose, open }: any) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textbox: "",
      textbox1: "",
      textbox2: "",
      textbox3: "",
    },
  });

  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [Password, setPassword] = useState<any>("");
  const [otpInputValues, setOtpInputValues] = useState(["", "", "", ""]);

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "ArrowRight" || e.key === "Tab") {
      e.preventDefault();
      const nextInput = inputRefs[index + 1];
      if (nextInput && nextInput.current) {
        nextInput.current.focus();
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevInput = inputRefs[index - 1];
      if (prevInput && prevInput.current) {
        prevInput.current.focus();
      }
    }
  };

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

  async function VerifySignUp(values: z.infer<typeof formSchema>) {
    console.log("Signup Verification");
  
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setLoader(true);
    try {
      const data = {
        // google: false,
        userId: userID,
        verificationCode: otpInputValues.join(""),
      };
      dispatch(deleteUser(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log(res, "this is verify delete");
          console.log(data);
          // SuccessToast("Deleted Successfully");
          localStorage.clear();
          router.push("/");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function ResentCode() {
    console.log("Again Signup Verification");
    const userID =
    typeof window !== "undefined" ? localStorage.getItem("_id") : null;

    setLoader(true);
    try {
      const data = {
        userId:  userID,
      };
      dispatch(ResendDeletCode(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log(data);
          SuccessToast("Code Send Successfully");
          // navigate("/");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
    }
  }
  const {
    formState: { errors },
  } = form;
  console.log("form errors", errors);
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

            <div className="flex items-center flex-col  ">
              {/* <Image src={Iconpop} alt="icon" /> */}
              <p className="mt-[16px] font-weight[700] leading-[24px] whitelist-txt text-center">
                You have received a code on your email for the <br></br>reset
                password request. Please enter below.
              </p>

              {/* <Form {...form}>
                <form
                  className=" mt-[16px]  flex items-center  flex-col w-full"
                  onSubmit={form.handleSubmit(handledeleteUser)}
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="relative space-y-0  lg:w-[345px] w-full ">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3 z-10">
                          PASSWORD
                        </FormLabel>
                        <Lock
                          className="absolute right-3 top-[10px] translate-y-[0.9rem] z-10"
                          size={20}
                        />
                        <FormControl>
                          <PasswordInput
                            placeholder="Input password"
                            className="pt-11 pb-5"
                            {...field}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="mt-[32px]  leading-[24px] text-center 
              font-extrabold pt-[16px] pb-[16px] w-full text-white bg-[#FF1717] lg:w-[236px] flex items-center justify-center"
                  >
                    Delete Account
                  </Button>
                </form>
              </Form> */}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(VerifySignUp)}>
                  <div className="input-stlying">
                    {["textbox", "textbox1", "textbox2", "textbox3"].map(
                      (name, index) => (
                        <FormField
                          key={name}
                          control={form.control}
                          name={name as keyof z.infer<typeof formSchema>}
                          render={({ field }) => (
                            <FormItem className="relative">
                              <FormControl>
                                <Input
                                  placeholder=""
                                  className="del-verification-input text-center font-bold placeholder:font-normal placeholder:text-white text-white"
                                  {...field}
                                  ref={inputRefs[index]}
                                  onChange={(e) => {
                                    if (e.target.value.length <= 1) {
                                      field.onChange(e);
                                      const newValues = [...otpInputValues];
                                      newValues[index] = e.target.value;
                                      setOtpInputValues(newValues);
                                    }
                                    if (e.target.value.length === 1) {
                                      const nextInput = inputRefs[index + 1];
                                      if (nextInput && nextInput.current) {
                                        nextInput.current.focus();
                                      }
                                    }
                                  }}
                                  onKeyDown={(e) => handleKeyDown(e, index)}
                                />
                              </FormControl>
                              {/* <FormMessage /> */}
                            </FormItem>
                          )}
                        />
                      )
                    )}
                  </div>
                  {/* <button
                    className=" font-normal  hover:opacity-100  flex items-center justify-center  text-center w-full"
                    onClick={() => {
                      ResentCode();
                    }}
                  >
                    Didn't receive the code?{" "}
                    <span className="font-extrabold underline ps-[3px]">
                      Request again
                    </span>
                  </button> */}
                  <p className="text-center text-[#BFBFBF]  text-[14px]">
                    Didn't receive the code?{" "}
                    <span
                      className="font-extrabold underline ps-[3px]"
                      onClick={() => {
                        ResentCode();
                      }}
                    >
                      Request again
                    </span>
                  </p>

                  <Button className="font-extrabold text-base w-full bg-[#FF1717]  text-white mt-[32px]">
                    Delete Account
                  </Button>
                </form>
              </Form>
            </div>
            {isDeleteModal && (
              <DeleteAccountPopup
                onClose={() => setDeleteModal(false)}
                open={() => setDeleteModal(true)}
              />
            )}

            {/* <div className="flex items-center gap-[20px] mt-[32px] ">
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
              </div> */}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default DeleteAccountPasswordPopup;
