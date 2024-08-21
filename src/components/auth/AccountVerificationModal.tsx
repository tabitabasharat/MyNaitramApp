"use client";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ufo from "@/assets/ufo.png";
import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthMode } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
import "./AccountVerificationModal.css";
import { useAppDispatch } from "@/lib/hooks";
import { verifysignup, updateverifycode } from "@/lib/middleware/signin";
import ScreenLoader from "../loader/Screenloader";
import { useRouter } from "next/navigation";

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

const AccountVerificationModal = ({
  setAuthMode,
  useremail,
  onVerifyClose,
  setSigninModal
}: {
  setAuthMode: Dispatch<SetStateAction<AuthMode>>;
  useremail: string;
  onVerifyClose: () => void;
  setSigninModal:( )=> void
}) => {

  const router=useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textbox: "",
      textbox1: "",
      textbox2: "",
      textbox3: "",
    },
  });

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [otpInputValues, setOtpInputValues] = useState(["", "", "", ""]);

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

  async function VerifySignUp(values: z.infer<typeof formSchema>) {
    console.log("Signup Verification");

    setLoader(true);
    try {
      const data = {
        // google: false,
        email: useremail,
        code: otpInputValues.join(""),
      };
      dispatch(verifysignup(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log(res,"this is verify")
          console.log(data);
          localStorage.setItem("_id", res?.payload?.data?.id);
          localStorage.setItem("name", res?.payload?.data?.fullname);
          localStorage.setItem("email", res?.payload?.data?.email);

        
          localStorage.setItem("token", res?.payload?.token);

          SuccessToast("Account Verified Successfully");
          onVerifyClose();
          setSigninModal()
          router.push("/viewallevents")
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
   
    setLoader(true);
    try {
      const data = {
        email: useremail,
      };
      dispatch(updateverifycode(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log(data);
          SuccessToast("Again Code Sent Successfully");
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
    <DialogContent className="sm:max-w-md lg:max-w-[600px] pb-4 pt-0">
       {loader && <ScreenLoader />}
      <ScrollArea className="max-h-[90vh]">
        <DialogHeader className="relative overflow-hidden pt-4">
          <DialogTitle className="font-bold text-2xl">
            Account <span className="text-primary">Verification</span>
          </DialogTitle>
          <Image
            src={ufo}
            width={100}
            height={100}
            className="absolute right-0 scale-[2]"
            alt="ufo"
          />
          <Separator className="scale-x-[1.09] bg-[#292929]" />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(VerifySignUp)}
            className="space-y-2"
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
              className="opacity-70 font-bold mb-14 hover:opacity-100 underline translate-y-[-0.4rem]"
              onClick={()=>{ResentCode()}}
            >
              Didn't receive the code? Request again
            </button>
            <DialogFooter className="w-full pt-4 bg-[#101010] border-t border-muted">
              <Button type="submit" className="font-bold w-full">
                Verify
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </ScrollArea>
    </DialogContent>
  );
};

export default AccountVerificationModal;