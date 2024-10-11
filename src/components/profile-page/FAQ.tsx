"use client";
import Image from "next/image";
import GradientBorder from "../ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  TelegramLogo,
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  Chats,
  UserGear,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import AccountSidebarLink from "@/components/reusable-components/AccountSidebarLink";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CaretRight, Minus } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import minus from "../../assets/ic_baseline-minus.svg";
import add from "../../assets/material-symbols_add.svg";
import { MinusIcon } from "lucide-react";
const formSchema = z.object({
  facebook: z.string().min(2, { message: "Full name cannot be empty." }),
  linkedIn: z.string().min(2, { message: "Full name cannot be empty." }),
  insta: z.string().min(2, { message: "Full name cannot be empty." }),
  telegram: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "Invalid email address." }),
});
const FAQ = ({
  className,
  setPopupOpen,
}: {
  className?: string;
  setPopupOpen?: any;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebook: "Sohail Hussain",
      insta: "sohailhussain00",
      linkedIn: "sohailhussain",
      telegram: "sohailhussain@gmail.com",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const pathname = usePathname();
  const [activeDiv, setActiveDiv] = useState(0);
  const handleClick = (index: any) => {
    setActiveDiv(index);
  };
  const [active, setActive] = useState(false);
  const handleClickAccor = () => {
    setActive(!active);
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const handleAccordionChange = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [activebtn, setActivebtn] = useState<string>("General");

  // Function to handle clicks and set active state
  const handleClickbtn = (period: string) => {
    setActivebtn(period);
  };

  return (
    <div className="w-full mt-[45px] lg:w-[600px] lg:ps-[172px] md:mx-auto lg:mt-[92px] lg:mx-0">
      <h2 className="font-bold text-[24px] ms-[24px] lg:ms-[0px] lg:text-[32px] mb-[24px] sm:mb-[53px]">
        FAQ
      </h2>
      <div className="flex  gap-[8px] ">
        {/* {["General", "Account", "Login"].map((text, index) => ( */}
        <div className="flex flex-wrap gap-2 mt-[20px]">
          {/* General Button */}
          <div
            onClick={() => handleClickbtn("General")}
            className={`border border-[#3C3C3C] w-[92px] justify-center rounded-full flex flex-row lg:flex-col gap-1 px-[12px] py-[8px] gradient-slate ${
              activebtn === "General"
                ? "gradient-border-notify text-primary"
                : "text-white"
            } items-center cursor-pointer`}
          >
            <p className="text-sm font-extrabold">General</p>
          </div>

          {/* Account Button */}
          <div
            onClick={() => handleClickbtn("Account")}
            className={`border border-[#3C3C3C] w-[92px] flex justify-center rounded-full flex flex-row lg:flex-col gap-1 px-[12px] py-[8px] gradient-slate ${
              activebtn === "Account"
                ? "gradient-border-notify text-primary"
                : "text-white"
            } items-center cursor-pointer`}
          >
            <p className="text-sm text-center font-extrabold">Account</p>
          </div>

          {/* Login Button */}
          <div
            onClick={() => handleClickbtn("Login")}
            className={`border border-[#3C3C3C] w-[92px] justify-center text-center rounded-full flex flex-row lg:flex-col gap-1 px-[12px] py-[8px] gradient-slate ${
              activebtn === "Login"
                ? "gradient-border-notify text-primary"
                : "text-white"
            } items-center cursor-pointer`}
          >
            <p className="text-sm font-extrabold">Login</p>
          </div>
        </div>
        {/* ))} */}
      </div>
      <div className="flex flex-col lg:flex-col gap-[12px] sm:gap-[20px] mb-[80px] mt-[24px] lg:mt-[20px]">
        {[
          {
            title: "What is Naitram?",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            title: "How to use Naitram?",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },
          // {
          //   title: "Is Naitram safe for me?",
          //   content:
          //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          // },
          {
            title: "Is Naitram free to use?",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },
          {
            title: "How to reset account in Naitram?",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },
        ].map((accordion, index) => (
          <Accordion
            key={index}
            expanded={activeIndex === index}
            onChange={() => handleAccordionChange(index)}
            className="gradient-slate border-[0.86px] border-transparent rounded-[8px] mb-[0px]"
            style={{
              background:
                activeIndex === index
                  ? "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box"
                  : "linear-gradient(#0F0F0F, #1A1A1A) padding-box",
              borderImage:
                activeIndex === index
                  ? "linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%)"
                  : "none",
              borderImageSlice: activeIndex === index ? 1 : undefined,
            }}
            sx={{
              "&.Mui-expanded": {
                marginBottom: "0px",
              },
            }}
          >
            <AccordionSummary
              expandIcon={
                <Image
                  src={activeIndex === index ? minus : add}
                  alt={activeIndex === index ? "Minus icon" : "Add icon"}
                  width={24} // Set the desired width
                  height={24} // Set the desired height
                />
              }
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              className="text-base font-bold text-[white] rounded-[8px] "
              sx={{
                "& .MuiAccordionSummary-content.Mui-expanded": {
                  margin: "0px",
                  minHeight: 0,
                  padding: "16px 0px 6px 0px",
                },
                "&.Mui-expanded": {
                  minHeight: "0",
                  marginBottom: "0px",
                },
                "& .MuiAccordionSummary-content": {
                  margin: "0px",
                  padding: "20px 0px",
                },
                "&.MuiButtonBase-root.MuiAccordionSummary-root": {
                  minHeight: "0",
                  height:"80px",
                  borderRadius: "8px",
                },
                "&.MuiButtonBase-root.MuiAccordionSummary-root .MuiAccordionSummary-content":
                  {
                    color: "#FFFFFF",
                  },
              }}
            >
              {accordion.title}
            </AccordionSummary>
            <AccordionDetails className="text-[#8F8F8F] text-sm font-normal pt-0 pb-[16px]  rounded-[8px]">
              {accordion.content}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
export default FAQ;
