"use client";
import { useState, useEffect } from "react";
// import { useAppDispatch } from "@/services/hooks";
import { useAppDispatch } from "@/lib/hooks";

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

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Envelope,
  GoogleLogo,
  Lock,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { Separator } from "@/components/ui/separator";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthMode } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import AccountVerificationModal from "./AccountVerificationModal";
// import { signup } from "@/services/redux/middleware/signin";
import { signup } from "@/lib/middleware/signin";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
import ScreenLoader from "../loader/Screenloader";
const formSchema = z
  .object({
    full_name: z.string().min(2, { message: "Full name cannot be empty." }),

    email: z
      .string()
      .min(1, { message: "Email cannot be empty." })
      .email({ message: "Invalid email address." }),

    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one special character.",
      }),

    confirm_password: z
      .string()
      .min(1, { message: "Confirm Password cannot be empty." }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
  });

const SignUpModal = ({
  setAuthMode,
  setSigninModal,
}: {
  setSigninModal: () => void;
  setAuthMode: Dispatch<SetStateAction<AuthMode>>;
}) => {
  const dispatch = useAppDispatch();
  const router=useRouter()

  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("my values", values);
    console.log("User Account Signup");

    setLoader(true);
    try {
      const data = {
        // google: false,
        email: email,
        password: password,
        fullname: fullname,
        isGoogleSignIn: false,
      };
      dispatch(signup(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          SuccessToast("Verification Code Sended");
          // navigate(`/SignUp-Verify/${email}`);
          setVerificationModalOpen(true);
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
  const logingoogleUser = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const datas = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      );

      try {
        const data = {
          // id: userId,
          email: datas?.data?.email,
          fullname: datas?.data?.name,
          isGoogleSignIn: true,
        };
        console.log(datas?.data);
        dispatch(signup(data)).then((res: any) => {
          if (res?.payload?.status === 200) {
            setLoader(false);
            console.log(data);
            SuccessToast("Google Sign Up Successfully");
            console.log("hhh", res);
            localStorage.setItem("_id", res?.payload?.data?.id);
            localStorage.setItem("token", res?.payload?.token);
            localStorage.setItem(
              "profileupdate",
              res?.payload?.data?.profileUpdate
            );

            // navigate(`/OrgnizationDetails/${datas?.data?.email}`);
            setSigninModal();
            router.push("/events")
            if (res?.payload?.data?.profileUpdate) {
              // navigate("/Dashboard");
              console.log("dashboard");
            } else {
              // navigate("/Profile");
              console.log("profile");
            }
          } else {
            setLoader(false);

            ErrorToast(res?.payload?.message);
          }
        });
      } catch (error) {
        console.error("Error:", error);
        ErrorToast(error);
      }
    },
  });

  return (
    <>
      <DialogContent className="sm:max-w-md lg:max-w-[600px] pb-4 pt-0">
        {loader && <ScreenLoader />}
        <ScrollArea className="max-h-[90vh]">
          <DialogHeader className="relative overflow-hidden pt-4">
            <DialogTitle className="font-bold text-2xl mb-[18px]">
              Sign <span className="text-primary">Up</span>
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

          {/* <Button
            variant="secondary"
            className="w-full flex items-center gap-1 mt-5"
            onClick={() => logingoogleUser()}
          >
            <GoogleLogo size={22} weight="fill" /> Sign up with Google
          </Button> */}

          {/* <div className="flex items-center justify-between gap-4 mt-5 mb-5">
            <Separator className="bg-[#292929] w-[45%]" />
            <p className="font-bold">OR</p>
            <Separator className="bg-[#292929] w-[45%]" />
          </div> */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-[24px]">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                      FULL NAME
                    </FormLabel>
                    <User
                      className="absolute right-3 translate-y-[0.9rem]"
                      size={20}
                    />
                    <FormControl>
                      <Input
                        placeholder="Enter Fullname"
                        className="pt-11 pb-5 font-bold placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                      EMAIL
                    </FormLabel>
                    <Envelope
                      className="absolute right-3 translate-y-[0.9rem]"
                      size={20}
                    />
                    <FormControl>
                      <Input
                        placeholder="youremail@example.com"
                        className="pt-11 pb-5 font-bold placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3 z-10">
                      PASSWORD
                    </FormLabel>
                    <Lock
                      className="absolute right-3 translate-y-[0.9rem] z-10"
                      size={20}
                    />
                    <FormControl>
                      <PasswordInput
                        placeholder="Input password"
                        className="pt-11 pb-5 font-bold placeholder:font-normal"
                        {...field}
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

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3 z-10">
                      CONFORM PASSWORD
                    </FormLabel>
                    <Lock
                      className="absolute right-3 translate-y-[0.9rem] z-10"
                      size={20}
                    />
                    <FormControl>
                      <PasswordInput
                        placeholder="Input password again"
                        className="pt-11 pb-5 font-bold placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="w-full mt-6 pt-4 bg-[#101010] border-t border-muted">
                <Button type="submit" className="font-bold w-full">
                  Create an Account
                </Button>
              </DialogFooter>
              <p className="font-bold text-center">
                Have an account?{" "}
                <span
                  onClick={() => {
                    setAuthMode("SIGNIN");
                  }}
                  className="underline cursor-pointer hover:opacity-60 duration-300"
                >
                  Login here
                </span>
              </p>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
      {isVerificationModalOpen && (
        <AccountVerificationModal
          setAuthMode={setAuthMode}
          useremail={email}
          onVerifyClose={() => setVerificationModalOpen(false)}
          setSigninModal={setSigninModal}
        />
      )}
    </>
  );
};

export default SignUpModal;
