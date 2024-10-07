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

import { useState, useEffect,useRef } from "react";
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
import { deleteUser,ResendDeletCode } from "@/lib/middleware/signin";

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
  password: z.string().min(1, { message: "Password cannot be empty." }),
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
      password: "",
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

  const imageUrl = myProfile?.profilePicture?.startsWith("http") || myProfile?.profilePicture?.startsWith("https")
    ? myProfile?.profilePicture
    : "/person3.jpg";
  console.log("image src is", imageUrl);

  async function handledeleteUser(values: z.infer<typeof formSchema>) {
    setLoader(true);
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    const useremail =
      typeof window !== "undefined" ? localStorage.getItem("email") : null;
    console.log("my user id", userID);
    const data = {
      email: useremail,
      password: Password,
    };

    try {
      dispatch(signin(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);

          //   SuccessToast("Account Deleted Successfully");
          setDeleteModal(true);
          //   localStorage.clear();
          //   router.push("/");
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

  async function VerifySignUp(values: z.infer<typeof formSchema>) {
    console.log("Signup Verification");
    const useremail =
    typeof window !== "undefined" ? localStorage.getItem("email") : null;
    setLoader(true);
    try {
      const data = {
        // google: false,
        email: useremail,
        code: otpInputValues.join(""),
      };
      dispatch(deleteUser(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log(res,"this is verify delete")
          console.log(data);
          setDeleteModal(true);

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
    const useremail =
      typeof window !== "undefined" ? localStorage.getItem("email") : null;
   
    setLoader(true);
    try {
      const data = {
        email: useremail,
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

            <div className="flex items-center flex-col ">
              {/* <Image src={Iconpop} alt="icon" /> */}
              <p className="mt-[16px] font-weight[700] leading-[24px] whitelist-txt text-center">
                Enter your password to<br></br> delete your account
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
          <form
            onSubmit={form.handleSubmit(VerifySignUp)}
            className=""
          >
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
                            className="accnt-verification-input text-center font-bold placeholder:font-normal"
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
            <button
              className="opacity-70 font-normal mb-[50px] hover:opacity-100 "
              onClick={()=>{ResentCode()}}
            >
              Didn't receive the code? <span className="font-extrabold underline"> Request again</span>
            </button>
            <DialogFooter className="w-full pt-4 bg-[#101010] border-t border-muted">
              <Button type="submit" className="font-extrabold text-base w-full">
                Verify
              </Button>
            </DialogFooter>
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
