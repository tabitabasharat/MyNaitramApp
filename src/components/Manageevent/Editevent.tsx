"use client";
import React from "react";
// import "./CreateEvent.css";
import LocationAutocomplete from "../create-event/Locationinput";
import "@/components/create-event/CreateEvent.css";
import deleteicon from "@/assets/Wallet/delete-icon.svg";
import whitefree from "@/assets/Wallet/white free.svg";
import greenfree from "@/assets/Wallet/Green free.svg";
import Image from "next/image";
import ufo from "@/assets/UFO_SVG.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useRef, useEffect } from "react";
import Editicon from "@/assets/Editicon.svg";
import addicon from "@/assets/Wallet/Plus.svg";
import greenpencile from "@/assets/Pencil.svg";
import bgframe from "@/assets/Frame 1597878544.svg";
import Link from "next/link";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuccessToast, ErrorToast } from "../reusable-components/Toaster/Toaster";
import { useForm } from "react-hook-form";
import { UploadSimple } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import { API_URL } from "@/lib/client";
import crossicon from "@/assets/cross-img-icon.svg";
import arrowup from "@/assets/Arrow up.svg";
import whiteaddicon from "@/assets/Wallet/white_plus_icon.svg";
// import { DatePicker } from "@/components/organisms/DatePicker";

import { useRouter } from "next/navigation";

import TimePicker from "react-time-picker";

import "react-time-picker/dist/TimePicker.css";
// import 'react-clock/dist/Clock.css';
import "react-datepicker/dist/react-datepicker.css";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { getEventByEventId } from "@/lib/middleware/event";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import { createevent } from "@/lib/middleware/event";
import api from "@/lib/apiInterceptor";
import arrowdown from "../../assets/arrow-down-drop.svg";
import img1 from "../../assets/Handbag (1).svg";
import img2 from "../../assets/Cake.svg";
import img3 from "../../assets/Crown.svg";
import img4 from "../../assets/Shield Star.svg";
import img5 from "../../assets/Whats-Included/option5.svg";
import img6 from "../../assets/Whats-Included/option6.svg";
import img7 from "../../assets/Whats-Included/option7.svg";
import img8 from "../../assets/Whats-Included/option8.svg";
import img9 from "../../assets/Whats-Included/option9.svg";
import img10 from "../../assets/Whats-Included/option10.svg";
import img11 from "../../assets/Whats-Included/option11.svg";
import img12 from "../../assets/Whats-Included/option12.svg";
import img13 from "../../assets/Whats-Included/option13.svg";
import img14 from "../../assets/Whats-Included/option14.svg";
import img15 from "../../assets/Whats-Included/option15.svg";
import img16 from "../../assets/Whats-Included/option16.svg";
import img17 from "../../assets/Whats-Included/option17.svg";
import img18 from "../../assets/Whats-Included/option18.svg";
import img19 from "../../assets/Whats-Included/option19.svg";
import img20 from "../../assets/Whats-Included/option20.svg";
import img21 from "../../assets/Whats-Included/option21.svg";

import tick from "../../assets/fi-rr-check.svg";
import { updateEvent } from "@/lib/middleware/event";
import Protectedroute from "@/lib/ProtectedRoute/Protectedroute";
import Backward from "../Backward/Backward";
import Editbutton from "../ui/Editbutton";
import Editor from "../reusable-components/Editor";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import calendaricon from "@/assets/calender.svg";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import moment from "moment";

import { addHours } from "date-fns";

//  Defining All Types for Ticket types
type TicketTypeOption = {
  id: number;
  label: string;
};

// 1) ===> Types for State of ( Festivals / Multi-Day Tickets / Season Passes )

type FestivalEventsDate = {
  startDate: string;
  endDate: string;
  isStartEventPickerOpen: boolean;
  isEndEventPickerOpen: boolean;
};

type FestivalType = {
  type: any;
  typeDropDown: boolean;
  selected: any;
  selectedDropDown: boolean;
  price: any;
  no: any;
  typename: any;
  ticketstart: any;
  isTicketStartPickerOpen: boolean;
  isTicketEndPickerOpen: boolean;
  ticketend: any;
  eventdates: FestivalEventsDate[];
  options: TicketTypeOption[];
  optionDropDown: boolean;
};

// 2) ===> Types for State of ( RSVP Ticketing )

type AdditionalFields = {
  title: any;
};

type RsvpType = {
  type: any;
  typeDropDown: boolean;
  name: any;
  deadline: any;
  isDeadlinePickerOpen: boolean;
  capacity: any;
  options: TicketTypeOption[];
  optionDropDown: boolean;
  username: any;
  useremail: any;
  usernumb: any;
  additional: AdditionalFields[];
};

// 3) ===> Types for State of ( Private Event Ticketing )

type PrivateType = {
  type: any;
  typeDropDown: boolean;
  selected: any;
  selectedDropDown: boolean;
  price: any;
  no: any;
  name: string;
  ticketstart: string;
  ticketend: string;
  isTicketStartPickerOpen: boolean;
  isTicketEndPickerOpen: boolean;
  eventstart: string;
  eventend: string;
  isStartEventPickerOpen: boolean;
  isEndEventPickerOpen: boolean;
  options: TicketTypeOption[];
  optionDropDown: boolean;

  emailmanual: string[];
  manualEmailCount: number;
  csvEmails: string[];
  isCSVuploaded: boolean;
  allEmails: string[]; // generate after adding
};

// 4) ===> Types for State of ( Passworded / Discounted Voucher Event Ticketing )

type PasswordedType = {
  type: any;
  typeDropDown: boolean;
  selected: any;
  selectedDropDown: boolean;
  price: any;
  no: any;
  name: string;
  ticketstart: string;
  ticketend: string;
  isTicketStartPickerOpen: boolean;
  isTicketEndPickerOpen: boolean;
  eventstart: string;
  eventend: string;
  isStartEventPickerOpen: boolean;
  isEndEventPickerOpen: boolean;
  options: TicketTypeOption[];
  optionDropDown: boolean;

  emailmanual: string[];
  manualEmailCount: number;
  csvEmails: string[];
  isCSVuploaded: boolean;
  allEmails: string[]; // generate after adding (manual and csv email)

  pswrdmanual: string[];
  manualPswrdCount: number;
  autoGeneratedPswrd: string[];
  allPswrd: string[]; // generate after adding (manual and auto generated password)
};

// Now define state type for holding ticket Data
type TicketType = FestivalType | RsvpType | PrivateType | PasswordedType;

/////////////////////////// Defining Zode schemas for above types  ////////////////////////////////////////////

//                            Define FestivalEventsDate schema
const FestivalEventsDateSchema = z.object({
  startDate: z.string().min(1, { message: "Event start date cannot be empty." }),
  endDate: z.string().min(1, { message: "Event end date cannot be empty." }),
});

const FestivalTypeSchema = z
  .object({
    type: z.string().min(1, { message: "Type cannot be empty." }),
    selected: z.string().min(1, { message: "Selection cannot be empty." }),
    price: z.union([z.string(), z.number()]).optional(), // Can be a string or number
    no: z.union([
      z.string().refine((val) => Number(val) > 0, {
        message: "Number of tickets must be greater than 0.",
      }),
      z.number().min(1, { message: "Number of tickets must be greater than 0." }),
    ]),
    typename: z.string().min(1, { message: "Type name cannot be empty." }),
    ticketstart: z.string().min(1, { message: "Ticket start date cannot be empty." }),
    ticketend: z.string().min(1, { message: "Ticket end date cannot be empty." }),
    eventdates: z.array(FestivalEventsDateSchema).min(1, { message: "At least one event date is required." }),
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
  );

//                            Define RSVP Ticket schema

const AdditionalFieldsSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }),
});

const RsvpTypeSchema = z.object({
  type: z.string().min(1, { message: "Type cannot be empty." }),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  deadline: z.string().min(1, { message: "Deadline cannot be empty." }),
  capacity: z.union([
    z.string().refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0; // Check if it's a valid number greater than 0
      },
      { message: "Capacity must be a valid number greater than 0." }
    ),
    z.number().min(1, { message: "Capacity must be greater than 0." }),
  ]),
  // username: z.boolean().default(false),
  // useremail: z.boolean().default(false),
  // usernumb: z.boolean().default(false),
  additional: z.array(AdditionalFieldsSchema).optional().default([]),
});

//                            Define Private Event Ticketing Schema

const PrivateTypeSchema = z
  .object({
    type: z.string().min(1, { message: "Type cannot be empty." }),
    selected: z.string().min(1, { message: "Selection type cannot be empty." }),
    price: z.union([z.string(), z.number()]).optional(), // Price can be a string or number
    no: z.union([
      z.string().refine((val) => Number(val) > 0, {
        message: "Number of tickets must be greater than 0.",
      }),
      z.number().min(1, { message: "Number of tickets must be greater than 0." }),
    ]),
    name: z.string().min(1, { message: "Name cannot be empty." }),
    ticketstart: z.string().min(1, { message: "Ticket start date cannot be empty." }),
    ticketend: z.string().min(1, { message: "Ticket end date cannot be empty." }),
    eventstart: z.string().min(1, { message: "Event start date cannot be empty." }),
    eventend: z.string().min(1, { message: "Event end date cannot be empty." }),
    emailmanual: z
      .array(z.string().email({ message: "Invalid email address." }))
      .optional()
      .default([]), // Optional and defaults to an empty array
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
      return true; // Skip price validation for free selection
    },
    {
      message: "Price must be greater than 0 for paid tickets.",
      path: ["price"], // Specify the path for the error
    }
  );

//                            Define Passworded / Discounted Voucher Event Ticketing Schema

const PasswordedTypeSchema = z
  .object({
    type: z.string().min(1, { message: "Type cannot be empty." }),
    selected: z.string().min(1, { message: "Selection type cannot be empty." }),
    price: z.union([z.string(), z.number()]).optional(), // Price can be a string or number
    no: z.union([
      z.string().refine((val) => Number(val) > 0, {
        message: "Number of tickets must be greater than 0.",
      }),
      z.number().min(1, { message: "Number of tickets must be greater than 0." }),
    ]),
    name: z.string().min(1, { message: "Name cannot be empty." }),
    ticketstart: z.string().min(1, { message: "Ticket start date cannot be empty." }),
    ticketend: z.string().min(1, { message: "Ticket end date cannot be empty." }),
    eventstart: z.string().min(1, { message: "Event start date cannot be empty." }),
    eventend: z.string().min(1, { message: "Event end date cannot be empty." }),
    emailmanual: z
      .array(z.string().email({ message: "Invalid email address." }))
      .optional()
      .default([]), // Optional, defaults to an empty array
    pswrdmanual: z
      .array(z.string().min(1, { message: "Password cannot be empty." }))
      .optional()
      .default([]), // Optional, defaults to an empty array
    autoGeneratedPswrd: z
      .array(z.string().min(1, { message: "Password cannot be empty." }))
      .optional()
      .default([]), // Optional, defaults to an empty array
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
      return true; // Skip price validation for free selection
    },
    {
      message: "Price must be greater than 0 for paid tickets.",
      path: ["price"], // Specify the path for the error
    }
  );

// Combine multiple ticket type schemas into one using `z.union`
const TicketTypeSchema = z.union([FestivalTypeSchema, RsvpTypeSchema, PrivateTypeSchema, PasswordedTypeSchema]);

// Define the array of tickets
const TicketsTypesArraySchema = z.array(TicketTypeSchema);

// //////////////////////  All Ticket Type schemas Ends here  //////////////////////////////////////

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

  eventdescription: z.string().min(1, { message: "Event description cannot be empty." }),

  fburl: z.string().url({ message: "Invalid Facebook URL." }).min(1, { message: "Facebook URL cannot be empty." }),
  instaurl: z.string().url({ message: "Invalid Instagram URL." }).min(1, { message: "Facebook URL cannot be empty." }),
  youtubeurl: z.string().url({ message: "Invalid Youtube URL." }).min(1, { message: "Facebook URL cannot be empty." }),
  tiktokurl: z.string().url({ message: "Invalid TikTok URL." }).min(1, { message: "Facebook URL cannot be empty." }),
  linkedinurl: z.string().url({ message: "Invalid LinkedIn URL." }).min(1, { message: "Facebook URL cannot be empty." }),
  twitterurl: z.string().url({ message: "Invalid Twitter URL." }).min(1, { message: "Facebook URL cannot be empty." }),
  telegramurl: z.string().url({ message: "Invalid Telegram URL." }).min(1, { message: "Facebook URL cannot be empty." }),

  eventmainimg: z.string().optional(),
  eventcoverimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  tickets: TicketsTypesArraySchema,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

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
// type GalleryFile = File | { type: any; url: any };
type GalleryFile = { type: "image" | "video"; url: string } | File;

