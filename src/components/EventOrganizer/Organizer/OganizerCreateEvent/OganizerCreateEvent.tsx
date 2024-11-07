"use client";
import TextField from "@mui/material/TextField";

import whitefree from "@/assets/Wallet/white free.svg";
import greenfree from "@/assets/Wallet/Green free.svg";
import LocationAutocomplete from "@/components/create-event/Locationinput";
import Receviepayment from "@/components/popups/receviepayment/Receviepayment";
import EventSubmmitModal from "@/components/EventSubmmitModal/EventSubmmitModal";
import WalletChooseModal from "@/components/Walletchoose/WalletChooseModal";
import React from "react";
import "@/components/create-event/CreateEvent.css";
import Image from "next/image";
import ufo from "@/assets/UFO_SVG.png";
import cam from "@/assets/Camera.svg";
import bgframe from "@/assets/uploadFrame.svg";
import newCover from "@/assets/Frame 1597878544 (1).svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import Editicon from "@/assets/Editicon.svg";
// import addicon from "@/assets/add-icon.svg";
import addicon from "@/assets/Wallet/Plus.svg";
import Backward from "@/components/Backward/Backward";
import deleteicon from "@/assets/Wallet/delete-icon.svg";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuccessToast, ErrorToast } from "@/components/reusable-components/Toaster/Toaster";
import { useForm, Controller } from "react-hook-form";
import { UploadSimple } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { API_URL } from "@/lib/client";
import crossicon from "@/assets/cross-img-icon.svg";
// import { DatePicker } from "@/components/organisms/DatePicker";

import { useRouter } from "next/navigation";

import TimePicker from "react-time-picker";

import "react-time-picker/dist/TimePicker.css";
// import 'react-clock/dist/Clock.css';
import "react-datepicker/dist/react-datepicker.css";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import bgframe2 from "@/assets/uploadframe2.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "@/components/loader/Screenloader";
import { createevent } from "@/lib/middleware/event";
import api from "@/lib/apiInterceptor";
import arrowdown from "@/assets/aboutdropdown.svg";
import arrowup from "@/assets/Arrow up.svg";
import img1 from "@/assets/Handbag (1).svg";
import img2 from "@/assets/Cake.svg";
import img3 from "@/assets/Crown.svg";
import img4 from "@/assets/Shield Star.svg";
import img5 from "@/assets/Whats-Included/option5.svg";
import img6 from "@/assets/Whats-Included/option6.svg";
import img7 from "@/assets/Whats-Included/option7.svg";
import img8 from "@/assets/Whats-Included/option8.svg";
import img9 from "@/assets/Whats-Included/option9.svg";
import img10 from "@/assets/Whats-Included/option10.svg";
import img11 from "@/assets/Whats-Included/option11.svg";
import img12 from "@/assets/Whats-Included/option12.svg";
import img13 from "@/assets/Whats-Included/option13.svg";
import img14 from "@/assets/Whats-Included/option14.svg";
import img15 from "@/assets/Whats-Included/option15.svg";
import img16 from "@/assets/Whats-Included/option16.svg";
import img17 from "@/assets/Whats-Included/option17.svg";
import img18 from "@/assets/Whats-Included/option18.svg";
import img19 from "@/assets/Whats-Included/option19.svg";
import img20 from "@/assets/Whats-Included/option20.svg";
import tick from "@/assets/fi-rr-check.svg";
import { updateEvent } from "@/lib/middleware/event";
import Protectedroute from "@/lib/ProtectedRoute/Protectedroute";
import { AnyAaaaRecord } from "dns";
import Editor from "@/components/reusable-components/Editor";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import calendaricon from "@/assets/calender.svg";
// import styled from "styled-components";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { addHours } from "date-fns";
import { color } from "framer-motion";

type TicketTypeOption = {
  id: number;
  label: string;
};
type TicketType = {
  type: any;
  price: any;
  no: any;
  options: TicketTypeOption[];
  dropdown: any;
  selected: any;
};
type cateOption = {
  id: number;
  label: string;
};
type Category = {
  options: cateOption[];
  dropdown: any;
};

const categorySchema = z.object({
  options: z
    .array(
      z.object({
        id: z.number(),
        label: z.string(),
      })
    )
    .min(1, { message: "Please select at least one option." }), // Ensure at least one option is selected
  dropdown: z.boolean().optional(),
});

const isValidDateTime = (dateTimeString: string) => {
  const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
  if (!dateTimeRegex.test(dateTimeString)) return false;

  const dateTimeParts = dateTimeString.split("T");
  const [year, month, day] = dateTimeParts[0].split("-").map(Number);
  const [hours, minutes] = dateTimeParts[1].split(":").map(Number);

  const date = new Date(year, month - 1, day, hours, minutes);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getHours() === hours &&
    date.getMinutes() === minutes
  );
};

const formSchema = z.object({
  eventname: z.string().min(1, { message: "Event name cannot be empty." }),
  eventHashtags: z
    .array(
      z.string().min(2, { message: "Hashtag must be at least 2 characters" }) // Keep the minimum length requirement
    )
    .min(1, { message: "At least one hashtag is required" }),

  eventcategory: z.object({
    label: z.string().min(1, { message: "Category cannot be empty" }),
  }),

  eventlocation: z.string().min(1, { message: "Event location cannot be empty." }),
  eventstartdate: z.string().min(1, { message: "Ticket start date cannot be empty." }),

  eventenddate: z.string().min(1, { message: "Ticket end date  cannot be empty." }),

  eventstarttime: z.string().min(1, { message: "Event start time cannot be empty." }),

  eventendtime: z.string().min(1, { message: "Event end time cannot be empty." }),

  eventdescription: z.string().min(1, { message: "Event description cannot be empty." }),

  // compticketno: z
  //   .string()
  //   .min(1, { message: "Complimentary ticket number cannot be empty." }),
  fburl: z.string().url({ message: "Invalid Facebook URL." }).min(1, { message: "Facebook URL cannot be empty." }),
  instaurl: z.string().url({ message: "Invalid Instagram URL." }).min(1, { message: "Instagram URL cannot be empty." }),
  youtubeurl: z.string().url({ message: "Invalid YouTube URL." }).min(1, { message: "YouTube URL cannot be empty." }),
  tiktokurl: z.string().url({ message: "Invalid TikTok URL." }).min(1, { message: "TikTok URL cannot be empty." }),
  linkedinurl: z.string().url({ message: "Invalid Linkedin URL." }).min(1, { message: "Linkedin URL cannot be empty." }),
  twitterurl: z.string().url({ message: "Invalid Twitter URL." }).min(1, { message: "Twitter URL cannot be empty." }),
  telegramurl: z.string().url({ message: "Invalid Telegram URL." }).min(1, { message: "Telegram URL cannot be empty." }),
  // eventmainimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  eventmainimg: z.string().optional(),
  eventcoverimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  // selected: z.string(),
  // tickets: z.array(
  //   z.object({
  //     type: z.string().min(1, { message: "Ticket type cannot be empty." }),
  //     price: z
  //       .string()
  //       .min(1, { message: "Ticket price must be greater than 0." }),
  //     no: z
  //       .string()
  //       .min(1, { message: "Number of tickets must be greater than 0." }),
  //   })
  // ),

  // ticketss: z.array(
  //   z
  //     .object({
  //       type: z.string().min(1, { message: "Ticket type cannot be empty." }),
  //       // price: z.union([z.string(), z.number()]).optional(),
  //       price: z.string().min(1, { message: "Ticket price cannot be empty." }),
  //       no: z
  //         .union([z.string(), z.number()])
  //         .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
  //           message: "Number of tickets must be greater than 0.",
  //           path: ["no"],
  //         }),
  //       selected: z.string().optional(),
  //     })
  //     .refine(
  //       (data) => {
  //         if (data.selected === "paid") {
  //           const priceIsValid =
  //             data.price !== undefined &&
  //             ((typeof data.price === "string" && data.price.trim() !== "") ||
  //               (typeof data.price === "number" && data.price > 0));

  //           return priceIsValid;

  //         } else if (data.selected === "free") {
  //           return data.price === undefined; // Price must be undefined for free tickets
  //         }
  //         return true; // If neither selected, pass validation
  //       },
  //       {
  //         message:
  //           "Price is required for paid tickets and should not be present for free tickets.",
  //         path: ["price"],
  //       }
  //     )
  // ),
  tickets: z.array(
    z
      .object({
        type: z.string().min(1, { message: "Ticket type cannot be empty." }),
        price: z.union([z.string(), z.number()]).optional(), // Price can be a string or number
        no: z.union([
          z.string().refine((val) => Number(val) > 0, {
            message: "Number of tickets must be greater than 0.",
          }),
          z.number().min(1, { message: "Number of tickets must be greater than 0." }),
        ]),
        selected: z.string().optional(),
      })
      .refine(
        (data) => {
          // Validate price based on selection
          if (data.selected === "paid") {
            const priceIsValid =
              data.price !== undefined &&
              ((typeof data.price === "string" && data.price.trim() !== "" && Number(data.price) > 0) ||
                (typeof data.price === "number" && data.price > 0));

            return priceIsValid;
          }
          return true; // Skip price validation for free tickets
        },
        {
          message: "Price must be greater than 0 for paid tickets.",
          path: ["price"], // Specify the path for the error
        }
      )
  ),
});

const formSchema2 = z.object({
  eventname: z.string().min(1, { message: "Event name cannot be empty." }),

  eventHashtags: z
    .array(
      z.string().min(2, { message: "Hashtag must be at least 2 characters" }) // Keep the minimum length requirement
    )
    .min(1, { message: "At least one hashtag is required" }),

  eventcategory: z.object({
    label: z.string().min(1, { message: "Category cannot be empty" }),
  }),

  eventlocation: z.string().min(1, { message: "Event location cannot be empty." }),
  eventstartdate: z.string().min(1, { message: "Ticket start date cannot be empty." }),

  eventenddate: z.string().min(1, { message: "Ticket end date  cannot be empty." }),

  eventstarttime: z.string().min(1, { message: "Event start time cannot be empty." }),

  eventendtime: z.string().min(1, { message: "Event end time cannot be empty." }),

  eventdescription: z.string().min(1, { message: "Event description cannot be empty." }),

  // compticketno: z
  //   .string()
  //   .min(1, { message: "Complimentary ticket number cannot be empty." }),
  fburl: z.string().url({ message: "Invalid Facebook URL." }).min(1, { message: "Facebook URL cannot be empty." }),
  instaurl: z.string().url({ message: "Invalid Instagram URL." }).min(1, { message: "Instagram URL cannot be empty." }),
  youtubeurl: z.string().url({ message: "Invalid YouTube URL." }).min(1, { message: "YouTube URL cannot be empty." }),
  tiktokurl: z.string().url({ message: "Invalid TikTok URL." }).min(1, { message: "TikTok URL cannot be empty." }),
  linkedinurl: z.string().url({ message: "Invalid Linkedin URL." }).min(1, { message: "Linkedin URL cannot be empty." }),
  twitterurl: z.string().url({ message: "Invalid Twitter URL." }).min(1, { message: "Twitter URL cannot be empty." }),
  telegramurl: z.string().url({ message: "Invalid Telegram URL." }).min(1, { message: "Telegram URL cannot be empty." }),
  // eventmainimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  eventmainimg: z.string().optional(),
  eventcoverimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  // selected: z.string(),
  // tickets: z.array(
  //   z.object({
  //     type: z.string().min(1, { message: "Ticket type cannot be empty." }),
  //     price: z.string().min(1, { message: "Ticket price cannot be empty." }),
  //     no: z
  //       .string()
  //       .min(1, { message: "Number of tickets must be greater than 0." }),
  //   })
  // ),
  // tickets: z.array(
  //   z.object({
  //     type: z.string().min(1, { message: "Ticket type cannot be empty." }),
  //     price: z.string().optional(),
  //     no: z.string().min(1, { message: "Number of tickets must be greater than 0." }),
  //     selected: z.string().optional(),
  //   }).refine((data) => {

  //     if (data.selected === "paid" && (!data.price || data.price.trim() === "")) {
  //       return false;
  //     }
  //     return true;
  //   }, {
  //     message: "Price is required .",
  //     path: ['price']
  //   })
  // ),

  // ticketss: z.array(
  //   z
  //     .object({
  //       type: z.string().min(1, { message: "Ticket type cannot be empty." }),
  //       price: z.union([z.string(), z.number()]).optional(), // Price can be a string or number
  //       no: z.union([
  //         z.string().refine((val) => Number(val) > 0, {
  //           message: "Number of tickets must be greater than 0.",
  //         }),
  //         z
  //           .number()
  //           .min(1, { message: "Number of tickets must be greater than 0." }),
  //       ]),
  //       selected: z.string().optional(),
  //     })
  //     .refine(
  //       (data) => {
  //         // Validate price based on selection
  //         if (data.selected === "paid") {
  //           const priceIsValid =
  //             data.price !== undefined &&
  //             ((typeof data.price === "string" && data.price.trim() !== "") ||
  //               (typeof data.price === "number" && data.price > 0));

  //           return priceIsValid;
  //         }
  //         return true; // Skip price validation for free tickets
  //       },
  //       {
  //         message: "Price is required for paid tickets.",
  //         path: ["price"], // Specify the path for the error
  //       }
  //     )
  // ),
  tickets: z.array(
    z
      .object({
        type: z.string().min(1, { message: "Ticket type cannot be empty." }),
        price: z.union([z.string(), z.number()]).optional(), // Price can be a string or number
        no: z.union([
          z.string().refine((val) => Number(val) > 0, {
            message: "Number of tickets must be greater than 0.",
          }),
          z.number().min(1, { message: "Number of tickets must be greater than 0." }),
        ]),
        selected: z.string().optional(),
      })
      .refine(
        (data) => {
          // Validate price based on selection
          if (data.selected === "paid") {
            const priceIsValid =
              data.price !== undefined &&
              ((typeof data.price === "string" && data.price.trim() !== "" && Number(data.price) > 0) ||
                (typeof data.price === "number" && data.price > 0));

            return priceIsValid;
          }
          return true; // Skip price validation for free tickets
        },
        {
          message: "Price must be greater than 0 for paid tickets.",
          path: ["price"], // Specify the path for the error
        }
      )
  ),
});

