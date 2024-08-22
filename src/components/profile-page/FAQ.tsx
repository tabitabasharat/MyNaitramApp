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
  //   password: z
  //     .string()
  //     .min(8, { message: "Password must contain at least 8 characters." })
  //     .regex(/[a-z]/, {
  //       message: "Password must contain at least one lowercase letter.",
  //     })
  //     .regex(/[A-Z]/, {
  //       message: "Password must contain at least one uppercase letter.",
  //     })
  //     .regex(/[0-9]/, { message: "Password must contain at least one number." })
  //     .regex(/[^a-zA-Z0-9]/, {
  //       message: "Password must contain at least one special character.",
  //     }),
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
    // Do something with the form values.
    // :white_check_mark: This will be type-safe and validated.
    console.log(values);
  }
  const pathname = usePathname();
  const [activeDiv, setActiveDiv] = useState(0);
  const handleClick = (index: any) => {
    setActiveDiv(index);
  };
  const [active, setActive] = useState(false);
  // Function to toggle the active state
  const handleClickAccor = () => {
    setActive(!active);
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const handleAccordionChange = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active index
  };
  return (
    <div className="w-full md:w-[70%] md:mx-auto lg:w-full lg:mx-0">
      <h2 className="font-bold text-[24px] lg:text-[32px] mb-[24px] sm:mb-[53px] ps-[12px]">
        FAQ
      </h2>
      <div className="flex gap-[8px]">
        {["General", "Account", "Login"].map((text, index) => (
          <div
            key={index}
            className={`text-sm font-bold p-[12px] rounded-[44px] border w-[92px] text-center cursor-pointer ${
              activeDiv === index
                ? "text-green-500 border-green-500 bg-[#1A1A1A]"
                : "text-[#E6E6E6] border-[#FFFFFF0F] gradient-slate"
            }`}
            onClick={() => handleClick(index)}
          >
            {text}
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-col gap-[12px] sm:gap-[20px] mt-[24px] lg:mt-[20px]">
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
          {
            title: "Is Naitram safe for me?",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
          },
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
            className="gradient-slate rounded-[8px] mb-[0px]"
            style={{
              border:
                activeIndex === index
                  ? "1px solid #13FF7A"
                  : "1px solid transparent",
            }}
            sx={{
              "&.Mui-expanded": {
                marginBottom:"0px",
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
                  marginBottom:"0px"
                },
                "& .MuiAccordionSummary-content": {
                  margin: "0px",
                  padding: "20px 0px",
                },
                "&.MuiButtonBase-root.MuiAccordionSummary-root": {
                  minHeight: "0",
                  // padding:"20px 12px",
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