const themeMui: any = createTheme({
  typography: {
    // fontFamily: '"--font-base"',
    fontFamily: 'var(--font-base), "Helvetica", "ui-sans-serif"',
  },
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
          fontSize: "16px",
          fontWeight: "700",
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

  // & .MuiSvgIcon-root {
  //   color: #ff0000; /* Set your desired icon color here */
  // }
  & MuiPickersDay-root {
    color: #ffffff;
  }
  & MuiPickersDay-dayOutsideMonth {
    color: #ffffff;
  }
  & .MuiPickersDay-today {
    color: #ffffff;
    border-color: #ffffff;
    background-color: "red";
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
    color: #ffffff;
  }
  & .MuiClockNumber-root {
    color: #ffffff;
  }
`;

function Editevent() {
  const theme = useTheme();

  function MuiIcon() {
    return <Image src={calendaricon} alt="Date picker opening icon" width={20} className="opacity-90" />;
  }

  // All useReff for scroll POsition
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // for additional rsvp
  const manualEmailRef = useRef<HTMLDivElement | null>(null); // for manual email container
  const manualPswrdRef = useRef<HTMLDivElement | null>(null); // for manual password container
  const autoPswrdRef = useRef<HTMLDivElement | null>(null); // for auto password container

  //API data comes here
  const EventData = useAppSelector((state) => state?.getEventByEventID?.eventIdEvents?.data);
  const dispatch = useAppDispatch();

  const [loader, setLoader] = useState(false);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const [dropdown, setDropdown] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const [userid, setUserid] = useState<any>("");
  const [Eventname, setEventname] = useState("");
  const [EventCategory, setEventCategory] = useState("");
  const [EventLocation, setEventLocation] = useState<string | null>(null);

  const [TicketStartDate, setTicketStartDate] = useState("");
  const [TicketEndDate, setTicketEndDate] = useState("");

  const [EventStartTime, setEventStartTime] = useState("");
  const [EventEndTime, setEventEndTime] = useState("");

  console.log("my event start date is", EventStartTime);
  console.log("my ticket start date is", TicketStartDate);

  console.log("my event enddate is", EventEndTime);
  console.log("my ticket endd date is", TicketEndDate);

  const [Eventdescription, setEventdescription] = useState("");

  const [MainImg, setMainImg] = useState("");
  const [MainImgName, setMainImgName] = useState<any>("");

  const [CoverImg, setCoverImg] = useState("");
  const [CoverImgName, setCoverImgName] = useState<any>("");

  const [FBUrl, setFBUrl] = useState(EventData?.fbUrl || "https://www.facebook.com/");
  const [InstaUrl, setInstaUrl] = useState(EventData?.instaUrl || "https://www.instagram.com/");
  const [TwitterUrl, setTwitterUrl] = useState(EventData?.twitterUrl || "https://www.x.com/");

  const [YoutubeUrl, setYoutubeUrl] = useState(EventData?.youtubeUrl || "https://www.youtube.com/");

  const [tiktokUrl, settiktokUrl] = useState(EventData?.tiktokUrl || "https://www.tiktok.com/@");
  const [linkedinUrl, setlinkedinUrl] = useState(EventData?.linkedinUrl || "https://linkedin.com/in/");
  const [telegramUrl, setTelegramUrl] = useState(EventData?.telegramUrl || "https://t.me/");

  const [eventsFiles, setEventsFile] = useState<any>([]);
  const router = useRouter();

  // Making states for diferent Ticket Types here
  const newEventObject: FestivalEventsDate = {
    startDate: "",
    endDate: "",
    isStartEventPickerOpen: false,
    isEndEventPickerOpen: false,
  };

  const festivalTicket: FestivalType = {
    type: "Festivals / Multi-Day Tickets / Season Passes",
    typeDropDown: false,
    selected: "",
    selectedDropDown: false,
    price: "",
    no: "",
    typename: "",
    ticketstart: "",
    ticketend: "",
    isTicketStartPickerOpen: false,
    isTicketEndPickerOpen: false,
    eventdates: [newEventObject],
    options: [],
    optionDropDown: false,
  };

  const rsvpTicket: RsvpType = {
    type: "RSVP Ticketing",
    typeDropDown: false,
    name: "",
    deadline: "",
    isDeadlinePickerOpen: false,
    capacity: "",
    options: [],
    optionDropDown: false,
    username: false,
    useremail: false,
    usernumb: false,
    additional: [],
  };

  const privateTicket: PrivateType = {
    type: "Private Event Ticketing",
    typeDropDown: false,
    selected: "",
    selectedDropDown: false,
    price: "",
    no: "",
    name: "",
    ticketstart: "",
    ticketend: "",
    isTicketStartPickerOpen: false,
    isTicketEndPickerOpen: false,
    eventstart: "",
    eventend: "",
    isStartEventPickerOpen: false,
    isEndEventPickerOpen: false,
    options: [],
    optionDropDown: false,

    emailmanual: [],
    manualEmailCount: 0,
    csvEmails: [],
    isCSVuploaded: false,
    allEmails: [],
  };

  const pswrdTicket: PasswordedType = {
    type: "Passworded / Discounted Voucher Event Ticketing",
    typeDropDown: false,
    selected: "",
    selectedDropDown: false,
    price: "",
    no: "",
    name: "",
    ticketstart: "",
    ticketend: "",
    isTicketStartPickerOpen: false,
    isTicketEndPickerOpen: false,
    eventstart: "",
    eventend: "",
    isStartEventPickerOpen: false,
    isEndEventPickerOpen: false,
    options: [],
    optionDropDown: false,

    emailmanual: [],
    manualEmailCount: 0,
    csvEmails: [],
    isCSVuploaded: false,
    allEmails: [],

    pswrdmanual: [],
    manualPswrdCount: 0,
    autoGeneratedPswrd: [],
    allPswrd: [],
  };

  const AllDefinedTicketTypesArray: TicketType[] = [festivalTicket, rsvpTicket, privateTicket, pswrdTicket];
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([festivalTicket]); // Default ticket will be festival

  const [categoryTypes, setCategoryTypes] = useState<{ label: string } | null>(EventData?.category[0] || null);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);

  const [categoryAlert, setCategoryAlert] = useState<any>(false);
  const [catLength, setCatLength] = useState<boolean>(false);

  const [spaceError, setSpaceError] = useState<boolean>(false);

  const [isCustomCatgory, setIsCustomCategory] = useState<boolean>(false);
  const [customCategotyInput, setCustomCatgoryInput] = useState<string>("");

  const [chooseHashTags, setChoosenHashtags] = useState<any>(EventData?.tags || []);
  const [filterHash, setFilterHash] = useState<any>([]);
  const [hashINputValue, setHashTagValue] = useState<string>("");

  // ///////////////////////////////// Handelling csv file iploading  ///////////////

  const [file, setCsvFile] = useState<File | null>(null); // Track the current file

  const handleCSVFileChange = (event: React.ChangeEvent<HTMLInputElement>, ticketIndex: number) => {
    const uploadedFile = event.target.files ? event.target.files[0] : null;

    if (!uploadedFile) {
      ErrorToast("No file detected!"); // Error
      return;
    }

    setCsvFile(uploadedFile); // Store the file for reference

    if (uploadedFile.type !== "text/csv") {
      ErrorToast("Please upload a valid CSV file."); // Error
      return;
    }

    // Create a FileReader to read the CSV file
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target?.result as string;

      // Split the CSV content by line breaks to get rows
      const rows = fileContent.split("\n").map((row) => row.trim());

      try {
        // Flatten rows and filter for valid emails
        const extractedEmails: string[] = [];

        rows.forEach((row) => {
          const cells = row.split(","); // Split each row by commas (assuming CSV is comma-separated)
          cells.forEach((cell) => {
            // Check if cell matches the email pattern
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cell.trim())) {
              extractedEmails.push(cell.trim());
            }
          });
        });

        if (extractedEmails?.length === 0) {
          throw new Error("No valid emails found in the file.");
        }

        // Updating the form Values
        ticketTypes.forEach((ticket: any, index: number) => {
          if (index === ticketIndex) {
            [...ticket.emailmanual, ...extractedEmails].forEach((value: string, i: number) => {
              form.setValue(`tickets.${ticketIndex}.emailmanual.${i}`, value);
            });
          }
        });

        // Update the ticket types with the extracted emails
        setTicketTypes((prevTickets) => {
          const newEmailsFields = prevTickets.map((ticket: any, i: number) =>
            i === ticketIndex ? { ...ticket, emailmanual: [...ticket.emailmanual, ...extractedEmails] } : ticket
          );

          // Scroll to the bottom after adding new content
          if (manualEmailRef.current) {
            setTimeout(() => {
              manualEmailRef.current!.scrollTop = manualEmailRef.current!.scrollHeight;
            }, 0.005);
          }

          SuccessToast("CSV file parsed successfully");
          return newEmailsFields;
        });
      } catch (err: any) {
        ErrorToast(err.message); // Error
      }

      // Clear the file after processing
      setCsvFile(null); // Reset the file so the user can upload another one
    };

    reader.onerror = (err: any) => {
      ErrorToast(`File reading error: ${err.message}`); // Error
      setCsvFile(null); // Clear the file after error
    };

    // Read the uploaded file as text
    reader.readAsText(uploadedFile);
  };

  // /////////////////////////////////////////////////////////////////////////////////////////////

  const optionscate: CateOption[] = [
    { label: "Other" },
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
  ];

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

  // Defined Hashtags
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

  const ticketTypesOptions: string[] = [
    "Festivals / Multi-Day Tickets / Season Passes",
    "RSVP Ticketing",
    "Private Event Ticketing",
    "Passworded / Discounted Voucher Event Ticketing",
  ];

  const [galleryFiles, setGalleryFiles] = useState<GalleryFile[]>([]);
  const [eventID, setEventId] = useState("");
  console.log("files in gallery", galleryFiles);

  useEffect(() => {
    const currentUrl: any = typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventId(value);
    console.log("my event id is", value);
    dispatch(getEventByEventId(value));
  }, []);

  console.log("my event data ", EventData);

  const imageUrl =
    EventData?.coverEventImage?.startsWith("http") || EventData?.coverEventImage?.startsWith("https") ? EventData.coverEventImage : bgframe;
  console.log("image src is", imageUrl);

  const userLoading = useAppSelector((state) => state?.getEventByEventID);

  // //////////////////////////////////////////////////////////////////////////////////////////

  // const handleDropdown = (index: number) => {
  //   setTicketTypes((prevTickets) => prevTickets.map((ticket, i) => (i === index ? { ...ticket, dropdown: !ticket.dropdown } : ticket)));
  // };

  const handleCateOptionToggle = (option: any) => {
    if (option.label === "Other") {
      setIsCustomCategory(true);
      setCategoryTypes(null);
    } else if (option.label === categoryTypes?.label) {
      // setCategoryTypes(null);
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

    if (inputValue.endsWith(" ") && inputValue.length !== 0) {
      setSpaceError(true);
      return;
    }

    if (inputValue.length > 15) {
      setCatLength(true);
      return;
    }

    setSpaceError(false);

    setCatLength(false);
    setCustomCatgoryInput(inputValue.trim());
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

  const handleCatDropdownToggle = () => {
    setIsCatDropdownOpen((prev) => !prev);
  };

  // const handleOptionToggle = (index: number, option: TicketTypeOption) => {
  //   setTicketTypes((prevTickets) =>
  //     prevTickets.map((ticket, i) =>
  //       i === index
  //         ? {
  //             ...ticket,
  //             options: ticket?.options?.some((o) => o.id === option.id)
  //               ? ticket?.options?.filter((o) => o.id !== option.id)
  //               : [...ticket?.options, option],
  //           }
  //         : ticket
  //     )
  //   );
  // };

  // const handleOptionChange = (index: number, type: string) => {
  //   setTicketTypes((prevTickets) => {
  //     const updatedTickets = prevTickets.map((ticket, i) =>
  //       i === index
  //         ? { ...ticket, selected: type } // Update the selected type (free/paid)
  //         : ticket
  //     );

  //     // Update form values for the tickets
  //     updatedTickets.forEach((ticket, i) => {
  //       form.setValue(`tickets.${i}.selected`, ticket.selected); // Update the selected value in form
  //     });

  //     return updatedTickets; // Return the updated tickets
  //   });
  // };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventHashtags: [],
      eventname: "",
      eventcategory: {
        label: "Some Category",
      },
      eventlocation: "",
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

        console.log("Gallery files:", filesArray);

        const formData = new FormData();

        filesArray.forEach((file: any) => formData.append("files", file));

        //  console.log("my res before", formData)
        const res: any = await api.post(`${API_URL}/upload/uploadMultiple`, formData);

        if (res?.status === 200) {
          setLoader(false);

          console.log("gallery res", res);
          console.log("gallery image uploasssded");
          setEventsFile(res?.data?.imageUrls);

          console.log(res?.data?.data, "this is the gallery url");
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

  //////////////////// -----------------  Old Ticket Typing Handelling ----------------------------  ///////////////////////////

  // const handleInputChange = (index: number, field: keyof TicketType, value: string | number | TicketTypeOption[]) => {
  //   setTicketTypes((prevTickets) => prevTickets.map((ticket, i) => (i === index ? { ...ticket, [field]: value } : ticket)));
  // };

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

  // const handleDeleteTicketType = (index: number) => {
  //   // Remove from the ticketTypes state
  //   if (index === 0) {
  //     // Optionally, display a message or handle the restriction
  //     console.warn("Cannot delete the ticket type at index 0.");
  //     return;
  //   }
  //   const updatedTickets = ticketTypes.filter((_, i) => i !== index);
  //   setTicketTypes(updatedTickets);

  //   // Remove the ticket data from the form state
  //   form.setValue("tickets", updatedTickets); // Update form values

  //   // Reset specific field data if necessary (optional)
  //   form.reset({
  //     ...form.getValues(), // Keep other form values
  //     tickets: updatedTickets, // Update only the tickets field
  //   });
  // };

  const handleSingleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected Main cover img is:", file);
    const filename = file?.name;
    console.log("file name", filename);
    setMainImgName(filename);

    if (file) {
      setLoader(true);

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

          console.log("Main cover image", res);
          console.log("Main cover image uploaded");
          form.setValue("eventmainimg", res?.data?.data);
          setMainImg(res?.data?.data);
          console.log(res?.data?.data, "this is the Main cover image url");
          SuccessToast("Main Cover Image Uploaded Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleCoverSingleFileChangeOld = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected  cover img is:", file);
    const filename = file?.name;
    console.log("file name", filename);
    setCoverImgName(filename);
    if (file) {
      setLoader(true);

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

          console.log(" cover image", res);
          console.log(" cover image uploaded");
          form.setValue("eventcoverimg", res?.data?.data);

          setCoverImg(res?.data?.data);
          console.log(res?.data?.data, "this is the cover image url");
          SuccessToast("Cover Event Image Uploaded Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
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
        //   // ErrorToast(`Image must be ${requiredSize}px x ${requiredSize}px.`);
        //   ErrorToast(` Upload an image with at least ${requiredSize} x ${requiredSize} pixels for better quality.`);

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
    setGalleryFiles((prevFiles) => {
      const fileToRemove = prevFiles[index];
      const updatedFiles = prevFiles.filter((_, i) => i !== index);

      if ("url" in fileToRemove) {
        // Handle URL type
        setRemovedImages((prevRemoved) => {
          const updatedRemoved = new Set([...prevRemoved, fileToRemove.url]);
          return Array.from(updatedRemoved);
        });
      } else {
        // Handle File type
        const fileUrl = URL.createObjectURL(fileToRemove);
        setRemovedImages((prevRemoved) => {
          const updatedRemoved = new Set([...prevRemoved, fileUrl]);
          return Array.from(updatedRemoved);
        });
      }

      return updatedFiles;
    });
  };

  useEffect(() => {
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserid(userID);
    console.log("user ID logged in is", userID);
  }, []);

  /* const filteredTicketTypes = ticketTypes.map((ticket) => ({
    type: ticket?.type,
    price: ticket.selected === "free" ? "0" : ticket.price,

    selected: ticket.selected,
    no: ticket?.no,
    options: ticket?.options?.map((option) => ({
      id: option?.id,
      label: option?.label,
    })),
  }));*/

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

  const isCategorySelected = categoryTypes && categoryTypes.label !== "";

  console.log("is cat", isCategorySelected);

  const categorylabels = categoryTypes?.label;

  // Event Creating sending Dat through API
  async function EventCreation(values: z.infer<typeof formSchema>) {
    let isFormValid: boolean = true;

    // RSVP Form validation
    const rsvpTicketChecks: TicketType[] | any = ticketTypes.filter((ticket: any) => ticket.type === "RSVP Ticketing");
    rsvpTicketChecks.forEach((ticket: any) => {
      if (ticket?.additional?.length > 0 || ticket.username || ticket.useremail || ticket.usernumb) {
      } else {
        ErrorToast("At least one csv field is required");
        isFormValid = false;
        return;
      }
    });

    // Private Form Validation
    const privateTicketChecks: TicketType[] | any = ticketTypes.filter((ticket: any) => ticket.type === "Private Event Ticketing");
    privateTicketChecks.forEach((ticket: any) => {
      if (ticket?.emailmanual?.length > 0) {
      } else {
        ErrorToast("At least one Email is required for Private Ticketing");
        isFormValid = false;
        return;
      }
    });

    // Password Form Validation
    const paswrdTicketChecks: TicketType[] | any = ticketTypes.filter(
      (ticket: any) => ticket.type === "Passworded / Discounted Voucher Event Ticketing"
    );
    paswrdTicketChecks.forEach((ticket: any) => {
      if (ticket?.pswrdmanual?.length > 0 || ticket?.autoGeneratedPswrd?.length > 0 || ticket?.emailmanual?.length > 0) {
      } else {
        ErrorToast("At least one Password or Email is required for private ticketing");
        isFormValid = false;
        return;
      }
    });

    if (isFormValid) {
      // Updating media etc...!
      console.log("my values", values);
      console.log(" Event Updating");

      setLoader(true);

      const EventMediaAlready = [...(EventData?.eventmedia || [])];
      const imagesOfGallery = await handleFileChangeapi();
      console.log("images of gallery", imagesOfGallery, EventMediaAlready);

      const updatedEventMedia = [...EventMediaAlready, ...imagesOfGallery].filter((media) => !removedImages.includes(media));

      console.log("images updated", updatedEventMedia);

      // Updating the Catagories
      let categories: string = "";
      try {
        categories = JSON.parse(EventData?.category[0] || "");
      } catch (e) {
        console.error("Error parsing category data:", e);
      }
      const updatedCategoryTypes = { label: categories };
      setCategoryTypes(updatedCategoryTypes);

      // Updating the hashtags
      const updatedTags: string[] = chooseHashTags.map((tag: string) => (tag.trim().startsWith("#") ? tag : `#${tag}`));
      console.log("Updated Tags are as ========>   ", updatedTags);

      //Updating all Ticket types
      const updatedAllTicketTypes: TicketType[] | any = ticketTypes.map((ticket: any, t_Index: number) =>
        ticket.type === "Festivals / Multi-Day Tickets / Season Passes"
          ? {
              selectedEventTicketType: ticket?.type,
              ticketFreePaid: ticket?.selected,
              ticketName: ticket?.typename,
              ticketPrice: ticket?.price,
              noOfTickets: ticket?.no,
              ticketStartDT: convertToUTC(ticket?.ticketstart),
              ticketEndDT: convertToUTC(ticket?.ticketend),
              eventStartDT: convertToUTC(ticket?.eventdates?.[0]?.startDate),
              eventEndDT: convertToUTC(ticket?.eventdates?.[ticket?.eventdates?.length - 1]?.endDate),
              whatsIncluded: ticket?.options,
              festivalEventDates: ticket?.eventdates
                ?.map(
                  (t: FestivalEventsDate, i: number) =>
                    i !== 0
                      ? {
                          eventStartDateTime: convertToUTC(t?.startDate),
                          eventEndDateTime: convertToUTC(t?.endDate),
                        }
                      : null // Return null for i === 0
                )
                ?.filter((item: any) => item !== null),
            }
          : ticket.type === "RSVP Ticketing"
          ? {
              selectedEventTicketType: ticket?.type,
              ticketName: ticket?.name,
              rsvpDeadline: convertToUTC(ticket?.deadline),
              noOfTickets: ticket?.capacity,
              whatsIncluded: ticket?.options,
              rsvpName: ticket?.username,
              rsvpMail: ticket?.useremail,
              rsvpNumber: ticket?.usernumb,
              rsvpAdditionalFields: ticket?.additional?.map((add: AdditionalFields) => add?.title),
            }
          : ticket.type === "Private Event Ticketing"
          ? {
              selectedEventTicketType: ticket?.type,
              ticketFreePaid: ticket?.selected,
              ticketName: ticket?.name,
              ticketPrice: ticket?.price,
              noOfTickets: ticket?.no,
              ticketStartDT: convertToUTC(ticket?.ticketstart),
              ticketEndDT: ticket?.ticketend,
              eventStartDT: ticket?.eventstart,
              eventEndDT: ticket?.eventend,
              whatsIncluded: ticket?.options,
              privateEventAdditionalFields: ticket?.emailmanual,
            }
          : {
              selectedEventTicketType: ticket?.type,
              ticketFreePaid: ticket?.selected,
              ticketName: ticket?.name,
              ticketPrice: ticket?.price,
              noOfTickets: ticket?.no,
              ticketStartDT: ticket?.ticketstart,
              ticketEndDT: ticket?.ticketend,
              eventStartDT: ticket?.eventstart,
              eventEndDT: ticket?.eventend,
              whatsIncluded: ticket?.options,
              privateEventAdditionalFields: ticket?.emailmanual,
              passwordFields: [...(ticket?.pswrdmanual || []), ...(ticket?.autoGeneratedPswrd || [])],
              autoPasswordFields: [],
            }
      );

      /*
      // set Dates for Event...!
      let eventStartingDate = "";
      let eventEndingDate = "";
      let ticketStartingDate = "";
      let ticketEndingDate = "";

      const totalRSVP = ticketTypes.filter((t: any, index: number) => t?.type == "RSVP Ticketing");
      if (totalRSVP?.length == ticketTypes?.length) {
        // get maximum Last date first
        const maxDate = Math.max(...totalRSVP.map((t: any) => new Date(t?.deadline).getTime()));
        const currentDate = new Date();
        eventEndingDate = convertToUTC(maxDate.toString());
        ticketEndingDate = convertToUTC(maxDate.toString());
        eventStartingDate = convertToUTC(currentDate.toISOString().slice(0, 16));
        ticketStartingDate = convertToUTC(currentDate.toISOString().slice(0, 16));
      } else {
        const currentDate = new Date();
        // Filter the Event Start Date
        const eventMinDate = Math.min(
          ...ticketTypes.map((t: any) => {
            if (t?.deadline) {
              return currentDate.getTime();
            } else {
              return new Date(t?.eventStartDT).getTime();
            }
          })
        );

        // Filter the Event End date
        const eventMaxDate = Math.max(
          ...ticketTypes.map((t: any) => {
            if (t?.deadline) {
              return new Date(t?.deadline).getTime();
            } else {
              return new Date(t?.eventEndDT).getTime();
            }
          })
        );

        // Filter the Ticket Start Date
        const ticketMinDate = Math.min(
          ...ticketTypes.map((t: any) => {
            if (t?.deadline) {
              return currentDate.getTime();
            } else {
              return new Date(t?.ticketStartDT).getTime();
            }
          })
        );

        // Filter the Ticket End Date
        const ticketMaxDate = Math.min(
          ...ticketTypes.map((t: any) => {
            if (t?.deadline) {
              return currentDate.getTime();
            } else {
              return new Date(t?.ticketEndDT).getTime();
            }
          })
        );

        eventEndingDate = convertToUTC(eventMaxDate.toString());
        ticketEndingDate = convertToUTC(ticketMaxDate.toString());
        eventStartingDate = convertToUTC(eventMinDate.toString());
        ticketStartingDate = convertToUTC(ticketMinDate.toString());
      }
      */

      // ///// Getting minimum and Maximum Timiings for Event /////////////
      console.log(ticketTypes, "this is ticket data");
      const nonRsvpTickets = ticketTypes.filter((ticket: any) => ticket.type !== "RSVP Ticketing");

      let timings: any = {
        ticketStartDate: "",
        ticketEndDate: "",
        startTime: "",
        endTime: "",
      };

      if (nonRsvpTickets?.length !== 0) {
        let myTickets = nonRsvpTickets;
        const result = myTickets.reduce(
          (acc: any, ticket: any) => {
            if (new Date(ticket.eventstart) < new Date(acc.minEventStartDT.eventstart)) {
              acc.minEventStartDT = ticket;
            }
            if (new Date(ticket.ticketstart) < new Date(acc.minTicketStartDT.ticketstart)) {
              acc.minTicketStartDT = ticket;
            }
            if (new Date(ticket.eventend) > new Date(acc.maxEventEndDT.eventend)) {
              acc.maxEventEndDT = ticket;
            }
            if (new Date(ticket.ticketend) > new Date(acc.maxTicketEndDT.ticketend)) {
              acc.maxTicketEndDT = ticket;
            }
            return acc;
          },
          {
            minEventStartDT: myTickets[0],
            minTicketStartDT: myTickets[0],
            maxEventEndDT: myTickets[0],
            maxTicketEndDT: myTickets[0],
          }
        );
        console.log("this is result", result);
        timings = {
          ticketStartDate: result.minTicketStartDT?.ticketstart || "",
          ticketEndDate: result.maxTicketEndDT?.ticketend || "",
          startTime: result.minEventStartDT?.eventstart || "",
          endTime: result.maxEventEndDT?.eventend || "",
        };
      } else {
        const rsvpTickets = ticketTypes.filter((ticket: any) => ticket.type == "RSVP Ticketing");
        console.log(rsvpTickets, "rsvp Tickets--");
        let myTickets = rsvpTickets;
        const ticketWithMaxRsvpDeadline = myTickets.reduce((maxTicket: any, currentTicket: any) => {
          return new Date(currentTicket.deadline) > new Date(maxTicket.deadline) ? currentTicket : maxTicket;
        }, myTickets[0]);
        // console.log(
        //   'Ticket with max rsvpDeadline:',
        //   ticketWithMaxRsvpDeadline?.rsvpDeadline,
        // );
        timings = {
          ticketStartDate: `${new Date()}`,
          ticketEndDate: ticketWithMaxRsvpDeadline?.deadline,
          startTime: `${new Date()}`,
          endTime: ticketWithMaxRsvpDeadline?.deadline,
        };
      }

      if (ticketTypes.length !== 0 && nonRsvpTickets?.length !== 0) {
        const getMaxEventEndDateTime = (tickets: any) => {
          return tickets.reduce((maxDate: Date | null, ticket: any) => {
            if (ticket.type === "Festivals / Multi-Day Tickets / Season Passes") {
              ticket.eventdates.forEach((festivalDate: any) => {
                const eventEndDateTime = new Date(festivalDate.endDate);
                if (!maxDate || eventEndDateTime > maxDate) {
                  maxDate = eventEndDateTime;
                }
              });
            }
            return maxDate;
          }, null);
        };
        const getMinEventStartDateTime = (tickets: any) => {
          return tickets.reduce((minDate: Date | null, ticket: any) => {
            if (ticket.type === "Festivals / Multi-Day Tickets / Season Passes") {
              ticket.eventdates.forEach((festivalDate: any) => {
                const eventStartDateTime = new Date(festivalDate.startDate);
                if (!minDate || eventStartDateTime < minDate) {
                  minDate = eventStartDateTime;
                }
              });
            }
            return minDate;
          }, null);
        };
        const maxEventEndDateTime = getMaxEventEndDateTime(ticketTypes);
        const minEventStartTime = getMinEventStartDateTime(ticketTypes);

        console.log("maxEventEndDateTime--", maxEventEndDateTime, minEventStartTime);

        if (maxEventEndDateTime !== null && minEventStartTime !== null) {
          timings = {
            ...timings,
            endTime: timings.endTime > maxEventEndDateTime.toISOString() ? timings.endTime : maxEventEndDateTime.toISOString(),
            startTime: new Date(timings.startTime) < new Date(minEventStartTime) ? timings.startTime : minEventStartTime.toISOString(),
          };
        }
      }

      ////////////////////////////////////////////////////////////////////

      setLoader(true);
      const categorylabels = categoryTypes;
      const eventhashtags = chooseHashTags;
      // const imagesOfGallery = await handleFileChangeapi();

      console.log("my values", values);

      try {
        const data = {
          userId: userid,
          // isFree: isFree,
          eventId: eventID,
          name: Eventname || EventData?.name || "",
          category: [categorylabels?.label || updatedCategoryTypes || ""],
          tags: updatedTags || EventData?.tags || [],
          eventDescription: Eventdescription || EventData?.eventDescription || "",
          location: EventLocation || EventData?.location || "",
          // mainEventImage: eventData?.eventmainimg,
          coverEventImage: CoverImg || EventData?.coverEventImage || "",
          tickets: updatedAllTicketTypes || EventData?.tickets || "",
          // totalComplemantaryTickets: 0,
          fbUrl: FBUrl || EventData?.fbUrl || "",
          instaUrl: InstaUrl || EventData?.instaUrl || "",
          youtubeUrl: YoutubeUrl || EventData?.youtubeUrl || "",
          twitterUrl: TwitterUrl || EventData?.twitterUrl || "",
          telegramUrl: telegramUrl || EventData?.telegramUrl || "",
          tiktokUrl: tiktokUrl || EventData?.tiktokUrl || "",
          linkedinUrl: linkedinUrl || EventData?.linkedinUrl || "",
          eventmedia: updatedEventMedia || EventData?.eventmedia || "",
          stopBy: false,
          ticketStartDate: convertToUTC(timings?.ticketStartDate),
          ticketEndDate: convertToUTC(timings?.ticketEndDate),
          startTime: convertToUTC(timings?.startTime),
          endTime: convertToUTC(timings?.endTime),
        };

        console.log("This is data here =====> ", data);
        dispatch(updateEvent(data)).then((res: any) => {
          if (res?.payload?.status === 200) {
            setLoader(false);
            SuccessToast("Event Updated Successfully");
            router.push("/management");
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
  }
  console.log("Form errors:", form.formState.errors);

  const convertToLocal = (utcDateTime: string) =>
    `${new Date(utcDateTime).getFullYear()}-${String(new Date(utcDateTime).getMonth() + 1).padStart(2, "0")}-${String(
      new Date(utcDateTime).getDate()
    ).padStart(2, "0")}T${String(new Date(utcDateTime).getHours()).padStart(2, "0")}:${String(new Date(utcDateTime).getMinutes()).padStart(2, "0")}`;

  // UseEffect for fetching data from API for this Ticket
  useEffect(() => {
    if (EventData) {
      if (EventData?.mainEventImage) {
        const imageName = EventData?.mainEventImage.split("/").pop() || "Upload Image";
        setMainImgName(imageName);
      }

      if (EventData?.eventmedia) {
        const files = EventData?.eventmedia
          .map((media: any) => {
            if (typeof media === "string") {
              // Handling URLs
              return {
                type: media.endsWith(".mp4") || media.endsWith(".avi") || media.endsWith(".mov") || media.endsWith(".mkv") ? "video" : "image",
                url: media,
              };
            } else if (media instanceof File) {
              // Handling File objects
              return {
                type: media.type.startsWith("video") ? "video" : "image",
                url: URL.createObjectURL(media),
              };
            }
            return null;
          })
          .filter(Boolean); // Filter out any null values in case of unexpected data

        setGalleryFiles(files);
      }

      const ticketsFromAPIs: TicketType[] | any = EventData?.tickets?.map((ticket: any) =>
        ticket?.selectedEventTicketType === "Festivals / Multi-Day Tickets / Season Passes"
          ? {
              type: ticket?.selectedEventTicketType,
              typeDropDown: false,
              selected: ticket?.ticketFreePaid,
              selectedDropDown: false,
              price: ticket?.ticketPrice,
              no: ticket?.noOfTickets,
              typename: ticket?.ticketName,
              ticketstart: convertToLocal(ticket?.ticketStartDT),
              ticketend: convertToLocal(ticket?.ticketEndDT),
              isTicketStartPickerOpen: false,
              isTicketEndPickerOpen: false,
              eventdates: [
                {
                  startDate: convertToLocal(ticket?.eventStartDT),
                  endDate: convertToLocal(ticket?.eventEndDT),
                  isStartEventPickerOpen: false,
                  isEndEventPickerOpen: false,
                },
                ...ticket?.festivalEventDates.map((d: any, i: number) => ({
                  startDate: convertToLocal(d?.eventStartDateTime),
                  endDate: convertToLocal(d?.eventEndDateTime),
                  isStartEventPickerOpen: false,
                  isEndEventPickerOpen: false,
                })),
              ],
              options: (ticket?.whatsIncluded || []).map((ticket: any) => ({
                ...ticket,
                options: (ticket?.options || []).map((option: any) => ({
                  ...option,
                  checked: (ticket?.options || []).some((o: any) => o?.id === option?.id),
                })),
              })),
              optionDropDown: false,
            }
          : ticket?.selectedEventTicketType === "RSVP Ticketing"
          ? {
              type: ticket?.selectedEventTicketType,
              typeDropDown: false,
              name: ticket?.ticketName,
              deadline: ticket?.rsvpDeadline,
              isDeadlinePickerOpen: false,
              capacity: ticket?.noOfTickets,
              options: (ticket?.whatsIncluded || []).map((ticket: any) => ({
                ...ticket,
                options: (ticket?.options || []).map((option: any) => ({
                  ...option,
                  checked: (ticket?.options || []).some((o: any) => o?.id === option?.id),
                })),
              })),
              optionDropDown: false,
              username: ticket?.rsvpName,
              useremail: ticket?.rsvpMail,
              usernumb: ticket?.rsvpNumber,
              additional: ticket?.rsvpAdditionalFields.map((t: string) => ({ title: t })),
            }
          : ticket?.selectedEventTicketType === "Private Event Ticketing"
          ? {
              type: ticket?.selectedEventTicketType,
              typeDropDown: false,
              selected: ticket?.ticketFreePaid,
              selectedDropDown: false,
              price: ticket?.ticketPrice,
              no: ticket?.noOfTickets,
              name: ticket?.ticketName,
              ticketstart: ticket?.ticketStartDT,
              ticketend: ticket?.ticketEndDT,
              isTicketStartPickerOpen: false,
              isTicketEndPickerOpen: false,
              eventstart: ticket?.eventStartDT,
              eventend: ticket?.eventEndDT,
              isStartEventPickerOpen: false,
              isEndEventPickerOpen: false,
              options: (ticket?.whatsIncluded || []).map((ticket: any) => ({
                ...ticket,
                options: (ticket?.options || []).map((option: any) => ({
                  ...option,
                  checked: (ticket?.options || []).some((o: any) => o?.id === option?.id),
                })),
              })),
              optionDropDown: false,

              emailmanual: ticket?.privateEventAdditionalFields,
              manualEmailCount: 0,
              csvEmails: [],
              isCSVuploaded: false,
              allEmails: [],
            }
          : {
              type: ticket?.selectedEventTicketType,
              typeDropDown: false,
              selected: ticket?.ticketFreePaid,
              selectedDropDown: false,
              price: ticket?.ticketPrice,
              no: ticket?.noOfTickets,
              name: ticket?.ticketName,
              ticketstart: ticket?.ticketStartDT,
              ticketend: ticket?.ticketEndDT,
              isTicketStartPickerOpen: false,
              isTicketEndPickerOpen: false,
              eventstart: ticket?.eventStartDT,
              eventend: ticket?.eventEndDT,
              isStartEventPickerOpen: false,
              isEndEventPickerOpen: false,
              options: (ticket?.whatsIncluded || []).map((ticket: any) => ({
                ...ticket,
                options: (ticket?.options || []).map((option: any) => ({
                  ...option,
                  checked: (ticket?.options || []).some((o: any) => o?.id === option?.id),
                })),
              })),
              optionDropDown: false,

              emailmanual: ticket?.privateEventAdditionalFields,
              manualEmailCount: 0,
              csvEmails: [],
              isCSVuploaded: false,
              allEmails: [],

              pswrdmanual: ticket?.passwordFields,
              manualPswrdCount: 0,
              autoGeneratedPswrd: [],
              allPswrd: [],
            }
      );

      setTicketTypes(ticketsFromAPIs);

      ///////////////////////////////////////setting the catragories
      let categories: string = "";

      if (Array.isArray(EventData?.category)) {
        categories = EventData?.category[0];
      } else {
        try {
          categories = JSON.parse(EventData?.category[0] || "");
        } catch (e) {
          console.log("Error parsing category data:", e);
        }
      }

      console.log("my cat", categories); //it  will be only a string getting through data string 0 index

      const updatedCategoryTypes = { label: categories };

      setCategoryTypes(updatedCategoryTypes);
      console.log("updatedCategoryTypes", updatedCategoryTypes);

      //////////////////////////////// setting the hashtags
      let eventHashTags: string[] = [];
      if (Array.isArray(EventData?.tags)) {
        eventHashTags = EventData?.tags;
      } else {
        try {
          eventHashTags = JSON.parse(EventData?.tags || []);
        } catch (e) {
          console.log("Error parsing tags data:", e);
        }
      }

      const updatedTags = eventHashTags;

      setChoosenHashtags(updatedTags);
      console.log("Updated Hashtags are ", updatedTags);

      form.reset({
        eventname: EventData?.name || form.getValues("eventname"),
        eventcategory: updatedCategoryTypes || form.getValues("eventcategory"),
        eventHashtags: updatedTags || form.getValues("eventHashtags"),
        eventdescription: EventData?.eventDescription || form.getValues("eventdescription"),
        eventlocation: EventData?.location || form.getValues("eventlocation"),

        //  eventmainimg: mainimgName || form.getValues("eventmainimg"),
        eventcoverimg: EventData?.coverEventImage || form.getValues("eventcoverimg"),

        // compticketno: EventData?.totalComplemantaryTickets || form.getValues("compticketno"),
        fburl: EventData?.fbUrl || form.getValues("fburl"),
        instaurl: EventData?.instaUrl || form.getValues("instaurl"),
        youtubeurl: EventData?.youtubeUrl || form.getValues("youtubeurl"),
        telegramurl: EventData?.telegramUrl || form.getValues("telegramurl"),
        tiktokurl: EventData?.tiktokUrl || form.getValues("tiktokurl"),
        linkedinurl: EventData?.linkedinUrl || form.getValues("linkedinurl"),
        twitterurl: EventData?.twitterUrl || form.getValues("twitterurl"),
        tickets: ticketsFromAPIs || form.getValues("tickets"),
      });
    }
  }, [EventData]);

  useEffect(() => {
    console.log("These all are forms value ===> ", form.getValues("tickets"));
  }, [form]);

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

  const removeTag = (ht: string): void => {
    setChoosenHashtags((prevTags: string[]): string[] => prevTags.filter((tag: string) => tag !== ht));
    const currentHasTag = ht.replace("#", "");
    // Get the current eventHashtags from the form, filter out the removed hashtag, and update the form
    const currentHashtags = form.getValues("eventHashtags") || [];
    console.log("Current Hash tags are AS==================> ", typeof EventData?.eventHashtags);
    const updatedHashtags = currentHashtags.filter((tag: string) => tag !== currentHasTag);
    form.setValue("eventHashtags", updatedHashtags);
  };

  const addUserHash = (hashTag: string) => {
    setFilterHash([]);
    setHashTagValue("");

    if (hashTag?.length >= 2 && !chooseHashTags.includes(`#${hashTag}`) && chooseHashTags?.length < 5) {
      setChoosenHashtags([...chooseHashTags, `#${hashTag}`]);

      // Get current eventHashtags from form and add the new hashtag
      const currentHashtags = form.getValues("eventHashtags") || [];

      // Add the new hashtag directly without alteration
      form.setValue("eventHashtags", [...currentHashtags, hashTag]);
    }

    if (hashTag.length < 2) {
      ErrorToast("Please Enter Valid Tag");
    }

    if (chooseHashTags?.length === 5) {
      ErrorToast("You can only add 5 Tags");
    }
  };

  const handleHashFieldInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    setHashTagValue(inputValue);

    if (inputValue === "") {
      setFilterHash([]);
    } else {
      const filtered = hashtags.filter((hashtag) => hashtag.trim().toLowerCase().startsWith(inputValue.toLowerCase()));
      setFilterHash(() => (filtered?.length === 0 ? [inputValue] : filtered));
    }

    console.log("hashInput is here ====> ", inputValue);
    console.log("Updated filterHash:", filterHash); // check this value
  };

  // ///////////////////////////////////////////// --- Handeling Ticket Types here below --- /////////////////////////////////

  useEffect(() => {
    form.setValue(`tickets.${0}.type`, "Festivals / Multi-Day Tickets / Season Passes");
  }, []);

  //Send Ticket Object if the same type and index found in API Data
  const findApiTicket = (ticketType: string): TicketType | undefined | any => {
    console.log("Rgsfhgsfhsgfhdfghs ==> ", ticketType);
    const ticket = EventData?.tickets?.find((ticket: any) => ticket?.selectedEventTicketType === ticketType);

    if (ticketType == "Festivals / Multi-Day Tickets / Season Passes") {
      return {
        type: ticket?.selectedEventTicketType,
        typeDropDown: false,
        selected: ticket?.ticketFreePaid,
        selectedDropDown: false,
        price: ticket?.ticketPrice,
        no: ticket?.noOfTickets,
        typename: ticket?.ticketName,
        ticketstart: convertToLocal(ticket?.ticketStartDT),
        ticketend: convertToLocal(ticket?.ticketEndDT),
        isTicketStartPickerOpen: false,
        isTicketEndPickerOpen: false,
        eventdates: [
          {
            startDate: convertToLocal(ticket?.eventStartDT),
            endDate: convertToLocal(ticket?.eventEndDT),
            isStartEventPickerOpen: false,
            isEndEventPickerOpen: false,
          },
          ...ticket?.festivalEventDates.map((d: any, i: number) => ({
            startDate: convertToLocal(d?.eventStartDateTime),
            endDate: convertToLocal(d?.eventEndDateTime),
            isStartEventPickerOpen: false,
            isEndEventPickerOpen: false,
          })),
        ],
        options: (ticket?.whatsIncluded || []).map((ticket: any) => ({
          ...ticket,
          options: (ticket?.options || []).map((option: any) => ({
            ...option,
            checked: (ticket?.options || []).some((o: any) => o?.id === option?.id),
          })),
        })),
        optionDropDown: false,
      };
    } else if (ticketType == "RSVP Ticketing") {
      return {
        type: ticket?.selectedEventTicketType,
        typeDropDown: false,
        name: ticket?.ticketName,
        deadline: ticket?.rsvpDeadline,
        isDeadlinePickerOpen: false,
        capacity: ticket?.noOfTickets,
        options: (ticket?.whatsIncluded || []).map((ticket: any) => ({
          ...ticket,
          options: (ticket?.options || []).map((option: any) => ({
            ...option,
            checked: (ticket?.options || []).some((o: any) => o?.id === option?.id),
          })),
        })),
        optionDropDown: false,
        username: ticket?.rsvpName,
        useremail: ticket?.rsvpMail,
        usernumb: ticket?.rsvpNumber,
        additional: ticket?.rsvpAdditionalFields.map((t: string) => ({ title: t })),
      };
    } else if (ticketType == "Private Event Ticketing") {
      return {
        type: ticket?.selectedEventTicketType,
        typeDropDown: false,
        selected: ticket?.ticketFreePaid,
        selectedDropDown: false,
        price: ticket?.ticketPrice,
        no: ticket?.noOfTickets,
        name: ticket?.ticketName,
        ticketstart: ticket?.ticketStartDT,
        ticketend: ticket?.ticketEndDT,
        isTicketStartPickerOpen: false,
        isTicketEndPickerOpen: false,
        eventstart: ticket?.eventStartDT,
        eventend: ticket?.eventEndDT,
        isStartEventPickerOpen: false,
        isEndEventPickerOpen: false,
        options: (ticket?.whatsIncluded || []).map((ticket: any) => ({
          ...ticket,
          options: (ticket?.options || []).map((option: any) => ({
            ...option,
            checked: (ticket?.options || []).some((o: any) => o?.id === option?.id),
          })),
        })),
        optionDropDown: false,

        emailmanual: ticket?.privateEventAdditionalFields,
        manualEmailCount: 0,
        csvEmails: [],
        isCSVuploaded: false,
        allEmails: [],
      };
    } else {
      return {
        type: ticket?.selectedEventTicketType,
        typeDropDown: false,
        selected: ticket?.ticketFreePaid,
        selectedDropDown: false,
        price: ticket?.ticketPrice,
        no: ticket?.noOfTickets,
        name: ticket?.ticketName,
        ticketstart: ticket?.ticketStartDT,
        ticketend: ticket?.ticketEndDT,
        isTicketStartPickerOpen: false,
        isTicketEndPickerOpen: false,
        eventstart: ticket?.eventStartDT,
        eventend: ticket?.eventEndDT,
        isStartEventPickerOpen: false,
        isEndEventPickerOpen: false,
        options: (ticket?.whatsIncluded || []).map((ticket: any) => ({
          ...ticket,
          options: (ticket?.options || []).map((option: any) => ({
            ...option,
            checked: (ticket?.options || []).some((o: any) => o?.id === option?.id),
          })),
        })),
        optionDropDown: false,

        emailmanual: ticket?.privateEventAdditionalFields,
        manualEmailCount: 0,
        csvEmails: [],
        isCSVuploaded: false,
        allEmails: [],

        pswrdmanual: ticket?.passwordFields,
        manualPswrdCount: 0,
        autoGeneratedPswrd: [],
        allPswrd: [],
      };
    }
  };

  // Drop Down for Type Selection
  const handleTicketTypeDropDown = (ticketIndex: number) => {
    // Open or close the current Ticket's Type DropDown
    setTicketTypes((prevTickets) => {
      return prevTickets.map((ticket, index) => (index === ticketIndex ? { ...ticket, typeDropDown: !ticket.typeDropDown } : ticket));
    });
  };

  // Type selecting for ticket
  const handleTicketTypeSelection = (ticketType: string, ticketIndex: number) => {
    // First Close the Type DropDown of Current Ticket
    setTicketTypes((prevTickets) => {
      return prevTickets.map((ticket, index) => (index === ticketIndex ? { ...ticket, typeDropDown: !ticket.typeDropDown } : ticket));
    });

    // First check weather ticketType is same as current Ticket Type
    if (ticketTypes[ticketIndex].type === ticketType) return;

    // If the current ticket is not in the API Data then change the Ticket Type of Current index on the basis of param Type
    setTicketTypes((prevTickets) => {
      //Now check weather current type and index are same as in (API Data)
      const existingTicket = EventData?.tickets?.some((t: any, i: number) => t?.selectedEventTicketType === ticketType && i === ticketIndex) || false;

      // defined an empty array
      let updatedTickets = [];

      if (existingTicket) {
        //get api ticket
        const updatedTicket = findApiTicket(ticketType);

        //replace in the state
        updatedTickets = prevTickets.map((obj, idx) => {
          return idx === ticketIndex ? updatedTicket ?? obj : obj;
        });

        form.setValue(`tickets.${ticketIndex}`, updatedTicket); // Update form state
        // form.setValue(`tickets.${ticketIndex}.type`, ticketType);
      } else {
        // Find the object in the array that matches the received id
        const choosenTicketType: TicketType | any | undefined = AllDefinedTicketTypesArray.find((ticketObject) => ticketObject.type === ticketType);

        // Replace the object at the specified index given in the param
        updatedTickets = prevTickets.map((obj, idx) => {
          return idx === ticketIndex ? choosenTicketType ?? obj : obj;
        });

        form.setValue(`tickets.${ticketIndex}`, choosenTicketType); // Update form state
        // form.setValue(`tickets.${ticketIndex}.type`, ticketType);
      }

      // Return the updated tickets
      return updatedTickets;
    });
  };

  const handleInputChange = (index: number, field: keyof TicketType, value: string | number | TicketTypeOption[]) => {
    setTicketTypes((prevTickets) => prevTickets.map((ticket, i) => (i === index ? { ...ticket, [field]: value } : ticket)));
  };

  // Add ticket Type in state When user click on add button
  const handleAddTicketType = (e: any) => {
    e.preventDefault();

    setTicketTypes((prevTickets) => {
      const newValues = [...prevTickets, festivalTicket];
      form.setValue(`tickets.${newValues.length - 1}.type`, "Festivals / Multi-Day Tickets / Season Passes");
      return newValues;
    });
  };

  // Delete a ticket Type in state when User click the delete buttion
  const handleDeleteTicketType = (index: number) => {
    if (index === 0) {
      return;
    }
    const updatedTicketTypes = ticketTypes.filter((_, i) => i !== index);
    setTicketTypes(updatedTicketTypes);
    form.setValue("tickets", updatedTicketTypes); // Update form state
  };

  //handeling Ticket Slected Option DropDown (Paid, Free)
  const handleTicketSelectedOptionDropDown = (ticketIndex: number) => {
    //  Close or Open the selected DropDown of Current Ticket
    setTicketTypes((prevTickets) => {
      return prevTickets.map((ticket: any, index: number) =>
        index === ticketIndex ? { ...ticket, selectedDropDown: !ticket.selectedDropDown } : ticket
      );
    });
  };

  //handeling Ticket Slected Option string (Paid, Free)
  const handleTicketSelectionOption = (option: string, ticketIndex: number) => {
    // Set price field state value
    const priceStateValue = option === "Free" ? "0" : "";

    // First close the selected dropdown and give value to the state of current Ticket
    setTicketTypes((prevTickets) => {
      return prevTickets.map((ticket: any, index: number) =>
        index === ticketIndex ? { ...ticket, selectedDropDown: !ticket.selectedDropDown, selected: option, price: priceStateValue } : ticket
      );
    });

    //tickets.${index}.selected  change the value in form fields
    form.setValue(`tickets.${ticketIndex}.selected`, option); // Update form state
    // "Free", "Paid"
    option === "Paid" ? form.setValue(`tickets.${ticketIndex}.price`, "") : form.setValue(`tickets.${ticketIndex}.price`, "0");
  };

  // Handle Ticket Price change
  const handlTicketPriceChange = (value: string, ticketIndex: number) => {
    setTicketTypes((prevTickets) => {
      return prevTickets.map((ticket: any, index: number) => (index === ticketIndex ? { ...ticket, price: value } : ticket));
    });
  };

  //Handle Festival Ticket Type
  const handleFestivalTicketType = (value: string, ticketIndex: number) => {
    setTicketTypes((prevTickets) => {
      return prevTickets.map((ticket: any, index: number) => (index === ticketIndex ? { ...ticket, typename: value } : ticket));
    });
  };

  //handle No. of Tickets
  const handleNoTickets = (value: string, ticketIndex: number) => {
    setTicketTypes((prevTickets) => {
      return prevTickets.map((ticket: any, index: number) => (index === ticketIndex ? { ...ticket, no: value } : ticket));
    });
  };

  //handle ticket name
  const handleTicketNameChange = (value: string, ticketIndex: number) => {
    setTicketTypes((prevTickets) => {
      return prevTickets.map((ticket: any, index: number) => (index === ticketIndex ? { ...ticket, name: value } : ticket));
    });
  };

  // Handle Includes DropDown
  const handleDropdown = (ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, optionDropDown: !ticket.optionDropDown } : ticket))
    );
  };

  // Ticket Option Toggle Dropdown handleing
  const handleOptionToggle = (ticketIndex: number, option: TicketTypeOption) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket, i) =>
        i === ticketIndex
          ? {
              ...ticket,
              options: ticket.options.some((o) => o.id === option.id)
                ? ticket.options.filter((o) => o.id !== option.id)
                : [...ticket.options, { id: option.id, label: option.label }],
            }
          : ticket
      )
    );
  };

  // Handle Tickets Pickers of  (Festival, Private and, Password Types)

  // Sart Ticket picker
  const toggleTicketStartTimePicker = (ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex ? { ...ticket, isTicketStartPickerOpen: !ticket.isTicketStartPickerOpen } : ticket
      )
    );
  };

  // Start Ticket Date value
  const setTheTicketStartValue = (formattedDate: string, ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, ticketstart: formattedDate } : ticket))
    );
  };

  // End Ticket Picker
  const toggleTicketEndTimePicker = (ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, isTicketEndPickerOpen: !ticket.isTicketEndPickerOpen } : ticket))
    );
  };

  // End Ticket Date value
  const setTheTicketEndValue = (formattedDate: string, ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, ticketend: formattedDate } : ticket))
    );
  };

  //Start Event picker (Private, Password) Types
  const toggleStartEventTimePicker = (ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex ? { ...ticket, isStartEventPickerOpen: !ticket.isStartEventPickerOpen } : ticket
      )
    );
  };

  //Start Event Value (Private, Password) Types
  const toggleStartEventValue = (formattedDate: string, ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, eventstart: formattedDate } : ticket))
    );
  };

  //End Event Picker (Private, Password) Types
  const toggleEndEventTimePicker = (ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, isEndEventPickerOpen: !ticket.isEndEventPickerOpen } : ticket))
    );
  };

  //End Event Value (Private, Password) Types
  const toggleEndEventValue = (formattedDate: string, ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, eventend: formattedDate } : ticket))
    );
  };

  //Handle picker of RSVP Daedline

  // RSVP Ticket Date Picker
  const toggleRSVPTicketDeadlinePicker = (ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, isDeadlinePickerOpen: !ticket.isDeadlinePickerOpen } : ticket))
    );
  };

  // RSVP Ticket Deadline Date Value
  const toggleRSVPTicketDeadlineValue = (formattedDate: string, ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, deadline: formattedDate } : ticket))
    );
  };

  // RSVP Ticket Capacity handle
  const handleCapacityRSVPTicket = (capacityNumber: string, ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, capacity: capacityNumber } : ticket))
    );
  };

  // RSVP Ticket Radio Selections
  const handleRsvpRadioSelections = (radioName: string, ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, [radioName]: !ticket[radioName] } : ticket))
    );
  };

  // RSVP Addition Field Value
  const handleRsvpAdditionField = (ticketIndex: number, f_index: number, value: string) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex
          ? {
              ...ticket,
              additional: ticket.additional.map((f_object: AdditionalFields, fi: number) => (fi === f_index ? { title: value } : f_object)),
            }
          : ticket
      )
    );
  };

  // RSVP add Additional Field
  const addAdditionalToRSVP = (ticketIndex: number) => {
    setTicketTypes((prevTickets) => {
      const updatedTypes = prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex ? { ...ticket, additional: [...ticket.additional, { title: "" }] } : ticket
      );

      // Scroll to the bottom after adding new content
      if (containerRef.current) {
        setTimeout(() => {
          containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
        }, 0);
      }

      return updatedTypes;
    });
  };

  // Handling the festival Events Dates

  // Add new Event in Festival Events
  const addNewEventDateInFestival = (ticketIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) => (i === ticketIndex ? { ...ticket, eventdates: [...ticket.eventdates, newEventObject] } : ticket))
    );
  };

  // handle start picker
  const festivalStartEventPicker = (ticketIndex: number, eventIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex
          ? {
              ...ticket,
              eventdates: ticket.eventdates.map((event: FestivalEventsDate, e_num: number) =>
                e_num === eventIndex ? { ...event, isStartEventPickerOpen: !event.isStartEventPickerOpen } : event
              ),
            }
          : ticket
      )
    );

    console.log("Festival StartPicker is:==> ", ticketTypes[ticketIndex]);
  };

  // handle end picker
  const festivalEndEventPicker = (ticketIndex: number, eventIndex: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex
          ? {
              ...ticket,
              eventdates: ticket.eventdates.map((event: FestivalEventsDate, e_num: number) =>
                e_num === eventIndex ? { ...event, isEndEventPickerOpen: !event.isEndEventPickerOpen } : event
              ),
            }
          : ticket
      )
    );

    console.log("Festival EndPicker is:==> ", ticketTypes[ticketIndex]);
  };

  // handle start value
  const festivalStartEventValue = (ticketIndex: number, eventIndex: number, formattedDate: string) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex
          ? {
              ...ticket,
              eventdates: ticket.eventdates.map((event: FestivalEventsDate, e_num: number) =>
                e_num === eventIndex ? { ...event, startDate: formattedDate } : event
              ),
            }
          : ticket
      )
    );
  };

  // handle end value
  const festivalEndEventValue = (ticketIndex: number, eventIndex: number, formattedDate: string) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex
          ? {
              ...ticket,
              eventdates: ticket.eventdates.map((event: FestivalEventsDate, e_num: number) =>
                e_num === eventIndex ? { ...event, endDate: formattedDate } : event
              ),
            }
          : ticket
      )
    );
  };

  // Handle Private Ticket Emails

  // add manual emails
  const addManualEmailField = (ticketIndex: number) => {
    setTicketTypes((prevTickets) => {
      const newEmailsFields = prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex ? { ...ticket, emailmanual: [...ticket.emailmanual, ""] } : ticket
      );

      // Scroll to the bottom after adding new content
      if (manualEmailRef.current) {
        setTimeout(() => {
          manualEmailRef.current!.scrollTop = manualEmailRef.current!.scrollHeight;
        }, 0);
      }
      return newEmailsFields;
    });
  };

  // handle Manual Emails Values
  const handleManualEnmailValues = (ticketIndex: number, e_Index: number, value: string) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex
          ? { ...ticket, emailmanual: ticket.emailmanual.map((email: string, emIndex: number) => (emIndex === e_Index ? value : email)) }
          : ticket
      )
    );
  };

  // Handle Password/Discounted Tickets

  // add manual password
  const addManualPasswrdField = (ticketIndex: number) => {
    setTicketTypes((prevTickets) => {
      const newPswrdFields = prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex ? { ...ticket, pswrdmanual: [...ticket.pswrdmanual, ""] } : ticket
      );

      // Scroll to the bottom after adding new content
      if (manualPswrdRef.current) {
        setTimeout(() => {
          manualPswrdRef.current!.scrollTop = manualPswrdRef.current!.scrollHeight;
        }, 0);
      }

      return newPswrdFields;
    });
  };

  // handle mauual password input change
  const handleManualPswrdInput = (ticketIndex: number, p_Index: number, value: string) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex
          ? { ...ticket, pswrdmanual: ticket.pswrdmanual.map((pswrd: string, emIndex: number) => (emIndex === p_Index ? value : pswrd)) }
          : ticket
      )
    );
  };

  // Generate Auto password
  const generateAutoPassword = (ticketIndex: number) => {
    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    // Combine all character sets
    const allChars = upperCaseChars + lowerCaseChars + numbers + specialChars;

    let password = "";

    // Ensure at least one character from each character set
    password += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
    password += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the remaining characters randomly
    for (let i = password.length; i < 13; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password for randomness
    password = password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    // const formIndex = ticketTypes[ticketIndex]?.autoGeneratedPswrd?.length;
    // form.setValue(`tickets.${ticketIndex}.autoGeneratedPswrd.${formIndex}`, password)

    ticketTypes.forEach((ticket: any, i: number) => {
      if (i === ticketIndex) {
        form.setValue(`tickets.${ticketIndex}.autoGeneratedPswrd.${i + 1}`, password);
      }
    });

    setTicketTypes((prevTickets) => {
      const newPswrdFields = prevTickets.map((ticket: any, i: number) =>
        i === ticketIndex ? { ...ticket, autoGeneratedPswrd: [...ticket.autoGeneratedPswrd, password] } : ticket
      );

      // Scroll to the bottom after adding new content
      if (autoPswrdRef.current) {
        setTimeout(() => {
          autoPswrdRef.current!.scrollTop = autoPswrdRef.current!.scrollHeight;
        }, 0);
      }

      return newPswrdFields;
    });
  };

  return (
    <section
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "center",
      }}
      className="min-h-screen  bg-cover bg-no-repeat  pb-[80px]"
    >
      {loader && <ScreenLoader />}
      <div className="pxpx mx-2xl  w-full pt-[120px] lg:pt-[132px]  ">
        <Backward />
        {/* Event Images uploading Section */}
        <div className="event-images-container w-full mt-[26px]">
          <div className=" w-full md:w-[440px] lg:w-[440px]">
            <div className="px-[24px] py-[16px] relative create-container w-full  lg:w-[440px]">
              <div className="flex justify-between">
                <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
                  {" "}
                  Cover <span className="text-primary"> Artwork</span>
                </h1>
              </div>

              <Image src={ufo} width={350} height={350} className="absolute right-[0] bottom-0" alt="ufo" />
            </div>
            <div className="gradient-slate  w-full lg:w-[440px] pt-[16px] pb-[16px] px-[24px]  create-container-head relative ">
              <Image src={CoverImg || imageUrl} alt="bg-frame" className="w-full lg:w-[392px] lg:h-[392px] h-[345px] " width={100} height={345} />

              <label htmlFor="uploadcover" className="flex gap-2 items-center justify-between w-full cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px] gradient-slate">
                    <Image src={greenpencile} alt="pencil" />
                    <p className="text-[#00D059] text-sm font-extrabold">Edit Image</p>
                  </div>
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
                galleryFiles?.length > 0 ? " block" : "flex items-center justify-center"
              }`}
            >
              {galleryFiles?.length > 0 ? (
                <>
                  <div className="mt-4 pb-4 relative">
                    <div className="flex flex-wrap gap-[24px] lg:gap-[13px] max-h-[148px] lg:max-h-[264px] pt-[9px] overflow-auto">
                      {galleryFiles.map((file: any, index) => (
                        <div key={index} className="relative lg:w-[120px] lg:h-[120px]  h-[57px] w-[57px] rounded-[12px]">
                          {file?.type === "video" ? (
                            <video
                              src={typeof file.url === "string" ? file.url : URL.createObjectURL(file)}
                              className="w-full h-full object-cover relative rounded-[12px]"
                              width={120}
                              height={120}
                              controls
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img
                              src={typeof file.url === "string" ? file.url : URL.createObjectURL(file)}
                              alt={`Gallery Image ${index + 1}`}
                              className="w-full h-full object-cover relative rounded-[12px]"
                              width={120}
                              height={120}
                            />
                          )}
                          <button type="button" onClick={() => removeImage(index)} className="trash_button">
                            <Image src={crossicon} alt="remove" width={20} height={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <label
                    htmlFor="galleryUpload"
                    // className={`pb-3 gallery-box-same border-none font-bold border border-[#292929] placeholder:font-normal gradient-slatee rounded-md cursor-pointer flex justify-center items-end  ${
                    //   galleryFiles.length > 0
                    //     ? " gallery-box h-full"
                    //     : "pt-9 gallery-top"
                    // }`}
                    className={`pb-3 gallery-box-same border-none font-bold border border-[#292929]
                      placeholder:font-normal gradient-slatee rounded-md cursor-pointer flex justify-center items-end 
                      ${
                        galleryFiles?.length >= 10
                          ? "opacity-50 cursor-not-allowed"
                          : galleryFiles?.length > 0
                          ? "gallery-box h-full"
                          : "pt-9 gallery-top"
                      }`}
                  >
                    <div
                      className="flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px] gradient-slate"
                      style={{
                        position: "absolute",
                        bottom: "24px",
                      }}
                    >
                      <Image src={greenpencile} alt="pencil" />
                      <p className="text-[#00D059] text-sm font-extrabold">Edit Media</p>
                    </div>

                    <input
                      type="file"
                      multiple
                      accept="image/*, video/*"
                      // accept="image/png, image/jpg, image/jpeg, image/svg, video/mp4, video/avi, video/mov, video/mkv"
                      className="hidden"
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
                        galleryFiles?.length > 0 ? " gallery-box" : " gallery-tops"
                      }`}
                    >
                      <div className="flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]">
                        <Image src={greenpencile} alt="pencil" />

                        <p className="text-[#00D059] text-sm font-extrabold">Upload Media</p>
                      </div>

                      <input
                        type="file"
                        multiple
                        accept="image/*, video/*"
                        // accept="image/png, image/jpg, image/jpeg, image/svg, video/mp4, video/avi, video/mov, video/mkv"
                        className="hidden"
                        id="galleryUpload"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Remaining Body of Tickets */}
        <div>
          <div className="">
            <Form {...form}>
              <form
                className=" w-full"
                onSubmit={(event) => {
                  console.log("Form submit triggered");
                  form.handleSubmit(EventCreation)(event);
                }}
              >
                {/* Ticket second Section */}
                <div>
                  {/* Ticket Type header */}
                  <div className="px-[24px] py-[16px] relative create-container mt-[32px]">
                    <div className="flex justify-between">
                      <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
                        {" "}
                        Event <span className="text-primary">Details</span>
                      </h1>
                    </div>

                    <Image src={ufo} width={350} height={350} className="absolute right-[0] bottom-0" alt="ufo" />
                  </div>

                  {/* Ticket type Body */}
                  <div className="gradient-slate w-full pt-[32px] pb-[88px] px-[60px]  create-container-head">
                    {/* Event Name and Catagiry Fields */}
                    <div className="flex items-start gap-[24px] w-full common-container">
                      {/* Event Name fields */}
                      <FormField
                        control={form.control}
                        name="eventname"
                        render={({ field }) => (
                          <FormItem className="relative w-full space-y-0">
                            <FormLabel className="text-sm font-bold text-[#8F8F8F] absolute left-3  uppercase pt-[16px] pb-[4px]">
                              Event Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Event Name"
                                className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
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

                      {/* Event Catagory */}
                      <FormField
                        control={form.control}
                        name="eventcategory"
                        render={({ field }) => (
                          <FormItem className="relative pb-[8px] w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            <div className="flex items-center justify-between" onClick={handleCatDropdownToggle}>
                              <div className="flex flex-col">
                                <p className="text-sm font-bold text-gray-500 pb-[4px] uppercase">EVENT category</p>
                                <p>{categoryTypes ? categoryTypes?.label : "Select Event Category"}</p>
                              </div>
                              <Image src={isCatDropdownOpen ? arrowdown : arrowdown} width={11} height={11} alt="arrow" />
                            </div>
                            {isCatDropdownOpen && (
                              <div className="h-[210px] overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                                {isCustomCatgory && (
                                  <>
                                    {categoryAlert == true && <p className="text-[red] text-[16px]">Input is empty!</p>}
                                    {catLength == true && <p className="text-[red] text-[16px]">Put only 15 letters!</p>}
                                    {spaceError == true && <p className="text-[red] text-[16px]">Put only single word!</p>}
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
                                {optionscate?.map((option) => (
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
                                    {categoryTypes?.label === option.label && <Image src={tick} width={10} height={10} alt="tick" />}
                                  </div>
                                ))}
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Event Description */}
                    <div className="mt-[24px]">
                      <FormField
                        control={form.control}
                        name="eventdescription"
                        render={({ field }) => (
                          <FormItem className="relative w-full gradient-slate-input space-y-0  h-[260px]  pb-3">
                            <FormLabel className="text-sm text-[#8F8F8F]  absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                              Event Description
                            </FormLabel>
                            <FormControl className="relative">
                              {/* <Textarea
                          {...field}
                          // value={Eventdescription}
                          className="pt-11 create-txtarea-input "
                          onChange={(e) => {
                            setEventdescription(e.target.value);
                            field.onChange(e);
                          }}
                          placeholder="Enter Event Description"
                        /> */}
                              <div className=" absolute inset-0 pb-3 overflow-auto top-[25px] h-[200px]">
                                <Editor
                                  value={field.value}
                                  onChange={(content) => {
                                    field.onChange(content);

                                    setEventdescription(content);
                                  }}
                                />
                              </div>
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
                            {filterHash?.length > 0 ? (
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

                    {/* Evrent Location fields */}
                    <div className="mt-[24px]">
                      <FormField
                        control={form.control}
                        name="eventlocation"
                        render={({ field }) => (
                          <FormItem className="relative w-full space-y-0">
                            <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">Event Location</FormLabel>
                            <FormControl>
                              <LocationAutocomplete
                                value={field.value || EventData?.location || ""}
                                onLocationSelect={(location) => {
                                  setEventLocation(location);
                                  field.onChange(location);
                                }}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Ticket Third Section */}
                <div>
                  {/* Ticket Types Header */}
                  <div className="px-[24px] py-[16px] relative create-container mt-[32px] ">
                    <div className="flex justify-between">
                      <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
                        {" "}
                        Ticket <span className="text-primary">Sales & Payments</span>
                      </h1>
                    </div>

                    <Image src={ufo} width={350} height={350} className="absolute right-[0] bottom-0" alt="ufo" />
                  </div>

                  {/* Ticket Types Body */}
                  <div className="gradient-slate pt-[32px] pb-[49px] px-[60px] rounded-b-[12px]">
                    {ticketTypes.map((ticket: any, index: number) =>
                      ticket.type === "Festivals / Multi-Day Tickets / Season Passes" ? (
                        <div key={index} className="mb-[24px]">
                          {/* Gradient Line to seperate Tickets from each other */}
                          {index !== 0 && (
                            <div
                              className="h-[3px] w-full relative mb-[28px] mt-[4px]"
                              style={{
                                background: "linear-gradient(135deg, #002b12 0.2%, #13ff7a 50.2%, #002b12 100.2%)", // main gradient in the center
                              }}
                            >
                              <div
                                className="absolute top-0 left-0 h-full"
                                style={{
                                  width: "30%", // make the edges thinner
                                  background: "linear-gradient(to left, transparent, #002b12)", // gradient that fades out from transparent
                                  filter: "blur(8px)", // blur the edges to make them thin and faded
                                }}
                              ></div>
                              <div
                                className="absolute top-0 right-0 h-full"
                                style={{
                                  width: "30%", // same width for both edges
                                  background: "linear-gradient(to right, transparent, #002b12)", // gradient that fades out from transparent
                                  filter: "blur(8px)", // blur the edges to make them thin and faded
                                }}
                              ></div>
                            </div>
                          )}

                          {/* Event Ticket Type and Event Paid/Free fields */}
                          <div className="flex items-start gap-[24px] w-full common-container mb-[24px]">
                            <FormField
                              control={form.control}
                              name={`tickets.${index}.type`}
                              render={({ field }) => (
                                <FormItem
                                  className="relative pb-[8px] w-full rounded-md border border-[#292929] gradient-slate 
                            pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent 
                            file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed
                            disabled:opacity-50"
                                >
                                  <div className="flex items-center justify-between" onClick={() => handleTicketTypeDropDown(index)}>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-bold text-[#8F8F8F] pb-[4px] uppercase">EVENT Ticket Type</p>
                                      <p className="text-[16px] font-extrabold text-[#FFFFFF] ">Festivals / Multi-Day Tickets / Season Passes</p>
                                    </div>
                                    <Image src={ticket.typeDropDown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                                  </div>

                                  {ticket.typeDropDown && (
                                    <>
                                      <div className="h-fit overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                                        {ticketTypesOptions?.map((T_type: string, typeIndex: number) => (
                                          <div
                                            key={typeIndex}
                                            className="flex items-center justify-between pt-[8px] cursor-pointer"
                                            onClick={() => handleTicketTypeSelection(T_type, index)}
                                          >
                                            <div className="flex items-center gap-[10px]">
                                              <p
                                                className={`text-[16px] font-normal items-center ${
                                                  ticket.type === T_type ? "text-[#00d059]" : "text-[#FFFFFF]"
                                                }`}
                                              >
                                                {T_type}
                                              </p>
                                            </div>
                                            {ticket.type === T_type && <Image src={tick} width={16} height={16} alt="tick" />}
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`tickets.${index}.selected`}
                              render={({ field }) => (
                                <FormItem
                                  className="relative pb-[8px] w-full rounded-md border border-[#292929] gradient-slate 
                            pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent 
                            file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed
                            disabled:opacity-50"
                                >
                                  <div className="flex items-center justify-between" onClick={() => handleTicketSelectedOptionDropDown(index)}>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-bold text-[#8F8F8F] pb-[4px] uppercase">paid or free</p>
                                      <p className="text-[16px] font-extrabold text-[#FFFFFF] ">
                                        {ticket?.selected ? ticket?.selected : "Select paid or free ticket"}
                                      </p>
                                    </div>
                                    <Image src={ticket?.selectedDropDown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                                  </div>

                                  {ticket?.selectedDropDown && (
                                    <>
                                      <div className="h-fit overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                                        {["Free", "Paid"].map((option: any, optionIndex: number) => (
                                          <div
                                            key={optionIndex}
                                            className="flex items-center justify-between pt-[8px] cursor-pointer"
                                            onClick={() => handleTicketSelectionOption(option, index)}
                                          >
                                            <div className="flex items-center gap-[10px]">
                                              <p
                                                className={`text-[16px] font-normal items-center ${
                                                  ticket?.selected === option ? "text-[#00d059]" : "text-[#FFFFFF]"
                                                }`}
                                              >
                                                {option}
                                              </p>
                                            </div>
                                            {ticket?.selected === option && <Image src={tick} width={16} height={16} alt="tick" />}
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Ticket Type Name */}
                          <div className="flex items-start gap-[24px] w-full common-container mb-[24px]">
                            <FormField
                              control={form.control}
                              name={`tickets.${index}.typename`}
                              render={({ field }) => (
                                <FormItem className="relative w-full space-y-0">
                                  <FormLabel className="text-sm font-bold text-[#8F8F8F] absolute left-3  uppercase pt-[16px] pb-[4px]">
                                    Ticket TYPE Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter ticket name"
                                      className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]  "
                                      {...field}
                                      value={ticket.typename}
                                      onChange={(e) => {
                                        handleFestivalTicketType(e.target.value, index);
                                        field.onChange(e);
                                      }}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Ticket Price And Number of Tickets */}
                          <div className="flex items-start gap-[24px] w-full common-container">
                            {/* price field */}
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
                                      disabled={ticket.selected === "Free" ? true : false}
                                      type="number"
                                      onWheel={(e: any) => e.target.blur()}
                                      placeholder="Enter Price"
                                      className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                      {...field}
                                      value={ticket.price}
                                      onChange={(e) => {
                                        const value = e.target.value;

                                        if (value.startsWith("-")) {
                                          e.target.value = value.replace("-", ""); // Remove negative sign
                                        }

                                        if (!/^\d*\.?\d*$/.test(value)) {
                                          e.target.value = value.replace(/[^\d.]/g, "");
                                        }

                                        // handleInputChange(index, "price", parseFloat(e.target.value));
                                        field.onChange(e);
                                        handlTicketPriceChange(value, index);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Numbers of Tickets */}
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
                                      value={ticket.no}
                                      onChange={(e) => {
                                        // handleInputChange(index, "no", parseInt(e.target.value, 10));
                                        handleNoTickets(e.target.value, index);
                                        field.onChange(e);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Ticket start Date and Ticket and Dates */}
                          <div className="flex items-start gap-[24px] w-full common-container mt-[-4px] mb-[24px]">
                            {/* Ticket Start */}
                            <div className="w-full">
                              <ThemeProvider theme={themeMui}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DateTimePicker"]}>
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.ticketstart`}
                                      render={({ field }) => {
                                        const currentDateTime = dayjs();
                                        return (
                                          <FormItem className="relative w-full space-y-0 gradient-slate ps-[12px] rounded-md border border-[#292929] pt-[12px]">
                                            <FormLabel className="text-sm text-gray-500 uppercase pb-[4px] text-[#8f8f8f] ">
                                              Ticket Start Date & Time
                                            </FormLabel>
                                            <FormControl>
                                              {/* <div className="w-full" onClick={toggleDateTimePicker}> Attach click event here */}
                                              <div className="w-full" onClick={() => toggleTicketStartTimePicker(index)}>
                                                {" "}
                                                {/* Attach click event here */}
                                                <StyledDateTimePicker
                                                  //open={ticket.isTicketStartPickerOpen} // Control the open state with local state
                                                  referenceDate={currentDateTime}
                                                  formatDensity="spacious"
                                                  value={ticket.ticketstart ? dayjs(ticket.ticketstart) : null}
                                                  onKeyDown={(e: any) => e.preventDefault()}
                                                  autoOk={false}
                                                  onChange={(e: any) => {
                                                    if (e && e.isValid()) {
                                                      const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                      setTheTicketStartValue(formattedDate, index);
                                                      field.onChange(formattedDate);
                                                      // setIsPickerOpen(false); // Close the picker after selection
                                                      toggleTicketStartTimePicker(index);
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

                            {/* Ticket End */}
                            <div className="w-full">
                              <ThemeProvider theme={themeMui}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DateTimePicker"]}>
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.ticketend`}
                                      render={({ field }) => {
                                        let currentDateTime = dayjs(ticket?.ticketstart || new Date());
                                        currentDateTime = currentDateTime.add(10, "minute");
                                        // const adjustedEventStartTime = dayjs(TicketStartDate).add(10, "minute");

                                        // Default to the current time if the adjusted start time has passed
                                        // const defaultEndTime = dayjs().isAfter(adjustedEventStartTime) ? dayjs() : adjustedEventStartTime;

                                        return (
                                          <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                            <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">
                                              Ticket End Date & Time
                                            </FormLabel>
                                            <FormControl>
                                              <div className=" w-full" onClick={() => toggleTicketEndTimePicker(index)}>
                                                {/* <div className=" w-full" > */}

                                                <StyledDateTimePicker
                                                  //open={ticket.isTicketEndPickerOpen}
                                                  // value={validStartTime}
                                                  formatDensity="spacious"
                                                  // referenceDate={referenceTicketDate}
                                                  referenceDate={currentDateTime}
                                                  // minDate={currentDateTime}
                                                  value={ticket.ticketend ? dayjs(ticket.ticketend) : null}
                                                  onKeyDown={(e: any) => e.preventDefault()}
                                                  onChange={(e: any) => {
                                                    if (e && e.isValid()) {
                                                      const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                      setTheTicketEndValue(formattedDate, index);
                                                      field.onChange(formattedDate);
                                                      // setIsEndDatePickerOpen(false);
                                                      toggleTicketEndTimePicker(index);
                                                    }
                                                  }}
                                                  //  label="Event End Date & Time"
                                                  disablePast
                                                  minDateTime={currentDateTime}
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
                          </div>

                          {/* Event Start Date and Event End Date */}
                          {ticket.eventdates.map((event: any, eventIndex: number) => {
                            return (
                              <div className="flex items-start gap-[24px] w-full common-container mt-[-9px] mb-[12px]">
                                {/* Event Start */}
                                <div className="w-full">
                                  <ThemeProvider theme={themeMui}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DemoContainer components={["DateTimePicker"]}>
                                        <FormField
                                          control={form.control}
                                          name={`tickets.${index}.eventdates.${eventIndex}.startDate`}
                                          render={({ field }) => {
                                            let currentDateTime = dayjs(
                                              eventIndex === 0
                                                ? ticket?.ticketstart || new Date()
                                                : ticket?.eventdates[eventIndex - 1]?.endDate || new Date()
                                            );
                                            currentDateTime = currentDateTime.add(10, "minute");
                                            // const minStartTime = dayjs(TicketEndDate || new Date());

                                            // const defaultStartTime = field.value ? dayjs(field.value) : minStartTime;

                                            // const validStartTime = defaultStartTime.isBefore(minStartTime) ? minStartTime : defaultStartTime;

                                            // const referenceEventDate = validStartTime.add(10, "minute");

                                            return (
                                              <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                                <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">
                                                  Event Start Date & Time
                                                </FormLabel>
                                                <FormControl>
                                                  <div className=" w-full" onClick={() => festivalStartEventPicker(index, eventIndex)}>
                                                    {/* <div className=" w-full"> */}

                                                    <StyledDateTimePicker
                                                      //open={event.isStartEventPickerOpen}
                                                      //  value={validStartTime}
                                                      formatDensity="spacious"
                                                      // referenceDate={referenceEventDate}
                                                      referenceDate={currentDateTime}
                                                      // minDate={currentDateTime}
                                                      onKeyDown={(e: any) => e.preventDefault()}
                                                      autoOk={false}
                                                      value={event.startDate ? dayjs(event.startDate) : null}
                                                      onChange={(e: any) => {
                                                        if (e && e.isValid()) {
                                                          const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                          festivalStartEventValue(index, eventIndex, formattedDate);
                                                          field.onChange(formattedDate);
                                                          // setIsStartEventPickerOpen(false);
                                                          // toggleStartEventTimePicker(index);
                                                          festivalStartEventPicker(index, eventIndex);
                                                        }
                                                      }}
                                                      //  label="Event End Date & Time"
                                                      // minDateTime={minStartTime}
                                                      // slots={{ openPickerIcon: CalendarTodayIcon }} // Custom icon
                                                      disablePast
                                                      minDateTime={currentDateTime}
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

                                {/* Event Ends */}
                                <div className="w-full">
                                  <ThemeProvider theme={themeMui}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DemoContainer components={["DateTimePicker"]}>
                                        <FormField
                                          control={form.control}
                                          name={`tickets.${index}.eventdates.${eventIndex}.endDate`}
                                          render={({ field }) => {
                                            let currentDateTime = dayjs(
                                              eventIndex === 0
                                                ? ticket?.ticketend || new Date()
                                                : ticket?.eventdates[eventIndex]?.startDate || new Date()
                                            );
                                            currentDateTime = currentDateTime.add(10, "minute");
                                            // const adjustedEventStartTime = dayjs(EventStartTime).add(10, "minute");

                                            // const defaultEndTime = dayjs().isAfter(adjustedEventStartTime) ? dayjs() : adjustedEventStartTime;

                                            return (
                                              <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                                <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">
                                                  Event End Date & Time
                                                </FormLabel>
                                                <FormControl>
                                                  <div className=" w-full" onClick={() => festivalEndEventPicker(index, eventIndex)}>
                                                    <StyledDateTimePicker
                                                      //open={event.isEndEventPickerOpen}
                                                      // referenceDate={defaultEndTime}
                                                      referenceDate={currentDateTime}
                                                      // minDate={currentDateTime}
                                                      value={event.endDate ? dayjs(event.endDate) : null}
                                                      formatDensity="spacious"
                                                      onKeyDown={(e: any) => e.preventDefault()}
                                                      onChange={(e: any) => {
                                                        if (e && e.isValid()) {
                                                          const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                          festivalEndEventValue(index, eventIndex, formattedDate);
                                                          field.onChange(formattedDate);
                                                          console.log("my ened time", formattedDate);
                                                          // setIsEndEventPickerOpen(false);
                                                          // toggleEndEventTimePicker(index);
                                                          festivalEndEventPicker(index, eventIndex);
                                                          console.log("my ened time", formattedDate);
                                                        }
                                                      }}
                                                      disablePast
                                                      minDateTime={currentDateTime}
                                                      //  label="Event End Date & Time"
                                                      // minDateTime={dayjs("2024-10-15T08:30")}
                                                      // minDateTime={adjustedEventStartTime}
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
                              </div>
                            );
                          })}

                          {/* Add more Event timimg button here */}
                          <div className="flex justify-end items-center ticket-btn mb-[24px]">
                            <Button
                              style={{
                                background:
                                  "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                              }}
                              className="flex items-center justify-between bg-[#0F0F0F] text-[#00D059] h-[32px] py-[8px] px-[12px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"
                              onClick={(e) => {
                                e.preventDefault();
                                addNewEventDateInFestival(index);
                              }}
                            >
                              <Image src={addicon} alt="Add-icon" height={12} width={12} />
                              Add Event Timings
                            </Button>
                          </div>

                          {/* What's Included Inputs */}
                          <div className="flex items-start gap-[24px] w-full common-container">
                            <div className="pb-[16px]  w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                              <div className="flex items-center justify-between" onClick={() => handleDropdown(index)}>
                                <p className="text-sm text-[#8F8F8F] uppercase">WHAT'S INCLUDED</p>
                                <Image src={ticket.optionDropDown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                              </div>
                              {ticket.optionDropDown && (
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
                                          className={ticket?.options?.some((o: any) => o?.id === option?.id) ? "filtergreen" : ""}
                                        />
                                        <p
                                          className={`text-[16px] font-normal items-center ${
                                            ticket?.options?.some((o: any) => o?.id === option?.id) ? "text-[#00d059]" : "text-[#FFFFFF]"
                                          }`}
                                        >
                                          {option.label}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="column-separator"></div> <div className="column-separator"></div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Delete Ticket Type */}
                          {index !== 0 && (
                            <div className="flex justify-end items-center mt-[29px] ticket-btn">
                              <Button
                                className=" bg-[#FF1717B2] text-white font-bold h-[32px] py-[8px] px-[12px] gap-[8px] flex items-center justify-between rounded-[100px] text-[11px]"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeleteTicketType(index);
                                }}
                              >
                                <Image src={deleteicon} alt="delete-icon" height={12} width={12} />
                                Delete Ticket Type
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : ticket.type === "RSVP Ticketing" ? (
                        <div key={index} className="mb-[24px]">
                          {/* Gradient Line to seperate Tickets from each other */}
                          {index !== 0 && (
                            <div
                              className="h-[3px] w-full relative mb-[28px] mt-[4px]"
                              style={{
                                background: "linear-gradient(135deg, #002b12 0.2%, #13ff7a 50.2%, #002b12 100.2%)", // main gradient in the center
                              }}
                            >
                              <div
                                className="absolute top-0 left-0 h-full"
                                style={{
                                  width: "30%", // make the edges thinner
                                  background: "linear-gradient(to left, transparent, #002b12)", // gradient that fades out from transparent
                                  filter: "blur(8px)", // blur the edges to make them thin and faded
                                }}
                              ></div>
                              <div
                                className="absolute top-0 right-0 h-full"
                                style={{
                                  width: "30%", // same width for both edges
                                  background: "linear-gradient(to right, transparent, #002b12)", // gradient that fades out from transparent
                                  filter: "blur(8px)", // blur the edges to make them thin and faded
                                }}
                              ></div>
                            </div>
                          )}

                          {/* Event Ticket Type and Event Ticket Name */}
                          <div className="flex items-start gap-[24px] w-full common-container mb-[24px]">
                            {/* Ticket Type */}
                            <FormField
                              control={form.control}
                              name={`tickets.${index}.type`}
                              render={({ field }) => (
                                <FormItem
                                  className="relative pb-[8px] w-full rounded-md border border-[#292929] gradient-slate 
                            pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent 
                            file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed
                            disabled:opacity-50"
                                >
                                  <div className="flex items-center justify-between" onClick={() => handleTicketTypeDropDown(index)}>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-bold text-[#8F8F8F] pb-[4px] uppercase">EVENT Ticket Type</p>
                                      <p className="text-[16px] font-extrabold text-[#FFFFFF] ">RSVP Ticketing</p>
                                    </div>
                                    <Image src={ticket.typeDropDown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                                  </div>

                                  {ticket.typeDropDown && (
                                    <>
                                      <div className="h-fit overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                                        {ticketTypesOptions?.map((T_type: string, typeIndex: number) => (
                                          <div
                                            key={typeIndex}
                                            className="flex items-center justify-between pt-[8px] cursor-pointer"
                                            onClick={() => handleTicketTypeSelection(T_type, index)}
                                          >
                                            <div className="flex items-center gap-[10px]">
                                              <p
                                                className={`text-[16px] font-normal items-center ${
                                                  ticket.type === T_type ? "text-[#00d059]" : "text-[#FFFFFF]"
                                                }`}
                                              >
                                                {T_type}
                                              </p>
                                            </div>
                                            {ticket.type === T_type && <Image src={tick} width={16} height={16} alt="tick" />}
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {/* Ticket Name */}
                            <FormField
                              control={form.control}
                              name={`tickets.${index}.name`}
                              render={({ field }) => (
                                <FormItem className="relative w-full space-y-0">
                                  <FormLabel className="text-sm font-bold text-[#8F8F8F] absolute left-3  uppercase pt-[16px] pb-[4px]">
                                    EVENT TICKET NAME
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter Ticket Name"
                                      className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]  "
                                      {...field}
                                      value={ticket.name}
                                      onChange={(e) => {
                                        // setEventname(e.target.value);
                                        handleTicketNameChange(e.target.value, index);
                                        field.onChange(e);
                                      }}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Ticket Deadline And the Capacity for RSVP */}
                          <div className="flex items-start gap-[24px] w-full common-container mb-[28px]">
                            {/* Ticket Deadline */}
                            <div className="w-full">
                              <ThemeProvider theme={themeMui}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DateTimePicker"]}>
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.deadline`}
                                      render={({ field }) => {
                                        const currentDateTime = dayjs();
                                        return (
                                          <FormItem className="relative w-full space-y-0 gradient-slate ps-[12px] rounded-md border border-[#292929] pt-[12px]">
                                            <FormLabel className="text-sm text-gray-500 uppercase pb-[4px] text-[#8f8f8f] ">
                                              Ticket Start Date & Time
                                            </FormLabel>
                                            <FormControl>
                                              {/* <div className="w-full" onClick={toggleDateTimePicker}> Attach click event here */}
                                              <div className="w-full" onClick={() => toggleRSVPTicketDeadlinePicker(index)}>
                                                {" "}
                                                {/* Attach click event here */}
                                                <StyledDateTimePicker
                                                  //open={ticket.isDeadlinePickerOpen} // Control the open state with local state
                                                  referenceDate={currentDateTime}
                                                  formatDensity="spacious"
                                                  onKeyDown={(e: any) => e.preventDefault()}
                                                  autoOk={false}
                                                  value={ticket.deadline ? dayjs(ticket.deadline) : null}
                                                  onChange={(e: any) => {
                                                    if (e && e.isValid()) {
                                                      const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                      toggleRSVPTicketDeadlineValue(formattedDate, index);
                                                      field.onChange(formattedDate);
                                                      //setIsPickerOpen(false); // Close the picker after selection
                                                      toggleRSVPTicketDeadlinePicker(index);
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

                            {/* RSVP Capacity */}
                            <div className="w-full mt-[8px]">
                              <FormField
                                control={form.control}
                                name={`tickets.${index}.capacity`}
                                render={({ field }) => (
                                  <FormItem className="relative w-full space-y-0">
                                    <FormLabel className="text-sm font-bold text-[#8F8F8F] absolute left-3  uppercase pt-[16px] pb-[4px]">
                                      RSVP Capacity
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        placeholder="Enter RSVP Capacity"
                                        className="pt-[2.83rem] pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]  "
                                        {...field}
                                        onChange={(e) => {
                                          handleCapacityRSVPTicket(e.target.value, index);
                                          field.onChange(e);
                                        }}
                                      />
                                    </FormControl>

                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          {/* What's Included Inputs */}
                          <div className="flex items-start gap-[24px] w-full common-container mb-[24px]">
                            <div className="pb-[16px] w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                              <div className="flex items-center justify-between" onClick={() => handleDropdown(index)}>
                                <p className="text-sm text-[#8F8F8F] uppercase">WHAT'S INCLUDED</p>
                                <Image src={ticket?.optionDropDown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                              </div>
                              {ticket?.optionDropDown && (
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
                                          className={ticket?.options?.some((o: any) => o?.id === option?.id) ? "filtergreen" : ""}
                                        />
                                        <p
                                          className={`text-[16px] font-normal items-center ${
                                            ticket?.options?.some((o: any) => o?.id === option?.id) ? "text-[#00d059]" : "text-[#FFFFFF]"
                                          }`}
                                        >
                                          {option.label}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="column-separator"></div> <div className="column-separator"></div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* RSVP Details Fields */}
                          <div className="w-full relative rounded-md border border-[#292929] gradient-slate flex flex-col items-start gap-[24px] common-container px-[12px] py-[16px]">
                            <p className="text-sm font-bold text-[#8F8F8F] pb-[4px] uppercase">RSVP Details</p>
                            {/* Default Fields To ask */}
                            <div ref={containerRef} className="w-full max-h-[320px] overflow-y-auto mb-2">
                              <div className="w-full common-container flex justify-start items-center gap-[24px] mb-[24px]">
                                {/* Name radio */}
                                <div
                                  onClick={() => handleRsvpRadioSelections("username", index)}
                                  className="hover-gradient-border rounded-md border border-[#292929] gradient-slate flex justify-between items-center py-[18px] px-[12px] w-full"
                                >
                                  <p>Name</p>
                                  <div
                                    className={`w-[15px] h-[15px] rounded-lg ${
                                      ticket.username ? "border-[#00D059]" : "border-[#FBFBFBB2]"
                                    } border-[2px] flex justify-center items-center p-0`}
                                  >
                                    {ticket.username && <div className="w-[8px] h-[8px] rounded-lg bg-[#00D059] m-0"></div>}
                                  </div>
                                </div>
                                {/* Email Radio */}
                                <div
                                  onClick={() => handleRsvpRadioSelections("useremail", index)}
                                  className="hover-gradient-border rounded-md border border-[#292929] gradient-slate flex justify-between items-center py-[18px] px-[12px] w-full"
                                >
                                  <p>Email</p>
                                  <div
                                    className={`w-[15px] h-[15px] rounded-lg ${
                                      ticket.useremail ? "border-[#00D059]" : "border-[#FBFBFBB2]"
                                    } border-[2px] flex justify-center items-center p-0`}
                                  >
                                    {ticket.useremail && <div className="w-[8px] h-[8px] rounded-lg bg-[#00D059] m-0"></div>}
                                  </div>
                                </div>
                              </div>
                              <div className="w-full common-container">
                                {/* Phone Number Radio */}
                                <div
                                  onClick={() => handleRsvpRadioSelections("usernumb", index)}
                                  className="hover-gradient-border rounded-md border border-[#292929] gradient-slate flex justify-between items-center py-[18px] px-[12px] md:w-[49%] w-full"
                                >
                                  <p>Phone Number</p>
                                  <div
                                    className={`w-[15px] h-[15px] rounded-lg ${
                                      ticket.usernumb ? "border-[#00D059]" : "border-[#FBFBFBB2]"
                                    } border-[2px] flex justify-center items-center p-0`}
                                  >
                                    {ticket.usernumb && <div className="w-[8px] h-[8px] rounded-lg bg-[#00D059] m-0"></div>}
                                  </div>
                                </div>
                              </div>

                              {/* All Additional Fields are defining here */}
                              <div className="w-full flex flex-wrap mt-[24px] gap-x-[24px] gap-y-0">
                                {ticket.additional.map((addField: AdditionalFields, f_index: number) => {
                                  return (
                                    <FormField
                                      key={f_index}
                                      control={form.control}
                                      name={`tickets.${index}.additional.${f_index}.title`}
                                      render={({ field }) => (
                                        <FormItem className="relative w-full lg:w-[48%] xl:w-[49%] space-y-0 input-custom-container">
                                          <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">
                                            Additional field {f_index + 1}
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              onWheel={(e: any) => e.target.blur()}
                                              placeholder="Enter Field Name"
                                              className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                              {...field}
                                              value={addField.title}
                                              onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.startsWith(" ")) {
                                                  return;
                                                }
                                                field.onChange(e);
                                                handleRsvpAdditionField(index, f_index, value);
                                              }}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  );
                                })}
                              </div>
                            </div>

                            {/* Add Aaditional field Button */}
                            <div className="flex justify-end items-center ticket-btn">
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  addAdditionalToRSVP(index);
                                }}
                                style={{
                                  background:
                                    "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                                }}
                                className="flex items-center justify-between bg-[#0F0F0F] text-[#00D059] h-[32px] py-[8px] px-[12px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"
                                // onClick={handleAddTicketType}
                              >
                                <Image src={addicon} alt="Add-icon" height={12} width={12} />
                                Additional Field
                              </Button>
                            </div>
                          </div>

                          {/* Delete Ticket Type */}
                          {index !== 0 && (
                            <div className="flex justify-end items-center mt-[29px] ticket-btn">
                              <Button
                                className=" bg-[#FF1717B2] text-white font-bold h-[32px] py-[8px] px-[12px] gap-[8px] flex items-center justify-between rounded-[100px] text-[11px]"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeleteTicketType(index);
                                }}
                              >
                                <Image src={deleteicon} alt="delete-icon" height={12} width={12} />
                                Delete Ticket Type
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : ticket.type === "Private Event Ticketing" ? (
                        <div key={index} className="mb-[24px]">
                          {/* Gradient Line to seperate Tickets from each other */}
                          {index !== 0 && (
                            <div
                              className="h-[3px] w-full relative mb-[28px] mt-[4px]"
                              style={{
                                background: "linear-gradient(135deg, #002b12 0.2%, #13ff7a 50.2%, #002b12 100.2%)", // main gradient in the center
                              }}
                            >
                              <div
                                className="absolute top-0 left-0 h-full"
                                style={{
                                  width: "30%", // make the edges thinner
                                  background: "linear-gradient(to left, transparent, #002b12)", // gradient that fades out from transparent
                                  filter: "blur(8px)", // blur the edges to make them thin and faded
                                }}
                              ></div>
                              <div
                                className="absolute top-0 right-0 h-full"
                                style={{
                                  width: "30%", // same width for both edges
                                  background: "linear-gradient(to right, transparent, #002b12)", // gradient that fades out from transparent
                                  filter: "blur(8px)", // blur the edges to make them thin and faded
                                }}
                              ></div>
                            </div>
                          )}

                          {/* Event Ticket Type and Event Paid/Free fields */}
                          <div className="flex items-start gap-[24px] w-full common-container mb-[24px]">
                            <FormField
                              control={form.control}
                              name={`tickets.${index}.type`}
                              render={({ field }) => (
                                <FormItem
                                  className="relative pb-[8px] w-full rounded-md border border-[#292929] gradient-slate 
                          pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent 
                          file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed
                          disabled:opacity-50"
                                >
                                  <div className="flex items-center justify-between" onClick={() => handleTicketTypeDropDown(index)}>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-bold text-[#8F8F8F] pb-[4px] uppercase">EVENT Ticket Type</p>
                                      <p className="text-[16px] font-extrabold text-[#FFFFFF] ">Private Event Ticketing</p>
                                    </div>
                                    <Image src={ticket.typeDropDown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                                  </div>

                                  {ticket.typeDropDown && (
                                    <>
                                      <div className="h-[210px] overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                                        {ticketTypesOptions?.map((T_type: string, typeIndex: number) => (
                                          <div
                                            key={typeIndex}
                                            className="flex items-center justify-between pt-[8px] cursor-pointer"
                                            onClick={() => handleTicketTypeSelection(T_type, index)}
                                          >
                                            <div className="flex items-center gap-[10px]">
                                              <p
                                                className={`text-[16px] font-normal items-center ${
                                                  ticket.type === T_type ? "text-[#00d059]" : "text-[#FFFFFF]"
                                                }`}
                                              >
                                                {T_type}
                                              </p>
                                            </div>
                                            {ticket.type === T_type && <Image src={tick} width={16} height={16} alt="tick" />}
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`tickets.${index}.selected`}
                              render={({ field }) => (
                                <FormItem
                                  className="relative pb-[8px] w-full rounded-md border border-[#292929] gradient-slate 
                          pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent 
                          file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed
                          disabled:opacity-50"
                                >
                                  <div className="flex items-center justify-between" onClick={() => handleTicketSelectedOptionDropDown(index)}>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-bold text-[#8F8F8F] pb-[4px] uppercase">paid or free</p>
                                      <p className="text-[16px] font-extrabold text-[#FFFFFF] ">
                                        {ticket?.selected ? ticket?.selected : "Select paid or free ticket"}
                                      </p>
                                    </div>
                                    <Image src={ticket?.selectedDropDown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                                  </div>

                                  {ticket?.selectedDropDown && (
                                    <>
                                      <div className="h-fit overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                                        {["Free", "Paid"].map((option: any, optionIndex: number) => (
                                          <div
                                            key={optionIndex}
                                            className="flex items-center justify-between pt-[8px] cursor-pointer"
                                            onClick={() => handleTicketSelectionOption(option, index)}
                                          >
                                            <div className="flex items-center gap-[10px]">
                                              <p
                                                className={`text-[16px] font-normal items-center ${
                                                  ticket?.selected === option ? "text-[#00d059]" : "text-[#FFFFFF]"
                                                }`}
                                              >
                                                {option}
                                              </p>
                                            </div>
                                            {ticket?.selected === option && <Image src={tick} width={16} height={16} alt="tick" />}
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Ticket Type Name */}
                          <div className="flex items-start gap-[24px] w-full common-container mb-[24px]">
                            <FormField
                              control={form.control}
                              name={`tickets.${index}.name`}
                              render={({ field }) => (
                                <FormItem className="relative w-full space-y-0">
                                  <FormLabel className="text-sm font-bold text-[#8F8F8F] absolute left-3  uppercase pt-[16px] pb-[4px]">
                                    Event Ticket Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter ticket name"
                                      className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]  "
                                      {...field}
                                      value={ticket.name}
                                      onChange={(e) => {
                                        // setEventname(e.target.value);
                                        handleTicketNameChange(e.target.value, index);
                                        field.onChange(e);
                                      }}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Ticket Price And Number of Tickets */}
                          <div className="flex items-start gap-[24px] w-full common-container">
                            {/* price field */}
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
                                      disabled={ticket.selected === "Free" ? true : false}
                                      type="number"
                                      onWheel={(e: any) => e.target.blur()}
                                      placeholder="Enter Price"
                                      className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                      {...field}
                                      value={ticket.price}
                                      onChange={(e) => {
                                        const value = e.target.value;

                                        if (value.startsWith("-")) {
                                          e.target.value = value.replace("-", ""); // Remove negative sign
                                        }

                                        if (!/^\d*\.?\d*$/.test(value)) {
                                          e.target.value = value.replace(/[^\d.]/g, "");
                                        }

                                        // handleInputChange(index, "price", parseFloat(e.target.value));
                                        field.onChange(e);
                                        handlTicketPriceChange(value, index);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Numbers of Tickets */}
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
                                      value={ticket.no}
                                      onWheel={(e: any) => e.target.blur()}
                                      onChange={(e) => {
                                        // handleInputChange(index, "no", parseInt(e.target.value, 10));
                                        field.onChange(e);
                                        handleNoTickets(e.target.value, index);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Ticket start Date and Ticket and Dates */}
                          <div className="flex items-start gap-[24px] w-full common-container mt-[-4px] mb-[24px]">
                            {/* Ticket Start */}
                            <div className="w-full">
                              <ThemeProvider theme={themeMui}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DateTimePicker"]}>
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.ticketstart`}
                                      render={({ field }) => {
                                        const currentDateTime = dayjs();
                                        return (
                                          <FormItem className="relative w-full space-y-0 gradient-slate ps-[12px] rounded-md border border-[#292929] pt-[12px]">
                                            <FormLabel className="text-sm text-gray-500 uppercase pb-[4px] text-[#8f8f8f] ">
                                              Ticket Start Date & Time
                                            </FormLabel>
                                            <FormControl>
                                              {/* <div className="w-full" onClick={toggleDateTimePicker}> Attach click event here */}
                                              <div className="w-full" onClick={() => toggleTicketStartTimePicker(index)}>
                                                {" "}
                                                {/* Attach click event here */}
                                                <StyledDateTimePicker
                                                  //open={ticket.isTicketStartPickerOpen} // Control the open state with local state
                                                  referenceDate={currentDateTime}
                                                  formatDensity="spacious"
                                                  value={ticket.ticketstart ? dayjs(ticket.ticketstart) : null}
                                                  onKeyDown={(e: any) => e.preventDefault()}
                                                  autoOk={false}
                                                  onChange={(e: any) => {
                                                    if (e && e.isValid()) {
                                                      const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                      setTheTicketStartValue(formattedDate, index);
                                                      field.onChange(formattedDate);
                                                      //setIsPickerOpen(false); // Close the picker after selection
                                                      toggleTicketStartTimePicker(index);
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

                            {/* Ticket End */}
                            <div className="w-full">
                              <ThemeProvider theme={themeMui}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DateTimePicker"]}>
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.ticketend`}
                                      render={({ field }) => {
                                        let currentDateTime = dayjs(ticket?.ticketstart || new Date());
                                        currentDateTime = currentDateTime.add(10, "minute");
                                        // const adjustedEventStartTime = dayjs(TicketStartDate).add(10, "minute");

                                        // Default to the current time if the adjusted start time has passed
                                        // const defaultEndTime = dayjs().isAfter(adjustedEventStartTime) ? dayjs() : adjustedEventStartTime;

                                        return (
                                          <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                            <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">
                                              Ticket End Date & Time
                                            </FormLabel>
                                            <FormControl>
                                              <div className=" w-full" onClick={() => toggleTicketEndTimePicker(index)}>
                                                {/* <div className=" w-full" > */}

                                                <StyledDateTimePicker
                                                  //open={ticket.isTicketEndPickerOpen}
                                                  // value={validStartTime}
                                                  value={ticket.ticketend ? dayjs(ticket.ticketend) : null}
                                                  formatDensity="spacious"
                                                  // referenceDate={referenceTicketDate}
                                                  referenceDate={currentDateTime}
                                                  // minDate={currentDateTime}
                                                  onKeyDown={(e: any) => e.preventDefault()}
                                                  onChange={(e: any) => {
                                                    if (e && e.isValid()) {
                                                      const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                      setTheTicketEndValue(formattedDate, index);
                                                      field.onChange(formattedDate);
                                                      // setIsEndDatePickerOpen(false);
                                                      toggleTicketEndTimePicker(index);
                                                    }
                                                  }}
                                                  //  label="Event End Date & Time"
                                                  disablePast
                                                  minDateTime={currentDateTime}
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
                          </div>

                          {/* Event Start Date and Event End Date */}
                          <div className="flex items-start gap-[24px] w-full common-container mt-[-9px] mb-[24px]">
                            {/* Event Start */}
                            <div className="w-full">
                              <ThemeProvider theme={themeMui}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DateTimePicker"]}>
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.eventstart`}
                                      render={({ field }) => {
                                        let currentDateTime = dayjs(ticket?.ticketstart || new Date());
                                        currentDateTime = currentDateTime.add(10, "minute");
                                        // const minStartTime = dayjs(TicketEndDate || new Date());

                                        // const defaultStartTime = field.value ? dayjs(field.value) : minStartTime;

                                        // const validStartTime = defaultStartTime.isBefore(minStartTime) ? minStartTime : defaultStartTime;

                                        // const referenceEventDate = validStartTime.add(10, "minute");

                                        return (
                                          <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                            <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">
                                              Event Start Date & Time
                                            </FormLabel>
                                            <FormControl>
                                              <div className=" w-full" onClick={() => toggleStartEventTimePicker(index)}>
                                                {/* <div className=" w-full"> */}

                                                <StyledDateTimePicker
                                                  //open={ticket.isStartEventPickerOpen}
                                                  //  value={validStartTime}
                                                  value={ticket.eventstart ? dayjs(ticket.eventstart) : null}
                                                  formatDensity="spacious"
                                                  // referenceDate={referenceEventDate}
                                                  referenceDate={currentDateTime}
                                                  onKeyDown={(e: any) => e.preventDefault()}
                                                  onChange={(e: any) => {
                                                    if (e && e.isValid()) {
                                                      const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                      // setEventStartTime(formattedDate);
                                                      toggleStartEventValue(formattedDate, index);
                                                      field.onChange(formattedDate);
                                                      // setIsStartEventPickerOpen(false);
                                                      toggleStartEventTimePicker(index);
                                                    }
                                                  }}
                                                  //  label="Event End Date & Time"
                                                  // minDateTime={minStartTime}
                                                  // slots={{ openPickerIcon: CalendarTodayIcon }} // Custom icon
                                                  disablePast
                                                  minDateTime={currentDateTime}
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

                            {/* Event Ends */}
                            <div className="w-full">
                              <ThemeProvider theme={themeMui}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DateTimePicker"]}>
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.eventend`}
                                      render={({ field }) => {
                                        let currentDateTime = dayjs(ticket?.ticketend || new Date());
                                        currentDateTime = currentDateTime.add(10, "minute");
                                        // const adjustedEventStartTime = dayjs(EventStartTime).add(10, "minute");

                                        // const defaultEndTime = dayjs().isAfter(adjustedEventStartTime) ? dayjs() : adjustedEventStartTime;

                                        return (
                                          <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                            <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">
                                              Event End Date & Time
                                            </FormLabel>
                                            <FormControl>
                                              <div className=" w-full" onClick={() => toggleEndEventTimePicker(index)}>
                                                <StyledDateTimePicker
                                                  //open={ticket.isEndEventPickerOpen}
                                                  // referenceDate={defaultEndTime}
                                                  referenceDate={currentDateTime}
                                                  value={ticket.eventend ? dayjs(ticket.eventend) : null}
                                                  formatDensity="spacious"
                                                  onKeyDown={(e: any) => e.preventDefault()}
                                                  onChange={(e: any) => {
                                                    if (e && e.isValid()) {
                                                      const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                      toggleEndEventValue(formattedDate, index);
                                                      field.onChange(formattedDate);
                                                      console.log("my ened time", formattedDate);
                                                      // setIsEndEventPickerOpen(false);
                                                      toggleEndEventTimePicker(index);
                                                      console.log("my ened time", formattedDate);
                                                    }
                                                  }}
                                                  disablePast
                                                  minDateTime={currentDateTime}
                                                  //  label="Event End Date & Time"
                                                  // minDateTime={dayjs("2024-10-15T08:30")}
                                                  // minDateTime={adjustedEventStartTime}
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
                          </div>

                          {/* What's Included Inputs */}
                          <div className="flex items-start gap-[24px] w-full common-container mb-[24px]">
                            <div className="pb-[16px]  w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                              <div className="flex items-center justify-between" onClick={() => handleDropdown(index)}>
                                <p className="text-sm text-[#8F8F8F] uppercase">WHAT'S INCLUDED</p>
                                <Image src={ticket.optionDropDown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                              </div>
                              {ticket.optionDropDown && (
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
                                          className={ticket?.options?.some((o: any) => o?.id === option?.id) ? "filtergreen" : ""}
                                        />
                                        <p
                                          className={`text-[16px] font-normal items-center ${
                                            ticket?.options?.some((o: any) => o?.id === option?.id) ? "text-[#00d059]" : "text-[#FFFFFF]"
                                          }`}
                                        >
                                          {option.label}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="column-separator"></div> <div className="column-separator"></div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Aditional Emails Adding Fields */}
                          {ticket.emailmanual?.length > 0 && (
                            <div className="w-full relative rounded-md border border-[#292929] gradient-slate flex flex-col items-start common-container px-[12px] py-[16px] mb-[24px]">
                              <p className="text-sm font-bold text-[#8F8F8F] pb-[10px] uppercase">Manual Emails</p>

                              <div ref={manualEmailRef} className="w-full flex-col flex gap-x-[24px] gap-y-0  max-h-[300px] overflow-y-auto mb-2">
                                {ticket.emailmanual.map((email: string, e_Index: number) => {
                                  return (
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.emailmanual.${e_Index}`}
                                      render={({ field }) => (
                                        <FormItem className="relative w-full space-y-0 input-custom-container">
                                          <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">
                                            Email {e_Index + 1}
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              onWheel={(e: any) => e.target.blur()}
                                              placeholder={`Enter Email ${e_Index + 1}`}
                                              className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                              {...field}
                                              value={email}
                                              onChange={(e) => {
                                                const value = e.target.value;

                                                if (value.startsWith(" ")) {
                                                  return;
                                                }
                                                field.onChange(e);
                                                handleManualEnmailValues(index, e_Index, value);
                                              }}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  );
                                })}
                              </div>

                              {/* Add Aditional field Button */}

                              <div className="flex justify-end items-center ticket-btn">
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    addManualEmailField(index);
                                  }}
                                  style={{
                                    background:
                                      "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                                  }}
                                  className="flex items-center justify-between bg-[#0F0F0F] text-[#00D059] h-[32px] py-[8px] px-[12px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"
                                  // onClick={handleAddTicketType}
                                >
                                  <Image src={addicon} alt="Add-icon" height={12} width={12} />
                                  Additional Field
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Buttons to select add csv or manual Emails */}
                          <div className="w-full flex flex-col gap-[24px]">
                            {/* Add manual Email */}
                            {ticket?.emailmanual?.length === 0 && (
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  addManualEmailField(index);
                                }}
                                style={{
                                  background: "#FFFFFF0F",
                                }}
                                className="flex items-center justify-between bg-[#FFFFFF0F] text-white h-[32px] py-[8px] px-[12px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold w-fit"
                                // onClick={handleAddTicketType}
                              >
                                <Image src={whiteaddicon} alt="Add-icon" height={12} width={12} />
                                Add Emails manually
                              </Button>
                            )}

                            {/* Add manual Email By CSV */}
                            <label
                              style={{
                                background: "#FFFFFF0F",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "5px",
                                backgroundColor: "#0F0F0F",
                                color: "white",
                                height: "32px",
                                padding: "8px 12px",
                                borderRadius: "9999px",
                                border: "0.86px solid transparent",
                                fontSize: "11px",
                                fontWeight: "800",
                                cursor: "pointer",
                                width: "fit-content",
                              }}
                            >
                              <Image src={addicon} alt="Add-icon" height={12} width={12} />
                              Upload CSV (emails)
                              {/* Hidden file input */}
                              <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => handleCSVFileChange(e, index)}
                                style={{
                                  display: "none", // Hide the default file input button
                                }}
                              />
                            </label>
                          </div>

                          {/* Delete Ticket Type */}
                          {index !== 0 && (
                            <div className="flex justify-end items-center mt-[29px] ticket-btn">
                              <Button
                                className=" bg-[#FF1717B2] text-white font-bold h-[32px] py-[8px] px-[12px] gap-[8px] flex items-center justify-between rounded-[100px] text-[11px]"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeleteTicketType(index);
                                }}
                              >
                                <Image src={deleteicon} alt="delete-icon" height={12} width={12} />
                                Delete Ticket Type
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div key={index} className="mb-[24px]">
                          {/* Gradient Line to seperate Tickets from each other */}
                          {index !== 0 && (
                            <div
                              className="h-[3px] w-full relative mb-[28px] mt-[4px]"
                              style={{
                                background: "linear-gradient(135deg, #002b12 0.2%, #13ff7a 50.2%, #002b12 100.2%)", // main gradient in the center
                              }}
                            >
                              <div
                                className="absolute top-0 left-0 h-full"
                                style={{
                                  width: "30%", // make the edges thinner
                                  background: "linear-gradient(to left, transparent, #002b12)", // gradient that fades out from transparent
                                  filter: "blur(8px)", // blur the edges to make them thin and faded
                                }}
                              ></div>
                              <div
                                className="absolute top-0 right-0 h-full"
                                style={{
                                  width: "30%", // same width for both edges
                                  background: "linear-gradient(to right, transparent, #002b12)", // gradient that fades out from transparent
                                  filter: "blur(8px)", // blur the edges to make them thin and faded
                                }}
                              ></div>
                            </div>
                          )}

                          {/* Event Ticket Type and Event Paid/Free fields */}
                          <div className="flex items-start gap-[24px] w-full common-container mb-[24px]">
                            <FormField
                              control={form.control}
                              name={`tickets.${index}.type`}
                              render={({ field }) => (
                                <FormItem
                                  className="relative pb-[8px] w-full rounded-md border border-[#292929] gradient-slate 
                            pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent 
                            file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed
                            disabled:opacity-50"
                                >
                                  <div className="flex items-center justify-between" onClick={() => handleTicketTypeDropDown(index)}>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-bold text-[#8F8F8F] pb-[4px] uppercase">EVENT Ticket Type</p>
                                      <p className="text-[16px] font-extrabold text-[#FFFFFF] ">Passworded / Discounted Voucher Event Ticketing</p>
                                    </div>
                                    <Image src={ticket.typeDropDown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                                  </div>

                                  {ticket.typeDropDown && (
                                    <>
                                      <div className="h-[210px] overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                                        {ticketTypesOptions?.map((T_type: string, typeIndex: number) => (
                                          <div
                                            key={typeIndex}
                                            className="flex items-center justify-between pt-[8px] cursor-pointer"
                                            onClick={() => handleTicketTypeSelection(T_type, index)}
                                          >
                                            <div className="flex items-center gap-[10px]">
                                              <p
                                                className={`text-[16px] font-normal items-center ${
                                                  ticket.type === T_type ? "text-[#00d059]" : "text-[#FFFFFF]"
                                                }`}
                                              >
                                                {T_type}
                                              </p>
                                            </div>
                                            {ticket.type === T_type && <Image src={tick} width={16} height={16} alt="tick" />}
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`tickets.${index}.selected`}
                              render={({ field }) => (
                                <FormItem
                                  className="relative pb-[8px] w-full rounded-md border border-[#292929] gradient-slate 
                            pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent 
                            file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed
                            disabled:opacity-50"
                                >
                                  <div className="flex items-center justify-between" onClick={() => handleTicketSelectedOptionDropDown(index)}>
                                    <div className="flex flex-col">
                                      <p className="text-sm font-bold text-[#8F8F8F] pb-[4px] uppercase">paid or free</p>
                                      <p className="text-[16px] font-extrabold text-[#FFFFFF] ">
                                        {ticket?.selected ? ticket?.selected : "Select paid or free ticket"}
                                      </p>
                                    </div>
                                    <Image src={ticket?.selectedDropDown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                                  </div>

                                  {ticket?.selectedDropDown && (
                                    <>
                                      <div className="h-fit overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                                        {["Free", "Paid"].map((option: any, optionIndex: number) => (
                                          <div
                                            key={optionIndex}
                                            className="flex items-center justify-between pt-[8px] cursor-pointer"
                                            onClick={() => handleTicketSelectionOption(option, index)}
                                          >
                                            <div className="flex items-center gap-[10px]">
                                              <p
                                                className={`text-[16px] font-normal items-center ${
                                                  ticket?.selected === option ? "text-[#00d059]" : "text-[#FFFFFF]"
                                                }`}
                                              >
                                                {option}
                                              </p>
                                            </div>
                                            {ticket?.selected === option && <Image src={tick} width={16} height={16} alt="tick" />}
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Ticket Type Name */}
                          <div className="flex items-start gap-[24px] w-full common-container mb-[24px]">
                            <FormField
                              control={form.control}
                              name={`tickets.${index}.name`}
                              render={({ field }) => (
                                <FormItem className="relative w-full space-y-0">
                                  <FormLabel className="text-sm font-bold text-[#8F8F8F] absolute left-3  uppercase pt-[16px] pb-[4px]">
                                    EVENT Ticket Type
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Enter Ticket Name"
                                      className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]  "
                                      {...field}
                                      value={ticket.name}
                                      onChange={(e) => {
                                        // setEventname(e.target.value);
                                        handleTicketNameChange(e.target.value, index);
                                        field.onChange(e);
                                      }}
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Ticket Price And Number of Tickets */}
                          <div className="flex items-start gap-[24px] w-full common-container">
                            {/* price field */}
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
                                      disabled={ticket.selected === "Free" ? true : false}
                                      type="number"
                                      onWheel={(e: any) => e.target.blur()}
                                      placeholder="Enter Price"
                                      className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                      {...field}
                                      value={ticket.price}
                                      onChange={(e) => {
                                        const value = e.target.value;

                                        if (value.startsWith("-")) {
                                          e.target.value = value.replace("-", ""); // Remove negative sign
                                        }

                                        if (!/^\d*\.?\d*$/.test(value)) {
                                          e.target.value = value.replace(/[^\d.]/g, "");
                                        }

                                        // handleInputChange(index, "price", parseFloat(e.target.value));
                                        field.onChange(e);
                                        handlTicketPriceChange(value, index);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Numbers of Tickets */}
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
                                      value={ticket.no}
                                      onWheel={(e: any) => e.target.blur()}
                                      onChange={(e) => {
                                        // handleInputChange(index, "no", parseInt(e.target.value, 10));
                                        field.onChange(e);
                                        handleNoTickets(e.target.value, index);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Ticket start Date and Ticket End Dates */}
                          <div className="flex items-start gap-[24px] w-full common-container mt-[-4px] mb-[24px]">
                            {/* Ticket Start */}
                            <div className="w-full">
                              <ThemeProvider theme={themeMui}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DateTimePicker"]}>
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.ticketstart`}
                                      render={({ field }) => {
                                        const currentDateTime = dayjs();
                                        return (
                                          <FormItem className="relative w-full space-y-0 gradient-slate ps-[12px] rounded-md border border-[#292929] pt-[12px]">
                                            <FormLabel className="text-sm text-gray-500 uppercase pb-[4px] text-[#8f8f8f] ">
                                              Ticket Start Date & Time
                                            </FormLabel>
                                            <FormControl>
                                              {/* <div className="w-full" onClick={toggleDateTimePicker}> Attach click event here */}
                                              <div className="w-full" onClick={() => toggleTicketStartTimePicker(index)}>
                                                {" "}
                                                {/* Attach click event here */}
                                                <StyledDateTimePicker
                                                  //open={ticket.isTicketStartPickerOpen} // Control the open state with local state
                                                  referenceDate={currentDateTime}
                                                  formatDensity="spacious"
                                                  onKeyDown={(e: any) => e.preventDefault()}
                                                  autoOk={false}
                                                  value={ticket.ticketstart ? dayjs(ticket.ticketstart) : null}
                                                  onChange={(e: any) => {
                                                    if (e && e.isValid()) {
                                                      const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                      setTheTicketStartValue(formattedDate, index);
                                                      field.onChange(formattedDate);
                                                      //setIsPickerOpen(false); // Close the picker after selection
                                                      toggleTicketStartTimePicker(index);
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

                            {/* Ticket End */}
                            <div className="w-full">
                              <ThemeProvider theme={themeMui}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DateTimePicker"]}>
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.ticketend`}
                                      render={({ field }) => {
                                        let currentDateTime = dayjs(ticket?.ticketstart || new Date());
                                        currentDateTime = currentDateTime.add(10, "minute");
                                        // const adjustedEventStartTime = dayjs(TicketStartDate).add(10, "minute");

                                        // Default to the current time if the adjusted start time has passed
                                        // const defaultEndTime = dayjs().isAfter(adjustedEventStartTime) ? dayjs() : adjustedEventStartTime;

                                        return (
                                          <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                            <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">
                                              Ticket End Date & Time
                                            </FormLabel>
                                            <FormControl>
                                              <div className=" w-full" onClick={() => toggleTicketEndTimePicker(index)}>
                                                {/* <div className=" w-full" > */}

                                                <StyledDateTimePicker
                                                  //open={ticket.isTicketEndPickerOpen}
                                                  // value={validStartTime}
                                                  formatDensity="spacious"
                                                  // referenceDate={referenceTicketDate}
                                                  referenceDate={currentDateTime}
                                                  // minDate={currentDateTime}
                                                  value={ticket.ticketend ? dayjs(ticket.ticketend) : null}
                                                  onKeyDown={(e: any) => e.preventDefault()}
                                                  onChange={(e: any) => {
                                                    if (e && e.isValid()) {
                                                      const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                      setTheTicketEndValue(formattedDate, index);
                                                      field.onChange(formattedDate);
                                                      // setIsEndDatePickerOpen(false);
                                                      toggleTicketEndTimePicker(index);
                                                    }
                                                  }}
                                                  //  label="Event End Date & Time"
                                                  disablePast
                                                  minDateTime={currentDateTime}
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
                          </div>

                          {/* Event Start Date and Event End Date */}
                          <div className="flex items-start gap-[24px] w-full common-container mt-[-9px] mb-[24px]">
                            {/* Event Start */}
                            <div className="w-full">
                              <ThemeProvider theme={themeMui}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DateTimePicker"]}>
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.eventstart`}
                                      render={({ field }) => {
                                        let currentDateTime = dayjs(ticket?.ticketstart || new Date());
                                        currentDateTime = currentDateTime.add(10, "minute");
                                        // const minStartTime = dayjs(TicketEndDate || new Date());

                                        // const defaultStartTime = field.value ? dayjs(field.value) : minStartTime;

                                        // const validStartTime = defaultStartTime.isBefore(minStartTime) ? minStartTime : defaultStartTime;

                                        // const referenceEventDate = validStartTime.add(10, "minute");

                                        return (
                                          <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                            <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">
                                              Event Start Date & Time
                                            </FormLabel>
                                            <FormControl>
                                              <div className=" w-full" onClick={() => toggleStartEventTimePicker(index)}>
                                                {/* <div className=" w-full"> */}

                                                <StyledDateTimePicker
                                                  // open={ticket.isStartEventPickerOpen}
                                                  //  value={validStartTime}
                                                  value={ticket.eventstart ? dayjs(ticket.eventstart) : null}
                                                  formatDensity="spacious"
                                                  // referenceDate={referenceEventDate}
                                                  referenceDate={currentDateTime}
                                                  onKeyDown={(e: any) => e.preventDefault()}
                                                  onChange={(e: any) => {
                                                    if (e && e.isValid()) {
                                                      const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                      toggleStartEventValue(formattedDate, index);
                                                      field.onChange(formattedDate);
                                                      // setIsStartEventPickerOpen(false);
                                                      toggleStartEventTimePicker(index);
                                                    }
                                                  }}
                                                  disablePast
                                                  minDateTime={currentDateTime}
                                                  //  label="Event End Date & Time"
                                                  // minDateTime={minStartTime}
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

                            {/* Event Ends */}
                            <div className="w-full">
                              <ThemeProvider theme={themeMui}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DemoContainer components={["DateTimePicker"]}>
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.eventend`}
                                      render={({ field }) => {
                                        let currentDateTime = dayjs(ticket?.ticketend || new Date());
                                        currentDateTime = currentDateTime.add(10, "minute");
                                        // const adjustedEventStartTime = dayjs(EventStartTime).add(10, "minute");

                                        // const defaultEndTime = dayjs().isAfter(adjustedEventStartTime) ? dayjs() : adjustedEventStartTime;

                                        return (
                                          <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                            <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">
                                              Event End Date & Time
                                            </FormLabel>
                                            <FormControl>
                                              <div className=" w-full" onClick={() => toggleEndEventTimePicker(index)}>
                                                <StyledDateTimePicker
                                                  // open={ticket.isEndEventPickerOpen}
                                                  // referenceDate={defaultEndTime}
                                                  referenceDate={currentDateTime}
                                                  value={ticket.eventend ? dayjs(ticket.eventend) : null}
                                                  formatDensity="spacious"
                                                  onKeyDown={(e: any) => e.preventDefault()}
                                                  onChange={(e: any) => {
                                                    if (e && e.isValid()) {
                                                      const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                                      toggleEndEventValue(formattedDate, index);
                                                      field.onChange(formattedDate);
                                                      console.log("my ened time", formattedDate);
                                                      // setIsEndEventPickerOpen(false);
                                                      toggleEndEventTimePicker(index);
                                                      console.log("my ened time", formattedDate);
                                                    }
                                                  }}
                                                  disablePast
                                                  minDateTime={currentDateTime}
                                                  //  label="Event End Date & Time"
                                                  // minDateTime={dayjs("2024-10-15T08:30")}
                                                  // minDateTime={adjustedEventStartTime}
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
                          </div>

                          {/* What's Included Inputs */}
                          <div className="flex items-start gap-[24px] w-full common-container mb-[24px]">
                            <div className="pb-[16px]  w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                              <div className="flex items-center justify-between" onClick={() => handleDropdown(index)}>
                                <p className="text-sm text-[#8F8F8F] uppercase">WHAT'S INCLUDED</p>
                                <Image src={ticket.optionDropDown ? arrowup : arrowdown} width={11} height={11} alt="arrow" />
                              </div>
                              {ticket.optionDropDown && (
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
                                          className={ticket?.options?.some((o: any) => o?.id === option?.id) ? "filtergreen" : ""}
                                        />
                                        <p
                                          className={`text-[16px] font-normal items-center ${
                                            ticket?.options?.some((o: any) => o?.id === option?.id) ? "text-[#00d059]" : "text-[#FFFFFF]"
                                          }`}
                                        >
                                          {option.label}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="column-separator"></div> <div className="column-separator"></div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Manual Enmails and Manual Password Section */}
                          <div className="flex gap-[24px] w-full common-container">
                            {/* Private Emails Adding Fields */}
                            {ticket?.emailmanual?.length > 0 && (
                              <div className="w-full relative rounded-md border border-[#292929] gradient-slate flex flex-col items-start common-container px-[12px] py-[16px] mb-[24px]">
                                <p className="text-sm font-bold text-[#8F8F8F] pb-[10px] uppercase">Manual Emails</p>

                                <div ref={manualEmailRef} className="w-full flex-col flex gap-y-0 max-h-[230px] overflow-y-auto mb-2">
                                  {ticket.emailmanual.map((email: string, e_Index: number) => {
                                    return (
                                      <FormField
                                        control={form.control}
                                        name={`tickets.${index}.emailmanual.${e_Index}`}
                                        render={({ field }) => (
                                          <FormItem className="relative w-full space-y-0 input-custom-container ">
                                            <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">
                                              Email {e_Index + 1}
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                onWheel={(e: any) => e.target.blur()}
                                                placeholder={`Enter Email ${e_Index + 1}`}
                                                className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                                {...field}
                                                value={email}
                                                onChange={(e) => {
                                                  const value = e.target.value;

                                                  if (value.startsWith(" ")) {
                                                    return;
                                                  }
                                                  field.onChange(e);
                                                  handleManualEnmailValues(index, e_Index, value);
                                                }}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    );
                                  })}
                                </div>

                                {/* Add Aditional field Button */}
                                <div className="flex justify-end items-center ticket-btn">
                                  <Button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      addManualEmailField(index);
                                    }}
                                    style={{
                                      background:
                                        "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                                    }}
                                    className="flex items-center justify-between bg-[#0F0F0F] text-[#00D059] h-[32px] py-[8px] px-[12px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"
                                    // onClick={handleAddTicketType}
                                  >
                                    <Image src={addicon} alt="Add-icon" height={12} width={12} />
                                    Additional Field
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Manual Password Adding Fields */}
                            {ticket?.pswrdmanual?.length > 0 && (
                              <div className="w-full relative rounded-md border border-[#292929] gradient-slate flex flex-col items-start common-container px-[12px] py-[16px] mb-[24px]">
                                <p className="text-sm font-bold text-[#8F8F8F] pb-[10px] uppercase">Manual Passwords</p>

                                <div ref={manualPswrdRef} className="w-full flex-col flex gap-x-[24px] max-h-[230px] overflow-y-auto mb-2">
                                  {ticket.pswrdmanual.map((pswrd: string, p_Index: number) => {
                                    return (
                                      <FormField
                                        control={form.control}
                                        name={`tickets.${index}.pswrdmanual.${p_Index}`}
                                        render={({ field }) => (
                                          <FormItem className="relative w-full space-y-0 input-custom-container">
                                            <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">
                                              Password {p_Index + 1}
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                onWheel={(e: any) => e.target.blur()}
                                                placeholder={`Enter Password ${p_Index + 1}`}
                                                className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                                {...field}
                                                value={pswrd}
                                                onChange={(e) => {
                                                  const value = e.target.value;

                                                  if (value.startsWith(" ")) {
                                                    return;
                                                  }
                                                  field.onChange(e);
                                                  handleManualPswrdInput(index, p_Index, value);
                                                }}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    );
                                  })}
                                </div>

                                {/* Add Aditional field Button */}
                                <div className="flex justify-end items-center ticket-btn">
                                  <Button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      addManualPasswrdField(index);
                                    }}
                                    style={{
                                      background:
                                        "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                                    }}
                                    className="flex items-center justify-between bg-[#0F0F0F] text-[#00D059] h-[32px] py-[8px] px-[12px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"
                                    // onClick={handleAddTicketType}
                                  >
                                    <Image src={addicon} alt="Add-icon" height={12} width={12} />
                                    Additional Field
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Auto Generated password Fields */}
                          {ticket?.autoGeneratedPswrd?.length > 0 && (
                            <div className="w-full relative rounded-md border border-[#292929] gradient-slate flex flex-col items-start common-container px-[12px] py-[16px] mb-[24px]">
                              <p className="text-sm font-bold text-[#8F8F8F] pb-[10px] uppercase">Automatic Generated Passwords</p>

                              <div ref={autoPswrdRef} className="w-full flex-col flex gap-x-[24px] gap-y-0 max-h-[230px] overflow-y-auto mb-2">
                                {ticket.autoGeneratedPswrd.map((autoPswrd: string, ag_Index: number) => {
                                  return (
                                    <FormField
                                      control={form.control}
                                      name={`tickets.${index}.autoGeneratedPswrd.${ag_Index}`}
                                      render={({ field }) => (
                                        <FormItem className="relative w-full space-y-0 input-custom-container">
                                          <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">
                                            password {ag_Index + 1}
                                          </FormLabel>

                                          <FormControl>
                                            <Input
                                              onWheel={(e: any) => e.target.blur()}
                                              placeholder={autoPswrd}
                                              className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                              {...field}
                                              value={autoPswrd}
                                              onChange={(e) => {
                                                const value = e.target.value;

                                                if (value.startsWith(" ")) {
                                                  return;
                                                }
                                                field.onChange(e);

                                                return;
                                              }}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  );
                                })}
                              </div>

                              {/* Add Aditional field Button */}
                              <div className="flex justify-end items-center ticket-btn">
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    generateAutoPassword(index);
                                  }}
                                  style={{
                                    background:
                                      "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                                  }}
                                  className="flex items-center justify-between bg-[#0F0F0F] text-[#00D059] h-[32px] py-[8px] px-[12px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"
                                  // onClick={handleAddTicketType}
                                >
                                  <Image src={addicon} alt="Add-icon" height={12} width={12} />
                                  Additional Field
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Buttons to select add csv or manual Emails */}
                          <div className="w-full flex flex-col gap-[24px]">
                            <div className="flex flex-wrap justify-center md:justify-start  gap-[16px] md:gap-[24px]">
                              {/* Add manual Email */}
                              {ticket?.emailmanual?.length === 0 && (
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    addManualEmailField(index);
                                  }}
                                  style={{
                                    background: "#FFFFFF0F",
                                  }}
                                  className="flex items-center justify-between bg-[#FFFFFF0F] text-white h-[32px] py-[8px] px-[12px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold w-fit"
                                  // onClick={handleAddTicketType}
                                >
                                  <Image src={whiteaddicon} alt="Add-icon" height={12} width={12} />
                                  Add Emails manually
                                </Button>
                              )}

                              {/* Add manual Email By CSV */}
                              <label
                                style={{
                                  background: "#FFFFFF0F",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: "5px",
                                  backgroundColor: "#0F0F0F",
                                  color: "white",
                                  height: "32px",
                                  padding: "8px 12px",
                                  borderRadius: "9999px",
                                  border: "0.86px solid transparent",
                                  fontSize: "11px",
                                  fontWeight: "800",
                                  cursor: "pointer",
                                  width: "fit-content",
                                }}
                              >
                                <Image src={addicon} alt="Add-icon" height={12} width={12} />
                                Upload CSV (emails)
                                {/* Hidden file input */}
                                <input
                                  type="file"
                                  accept=".csv"
                                  onChange={(e) => handleCSVFileChange(e, index)}
                                  style={{
                                    display: "none", // Hide the default file input button
                                  }}
                                />
                              </label>
                            </div>

                            <div className="flex justify-center md:justify-start flex-wrap gap-[16px] md:gap-[24px]">
                              {/* Add manual password */}
                              {ticket?.pswrdmanual?.length === 0 && (
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    addManualPasswrdField(index);
                                  }}
                                  style={{
                                    background: "#FFFFFF0F",
                                  }}
                                  className="flex items-center justify-between bg-[#FFFFFF0F] text-white h-[32px] py-[8px] px-[12px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold w-fit"
                                  // onClick={handleAddTicketType}
                                >
                                  <Image src={whiteaddicon} alt="Add-icon" height={12} width={12} />
                                  Add Password Manually
                                </Button>
                              )}

                              {/* Add Auto generated password */}
                              {ticket?.autoGeneratedPswrd?.length === 0 && (
                                <Button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    generateAutoPassword(index);
                                  }}
                                  style={{
                                    background: "#FFFFFF0F",
                                  }}
                                  className="flex items-center justify-between bg-[#0F0F0F] text-white h-[32px] py-[8px] px-[12px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold w-fit"
                                  // onClick={handleAddTicketType}
                                >
                                  <Image src={whiteaddicon} alt="Add-icon" height={12} width={12} />
                                  Generate Password Automatically
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Delete Ticket Type */}
                          {index !== 0 && (
                            <div className="flex justify-end items-center mt-[29px] ticket-btn">
                              <Button
                                className=" bg-[#FF1717B2] text-white font-bold h-[32px] py-[8px] px-[12px] gap-[8px] flex items-center justify-between rounded-[100px] text-[11px]"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeleteTicketType(index);
                                }}
                              >
                                <Image src={deleteicon} alt="delete-icon" height={12} width={12} />
                                Delete Ticket Type
                              </Button>
                            </div>
                          )}
                        </div>
                      )
                    )}

                    {/* Add more ticket Button */}
                    <div className="flex justify-end items-center ticket-btn">
                      <Button
                        style={{
                          background:
                            "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                        }}
                        className="flex items-center justify-between bg-[#0F0F0F] text-[#00D059] py-[10px] px-[22px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[16px] font-extrabold leading-[24px]"
                        onClick={handleAddTicketType}
                      >
                        <Image src={addicon} alt="Add-icon" height={13} width={13} />
                        Add Ticket Type
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Error Section on having any error related to load data */}
                <div className="flex justify-center items-center mt-[12px] ">
                  {Object.keys(form.formState.errors)?.length > 0 && (
                    <div className="mt-[12px] text-red-500">
                      {Object.values(form.formState.errors).map((error: any, index: number) => (
                        <p key={index} className="text-sm">
                          {error.message}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Ticket 4orth Section */}
                <div>
                  {/* Social headers */}
                  <div className="px-[24px] py-[16px] relative create-container mt-[32px]">
                    <div className="flex justify-between">
                      <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
                        {" "}
                        Social <span className="text-primary">Details</span>
                      </h1>
                    </div>

                    <Image src={ufo} width={350} height={350} className="absolute right-[0] bottom-0" alt="ufo" />
                  </div>
                  {/* Social Body */}
                  <div className="gradient-slate w-full pt-[32px] pb-[88px] px-[60px]  create-container-head">
                    <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full common-container">
                      <FormField
                        control={form.control}
                        name="fburl"
                        render={({ field }) => (
                          <FormItem className="relative w-full">
                            <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Facebook</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter URL"
                                className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
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
                                className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
                                {...field}
                                // onChange={(e) => {
                                //   setInstaUrl(e.target.value);
                                //   field.onChange(e);
                                // }}

                                onChange={(e) => {
                                  const value = e.target.value;

                                  if (value.startsWith("https://www.instagram.com/")) {
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
                        name="twitterurl"
                        render={({ field }) => (
                          <FormItem className="relative w-full">
                            <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Twitter</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter URL"
                                className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                                {...field}
                                // onChange={(e) => {
                                //   setTwitterUrl(e.target.value);
                                //   field.onChange(e);
                                // }}
                                onChange={(e) => {
                                  const value = e.target.value;

                                  if (value.startsWith("https://www.x.com/")) {
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
                      <FormField
                        control={form.control}
                        name="youtubeurl"
                        render={({ field }) => (
                          <FormItem className="relative w-full">
                            <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Youtube</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter URL"
                                className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
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
                                className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
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
                                className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
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
                    <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] md:w-[49%] w-full mt-[24px] common-container ">
                      <FormField
                        control={form.control}
                        name="telegramurl"
                        render={({ field }) => (
                          <FormItem className="relative w-full">
                            <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Telegram</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter URL"
                                className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                                {...field}
                                // onChange={(e) => {
                                //   setTwitterUrl(e.target.value);
                                //   field.onChange(e);
                                // }}
                                onChange={(e) => {
                                  const value = e.target.value;

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
                    </div>
                  </div>
                </div>

                {/* Action/Submit Button */}
                <div className="flex items-center justify-end lg:gap-[20px] gap-[12px] lg:flex-nowrap md:flex-nowrap wrap-btns mt-[36px]">
                  <div className="flex justify-end items-center mt-[36px] edit-btn">
                    <Button
                      type="submit"
                      disabled={!isCategorySelected}
                      className=" flex  justify-center items-center font-bold py-[12px] px-[68px] rounded-[200px]  font-extrabold h-[52px] edit-btn"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Editevent;