type Option = {
  id: number;
  label: string;
  image: string;
};
type CateOption = {
  label: string;
  // image: string;
};
interface EventData {
  // Add all other fields from your form schema
  eventmedia?: any[]; // Adjust the type based on what imagesOfGallery returns
}
type SelectedOption = "free" | "paid" | null;

const themeMui: any = createTheme({
  // typography: {
  //   fontFamily: '"ClashGrotesk"',
  // },
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
        paper: {
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          borderRadius: "12px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a1a",
          // width: "90%",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Color for unselected tabs
        },
        selected: {
          color: "#1976d2", // Color for selected tab
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          backgroundColor: "transparent",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#155a8a",
          },
          "&.Mui-disabled": {
            backgroundColor: "#303f9f", // Color for disabled state
            color: "#a0a0a0", // Text color for disabled state
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "&.MuiFormControl-root": {
            margin: "0px 0",
            width: "100%",
            border: "none",
            outline: "0",
            color: "#fff",
          },
          "& .MuiInputBase-root": {
            // Customize the input area
            backgroundColor: "transparent", // Dark background
            color: "#fff", // Text color
            borderRadius: "8px",
            border: "none",
            width: "99%",
            outline: "0",
            // Rounded corners
          },
          "& .MuiInputLabel-root": {
            color: "#fff",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            // Focused label color
            color: "#fff",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          color: "#fff", // Text color
          padding: "0px 0px  10.5px 0px ", // Example padding
          "&::placeholder": {
            color: "#ffffff", // Change to your desired placeholder color
            opacity: 1, // Make sure the opacity is set to 1
          },
        },
        notchedOutline: {
          border: "none",
        },
      },
    },
  },
});

const StyledDateTimePicker: any = styled(DateTimePicker)`
  & .MuiButton-root {
    // color: #8980f6;
    color: #ffffff;
  }
  & .MuiPaper-root {
    background-color: #eaea87;
    color: #ffffff;
  }
  & .MuiTypography-root {
    color: #ffffff;
    & .MuiTimePickerToolbar-root {
      display: none;
    }
  }

  //  & .MuiDialog-paper {
  //  background-color: #eaea87;
  //  }

  & .MuiIconButton-root {
    // color: #808080;
    color: #ffffff;
  }

  & .MuiInputBase-root {
    border: 1px solid transparent;
    // border-radius: 8px;
    border: none;

    // background: linear-gradient(to top, #0f0f0f, #0f0f0f, #0f0f0f, #1a1a1a);
    color: #ffffff;
    width: 100%;
  }
  & input {
    color: #ffffff; /* Text color inside the input */
  }
  & MuiPickersDay-root {
    color: #ffffff;
  }
  & MuiPickersDay-dayOutsideMonth {
    color: #ffffff;
  }
  & .MuiPickersDay-today {
    color: #ffffff;
    border-color: #ffffff;
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
    color: #ffffff;
  }
  & .MuiClockNumber-root {
    color: #ffffff;
  }
`;

