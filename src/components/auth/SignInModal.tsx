"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
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
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Envelope, GoogleLogo, Lock } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthMode } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import { signin } from "@/lib/middleware/signin";
import { useAppDispatch } from "@/lib/hooks";
import { useState, useEffect } from "react";
import {
  ErrorToast,
  SuccessToast,
} from "../reusable-components/Toaster/Toaster";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import ScreenLoader from "../loader/Screenloader";
import { useRouter } from "next/navigation";
import AccountVerificationModal from "./AccountVerificationModal";
import { AppleIcon } from "lucide-react";
import { AppleLogo } from "@phosphor-icons/react";

const formSchema = z.object({
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
});

const SignInModal = ({
  setAuthMode,
  setSigninModal,
  redirectRoute,
}: {
  setAuthMode: Dispatch<SetStateAction<AuthMode>>;
  setSigninModal: () => void;
  redirectRoute: any;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isFormActive =
    isEmailFocused ||
    isPasswordFocused ||
    email.length > 0 ||
    password.length > 0;

  // const handleEmailChange = (e): any => {
  //   const value = e.target.value;
  //   setEmail(value);
  //   setIsEmailActive(value !== "" || document.activeElement === e.target);
  // };

  // const handlePasswordChange = (e) => {
  //   const value = e.target.value;
  //   setPassword(value);
  //   setIsPasswordActive(value !== "" || document.activeElement === e.target);
  // };

  async function login(values: z.infer<typeof formSchema>) {
    setLoader(true);
    try {
      const data = {
        email: email,
        password: password,
        isGoogleSignIn: false,
      };
      dispatch(signin(data)).then((res: any) => {
        console.log("inside the login", res);
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("login res", res?.payload?.data);
          localStorage.setItem("_id", res?.payload?.data?.id);
          localStorage.setItem("token", res?.payload?.token);

          localStorage.setItem("name", res?.payload?.data?.fullname);
          localStorage.setItem("email", res?.payload?.data?.email);

          localStorage.setItem(
            "profileupdate",
            res?.payload?.data?.profileUpdate
          );

          SuccessToast("login success");
          setSigninModal();
          router.push("/viewallevents");
          if (res?.payload?.data?.profileUpdate) {
            // navigate("/Dashboard");
            console.log("dash");
          } else {
            // navigate("/Profile");
            console.log("profile");
          }
        } else if (res?.payload?.status === 201) {
          setVerificationModalOpen(true);
        } else {
          setLoader(false);
          console.log(res?.payload?.message);
          ErrorToast(res?.payload?.message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const logingoogle = useGoogleLogin({
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
        console.log("datas", datas);
        console.log("data only", datas?.data);

        dispatch(signin(data)).then((res: any) => {
          if (res?.payload?.status === 200) {
            setLoader(false);
            console.log(" google login data is ", data);
            SuccessToast("Google Login Success");
            console.log("google login response", res);

            localStorage.setItem("_id", res?.payload?.data?.id);
            localStorage.setItem("token", res?.payload?.token);
            localStorage.setItem("name", res?.payload?.data?.fullname);
            localStorage.setItem("email", res?.payload?.data?.email);
            localStorage.setItem(
              "profileupdate",
              res?.payload?.data?.profileUpdate
            );
           


            setSigninModal();
            router.push(redirectRoute);
          // router.push("/viewallevents");

            // if (res?.payload?.data?.profileUpdate) {
            //   console.log("dashboard");
            // } else {
            //   console.log("profile");
            // }
          } else {
            console.log("this is the response of sign in", res);
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
      <DialogContent className="sm:max-w-md lg:max-w-[600px] px-[0px] pb-4 pt-0 ">
        {loader && <ScreenLoader />}
        <ScrollArea className="max-h-[90vh]">
          <DialogHeader className="relative px-[24px] overflow-hidden  ">
            <DialogTitle className="font-bold py-[18px] text-2xl">
              Sign <span className="text-primary">In</span>
            </DialogTitle>

            <Image
              src={ufo}
              width={100}
              height={100}
              className="absolute right-0 scale-[2]"
              alt="ufo"
            />
            <Separator className="scale-x-[1.09] bg-[#292929] " />
          </DialogHeader>
          <div className="px-[24px]">
            <Button
              variant="secondary"
              className="w-full flex items-center gap-1 mt-6"
              onClick={() => logingoogle()}
            >
              <GoogleLogo size={22} weight="fill" /> Sign in with Google
            </Button>
            {/* <Button
              variant="secondary"
              className="w-full flex text-sm lg:text-base font-bold items-center gap-1 lg:mt-[16px] mt-[24px]"
              onClick={() => logingoogle()}
            >
              <AppleLogo size={22} weight="fill" /> Sign up with Apple
            </Button> */}
            <div className="flex items-center mt-[24px] justify-center">
              <hr className="flex-grow border-t border-[#292929]" />
              <p className="px-4 text-center text-sm font-extrabold  text-white">
                OR
              </p>
              <hr className="flex-grow border-t border-[#292929]" />
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(login)} className="mt-[24px]">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem
                      className="relative mb-[20px] space-y-0 "
                    >
                      <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                        EMAIL
                      </FormLabel>
                      <Envelope
                        className="absolute right-3 top-[10px] translate-y-[0.9rem]"
                        size={20}
                      />
                      <FormControl>
                        <Input
                          placeholder="youremail@example.com"
                          className="pt-11 pb-5"
                          {...field}
                          onFocus={() => setIsEmailFocused(true)}
                          onBlur={() => setIsEmailFocused(false)}
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
                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem
                      className="relative space-y-0 "
                    >
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

                <button className="opacity-70 font-bold text-base text-[#BFBFBF] hover:opacity-100 underline mt-[8px]">
                  <Link href="/auth/resetpasspage">Forgot your password?</Link>
                </button>

                <DialogFooter className="w-full mt-6 pt-4 bg-[#101010] border-t border-muted">
                  <Button type="submit" className="font-bold text-base w-full">
                    Log In
                  </Button>
                </DialogFooter>

                <p className="font-extrabold mt-[16px] text-sm text-center">
                  Don't have an account?{" "}
                  <span
                    onClick={() => {
                      setAuthMode("SIGNUP");
                    }}
                    className="underline cursor-pointer hover:opacity-60 duration-300"
                  >
                    Sign up now
                  </span>
                </p>
              </form>
            </Form>
          </div>
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

export default SignInModal;
