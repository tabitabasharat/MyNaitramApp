"use client";

import { Reveal } from "@/components/animations/Reveal";
import { Input } from "../../../ui/input";
import { StayInformedEmail } from "@/lib/middleware/signin";
import {
  ErrorToast,
  SuccessToast,
} from "@/components/reusable-components/Toaster/Toaster";
import { getViewPastEventsBox } from "@/lib/middleware/event";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";

export default function Card() {
  const [Email, setEmail] = useState<any>("");
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();

  async function handleEmail() {
    setLoader(true);
    try {
      const data = {
        email: Email,
      };
      dispatch(StayInformedEmail(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          SuccessToast("Email Sent Successfully");
          setEmail("");
        } else {
          ErrorToast(res?.payload?.message || "Something went wrong");
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
    }
  }
  return (
    // <section className="py-[120px]">
    //   <div className="max-w-[1140px] flex mx-auto justify-center">
    //     <div
    //       style={{
    //         backgroundImage: "url(/About/cardAbout.png)",
    //         backgroundPosition: " center center",
    //         backgroundRepeat: "no-repeat",
    //         backgroundSize: "cover",
    //         opacity: "0.3",
    //       }}
    //       className="border-[#009540] rounded-[20px] border-2 py-[90px] flex flex-col items-center "
    //     >
    //       <h1 className="text-[60px] text-center font-[700] mb-[30px] ">Stay Informed and never miss an update</h1>
    //       <div className="flex">
    //         <input placeholder="Your Email Adresss" type="text" />
    //         <button>Subscribe</button>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section className="pt-[60px] pb-[75px]  md:pt-[100px] md:pb-[120px]">
      <div className="md:max-w-[1140px] flex mx-auto justify-center w-[100%] md:px-0 px-[20px]">
        <div className="relative border-[#009540] rounded-[20px] border-2 py-[50px] md:py-[90px] flex flex-col items-center w-[100%]">
          <div
            className="absolute inset-0 rounded-[20px]"
            style={{
              backgroundImage: "url(/About/cardAbout.png)",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              opacity: 0.3,
              zIndex: 0,
            }}
          ></div>
          <Reveal y={100} width="100%">
            <div className="relative z-10 md:px-0 px-[20px] w-[100%] ">
              <h1 className="md:text-[60px] text-[24px] text-center font-[700] mb-[30px]">
                Stay Informed and never miss an update
              </h1>
              <div className="flex justify-center items-center flex-wrap gap-[20px] ">
                <Input
                  placeholder="Your Email Adresss"
                  type="text"
                  style={{ background: "transparent" }}
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-[#009540] rounded-[10px] border-2  text-[17px] bg-transparent  w-[100%] md:w-[458px] pl-[30px] h-[62px] focus:border-[#009540] focus:border-dashed "
                />
                <button
                  className="bg-[#009540] text-white rounded-[10px] md:w-[163px] h-[65px] text-[15px] font-[700] w-[100%] "
                  onClick={handleEmail}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