function OganizerCreateEvent() {
  const theme = useTheme();

  function MuiIcon() {
    return <Image src={calendaricon} alt="Date picker opening icon" width={20} className="opacity-90" />;
  }
  const onKeyDown = (e: any) => {
    e.preventDefault();
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<SelectedOption>("free");

  const [categoryAlert, setCategoryAlert] = useState<any>(false);
  const [isWalletModalOpen, setisWalletModalOpen] = useState(false);
  const [isPreviewModalOpen, setisPreviewModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  // const [eventAllData, setEventAllData] = useState<EventData>({});
  const [eventAllData, setEventAllData] = useState<EventData | null>(null);
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const [dropdown, setDropdown] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const [userid, setUserid] = useState<any>("");
  const [Eventname, setEventname] = useState("");
  const [EventCategory, setEventCategory] = useState("");
  const [EventLocation, setEventLocation] = useState<string | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [coverImageWarning, setCoverImageWarning] = useState<any>(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false); // State to manage picker visibility
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
  const [isStartEventPickerOpen, setIsStartEventPickerOpen] = useState(false);
  const [isEndEventPickerOpen, setIsEndEventPickerOpen] = useState(false);

  // Toggle the date-time picker visibility
  const toggleDateTimePicker = () => {
    setIsPickerOpen((prev) => !prev);
  };
  const toggleEndDateTimePicker = () => {
    setIsEndDatePickerOpen((prev) => !prev);
  };
  const toggleStartEventTimePicker = () => {
    setIsStartEventPickerOpen((prev) => !prev);
  };
  const toggleEndEventTimePicker = () => {
    setIsEndEventPickerOpen((prev) => !prev);
  };

  const handleLocationSelect = (location: any) => {
    setEventLocation(location);
  };

  const [TicketStartDate, setTicketStartDate] = useState("");
  const [TicketEndDate, setTicketEndDate] = useState("");

  const [EventStartTime, setEventStartTime] = useState("");

  const [EventEndTime, setEventEndTime] = useState("");

  const [Eventdescription, setEventdescription] = useState("");
  console.log("event des", EventEndTime);

  const [CompTicketNo, setCompTicketNo] = useState("");
  const [MainImg, setMainImg] = useState("");
  const [MainImgName, setMainImgName] = useState<any>("");

  const [CoverImg, setCoverImg] = useState("");
  const [CoverImgName, setCoverImgName] = useState<any>("");

  const [FBUrl, setFBUrl] = useState("https://www.facebook.com/");
  const [InstaUrl, setInstaUrl] = useState("https://instagram.com/");
  const [TwitterUrl, setTwitterUrl] = useState("https://www.x.com/");
  const [TelegramUrl, setTelegramUrl] = useState("https://t.me/");
  const [YoutubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/");

  const [tiktokUrl, settiktokUrl] = useState("https://www.tiktok.com/@");
  const [linkedinUrl, setlinkedinUrl] = useState("https://linkedin.com/in/");
  const [eventsFiles, setEventsFile] = useState<any>([]);

  const router = useRouter();

  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    {
      type: "",
      price: "",
      no: "",
      options: [],
      dropdown: true,
      selected: "free",
    },
  ]);
  // const [ticketTypes, setTicketTypes] = useState([
  //   {
  //     type: "",
  //     price: "",
  //     no: "",
  //     selected: "free",
  //     dropdown: true,
  //     options: [],
  //   },
  // ]);
  const [categoryTypes, setCategoryTypes] = useState<{ label: string } | null>(null);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);

  const [chooseHashTags, setChoosenHashtags] = useState<any>([]);
  const [filterHash, setFilterHash] = useState<any>([]);
  const [hashINputValue, setHashTagValue] = useState<string>("");

  const [isCustomCatgory, setIsCustomCategory] = useState<boolean>(false);
  const [customCategotyInput, setCustomCatgoryInput] = useState<string>("");

  const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()); // Check if the date is valid
  };

  const options: Option[] = [
    { id: 1, label: "Merchandise Stalls", image: img1 },
    { id: 2, label: "Food and Beverages", image: img2 },
    { id: 3, label: "VIP Lounge", image: img3 },
    { id: 4, label: "Security and First Aid", image: img4 },
    { id: 5, label: "Workshops & Networking", image: img5 },
    { id: 6, label: "Entertainment Zone", image: img6 },
    { id: 7, label: "Charging Stations", image: img7 },
    { id: 8, label: "Information Desk", image: img8 },
    { id: 9, label: "Rest Areas", image: img9 },
    { id: 10, label: "Photo Booths", image: img10 },
    { id: 11, label: "Lost & Found", image: img11 },
    { id: 12, label: "Kids Play Area", image: img12 },
    { id: 13, label: "Merchandise Pickup", image: img13 },
    { id: 14, label: "Eco-Friendly Zones", image: img14 },
    { id: 15, label: "Parking Assistance", image: img15 },
    { id: 16, label: "Virtual Reality Booths", image: img16 },
    { id: 17, label: "Interactive Displays", image: img17 },
    { id: 18, label: "Cloakroom Services", image: img18 },
    { id: 19, label: "Water Stations", image: img19 },
    { id: 20, label: "Ticketing & Registration", image: img20 },
  ];
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const optionscate: CateOption[] = [
    { label: "Music" },
    { label: "Business" },
    { label: "Food & Drink" },
    { label: "Community" },
    { label: "Arts" },
    { label: "Film & Media" },
    { label: "Sports & Fitness" },
    { label: "Health" },
    { label: "Science & Tech" },
    { label: "Travel & utdoor" },
    { label: "Charities & Causes" },
    { label: "Spirituality" },
    { label: "Seasonal" },
    { label: "Government" },
    { label: "Fashion" },
    { label: "Home & Lifestyle" },
    { label: "Auto, Boat & Air" },
    { label: "Hobbies" },
    { label: "Family & Education" },
    { label: "School Activities" },
    { label: "Other" },
  ];

  const hashtags: string[] = [
    "FunFest",
    "LiveEntertainment",
    "FestivalVibes",
    "EventOfTheYear",
    "ConferenceLife",
    "NetworkingNight",
    "CelebrateTogether",
    "UnforgettableMoments",
    "PartyAndLearn",
    "JoyfulGathering",
    "LiveMusic",
    "InspiringTalks",
    "CommunityEvent",
    "MeetAndGreet",
    "GoodTimes",
    "EventPlanner",
    "LetTheFunBegin",
    "MemorableExperience",
    "FestivalFun",
    "LearnAndGrow",
    "InteractiveSessions",
    "GreatSpeakers",
    "FestiveFun",
    "ConnectingPeople",
    "VibrantAtmosphere",
    "EventJoy",
    "ExperienceMagic",
    "HappyCrowd",
    "ExclusiveAccess",
    "EngagingEvents",
    "MakeMemories",
    "SocialGathering",
    "FunTimes",
    "InnovativeIdeas",
    "RechargeAndInspire",
    "FestivalWeekend",
    "EpicMoments",
    "EventNetworking",
    "AllAboutFun",
    "DynamicSpeakers",
    "FestivalCelebration",
    "ConferenceConnect",
    "UniteAndCelebrate",
    "DiscoverTogether",
    "EventBuzz",
    "MustAttend",
    "HappeningNow",
    "LifelongConnections",
    "FestivalSeason",
    "RechargeRefresh",
    "SportsFest",
    "UniversityLife",
    "StudentConference",
    "PoliticalDebate",
    "SocialImpact",
    "CommunityBuilding",
    "FutureLeaders",
    "UniversityPride",
    "TeamSpirit",
    "StudentEngagement",
    "LeadershipEvent",
    "GameOn",
    "SocialChange",
    "SportsFans",
    "AcademicConference",
    "SocialMediaEvent",
    "EventPromotion",
    "EventMarketing",
    "GoViral",
    "ShareTheMoment",
    "BoostYourBrand",
    "PromoEvent",
    "VirtualEngagement",
    "InfluencerEvent",
    "DigitalBuzz",
    "EventCampaign",
    "TrendingNow",
    "BrandVisibility",
    "ContentCreators",
    "EngageWithUs",
  ];

  function convertToUTC(localDateTime: string): string {
    // Create a Date object from the local date-time string
    const localDate = new Date(localDateTime);

    // Extract UTC time components
    const utcYear = localDate.getUTCFullYear();
    const utcMonth = localDate.getUTCMonth() + 1; // Months are 0-indexed
    const utcDate = localDate.getUTCDate();
    const utcHours = localDate.getUTCHours();
    const utcMinutes = localDate.getUTCMinutes();

    // Format the components to match the 'yyyy-MM-ddTHH:mm' format
    const formattedUTC = `${utcYear}-${String(utcMonth).padStart(2, "0")}-${String(utcDate).padStart(2, "0")}T${String(utcHours).padStart(
      2,
      "0"
    )}:${String(utcMinutes).padStart(2, "0")}`;

    return formattedUTC;
  }

  const handleDropdown = (index: number) => {
    setTicketTypes((prevTickets) => prevTickets.map((ticket, i) => (i === index ? { ...ticket, dropdown: !ticket.dropdown } : ticket)));
  };

  const handleOptionToggle = (index: number, option: TicketTypeOption) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket, i) =>
        i === index
          ? {
              ...ticket,
              options: ticket.options.some((o) => o.id === option.id)
                ? ticket.options.filter((o) => o.id !== option.id)
                : [...ticket.options, option],
            }
          : ticket
      )
    );
  };

  // const handlecateDropdown = (index: number) => {
  //   setCategoryTypes((prevCategories) =>
  //     prevCategories.map((category, i) =>
  //       i === index ? { ...category, dropdown: !category.dropdown } : category
  //     )
  //   );
  // };

  const handleCatDropdownToggle = () => {
    setIsCatDropdownOpen((prev) => !prev);
  };
  const defaultStartDate = dayjs().format("YYYY-MM-DDTHH:mm");
  // const defaultEndDate = dayjs(TicketStartDate).add(1, 'hour').format("YYYY-MM-DDTHH:mm");
  const form = useForm<z.infer<typeof formSchema | typeof formSchema2>>({
    resolver: zodResolver(selected === "free" ? formSchema2 : formSchema),
    defaultValues: {
      eventHashtags: [],
      eventname: "",
      eventcategory: {
        label: "Some Category",
      },
      eventlocation: "",
      eventstartdate: "",
      eventenddate: "",

      eventstarttime: "",
      eventendtime: "",
      eventmainimg: "",
      eventcoverimg: "",

      eventdescription: "",

      // compticketno: "",
      fburl: "https://www.facebook.com/",
      instaurl: "https://instagram.com/",
      youtubeurl: "https://www.youtube.com/",
      twitterurl: "https://www.x.com/",
      telegramurl: "https://t.me/",
      tiktokurl: "https://www.tiktok.com/@",
      linkedinurl: "https://linkedin.com/in/",
      tickets: [],
    },
  });

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const filesArray = Array.from(event.target.files);
  //     setGalleryFiles((prevFiles) => [...prevFiles, ...filesArray]);
  //   }
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      setGalleryFiles((prevFiles) => {
        const totalFiles = prevFiles.length + filesArray.length;

        // If adding the new files exceeds 10, limit the number of added files
        if (totalFiles > 10) {
          const remainingSlots = 10 - prevFiles.length;
          const limitedFilesArray = filesArray.slice(0, remainingSlots);
          ErrorToast("You can only select 10 media items");
          return [...prevFiles, ...limitedFilesArray];
        }

        return [...prevFiles, ...filesArray];
      });
    }
  };

  const handleFileChangeapi = async () => {
    if (galleryFiles) {
      setLoader(true);

      try {
        const filesArray = Array.from(galleryFiles);

        const formData = new FormData();

        filesArray.forEach((file) => formData.append("files", file));

        const res: any = await api.post(`${API_URL}/upload/uploadMultiple`, formData);

        if (res?.status === 200) {
          setLoader(false);

          setEventsFile(res?.data?.imageUrls);

          // SuccessToast("Images Uploaded Successfully");
          return res?.data?.imageUrls;
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  console.log("Form errors:", form.formState.errors);

  const handleInputChange = (index: number, field: keyof TicketType, value: string | number | TicketTypeOption[]) => {
    setTicketTypes((prevTickets) => prevTickets.map((ticket, i) => (i === index ? { ...ticket, [field]: value } : ticket)));
  };

  // const handleAddTicketType = (e: any) => {
  //   e.preventDefault();
  //   setTicketTypes((prevTickets) => [
  //     ...prevTickets,
  //     {
  //       type: "",
  //       price: 0,
  //       no: 0,
  //       options: [],

  //       dropdown: true,
  //       selected: "free",
  //     },
  //   ]);
  // };
  const handleAddTicketType = (e: any) => {
    e.preventDefault();
    setTicketTypes((prevTickets) => [
      ...prevTickets,
      {
        type: "",
        price: "", // Change from 0 to an empty string
        no: "", // Change from 0 to an empty string
        options: [],
        dropdown: true,
        selected: "free",
      },
    ]);
  };

  const handleDeleteTicketType = (index: number) => {
    if (index === 0) {
      return;
    }
    const updatedTicketTypes = ticketTypes.filter((_, i) => i !== index);
    setTicketTypes(updatedTicketTypes);
    form.setValue("tickets", updatedTicketTypes); // Update form state
  };

  // const handleDeleteTicketType = (index: number) => {
  //   // Prevent deleting the first ticket type
  //   if (index === 0) return;

  //   // Filter out the ticket at the specified index
  //   setTicketTypes((prevTickets) =>
  //     prevTickets.filter((_, i) => i !== index)
  //   );
  // };

  // const handleCoverSingleFileChange = async (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = e.target.files?.[0];
  //   const filename = file?.name;
  //   setCoverImgName(filename);
  //   if (file) {
  //     setLoader(true);

  //     try {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       const res: any = await api.post(
  //         `${API_URL}/upload/uploadimage`,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       if (res.status === 200) {
  //         setLoader(false);

  //         form.setValue("eventcoverimg", res?.data?.data);
  //         setCoverImageWarning(false);

  //         setCoverImg(res?.data?.data);
  //         SuccessToast("Cover Event Image Uploaded Successfully");
  //       } else {
  //         setLoader(false);
  //         ErrorToast(res?.payload?.message || "Error uploading image");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  // };

  const handleCoverSingleFileChangeQuality = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const filename = file?.name;
    setCoverImgName(filename);

    if (file) {
      setLoader(true);

      // Validation for file size
      const maxSize = 5 * 1024 * 1024; // 5 MB
      if (file.size > maxSize) {
        setLoader(false);
        ErrorToast("File size exceeds 5 MB. Please upload a smaller image.");
        return;
      }

      // Create a URL for the file
      const imgUrl = URL.createObjectURL(file);
      const img = new window.Image(); // Use window.Image to avoid TypeScript confusion

      img.onload = async () => {
        const { width, height } = img;

        // Check minimum dimensions
        const minWidth = 330; // Minimum width
        const minHeight = 330; // Minimum height
        if (width < minWidth || height < minHeight) {
          setLoader(false);
          ErrorToast(
            // `Image quality is too low. Minimum dimensions are ${minWidth}x${minHeight} pixels.`
            ` Upload an image with at least ${minWidth}x${minHeight} pixels for better quality.`
          );
          return;
        }

        // Proceed with uploading if all checks pass
        try {
          const formData = new FormData();
          formData.append("file", file);

          const res: any = await api.post(`${API_URL}/upload/uploadimage`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (res.status === 200) {
            setLoader(false);
            form.setValue("eventcoverimg", res?.data?.data);
            // setCoverImageWarning(false);
            setCoverImg(res?.data?.data);
            SuccessToast("Cover Event Image Uploaded Successfully");
          } else {
            setLoader(false);
            ErrorToast(res?.payload?.message || "Error uploading image");
          }
        } catch (error) {
          console.error("Error:", error);
          setLoader(false);
          ErrorToast("An error occurred while uploading the image.");
        }
      };

      img.onerror = () => {
        setLoader(false);
        ErrorToast("Failed to load the image.");
      };

      // Set the source of the image to trigger loading
      img.src = imgUrl;
    }
  };

  const handleCoverSingleFileChangeSize = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const filename = file?.name;
    setCoverImgName(filename);

    if (file) {
      setLoader(true);

      // Validation for file size
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (file.size > maxSize) {
        setLoader(false);
        setCoverImageWarning(true);
        ErrorToast("File size exceeds 5 MB. Please upload a smaller image.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res: any = await api.post(`${API_URL}/upload/uploadimage`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 200) {
          setLoader(false);
          form.setValue("eventcoverimg", res?.data?.data);
          setCoverImageWarning(false);
          setCoverImg(res?.data?.data);
          SuccessToast("Cover Event Image Uploaded Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
        setLoader(false);
        ErrorToast("An error occurred while uploading the image.");
      }
    }
  };

  const handleCoverSingleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const filename = file?.name;
    setCoverImgName(filename);

    if (file) {
      setLoader(true);

      const imgUrl = URL.createObjectURL(file);
      const img = new window.Image(); // Use window.Image to avoid TypeScript confusion

      img.onload = async () => {
        const { width, height } = img;

        // const requiredSize = 1080;
        // if (width !== requiredSize || height !== requiredSize) {
        //   setLoader(false);
        //   ErrorToast(`Image must be ${requiredSize}px x ${requiredSize}px.`);
        //   return;
        // }

        try {
          const formData = new FormData();
          formData.append("file", file);

          const res: any = await api.post(`${API_URL}/upload/uploadimage`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (res.status === 200) {
            setLoader(false);
            form.setValue("eventcoverimg", res?.data?.data);
            setCoverImageWarning(false);
            setCoverImg(res?.data?.data);
            SuccessToast("Cover Event Image Uploaded Successfully");
          } else {
            setLoader(false);
            ErrorToast(res?.payload?.message || "Error uploading image");
          }
        } catch (error) {
          console.error("Error:", error);
          setLoader(false);
          ErrorToast("An error occurred while uploading the image.");
        }
      };

      img.onerror = () => {
        setLoader(false);
        ErrorToast("Failed to load the image.");
      };

      // Set the source of the image to trigger loading
      img.src = imgUrl;
    }
  };

  const removeImage = (index: number) => {
    setGalleryFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserid(userID);
  }, []);

  // const handleOptionChange = (index: number, type: string) => {
  //   setTicketTypes((prevTickets) => {
  //     const updatedTickets = prevTickets.map((ticket, i) =>
  //       i === index ? { ...ticket, selected: type } : ticket
  //     );

  //     updatedTickets.forEach((ticket, i) => {
  //       form.setValue(`tickets.${i}.selected`, ticket.selected);
  //     });

  //     return updatedTickets;
  //   });
  // };

  const handleOptionChange = (index: number, type: string) => {
    setTicketTypes((prevTickets) => {
      const updatedTickets = prevTickets.map((ticket, i) => {
        if (i === index) {
          const updatedTicket = { ...ticket, selected: type };

          // Reset fields based on the selected type
          if (type === "free") {
            updatedTicket.price = ""; // Reset price for free tickets
            updatedTicket.options = []; // Reset options for free tickets
            updatedTicket.no = "";
            updatedTicket.type = "";
          } else if (type === "paid") {
            // Keep price empty or retain it
            updatedTicket.no = "";
            updatedTicket.type = "";
            updatedTicket.options = []; // Reset options for paid tickets
          }

          return updatedTicket;
        }
        return ticket; // Return the original ticket for others
      });

      // Update form values accordingly
      updatedTickets.forEach((ticket, i) => {
        form.setValue(`tickets.${i}.selected`, ticket.selected);
        form.setValue(`tickets.${i}.price`, ticket.price !== "" ? ticket.price : undefined); // Set to undefined if empty
        form.setValue(`tickets.${i}.no`, ticket.no);
        form.setValue(`tickets.${i}.type`, ticket.type);
      });

      return updatedTickets;
    });
  };

  const filteredTicketTypes = ticketTypes.map((ticket) => ({
    selected: ticket.selected,

    type: ticket.type,
    price: ticket.selected === "free" ? "0" : ticket.price,
    no: ticket.no,
    options: ticket.options.map((option) => ({
      id: option.id,
      label: option.label,
    })),
  }));

  function extractDate(dateTime: string): string {
    // Create a new Date object from the input string
    const date = new Date(dateTime);

    // Format the date to 'YYYY-MM-DD'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function addTimeToDate(inputDate: string, hoursToAdd: number, minutesToAdd: number): string {
    // Parse the input date
    const date = new Date(inputDate);

    // Add the specified hours and minutes
    date.setHours(date.getHours() + hoursToAdd);
    date.setMinutes(date.getMinutes() + minutesToAdd);

    // Format the date in YYYY-MM-DDTHH:mm format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const isCategorySelected = categoryTypes && categoryTypes.label !== "";

  console.log("is cat", isCategorySelected);

  const utcEventStartTime = convertToUTC(EventStartTime);
  console.log("my utc event start time is", utcEventStartTime);
  console.log("my  event start time is", EventStartTime);

  async function EventCreation(values: z.infer<typeof formSchema | typeof formSchema2>) {
    setLoader(true);
    const categorylabels = categoryTypes;
    const eventhashtags = chooseHashTags;
    const imagesOfGallery = await handleFileChangeapi();

    console.log("my values", values);

    // setisWalletModalOpen(true);

    const utcEventStartTime = convertToUTC(EventStartTime);
    setEventStartTime(utcEventStartTime);

    const utcEventEndTime = convertToUTC(EventEndTime);
    setEventEndTime(utcEventEndTime);

    const utcTicketStartTime = convertToUTC(TicketStartDate);
    setTicketStartDate(utcTicketStartTime);

    const utcTicketEndTime = convertToUTC(TicketEndDate);
    setTicketEndDate(utcTicketEndTime);

    const updatedValues = {
      ...values,
      eventmedia: imagesOfGallery,
      ticketsdata: filteredTicketTypes,

      eventcategory: categorylabels?.label,
      // eventtags: eventhashtags,
      eventstartdate: utcTicketStartTime,
      eventenddate: utcTicketEndTime,

      eventstarttime: utcEventStartTime,
      eventendtime: utcEventEndTime,

      utcEventStartTime: utcEventStartTime,
      utcEventEndtime: utcEventEndTime,

      utcTicketStartTime: utcTicketStartTime,
      utcTicketEndTime: utcTicketEndTime,
    };
    console.log("my updated values are", updatedValues);

    setEventAllData(updatedValues);
    const isFree = ticketTypes.every((ticket) => ticket.selected === "free");

    try {
      const data = {
        userId: userid,
        isFree: isFree,
        name: Eventname,
        category: [categorylabels?.label],
        tags: chooseHashTags,
        eventDescription: Eventdescription,
        location: EventLocation,
        ticketStartDate: utcTicketStartTime,
        ticketEndDate: utcTicketEndTime,
        startTime: utcEventStartTime,
        endTime: utcEventEndTime,
        // mainEventImage: eventData?.eventmainimg,
        coverEventImage: CoverImg,
        tickets: filteredTicketTypes,
        totalComplemantaryTickets: 0,
        fbUrl: FBUrl,
        instaUrl: InstaUrl,
        youtubeUrl: YoutubeUrl,
        twitterUrl: TwitterUrl,
        telegramUrl: TelegramUrl,
        tiktokUrl: tiktokUrl,
        linkedinUrl: linkedinUrl,
        eventmedia: imagesOfGallery,
      };

      console.log("Ticket creation APi data is =======> ", data);
      dispatch(createevent(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);

          setisWalletModalOpen(true);
          // localStorage.removeItem("eventData");
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
  async function handlePreviewClick(values: z.infer<typeof formSchema | typeof formSchema2>) {
    console.log("New Preview Tags are as======> ", chooseHashTags);
    // setLoader(true);
    setisWalletModalOpen(false);
    console.log("my values", values);
    const imagesOfGallery = await handleFileChangeapi();

    const utcEventStartTime = convertToUTC(EventStartTime);
    // setEventStartTime(utcEventStartTime);

    const utcEventEndTime = convertToUTC(EventEndTime);
    // setEventEndTime(utcEventEndTime);

    const utcTicketStartTime = convertToUTC(TicketStartDate);
    // setTicketStartDate(utcTicketStartTime);

    const utcTicketEndTime = convertToUTC(TicketEndDate);
    // setTicketEndDate(utcTicketEndTime);

    // const selectedCategories = categoryTypes.map((category) => ({
    //   options: category.options.map((option) => ({
    //     id: option.id,
    //     label: option.label,
    //   })),
    // }));

    const categorylabels = categoryTypes;
    const eventhashtags = chooseHashTags;

    const isFree = ticketTypes.every((ticket) => ticket.selected === "free");

    const updatedValues = {
      ...values,
      eventmedia: imagesOfGallery,
      ticketsdata: filteredTicketTypes,
      isFree: isFree,

      eventcategory: categorylabels?.label,
      // eventtags: eventhashtags,

      eventstartdate: utcTicketStartTime,
      eventenddate: utcTicketEndTime,

      eventstarttime: utcEventStartTime,
      eventendtime: utcEventEndTime,

      // utcEventStartTime: utcEventStartTime,
      // utcEventEndtime: utcEventEndTime,

      // utcTicketStartTime: utcTicketStartTime,
      // utcTicketEndTime: utcTicketEndTime,
    };
    console.log("my updated values are", updatedValues);

    setEventAllData(updatedValues);
    // if (updatedValues !== null)
    //   {
    //   const encodedEventData = encodeURIComponent(
    //     JSON.stringify(updatedValues)
    //   );
    //   console.log("my encoded data", encodedEventData);
    //   router.push(`/preview-event?eventData=${encodedEventData}`);
    // } else {
    //   console.log("error");
    // }
    // if (updatedValues !== null) {
    //   try {
    //     const encodedEventData = encodeURIComponent(JSON.stringify(updatedValues));
    //     console.log("my encoded data", encodedEventData);

    //     // Check if data length exceeds URL limit
    //     if (encodedEventData.length < 2000) { // Example limit
    //       router.push(`/preview-event?eventData=${encodedEventData}`);
    //     } else {
    //       console.error("Data is too large for URL. Consider alternative methods.");
    //       // Use an alternative method such as local storage or POST request
    //     }
    //   } catch (error) {
    //     console.error("Error encoding data", error);
    //   }
    // } else {
    //   console.log("error");
    // }
    if (updatedValues !== null) {
      localStorage.setItem("eventData", JSON.stringify(updatedValues));
      router.push("/preview-event");
    } else {
      console.log("error");
    }
  }

  const handleFormSubmit = (event: any, actionTypes: any) => {
    event.preventDefault();

    if (actionTypes === "preview") {
      form.handleSubmit(handlePreviewClick)(event);
    } else if (actionTypes === "create") {
      form.handleSubmit(EventCreation)(event);
    }
  };

  const handleCateOptionToggle = (option: any) => {
    if (option.label === "Other") {
      setIsCustomCategory(true);
      setCategoryTypes(null);
    } else if (option.label === categoryTypes?.label) {
      // setCategoryTypes(null);
      setIsCatDropdownOpen(false);
      return;
    } else {
      setCategoryTypes({ label: option.label });
      setCustomCatgoryInput("");
      setIsCustomCategory(false);
      setCategoryAlert(false);
      setIsCatDropdownOpen(false);
    }
    // Update the form field's value with the selected category
    form.setValue("eventcategory", option); // Use the form controller to set the value
    form.clearErrors("eventcategory"); // Clear any errors once a selection is made
  };

  const handleCustomCatgory = (e: any) => {
    const inputValue = e.target.value;
    setCustomCatgoryInput(inputValue);
    setCategoryAlert(false);

    // Update the form field's value with the selected category
    form.setValue("eventcategory", { label: inputValue }); // Use the form controller to set the value
    form.clearErrors("eventcategory"); // Clear any errors once a selection is made
  };

  const handleCustomCatBtn = () => {
    if (customCategotyInput === "") {
      setCategoryAlert(true);
    } else {
      setCategoryTypes({ label: customCategotyInput });
      // setCustomCatgoryInput("");
      setIsCustomCategory(false);
      setCategoryAlert(false);
      setIsCatDropdownOpen(false);
    }
  };

  console.log("my cat", categoryTypes);
  // useEffect(() => {
  //   const updateEventEndTime = () => {
  //     if (EventStartTime) {
  //       const adjustedEventStartTime = dayjs(EventStartTime).add(5, "hour");
  //       const formattedEndTime = adjustedEventStartTime.format("YYYY-MM-DDTHH:mm");
  //       setEventEndTime(formattedEndTime);
  //       form.setValue("eventendtime", formattedEndTime);
  //     }
  //   };

  //   updateEventEndTime();
  // }, [EventStartTime, TicketStartDate, form]);

  const handleHashFieldInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    setHashTagValue(inputValue);

    if (inputValue === "") {
      setFilterHash([]);
    } else {
      const filtered = hashtags.filter((hashtag) => hashtag.trim().toLowerCase().startsWith(inputValue.toLowerCase()));
      setFilterHash(() => (filtered.length === 0 ? [inputValue] : filtered));
    }

    console.log("hashInput is here ====> ", inputValue);
    console.log("Updated filterHash:", filterHash); // check this value
  };

  const addUserHash = (hashTag: string) => {
    setFilterHash([]);
    setHashTagValue("");

    if (hashTag.length >= 2 && !chooseHashTags.includes(`#${hashTag}`) && chooseHashTags.length < 5) {
      setChoosenHashtags([...chooseHashTags, `#${hashTag}`]);

      // Get current eventHashtags from form and add the new hashtag
      const currentHashtags = form.getValues("eventHashtags") || [];

      // Add the new hashtag directly without alteration
      form.setValue("eventHashtags", [...currentHashtags, hashTag]);
    }

    if (hashTag.length < 2) {
      ErrorToast("Please Enter Valid Tag");
    }

    if (chooseHashTags.length === 5) {
      ErrorToast("You can only add 5 Tags");
    }
  };

  const removeTag = (ht: string): void => {
    setChoosenHashtags((prevTags: string[]): string[] => prevTags.filter((tag: string) => tag !== ht));
    const currentHasTag = ht.replace("#", "");
    // Get the current eventHashtags from the form, filter out the removed hashtag, and update the form
    const currentHashtags = form.getValues("eventHashtags") || [];
    const updatedHashtags = currentHashtags.filter((tag: string) => tag !== currentHasTag);
    form.setValue("eventHashtags", updatedHashtags);
  };

  useEffect(() => {
    console.log("filterHash updated:", filterHash);
  }, [filterHash]);

  return (
    <section
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "center",
      }}
      className="min-h-screen  bg-cover bg-no-repeat  pb-[80px] pt-[120px] lg:pt-[120px] "
    >
      {loader && <ScreenLoader />}
      <div className="pxpx mx-2xl w-full ">
        <div className="event-images-container w-full mt-[26px]">
          <div className=" w-full md:w-[440px] lg:w-[440px]">
            <div className="px-[24px] py-[16px] relative create-container w-full  lg:w-[440px]">
              <div className="flex justify-between">
                <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
                  {" "}
                  Cover <span className="text-primary"> Artwork</span>
                </h1>
                {/* <Image src={Editicon} alt="Edit-icon" /> */}
              </div>

              <Image src={ufo} width={350} height={350} className="absolute right-[0] bottom-0" alt="ufo" />
            </div>

            <div
              className="gradient-slate  w-full lg:w-[440px] pt-[16px] pb-[16px] px-[24px]  create-container-head 
               relative  "
            >
              {/* <div className="w-[392px] pt-[20px] pb-[24px] relative lg:pt-[26px] lg:pb-[36px] gradient-slate"> */}

              <Image src={CoverImg || newCover} alt="bg-frame" className="w-full lg:w-[392px] lg:h-[392px] h-[345px] " width={100} height={345} />

              <label
                htmlFor="uploadcover"
                className="flex gap-2 items-center justify-center w-full cursor-pointer absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px]
                   gradient-bg gradient-border-edit p-[12px] gradient-slate"
                >
                  <Image src={cam} alt="pencil" />
                  <p className="text-[#00D059] text-sm font-extrabold ">Upload Image</p>
                </div>

                <input
                  ref={fileInputRef2}
                  type="file"
                  accept="image/*"
                  id="uploadcover"
                  className="hidden"
                  onChange={handleCoverSingleFileChange} // Ensure this handler function is defined to handle file changes
                />
              </label>
              {/* <p className="text-sm text-gray-500 mt-2">
                Upload Guidelines: Maximum file size: <strong>5 MB</strong>,
                Minimum resolution: <strong>800 x 600 pixels</strong>, Supported
                formats: <strong>JPEG, PNG, GIF</strong> (animated).
              </p> */}
            </div>
          </div>

          <div className="w-full">
            <div className="px-[24px] py-[16px] relative create-container  w-full">
              <div className="flex justify-between">
                <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
                  {" "}
                  Gallery <span className="text-primary"> Media</span>
                </h1>
                {/* <Image src={Editicon} alt="Edit-icon" /> */}
              </div>

              <Image src={ufo} width={350} height={350} className="absolute right-[0] bottom-0" alt="ufo" />
            </div>
            <div
              className={`gradient-slate w-full pt-[16px] pb-[16px] px-[24px] h-[270px] lg:h-[424px] create-container-head relative${
                galleryFiles.length > 0 ? " block" : "flex items-center justify-center"
              }`}
            >
              {galleryFiles?.length > 0 ? (
                <>
                  <div className="mt-4 pb-4 relative">
                    <div className="flex flex-wrap gap-[24px] lg:gap-[13px] max-h-[148px] lg:max-h-[264px] pt-[9px] overflow-auto scrollbar-hide">
                      {galleryFiles?.map((file, index) => {
                        const isVideo = file.type.startsWith("video/");
                        const isImage = file.type.startsWith("image/");
                        return (
                          <div key={index} className="relative  h-[57px] w-[57px] lg:w-[120px] lg:h-[120px]  rounded-[12px]">
                            {isVideo ? (
                              <video
                                src={window.URL.createObjectURL(file)}
                                className="w-full h-full object-cover relative rounded-[12px]"
                                width={120}
                                height={120}
                                controls
                              >
                                Your browser does not support the video tag.
                              </video>
                            ) : isImage ? (
                              <Image
                                src={window.URL.createObjectURL(file)}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-full object-cover relative rounded-[12px]"
                                width={120}
                                height={120}
                              />
                            ) : (
                              <p className="w-full h-full flex items-center justify-center text-red-500">Unsupported media type</p>
                            )}
                            <button type="button" onClick={() => removeImage(index)} className="trash_button">
                              <Image src={crossicon} alt="remove" width={20} height={20} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <label
                    htmlFor="galleryUpload"
                    className={`pb-3 gallery-box-same border-none font-bold border border-[#292929]
                      placeholder:font-normal gradient-slatee rounded-md cursor-pointer flex justify-center items-end 
                      ${galleryFiles.length >= 10 ? "opacity-50 cursor-not-allowed" : galleryFiles.length > 0 ? "gallery-box" : "pt-9 gallery-top"}`}
                  >
                    <div
                      className=" flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px] gradient-slate disabled:cursor-not-allowed disabled:opacity-50"
                      style={{
                        position: "absolute",
                        bottom: "24px",
                      }}
                    >
                      <Image src={cam} alt="pencil" />
                      <p className="text-[#00D059] text-sm font-extrabold">Upload Media</p>
                    </div>
                    {/* <span className="pl-[0.75rem] uploadImageButton flex items-center">
                    <Image src={cam} alt="pencil" /> {"Upload Media"}
                  </span> */}
                    <input
                      type="file"
                      multiple
                      accept="image/*, video/*"
                      // accept="image/png, image/jpg, image/jpeg, image/svg, video/mp4, video/avi, video/mov, video/mkv"
                      className="hidden "
                      id="galleryUpload"
                      onChange={handleFileChange}
                      disabled={galleryFiles?.length >= 10}
                    />
                  </label>
                </>
              ) : (
                <div className="flex items-center justify-center h-full ">
                  <div
                    className="  py-[24px]  flex items-center flex-col gap-[12px] justify-center w-[345px] rounded-[12px]
                   gradient-slate box-shadow-inset-empty  border-gradient-emptyF"
                  >
                    <p className="text-[16px] text-extrabold">There's No Gallery Media</p>
                    <label
                      htmlFor="galleryUpload"
                      className={`pb-3 gallery-box-same  border-none font-bold border border-[#292929] placeholder:font-normal gradient-slatee rounded-md cursor-pointer flex justify-center items-end  ${
                        galleryFiles.length > 0 ? " gallery-box" : " gallery-tops"
                      }`}
                    >
                      <div className="flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]">
                        <Image src={cam} alt="pencil" />
                        <p className="text-[#00D059] text-sm font-extrabold">Upload Media</p>
                      </div>

                      <input type="file" multiple accept="image/*, video/*" className="hidden" id="galleryUpload" onChange={handleFileChange} />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-[24px] py-[16px] relative create-container mt-[32px] ">
          <div className="flex justify-between">
            <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
              {" "}
              Host <span className="text-primary">Event</span>
            </h1>
          </div>

          <Image src={ufo} width={350} height={350} className="absolute right-[0] bottom-0" alt="ufo" />
        </div>
        <div className="gradient-slate w-full pt-[32px] pb-[88px] px-[60px]  create-container-head">
          <Form {...form}>
            <form className=" w-full">
              {/* Event Name and Catgory fields */}
              <div className="flex items-start gap-[24px] w-full common-container">
                <FormField
                  control={form.control}
                  name="eventname"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm font-bold text-[#8F8F8F] absolute left-3  uppercase pt-[16px] pb-[4px]">Event Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Event Name"
                          className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]  "
                          {...field}
                          onChange={(e) => {
                            setEventname(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* //Event Catagory Input field */}
                <FormField
                  control={form.control}
                  name="eventcategory"
                  render={({ field }) => (
                    <FormItem
                      className="relative pb-[8px] w-full rounded-md border border-[#292929] gradient-slate 
                    pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent 
                    file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed
                     disabled:opacity-50"
                    >
                      <div className="flex items-center justify-between" onClick={handleCatDropdownToggle}>
                        <div className="flex flex-col">
                          <p className="text-sm font-bold text-[#8F8F8F] pb-[4px] uppercase">EVENT category</p>
                          <p className="text-[16px] font-extrabold text-[#FFFFFF] ">
                            {categoryTypes ? categoryTypes?.label : "Select Event Category"}
                          </p>
                        </div>
                        <Image src={isCatDropdownOpen ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                      </div>

                      {isCatDropdownOpen && (
                        <>
                          <div className="h-[210px] overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                            {optionscate?.map((option: any) => (
                              <div
                                key={option.label}
                                className="flex items-center justify-between pt-[8px] cursor-pointer"
                                onClick={() => handleCateOptionToggle(option)}
                              >
                                <div className="flex items-center gap-[10px]">
                                  {/* <p className="text-[16px] text-[#FFFFFF] font-normal items-center">
                                    {option.label}
                                  </p> */}
                                  <p
                                    className={`text-[16px] font-normal items-center ${
                                      categoryTypes?.label === option.label ? "text-[#00d059]" : "text-[#FFFFFF]"
                                    }`}
                                  >
                                    {option.label}
                                  </p>
                                </div>
                                {categoryTypes?.label === option.label && <Image src={tick} width={16} height={16} alt="tick" />}
                              </div>
                            ))}
                            {isCustomCatgory && (
                              <>
                                {categoryAlert == true && <p className="text-[red] text-[16px]">Input is empty!</p>}
                                <div
                                  style={{
                                    width: "100%",
                                    marginTop: "10px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "20px",
                                  }}
                                >
                                  <input
                                    type="text"
                                    placeholder="Enter the Category name"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCustomCatgory(e)}
                                    value={customCategotyInput}
                                    style={{
                                      width: "100%",
                                      paddingLeft: "5px",
                                      paddingTop: "5px",
                                      paddingBottom: "5px",
                                      borderRadius: "6px",
                                    }}
                                  />
                                  <button
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                      e.preventDefault(); // Prevents default action (optional if button is not inside a form)
                                      handleCustomCatBtn();
                                    }}
                                    style={{
                                      background: "green",
                                      paddingLeft: "10px",
                                      paddingRight: "10px",
                                      lineHeight: "10px",
                                      paddingTop: "10px",
                                      paddingBottom: "10px",
                                      borderRadius: "5px",
                                      marginRight: "5px",
                                    }}
                                  >
                                    Add
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Event Description Field */}
              <div className="mt-[24px]">
                <FormField
                  control={form.control}
                  name="eventdescription"
                  render={({ field }) => (
                    <FormItem className="relative w-full gradient-slate-input space-y-0  h-[280px]  pb-3">
                      <FormLabel className="text-sm text-[#8F8F8F]  absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">Event Description</FormLabel>
                      <FormControl className="relative  ">
                        <div className=" absolute inset-0 pb-3 overflow-y-auto scrollbar-hide top-[28px] h-[240px] no-scrollbar">
                          <Editor
                            // value={field.value}
                            onChange={(content) => {
                              field.onChange(content);

                              setEventdescription(content);
                            }}
                            value={Eventdescription}
                          />
                        </div>
                      </FormControl>
                      <div className=" space-y-0 event-des-div">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Location Field */}
              <div className="mt-[24px]">
                <FormField
                  control={form.control}
                  name="eventlocation"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">Event Location</FormLabel>
                      <FormControl>
                        <LocationAutocomplete
                          onLocationSelect={(location) => {
                            setEventLocation(location);
                            field.onChange(location);
                          }}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Hastags Inputs fields Field */}
              <div className="mt-[24px]">
                <FormField
                  control={form.control}
                  name="eventHashtags" // Form field name
                  render={({ field }) => (
                    <FormItem className="relative w-ful w-full rounded-md border border-[#292929] gradient-slate px-3 py-2 text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pt-4 pb-2">
                      <FormLabel className="text-sm text-gray-500 left-3 uppercase pt-[16px] pb-[0px]">Hashtags</FormLabel>
                      <FormControl>
                        <div className="flex flex-wrap gap-2 w-full">
                          {chooseHashTags.map((ht: string, index: number) => {
                            return (
                              <div
                                key={index}
                                onClick={() => removeTag(ht)}
                                className="bg-green-600 rounded-md flex justify-center items-center px-[4px] text-[14px]"
                              >
                                {ht}
                              </div>
                            );
                          })}
                          <Input
                            placeholder="Enter Hashtag"
                            className="flex h-10 w-full rounded-md border-none px-0 py-2 text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 pt-0 pb-0 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                            value={hashINputValue}
                            onChange={(e) => {
                              handleHashFieldInput(e);
                            }}
                          />
                        </div>
                      </FormControl>
                      {filterHash.length > 0 ? (
                        <>
                          <div className="h-auto overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                            {filterHash?.map((fh: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center justify-between pt-[8px] cursor-pointer"
                                // onClick={() => handleCateOptionToggle(option)}
                              >
                                <div className="flex items-center gap-[10px]">
                                  <p
                                    className={`text-[16px] font-normal items-center text-[#b0e2c6]}
                                    }`}
                                    onClick={() => addUserHash(fh)}
                                  >
                                    {fh}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                <div className="w-full">
                  <ThemeProvider theme={themeMui}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <FormField
                          control={form.control}
                          name="eventstartdate"
                          render={({ field }) => {
                            const currentDateTime = dayjs();
                            return (
                              // <FormItem className="relative w-full space-y-0 gradient-slate ps-[12px] rounded-md border border-[#292929] pt-[12px]">
                              //   <FormLabel className="text-sm text-gray-500 uppercase pb-[4px] text-[#8f8f8f] ">
                              //     Ticket Start Date & Time
                              //   </FormLabel>
                              //   <FormControl>
                              //     <div className="w-full">
                              //       <StyledDateTimePicker
                              //         referenceDate={currentDateTime}
                              //         formatDensity="spacious"
                              //         onKeyDown={(e: any) => e.preventDefault()}
                              //         autoOk={false}
                              //         onChange={(e: any) => {
                              //           if (e && e.isValid()) {
                              //             const selectedDate = dayjs(
                              //               e.format("YYYY-MM-DD")
                              //             );
                              //             const today =
                              //               currentDateTime.startOf("day");

                              //             if (
                              //               selectedDate.isSame(today, "day")
                              //             ) {
                              //               const formattedDate =
                              //                 e.format("YYYY-MM-DDTHH:mm");
                              //               setTicketStartDate(formattedDate);
                              //               field.onChange(formattedDate);
                              //             } else {
                              //               const formattedDate =
                              //                 e.format("YYYY-MM-DDTHH:mm");
                              //               setTicketStartDate(formattedDate);
                              //               field.onChange(formattedDate);
                              //             }
                              //           }
                              //         }}
                              //         // Set minDateTime only if the selected date is today
                              //         // minDateTime={
                              //         //   field.value &&
                              //         //   dayjs(field.value).isSame(
                              //         //     currentDateTime,
                              //         //     "day"
                              //         //   )
                              //         //     ? currentDateTime
                              //         //     : null
                              //         // }
                              //         disablePast
                              //         slots={{
                              //           openPickerIcon: () => (
                              //             <CalendarTodayIcon
                              //               style={{
                              //                 color: "#5e5e5e",
                              //                 fontSize: "15px",
                              //                 position: "absolute",
                              //                 top: "-17px",
                              //                 right: "5px",
                              //               }}
                              //             />
                              //           ),
                              //         }}
                              //         slotProps={{
                              //           tabs: { hidden: false },
                              //           toolbar: {
                              //             toolbarFormat: "YYYY",
                              //             hidden: false,
                              //           },
                              //           calendarHeader: {
                              //             sx: { color: "white" },
                              //           },
                              //           textField: {
                              //             inputProps: { readOnly: true },
                              //             placeholder:
                              //               "MM / DD / YYYY HH:MM:AA",

                              //           },
                              //         }}
                              //       />
                              //     </div>
                              //   </FormControl>
                              //   <FormMessage />
                              // </FormItem>
                              <FormItem className="relative w-full space-y-0 gradient-slate ps-[12px] rounded-md border border-[#292929] pt-[12px]">
                                <FormLabel className="text-sm text-gray-500 uppercase pb-[4px] text-[#8f8f8f] ">Ticket Start Date & Time</FormLabel>
                                <FormControl>
                                  {/* <div className="w-full" onClick={toggleDateTimePicker}> Attach click event here */}
                                  <div className="w-full" onClick={toggleDateTimePicker}>
                                    {" "}
                                    {/* Attach click event here */}
                                    <StyledDateTimePicker
                                      open={isPickerOpen} // Control the open state with local state
                                      referenceDate={currentDateTime}
                                      formatDensity="spacious"
                                      onKeyDown={(e: any) => e.preventDefault()}
                                      autoOk={false}
                                      onChange={(e: any) => {
                                        if (e && e.isValid()) {
                                          const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                          setTicketStartDate(formattedDate);
                                          field.onChange(formattedDate);
                                          setIsPickerOpen(false); // Close the picker after selection
                                        }
                                      }}
                                      disablePast
                                      slots={{
                                        openPickerIcon: () => (
                                          <CalendarTodayIcon
                                            style={{
                                              color: "#5e5e5e",
                                              fontSize: "15px",
                                              position: "absolute",
                                              top: "-17px",
                                              right: "5px",
                                            }}
                                          />
                                        ),
                                      }}
                                      slotProps={{
                                        tabs: { hidden: false },
                                        toolbar: {
                                          toolbarFormat: "YYYY",
                                          hidden: false,
                                        },
                                        calendarHeader: {
                                          sx: { color: "white" },
                                        },
                                        textField: {
                                          inputProps: { readOnly: true },
                                          placeholder: "MM / DD / YYYY HH:MM:AA",
                                        },
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </ThemeProvider>
                </div>
                <div className="w-full">
                  <ThemeProvider theme={themeMui}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <FormField
                          control={form.control}
                          name="eventenddate"
                          render={({ field }) => {
                            // const adjustedticketStartTime = dayjs(TicketStartDate).add(12, "hour");
                            // const minStartTime = dayjs(
                            //   TicketStartDate || new Date()
                            // );

                            // const defaultStartTime = field.value
                            //   ? dayjs(field.value)
                            //   : minStartTime;

                            // const isSameDay = minStartTime.isSame(
                            //   defaultStartTime,
                            //   "day"
                            // );

                            // const validStartTime = isSameDay
                            //   ? minStartTime
                            //   : null;
                            //   let referenceTicketDate;
                            // if (validStartTime) {
                            //  referenceTicketDate = validStartTime.add(
                            //     2,
                            //     "minute"
                            //   );
                            // }

                            // const minStartTime = dayjs(
                            //   TicketStartDate || new Date()
                            // ).add(12, "hour");

                            // const defaultStartTime = field.value
                            //   ? dayjs(field.value)
                            //   : minStartTime;

                            // const isSameDay = minStartTime.isSame(
                            //   defaultStartTime,
                            //   "day"
                            // );
                            // const validStartTime = isSameDay
                            //   ? minStartTime
                            //   : null;

                            // let referenceTicketDate;
                            // if (validStartTime) {
                            //   referenceTicketDate = validStartTime.add(
                            //     2,
                            //     "minute"
                            //   );
                            // }

                            const adjustedEventStartTime = dayjs(TicketStartDate).add(10, "minute");

                            // Default to the current time if the adjusted start time has passed
                            const defaultEndTime = dayjs().isAfter(adjustedEventStartTime) ? dayjs() : adjustedEventStartTime;

                            return (
                              <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">Ticket End Date & Time</FormLabel>
                                <FormControl>
                                  <div className=" w-full" onClick={toggleEndDateTimePicker}>
                                    {/* <div className=" w-full" > */}

                                    <StyledDateTimePicker
                                      open={isEndDatePickerOpen}
                                      // value={validStartTime}
                                      formatDensity="spacious"
                                      // referenceDate={referenceTicketDate}
                                      referenceDate={defaultEndTime}
                                      onKeyDown={(e: any) => e.preventDefault()}
                                      onChange={(e: any) => {
                                        if (e && e.isValid()) {
                                          const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                          setTicketEndDate(formattedDate);
                                          field.onChange(formattedDate);
                                          setIsEndDatePickerOpen(false);
                                        }
                                      }}
                                      //  label="Event End Date & Time"
                                      disablePast
                                      // minDateTime={validStartTime}
                                      // minDateTime={minStartTime}
                                      minDateTime={adjustedEventStartTime}
                                      // slots={{ openPickerIcon: CalendarTodayIcon }} // Custom icon
                                      slots={{
                                        openPickerIcon: () => (
                                          <CalendarTodayIcon
                                            style={{
                                              color: "#5e5e5e",
                                              fontSize: "15px",
                                              position: "absolute",
                                              top: "-17px",
                                              right: "5px",
                                            }}
                                          />
                                        ),
                                      }}
                                      slotProps={{
                                        tabs: {
                                          hidden: true,
                                        },
                                        toolbar: {
                                          toolbarFormat: "YYYY",
                                          hidden: false,
                                        },
                                        calendarHeader: {
                                          sx: { color: "white" },
                                        },
                                        textField: {
                                          inputProps: { readOnly: true },
                                          placeholder: "MM / DD / YYYY HH:MM:AA ",
                                        },
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </ThemeProvider>
                </div>
                {/* <FormField
                  control={form.control}
                  name="eventenddate"
                  render={({ field }) => {
                    const currentDateTime = new Date()
                      .toISOString()
                      .slice(0, 16);
                    const ticketstartDate = TicketStartDate;

                    const minDateTime =
                      currentDateTime > ticketstartDate
                        ? currentDateTime
                        : ticketstartDate;
                    return (
                      <FormItem className="relative w-full space-y-0">
                        <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                          Ticketing End Date & time
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            aria-label="Date and time"
                            placeholder="Enter End Date"
                            className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                            {...field}
                            onChange={(e) => {
                              setTicketEndDate(e.target.value);
                              field.onChange(e);
                            }}
                            min={TicketStartDate}
                            // min={minDateTime}

                            onKeyDown={(e) => e.preventDefault()}

                            // max={extractDate(EventStartTime)}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                /> */}
              </div>

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                {/* <FormField
                  control={form.control}
                  name="eventstarttime"
                  render={({ field }) => {
                    const currentDateTime = new Date()
                      .toISOString()
                      .slice(0, 16);
                    const ticketEndDate = TicketEndDate;

                    const minDateTime =
                      currentDateTime > ticketEndDate
                        ? currentDateTime
                        : ticketEndDate;
                    return (
                      <FormItem className="relative w-full space-y-0">
                        <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                          Event Start Date & time
                        </FormLabel>
                        <FormControl>
                          <Input
                            onKeyDown={(e) => e.preventDefault()}
                            type="datetime-local"
                            aria-label="Date and time"
                            placeholder="Enter Start Time"
                            className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                            {...field}
                            onChange={(e) => {
                              setEventStartTime(e.target.value);
                              field.onChange(e);
                              console.log(
                                "event start time inside",
                                e.target.value
                              );
                            }}
                            // min={addTimeToDate(TicketEndDate, 0, 0)}
                            // min={minDateTime}
                            min={TicketEndDate}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                /> */}
                <div className="w-full">
                  <ThemeProvider theme={themeMui}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <FormField
                          control={form.control}
                          name="eventstarttime"
                          render={({ field }) => {
                            const minStartTime = dayjs(TicketEndDate || new Date());

                            const defaultStartTime = field.value ? dayjs(field.value) : minStartTime;

                            const validStartTime = defaultStartTime.isBefore(minStartTime) ? minStartTime : defaultStartTime;

                            const referenceEventDate = validStartTime.add(10, "minute");

                            return (
                              <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">Event Start Date & Time</FormLabel>
                                <FormControl>
                                  <div className=" w-full" onClick={toggleStartEventTimePicker}>
                                    {/* <div className=" w-full"> */}

                                    <StyledDateTimePicker
                                      open={isStartEventPickerOpen}
                                      //  value={validStartTime}
                                      formatDensity="spacious"
                                      referenceDate={referenceEventDate}
                                      onKeyDown={(e: any) => e.preventDefault()}
                                      onChange={(e: any) => {
                                        if (e && e.isValid()) {
                                          const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                          setEventStartTime(formattedDate);
                                          field.onChange(formattedDate);
                                          setIsStartEventPickerOpen(false);
                                        }
                                      }}
                                      //  label="Event End Date & Time"
                                      minDateTime={minStartTime}
                                      // slots={{ openPickerIcon: CalendarTodayIcon }} // Custom icon
                                      slots={{
                                        openPickerIcon: () => (
                                          <CalendarTodayIcon
                                            style={{
                                              color: "#5e5e5e",
                                              fontSize: "15px",
                                              position: "absolute",
                                              top: "-17px",
                                              right: "5px",
                                            }}
                                          />
                                        ),
                                      }}
                                      slotProps={{
                                        tabs: {
                                          hidden: false,
                                        },
                                        toolbar: {
                                          toolbarFormat: "YYYY",
                                          hidden: false,
                                        },
                                        calendarHeader: {
                                          sx: { color: "white" },
                                        },
                                        textField: {
                                          inputProps: { readOnly: true },
                                          placeholder: "MM / DD / YYYY HH:MM:AA",
                                        },
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </ThemeProvider>
                </div>

                <div className="w-full">
                  <ThemeProvider theme={themeMui}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <FormField
                          control={form.control}
                          name="eventendtime"
                          render={({ field }) => {
                            const adjustedEventStartTime = dayjs(EventStartTime).add(10, "minute");

                            const defaultEndTime = dayjs().isAfter(adjustedEventStartTime) ? dayjs() : adjustedEventStartTime;

                            return (
                              <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">Event End Date & Time</FormLabel>
                                <FormControl>
                                  <div className=" w-full" onClick={toggleEndEventTimePicker}>
                                    {/* <div className=" w-full"> */}

                                    <StyledDateTimePicker
                                      open={isEndEventPickerOpen}
                                      referenceDate={defaultEndTime}
                                      // value={
                                      //   field.value
                                      //     ? dayjs(field.value)
                                      //     : defaultEndTime
                                      // }
                                      formatDensity="spacious"
                                      onKeyDown={(e: any) => e.preventDefault()}
                                      onChange={(e: any) => {
                                        if (e && e.isValid()) {
                                          const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                          setEventEndTime(formattedDate);
                                          field.onChange(formattedDate);
                                          console.log("my ened time", formattedDate);
                                          setIsEndEventPickerOpen(false);
                                          console.log("my ened time", formattedDate);
                                        }
                                      }}
                                      disablePast
                                      //  label="Event End Date & Time"
                                      // minDateTime={dayjs("2024-10-15T08:30")}
                                      minDateTime={adjustedEventStartTime}
                                      // slots={{ openPickerIcon: CalendarTodayIcon }} // Custom icon
                                      slots={{
                                        openPickerIcon: () => (
                                          <CalendarTodayIcon
                                            style={{
                                              color: "#5e5e5e",
                                              fontSize: "15px",
                                              position: "absolute",
                                              top: "-17px",
                                              right: "5px",
                                            }}
                                          />
                                        ),
                                      }}
                                      slotProps={{
                                        tabs: {
                                          hidden: false,
                                        },
                                        toolbar: {
                                          toolbarFormat: "YYYY",
                                          hidden: false,
                                        },
                                        calendarHeader: {
                                          sx: { color: "white" },
                                        },
                                        textField: {
                                          inputProps: { readOnly: true },
                                          placeholder: "MM / DD / YYYY HH:MM:AA",
                                        },
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </ThemeProvider>
                </div>

                {/* <FormField
                  control={form.control}
                  name="eventendtime"
                  render={({ field }) => {
                    console.log("Raw Event Start Time:", EventStartTime);
                    const eventStartDate = EventStartTime
                      ? new Date(EventStartTime)
                      : null;

                    // Calculate the minimum end date by adding 5 hours
                    const minEndDate = eventStartDate
                      ? new Date(eventStartDate.getTime() + 5 * 60 * 60 * 1000) // 5 hours in milliseconds
                      : null;

                    // Format the minimum end date to 'YYYY-MM-DDTHH:MM'
                    const minEndDateString = minEndDate
                      ? minEndDate.toISOString().slice(0, 16)
                      : undefined;

                    // Logging for debugging
                    console.log("Event Start Date:", eventStartDate);
                    console.log("Calculated Min End Date:", minEndDate);
                    console.log("Min End Date String:", minEndDateString);
                    return (
                      <FormItem className="relative w-full space-y-0">
                        <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                          Event End Date & time
                        </FormLabel>
                        <FormControl>
                          <Input
                            onKeyDown={(e) => e.preventDefault()}
                            type="datetime-local"
                            aria-label="Date and time"
                            placeholder="Enter End Time"
                            className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                            {...field}
                            onChange={(e) => {
                              setEventEndTime(e.target.value);
                              field.onChange(e);
                              console.log(
                                "event end time inside",
                                e.target.value
                              );
                            }}
                            // min={EventStartTime}
                            // min="2024-10-15T08:30"
                            min={minEndDateString}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                /> */}
              </div>
              {/* <>
                <ThemeProvider theme={themeMui}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <FormField
                        control={form.control}
                        name="eventendtime"
                        render={({ field }) => {
                          const adjustedEventStartTime = dayjs(EventStartTime).add(5, 'hour');
                          return(
                          <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[14px]">
                            <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">
                              Event End Date & Time
                            </FormLabel>
                            <FormControl>
                              <div className=" w-full">
                                <StyledDateTimePicker
                                  //  {...field}
                                  // onChange={(e: any) => {
                                  //   setEventEndTime(e);
                                  //   field.onChange(e);
                                  // }}

                                  onChange={(e:any) => {
                                    if (e && e.isValid()) {
                                      const formattedDate = e.format('YYYY-MM-DDTHH:mm');
                                      setEventEndTime(formattedDate);
                                      field.onChange(formattedDate);
                                    }
                                  }}
                                  //  label="Event End Date & Time"
                                  // minDateTime={dayjs("2024-10-15T08:30")}
                                  minDateTime={adjustedEventStartTime}

                                  // slots={{ openPickerIcon: CalendarTodayIcon }} // Custom icon
                                  slots={{
                                    openPickerIcon: () => (
                                      <CalendarTodayIcon
                                        style={{
                                          color: "#5e5e5e",
                                          fontSize: "15px",
                                          position: "absolute",
                                          top: "-17px",
                                          right: "5px",
                                        }}
                                      />
                                    ),
                                  }}
                                  slotProps={{
                                    tabs: {
                                      hidden: false,
                                    },
                                    toolbar: {
                                      toolbarFormat: "YYYY",
                                      hidden: false,
                                    },
                                    calendarHeader: {
                                      sx: { color: "white" },
                                    },
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </ThemeProvider>
              </> */}
              {/* <div className="flex w-full pb-[16px] gap-[10px] lg:gap-[24px] mt-[24px]">
                <div className="flex w-full lg:w-[350px] gap-[12px]">
                  <div
                    className={`lg:w-[350px] gradient-slate md:rounded-lg rounded-[44px] px-[12px] w-full lg:w-[331px] flex md:items-start flex-col justify-center items-center  pt-[14px] pb-[10px] md:pt-[16px] md:pb-[12px] cursor-pointer ${
                      selected === "free"
                        ? "gradient-border-rounded text-[#00A849]"
                        : ""
                    }`}
                    // onClick={() => setSelected("rewards")}
                    onClick={() => handleOptionChange("free")}
                  >
                    {selected === "free" ? (
                      <Image
                        src={greenfree}
                        className="pb-[8px] hidden md:block"
                        alt="Green Ticket"
                      />
                    ) : (
                      <Image
                        src={whitefree}
                        className="pb-[8px] hidden md:block"
                        alt="Default Ticket"
                      />
                    )}
                    <p>Free</p>
                  </div>
                </div>

                <div
                  className={`  lg:w-[350px] gradient-slate md:rounded-lg rounded-[44px] px-[12px] lg:w-[350px] flex w-full 
                    md:items-start flex-col justify-center items-center pt-[14px] pb-[10px] 
                    md:pt-[16px] md:pb-[12px] cursor-pointer  ${
                      selected === "paid"
                        ? "gradient-border-rounded text-[#00A849] "
                        : ""
                    }`}
                  // onClick={() => setSelected("rewardcollectables")}
                  onClick={() => handleOptionChange("paid")}
                >
                  {selected === "paid" ? (
                    <Image
                      src={greenfree}
                      className="pb-[8px] hidden md:block"
                      alt="Green Collectibles"
                    />
                  ) : (
                    <Image
                      src={whitefree}
                      className="pb-[8px] hidden md:block"
                      alt="Default Collectibles"
                    />
                  )}
                  <p>Paid</p>
                </div>
              </div> */}

              {/* {
                ticketTypes.length > 0 &&
                ticketTypes.map((ticket, index) => (
                  <div
                    className="flex flex-col gap-[12px] w-full mt-[24px] common-container"
                    key={index}
                  >
                    <div className="flex items-center gap-[24px] common-container">
                  
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.type`}
                        render={({ field }) => (
                          <FormItem className="relative w-full space-y-0">
                            <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                              Event Ticket Type
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Type"
                                className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                                {...field}
                                onChange={(e) => {
                                  handleInputChange(
                                    index,
                                    "type",
                                    e.target.value
                                  );
                                  field.onChange(e);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                   
                     { selected !== "free" && 
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.price`}
                        render={({ field }) => (
                          <FormItem className="relative w-full space-y-0">
                            <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">
                              Event Ticket Price (£)
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter Price"
                                className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                                {...field}
                                onChange={(e) => {
                                  handleInputChange(
                                    index,
                                    "price",
                                    parseFloat(e.target.value)
                                  );
                                  field.onChange(e);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                     }

                   
                      <FormField
                        control={form.control}
                        name={`tickets.${index}.no`}
                        render={({ field }) => (
                          <FormItem className="relative w-full space-y-0">
                            <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                              Event Number of Tickets
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter No. of Tickets"
                                className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                                {...field}
                                onChange={(e) => {
                                  handleInputChange(
                                    index,
                                    "no",
                                    parseInt(e.target.value, 10)
                                  );
                                  field.onChange(e);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                
                    <div className="pb-[16px]  w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                      <div
                        className="flex items-center justify-between"
                        onClick={() => handleDropdown(index)}
                      >
                        <p className="text-sm text-[#8F8F8F] uppercase">
                          WHATS INCLUDED
                        </p>
                        <Image
                          src={ticket?.dropdown ? arrowdown : arrowdown}
                          width={11}
                          height={11}
                          alt="arrow"
                        />
                      </div>
                      {ticket?.dropdown && (
                        <div className="grid-container">
                          {options?.map((option) => (
                            <div
                              key={option.id}
                              className="grid-item flex items-center justify-between pt-[8px] cursor-pointer"
                              onClick={() => handleOptionToggle(index, option)}
                            >
                              <div className="flex items-center gap-[10px]">
                                <Image
                                  src={option?.image}
                                  width={16}
                                  height={16}
                                  alt="img"
                                />
                                <p className="text-[16px] text-[#FFFFFF] font-normal items-center">
                                  {option.label}
                                </p>
                              </div>
                              {ticket?.options?.some(
                                (o) => o?.id === option?.id
                              ) && (
                                <Image
                                  src={tick}
                                  width={15}
                                  height={15}
                                  alt="tick"
                                />
                              )}
                            </div>
                          ))}
                          <div className="column-separator"></div>{" "}
                         
                          <div className="column-separator"></div>
                        </div>
                      )}
                    </div>
                    {index != 0 && (
                      <div className="flex justify-end items-center mt-[12px] ticket-btn mt-2">
                        <Button
                          className=" bg-[#FF1717B2] text-white font-bold h-[32px] py-[8px] px-[12px] gap-[8px] flex items-center justify-between rounded-[100px] text-[11px] font-extrabold"
                          onClick={() => handleDeleteTicketType(index)}
                        >
                          <Image
                            src={deleteicon}
                            alt="delete-icon"
                            height={12}
                            width={12}
                          />
                          Delete Ticket Type
                        </Button>
                      </div>
                    )}
                  </div>
                ))} */}

              {/* <div className="flex justify-end items-center mt-[12px] ticket-btn">
                  <Button
                    style={{
                      background:
                        "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                    }}
                    className="flex items-center justify-between bg-[#0F0F0F] text-[#00D059] h-[32px] py-[8px] px-[12px] gap-[9.75px]  rounded-full  
               border-[0.86px] border-transparent text-[11px] font-extrabold"
                    onClick={handleAddTicketType}
                  >
                    <Image
                      src={addicon}
                      alt="Add-icon"
                      height={12}
                      width={12}
                    />
                    Add Ticket Type
                  </Button>
                </div> */}
              <div className="flex  flex-col w-full pb-[16px] gap-[10px] lg:gap-[24px] mt-[24px]">
                {ticketTypes?.length > 0 &&
                  ticketTypes.map((ticket, index) => (
                    <div className="flex flex-col gap-[12px] w-full mt-[24px] common-container" key={index}>
                      {/* Free and Paid Selection */}
                      <div className="flex w-full gap-[12px]">
                        <div
                          className={`w-full lg:w-[350px] gradient-slate md:rounded-lg rounded-[44px] px-[12px] flex md:items-start flex-col justify-center items-center pt-[14px] pb-[10px] cursor-pointer ${
                            ticket?.selected === "free" ? "gradient-border-rounded text-[#00A849]" : ""
                          }`}
                          onClick={() => handleOptionChange(index, "free")}
                        >
                          {ticket?.selected === "free" ? (
                            <Image src={greenfree} className="pb-[8px] hidden md:block" alt="Green Ticket" />
                          ) : (
                            <Image src={whitefree} className="pb-[8px] hidden md:block" alt="Default Ticket" />
                          )}
                          <p>Free</p>
                        </div>

                        <div
                          className={`w-full lg:w-[350px] gradient-slate md:rounded-lg rounded-[44px] px-[12px] flex md:items-start flex-col justify-center items-center pt-[14px] pb-[10px] cursor-pointer ${
                            ticket.selected === "paid" ? "gradient-border-rounded text-[#00A849]" : ""
                          }`}
                          onClick={() => handleOptionChange(index, "paid")}
                        >
                          {ticket?.selected === "paid" ? (
                            <Image src={greenfree} className="pb-[8px] hidden md:block" alt="Green Collectibles" />
                          ) : (
                            <Image src={whitefree} className="pb-[8px] hidden md:block" alt="Default Collectibles" />
                          )}
                          <p>Paid</p>
                        </div>
                      </div>

                      {/* Ticket Form Fields */}
                      <div className="flex items-center gap-[24px] common-container">
                        {/* Event Ticket Type Field */}
                        <FormField
                          control={form.control}
                          name={`tickets.${index}.type`}
                          render={({ field }) => (
                            <FormItem className="relative w-full space-y-0 input-custom-container">
                              <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                                Event Ticket Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter Type"
                                  className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                                  {...field}
                                  onChange={(e) => {
                                    handleInputChange(index, "type", e.target.value);
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Event Ticket Price Field - Show Only for Paid Tickets */}
                        {ticket?.selected === "paid" && (
                          <FormField
                            control={form.control}
                            name={`tickets.${index}.price`}
                            render={({ field }) => (
                              <FormItem className="relative w-full space-y-0 input-custom-container">
                                <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">
                                  Event Ticket Price (£)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    onWheel={(e: any) => e.target.blur()}
                                    placeholder="Enter Price"
                                    className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                    {...field}
                                    onChange={(e) => {
                                      const value = e.target.value;

                                      if (value.startsWith("-")) {
                                        e.target.value = value.replace("-", ""); // Remove negative sign
                                      }

                                      if (!/^\d*\.?\d*$/.test(value)) {
                                        e.target.value = value.replace(/[^\d.]/g, "");
                                      }

                                      handleInputChange(index, "price", parseFloat(e.target.value));
                                      field.onChange(e);
                                    }}

                                    // onChange={(e) => {

                                    //   handleInputChange(
                                    //     index,
                                    //     "price",
                                    //     parseFloat(e.target.value)
                                    //   );
                                    //   field.onChange(e);
                                    // }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {/* Event Number of Tickets Field */}
                        <FormField
                          control={form.control}
                          name={`tickets.${index}.no`}
                          render={({ field }) => (
                            <FormItem className="relative w-full space-y-0 input-custom-container">
                              <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                                Event Number of Tickets
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter No. of Tickets"
                                  className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                  {...field}
                                  onWheel={(e: any) => e.target.blur()}
                                  onChange={(e) => {
                                    handleInputChange(index, "no", parseInt(e.target.value, 10));
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* What's Included Section */}
                      <div className="pb-[16px]  w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                        <div className="flex items-center justify-between" onClick={() => handleDropdown(index)}>
                          <p className="text-sm text-[#8F8F8F] uppercase">WHAT'S INCLUDED</p>
                          <Image src={ticket?.dropdown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                        </div>
                        {ticket?.dropdown && (
                          <div className="grid-container">
                            {options?.map((option) => (
                              <div
                                key={option.id}
                                className="grid-item flex items-center justify-between pt-[8px] cursor-pointer"
                                onClick={() => handleOptionToggle(index, option)}
                              >
                                <div className="flex items-center gap-[10px]">
                                  <Image
                                    src={option?.image}
                                    width={16}
                                    height={16}
                                    alt="img"
                                    className={ticket?.options?.some((o) => o?.id === option?.id) ? "filtergreen" : ""}
                                  />
                                  {/* <p className="text-[16px] text-[#FFFFFF] font-normal items-center">
                                    {option.label}
                                  </p> */}
                                  <p
                                    className={`text-[16px] font-normal items-center ${
                                      ticket?.options?.some((o) => o?.id === option?.id) ? "text-[#00d059]" : "text-[#FFFFFF]"
                                    }`}
                                  >
                                    {option.label}
                                  </p>
                                </div>
                                {/* {ticket?.options?.some(
                                  (o) => o?.id === option?.id
                                ) && (
                                  <Image
                                    src={tick}
                                    width={15}
                                    height={15}
                                    alt="tick"
                                  />
                                )} */}
                              </div>
                            ))}
                            <div className="column-separator"></div> <div className="column-separator"></div>
                          </div>
                        )}
                      </div>
                      {index != 0 && (
                        <div className="flex justify-end items-center mt-[12px] ticket-btn mt-2">
                          <Button
                            className=" bg-[#FF1717B2] text-white font-bold h-[32px] py-[8px] px-[12px] gap-[8px] flex items-center justify-between rounded-[100px] text-[11px] font-extrabold"
                            onClick={() => handleDeleteTicketType(index)}
                          >
                            <Image src={deleteicon} alt="delete-icon" height={12} width={12} />
                            Delete Ticket Type
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}

                <div className="flex justify-end items-center mt-[12px] ticket-btn">
                  <Button
                    style={{
                      background:
                        "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                    }}
                    className="flex items-center justify-between bg-[#0F0F0F] text-[#00D059] h-[32px] py-[8px] px-[12px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"
                    onClick={handleAddTicketType}
                  >
                    <Image src={addicon} alt="Add-icon" height={12} width={12} />
                    Add Ticket Type
                  </Button>
                </div>
              </div>
              {/* Add Ticket Type Button */}

              {/* <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="compticketno"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Complimentary number of tickets
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          onWheel={(e: any) => e.target.blur()}
                          placeholder="Enter No. of Tickets"
                          className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                          {...field}
                          onChange={(e) => {
                            setCompTicketNo(e.target.value);
                            field.onChange(e);
                          }}
                          style={{
                            appearance: "none", // Disable browser styling
                            MozAppearance: "textfield", // Firefox
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div> */}

              <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="fburl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Facebook</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                          {...field}
                          // onChange={(e) => {
                          //   setFBUrl(e.target.value);
                          //   field.onChange(e);
                          // }}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://www.facebook.com/")) {
                              setFBUrl(value);
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instaurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Instagram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          // value={InstaUrl}
                          className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                          {...field}
                          // onChange={(e) => {
                          //   setInstaUrl(e.target.value);
                          //   field.onChange(e);
                          // }}

                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://instagram.com/")) {
                              setInstaUrl(value);
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container ">
                <FormField
                  control={form.control}
                  name="telegramurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Telegram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                          {...field}
                          // onChange={(e) => {
                          //   setTwitterUrl(e.target.value);
                          //   field.onChange(e);
                          // }}

                          onChange={(e) => {
                            const value = e.target.value;
                            // Prevent the user from modifying the base URL
                            if (value.startsWith("https://t.me/")) {
                              setTelegramUrl(value);
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="youtubeurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Youtube</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]  "
                          {...field}
                          // onChange={(e) => {
                          //   setYoutubeUrl(e.target.value);
                          //   field.onChange(e);
                          // }}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://www.youtube.com/")) {
                              setYoutubeUrl(value);
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container ">
                <FormField
                  control={form.control}
                  name="tiktokurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Tiktok</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                          {...field}
                          // onChange={(e) => {
                          //   settiktokUrl(e.target.value);
                          //   field.onChange(e);
                          // }}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://www.tiktok.com/@")) {
                              settiktokUrl(value);
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedinurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Linkedin</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                          {...field}
                          // onChange={(e) => {
                          //   setlinkedinUrl(e.target.value);
                          //   field.onChange(e);
                          // }}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://linkedin.com/in/")) {
                              setlinkedinUrl(value);
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start lg:gap-[24px] md:w-[49%] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container ">
                <FormField
                  control={form.control}
                  name="twitterurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Twitter</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF] "
                          {...field}
                          // onChange={(e) => {
                          //   settiktokUrl(e.target.value);
                          //   field.onChange(e);
                          // }}
                          onChange={(e) => {
                            const value = e.target.value;

                            if (value.startsWith("https://www.x.com")) {
                              setTwitterUrl(value);
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center justify-end lg:gap-[20px] gap-[12px] lg:flex-nowrap md:flex-nowrap wrap-btns mt-[36px]">
                <div className="flex justify-end items-center  edit-btn">
                  <button
                    className="w-full lg:w-fit flex h-[52px] py-[17px] px-[55.25px] lg:py-[12px] lg:px-[68px] edit-btn justify-center items-center rounded-[44px] gap-[6px] gradient-bg gradient-border-edit "
                    // onClick={handlePreviewClick}
                    // onClick={() => setActionType("preview")}
                    // disabled={!isCategorySelected}
                    onClick={(event) => handleFormSubmit(event, "preview")}
                    disabled={!isCategorySelected}
                  >
                    Preview
                  </button>
                </div>
                <div className="flex justify-end items-center edit-btn">
                  <Button
                    type="submit"
                    className="w-full lg:w-fit flex  justify-center items-center font-bold py-[17px] px-[55.25px] lg:py-[12px] lg:px-[68px] rounded-[200px]  font-extrabold h-[52px] edit-btn"
                    // onClick={() => setActionType("create")}
                    onClick={(event) => handleFormSubmit(event, "create")}
                    disabled={!isCategorySelected}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>

        {isWalletModalOpen && <EventSubmmitModal onClose={() => setisWalletModalOpen(false)} open={() => setisWalletModalOpen(true)} />}
      </div>
    </section>
  );
}
export default OganizerCreateEvent;
