"use client";
import React from "react";
import deleteicon from "@/assets/Wallet/delete-icon.svg";
import LocationAutocomplete from "../create-event/Locationinput";
import EventSubmmitModal from "@/components/EventSubmmitModal/EventSubmmitModal";
import whitefree from "@/assets/Wallet/white free.svg";
import greenfree from "@/assets/Wallet/Green free.svg";
import Editor from "../reusable-components/Editor";
// import "./CreateEvent.css";
import "@/components/create-event/CreateEvent.css";
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
import WalletChooseModal from "@/components/Walletchoose/WalletChooseModal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useSearchParams } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SuccessToast, ErrorToast } from "../reusable-components/Toaster/Toaster";
import { useForm } from "react-hook-form";
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
import Receviepayment from "../popups/receviepayment/Receviepayment";

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
import { addHours } from "date-fns";
import { root } from "postcss";
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

const formSchema = z.object({
  eventname: z.string().min(1, { message: "Event name cannot be empty." }),

  eventcategory: z.object({
    label: z.string().min(1, { message: "Category cannot be empty" }),
  }),

  eventHashtags: z
    .array(
      z.string().min(2, { message: "Hashtag must be at least 2 characters" }) // Keep the minimum length requirement
    )
    .min(1, { message: "At least one hashtag is required" }),

  eventlocation: z.string().min(1, { message: "Event location cannot be empty." }),
  eventstartdate: z.string().min(1, { message: "Event start date cannot be empty." }),
  eventenddate: z.string().min(1, { message: "Event end date cannot be empty." }),

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
  telegramurl: z.string().url({ message: "Invalid Telegram URL." }).min(1, { message: "Telegram URL cannot be empty." }),
  twitterurl: z.string().url({ message: "Invalid Twitter URL." }).min(1, { message: "Twitter URL cannot be empty." }),
  eventmainimg: z.string().optional(),

  eventcoverimg: z.string().nonempty({ message: "Image URL cannot be empty." }),

  // tickets: z.array(
  //   z.object({
  //     type: z.string().min(1, { message: "Ticket type cannot be empty." }),
  //     price: z.any(),
  //     no: z.any(),
  //     options: z
  //       .array(
  //         z.object({
  //           id: z.number(),
  //           label: z.string(),
  //         })
  //       )
  //       .optional(),
  //   })
  // ),
  // tickets: z.array(
  //   z.object({
  //     type: z.string().min(1, { message: "Ticket type cannot be empty." }),
  //     price: z.union([z.string(), z.number()]).optional(),
  //     no: z.string().min(1, { message: "Number of tickets must be greater than 0." }),
  //     selected: z.string().optional(),
  //   }).refine((data) => {

  //     if (data.selected === "paid") {
  //       const priceIsValid =
  //         data.price !== undefined &&
  //         ((typeof data.price === "string" && data.price.trim() !== "") ||
  //         (typeof data.price === "number" && data.price > 0));

  //       return priceIsValid;
  //     }
  //     return true;
  //   }, {
  //     message: "Price is required.",
  //     path: ['price'],
  //   })
  // ),

  tickets: z.array(
    z
      .object({
        type: z.string().min(1, { message: "Ticket type cannot be empty." }),
        price: z.union([z.string(), z.number()]).optional(), // Price can be a string or number
        no: z.union([z.string().transform((val) => parseFloat(val)), z.number()]).refine((val) => !isNaN(val) && val > 0, {
          message: "Number of tickets must be greater than 0.",
          path: ["no"],
        }),
        selected: z.string().optional(),
      })
      .refine(
        (data) => {
          // Check if the price is required based on the selected property
          if (data.selected === "paid") {
            const priceIsValid =
              data.price !== undefined &&
              ((typeof data.price === "string" && data.price.trim() !== "" && parseFloat(data.price) > 0) ||
                (typeof data.price === "number" && data.price > 0));

            return priceIsValid; // Validate if price is provided correctly and greater than 0
          }
          return true; // Otherwise, it passes validation
        },
        {
          message: "Price required and must be greater than 0.",
          path: ["price"], // Specify the path for the error
        }
      )
  ),

  // .refine((tickets) => tickets.length > 0, {
  //   message: "At least one ticket is required.",
  // }),
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

type GalleryFile = { type: "image" | "video"; url: string } | File;

interface EventData {
  eventmedia?: any[];
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
          display: "none",
          color: "#ffffff", // Color for unselected tabs
        },
        selected: {
          display: "none",
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
  }
  & .MuiOutlinedInput-notchedOutline {
    border: none;
    color: #ffffff;
  }
  & .MuiClockNumber-root {
    color: #ffffff;
  }
`;

function EditeventOnBack() {
  const theme = useTheme();

  function MuiIcon() {
    return <Image src={calendaricon} alt="Date picker opening icon" width={20} className="opacity-90" />;
  }
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

  const handleLocationSelect = (location: any) => {
    setEventLocation(location);
  };
  const [TicketStartDate, setTicketStartDate] = useState("");
  const [TicketEndDate, setTicketEndDate] = useState("");

  const [EventStartTime, setEventStartTime] = useState("");
  const [EventEndTime, setEventEndTime] = useState("");

  console.log("my event start date is", EventStartTime);
  console.log("my ticket start date is", TicketStartDate);

  console.log("my event enddate is", EventEndTime);
  console.log("my ticket endd date is", TicketEndDate);

  const [Eventdescription, setEventdescription] = useState("");

  const [CompTicketNo, setCompTicketNo] = useState("");
  const [MainImg, setMainImg] = useState("");
  const [MainImgName, setMainImgName] = useState<any>("");

  const [CoverImg, setCoverImg] = useState("");
  const [CoverImgName, setCoverImgName] = useState<any>("");

  const [Eventdata, setEventData] = useState<any | null>(null);

  const [FBUrl, setFBUrl] = useState<any>("");
  const [InstaUrl, setInstaUrl] = useState<any>("");
  const [TwitterUrl, setTwitterUrl] = useState<any>("");
  const [TelegramUrl, setTelegramUrl] = useState<any>("");
  const [YoutubeUrl, setYoutubeUrl] = useState<any>("");

  const [tiktokUrl, settiktokUrl] = useState<any>("");
  const [linkedinUrl, setlinkedinUrl] = useState<any>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("eventData");

      if (storedData) {
        try {
          // Parse the JSON data from localStorage
          const parsedData: any = JSON.parse(storedData);
          console.log("Type of parsed data is ======> ", parsedData?.eventHashtags);
          setCategoryTypes({ label: parsedData?.eventcategory });
          setChoosenHashtags(parsedData?.eventHashtags);
          setSelected(parsedData?.isFree ? "free" : "paid");
          setTagsParsedData(parsedData?.eventHashtags);
          setEventData(parsedData);
          setFBUrl(parsedData?.fburl || "https://www.facebook.com/");
          setInstaUrl(parsedData?.insturl || "https://instagram.com/");
          setTwitterUrl(parsedData?.twitterurl || "https://www.x.com/");
          setlinkedinUrl(parsedData?.linkedinurl || "https://linkedin.com/in/");
          setTelegramUrl(parsedData?.telegramurl || "https://t.me/");
          setYoutubeUrl(parsedData?.youtubeurl || "https://www.youtube.com/");
          settiktokUrl(parsedData?.tiktokurl || "https://www.tiktok.com/@");

          console.log("my parsedd data", parsedData);
        } catch (error) {
          console.error("Error parsing event data from localStorage:", error);
          setEventData(null); // Reset state in case of an error
        }
      } else {
        setEventData(null); // No data found in localStorage
      }
    }
  }, []);

  const [eventsFiles, setEventsFile] = useState<any>([]);
  console.log("iside eventalldata", eventAllData);
  const router = useRouter();

  // const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
  //   { type: "", price: 0, no: 0, options: [], dropdown: true },
  // ]);
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
  const [categoryTypes, setCategoryTypes] = useState<{ label: string } | null>(null);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const isCategorySelected = categoryTypes && categoryTypes.label !== "";

  const [categoryAlert, setCategoryAlert] = useState<any>(false);

  const [chooseHashTags, setChoosenHashtags] = useState<any>([]);
  const [filterHash, setFilterHash] = useState<any>([]);
  const [hashINputValue, setHashTagValue] = useState<string>("");

  const [isCustomCatgory, setIsCustomCategory] = useState<boolean>(false);
  const [customCategotyInput, setCustomCatgoryInput] = useState<string>("");

  const [tagsParsedData, setTagsParsedData] = useState<any>([]);

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

  // const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<GalleryFile[]>([]);

  const [eventID, setEventId] = useState("");
  const searchParams = useSearchParams();
  const [isWalletModalOpen, setisWalletModalOpen] = useState(false);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  useEffect(() => {
    const currentUrl: any = typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventId(value);
    console.log("my event id is", value);
    dispatch(getEventByEventId(value));
  }, []);

  const EventData = useAppSelector((state) => state?.getEventByEventID?.eventIdEvents?.data);

  console.log("my event data ", EventData);

  const [selected, setSelected] = useState<SelectedOption>(Eventdata?.isFree ? "free" : "paid");

  const imageUrl = Eventdata?.eventcoverimg.startsWith("http") || Eventdata?.eventcoverimg.startsWith("https") ? Eventdata?.eventcoverimg : bgframe;
  console.log("image src is", imageUrl);
  const userLoading = useAppSelector((state) => state?.getEventByEventID);
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
  // const handleDeleteTicketType = (index: number) => {
  //   if (index === 0) {
  //     return;
  //   }
  //   const updatedTicketTypes = ticketTypes.filter((_, i) => i !== index);
  //   setTicketTypes(updatedTicketTypes);
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
      eventstartdate: "",
      eventenddate: "",

      eventstarttime: "",
      eventendtime: "",
      eventmainimg: "",
      eventcoverimg: "",
      eventdescription: "",

      fburl: "",
      instaurl: "",
      youtubeurl: "",
      telegramurl: "",
      twitterurl: "",
      tiktokurl: "",
      linkedinurl: "",

      tickets: [],
    },
  });

  // useEffect(() => {
  //   const eventDataParam = searchParams.get("eventData");
  //   console.log("my data not stringfy", eventDataParam);
  //   if (eventDataParam) {
  //     try {
  //       const decodedData = decodeURIComponent(eventDataParam);
  //       const parsedData = JSON.parse(decodedData);
  //       setEventData(parsedData);

  //       console.log("Parsed Event Datas:", parsedData);
  //     } catch (error) {
  //       console.error("Failed to decode and parse event data", error);
  //     }
  //   }
  // }, [searchParams]);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const filesArray = Array.from(event.target.files);
  //     setGalleryFiles((prevFiles) => [...prevFiles, ...filesArray]); // Update state with all selected files
  //     console.log("Gallery files:", [...galleryFiles, ...filesArray]);
  //   }
  // };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      setGalleryFiles((prevFiles) => {
        // Check the total number of files after adding new ones
        const totalFiles = prevFiles.length + filesArray.length;

        // If adding new files would exceed 10, limit the number of files added
        if (totalFiles > 10) {
          const remainingSlots = 10 - prevFiles.length;
          const limitedFilesArray = filesArray.slice(0, remainingSlots);

          console.log("You can only upload 10 media files.");
          ErrorToast("You can only select 10 media items");

          return [...prevFiles, ...limitedFilesArray];
        }

        return [...prevFiles, ...filesArray];
      });
    }
  };
  const handleCatDropdownToggle = () => {
    setIsCatDropdownOpen((prev) => !prev);
  };
  // const handleCateOptionToggle = (option: any) => {
  //   setCategoryTypes((prev: any) =>
  //     prev.some((o: any) => o.label === option.label)
  //       ? prev.filter((o: any) => o.label !== option.label)
  //       : [...prev, option]
  //   );
  // };

  // const handleCateOptionToggle = (option: any) => {
  //   setCategoryTypes((prev: any) =>
  //     prev.includes(option.label)
  //       ? prev.filter((category: any) => category !== option.label)
  //       : [...prev, option.label]
  //   );
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

        const requiredSize = 1080;
        if (width !== requiredSize || height !== requiredSize) {
          setLoader(false);
          // ErrorToast(`Image must be ${requiredSize}px x ${requiredSize}px.`);
          ErrorToast(` Upload an image with at least ${requiredSize} x ${requiredSize} pixels for better quality.`);

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

  const getColumnClass = (index: any) => {
    if (index < 7) return "col-span-1"; // 1-7 in the first column
    if (index < 14) return "col-span-2"; // 8-14 in the second column
    return "col-span-3"; // Remaining items in the third column
  };
  // const removeImage = (index: number) => {
  //   setGalleryFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  // };
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

  //   setGalleryFiles((prevFiles) => {
  //     // Get the URL of the file being removed
  //     const fileToRemove = prevFiles[index];
  //     if (fileToRemove && fileToRemove?.url) {
  //       // Revoke the object URL to avoid memory leaks
  //       URL.revokeObjectURL(fileToRemove?.url);
  //     }

  //     // Return a new array excluding the removed file
  //     return prevFiles.filter((_, i) => i !== index);
  //   });
  // };

  // const removeImage = (index: number) => {
  //   setGalleryFiles(prevFiles => {
  //     const updatedFiles = prevFiles.filter((_, i) => i !== index);
  //     return updatedFiles;
  //   });
  // };
  const handleFormSubmit = (event: any, actionTypes: any) => {
    event.preventDefault();

    if (actionTypes === "preview") {
      form.handleSubmit(handlePreviewClick)(event);
    } else if (actionTypes === "create") {
      form.handleSubmit(EventCreation)(event);
    }
  };

  useEffect(() => {
    const userID = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserid(userID);
    console.log("user ID logged in is", userID);
  }, []);

  const filteredTicketTypes = ticketTypes?.map((ticket) => ({
    type: ticket?.type,
    price: ticket.selected === "free" ? "0" : ticket.price,
    no: ticket?.no,
    selected: ticket.selected,

    options: ticket?.options?.map((option) => ({
      id: option?.id,
      label: option?.label,
    })),
  }));

  const handleOptionChange = (index: number, type: string) => {
    setTicketTypes((prevTickets) => {
      const updatedTickets = prevTickets.map((ticket, i) =>
        i === index
          ? { ...ticket, selected: type } // Update the selected type (free/paid)
          : ticket
      );

      // Update form values for the tickets
      updatedTickets.forEach((ticket, i) => {
        form.setValue(`tickets.${i}.selected`, ticket.selected); // Update the selected value in form
      });

      return updatedTickets; // Return the updated tickets
    });
  };

  async function EventCreation(values: z.infer<typeof formSchema>) {
    setLoader(true);

    const EventMediaAlready = [...(Eventdata?.eventmedia || [])];
    const imagesOfGallery = await handleFileChangeapi();
    console.log("images of gallery", imagesOfGallery, EventMediaAlready);

    const updatedEventMedia = [...EventMediaAlready, ...imagesOfGallery].filter((media) => !removedImages.includes(media));
    console.log("images updated", updatedEventMedia);

    const utcEventStartTime = EventStartTime ? convertToUTC(EventStartTime) : Eventdata?.eventstarttime;
    const utcEventEndTime = EventEndTime ? convertToUTC(EventEndTime) : Eventdata?.eventendtime;
    const utcTicketStartTime = TicketStartDate ? convertToUTC(TicketStartDate) : Eventdata?.eventstartdate;
    const utcTicketEndTime = TicketEndDate ? convertToUTC(TicketEndDate) : Eventdata?.eventenddate;

    const updatedCategoryTypes = categoryTypes;
    const eventhashtags = chooseHashTags;

    const updatedValues = {
      ...values,
      eventmedia: updatedEventMedia,
      ticketsdata: filteredTicketTypes,
      eventcategory: updatedCategoryTypes,
      // eventtags: eventhashtags,

      // utcEventStartTime: EventStartTime,
      utcEventEndTime: EventEndTime,

      eventstartdate: utcTicketStartTime,
      eventenddate: utcTicketEndTime,

      eventstarttime: utcEventStartTime,
      eventendtime: utcEventEndTime,

      // utcEventStartTime: utcEventStartTime,
      // utcEventEndtime: utcEventEndTime,

      // utcTicketStartTime: utcTicketStartTime,
      // utcTicketEndTime: utcTicketEndTime,

      // eventmedia: updatedEventMedia,
      // ticketsdata: filteredTicketTypes,

      // eventcategory: selectedCategories,
      // eventstartdate: utcTicketStartTime,
      // eventenddate: utcTicketEndTime,

      // eventstarttime: utcEventStartTime,
      // eventendtime: utcEventEndTime,

      // utcEventStartTime: utcEventStartTime,
      // utcEventEndtime: utcEventEndTime,

      // utcTicketStartTime: utcTicketStartTime,
      // utcTicketEndTime: utcTicketEndTime,
    };

    setEventAllData(updatedValues);
    console.log("my updated values", updatedValues);
    const ticketsWithCheckedOptions = Eventdata?.ticketsdata?.map((ticket: any) => ({
      ...ticket,
      options: ticket?.options?.map((option: any) => ({
        ...option,
        checked: ticket?.options.some((o: any) => o?.id === option?.id), // Ensure checked options are marked
      })),
    }));

    setTicketTypes(ticketsWithCheckedOptions);
    const isFree = ticketTypes.every((ticket) => ticket.selected === "free");
    try {
      const data = {
        userId: userid,
        isFree: Eventdata?.isFree || isFree,
        name: Eventname || Eventdata?.eventname,
        category: [updatedCategoryTypes?.label],
        hashtags: chooseHashTags,
        eventDescription: Eventdescription || Eventdata?.eventdescription,
        location: EventLocation || Eventdata?.eventlocation,
        ticketStartDate: utcTicketStartTime,
        ticketEndDate: utcTicketEndTime,
        startTime: utcEventStartTime,
        endTime: utcEventEndTime,
        // mainEventImage: eventData?.eventmainimg,
        coverEventImage: CoverImg || Eventdata?.eventcoverimg,
        tickets: filteredTicketTypes || Eventdata?.ticketsdata || "",
        totalComplemantaryTickets: 0,
        fbUrl: FBUrl || "",
        instaUrl: InstaUrl || "",
        youtubeUrl: YoutubeUrl || "",
        twitterUrl: TwitterUrl || "",
        telegramUrl: TelegramUrl || "",
        tiktokUrl: tiktokUrl || "",
        linkedinUrl: linkedinUrl || "",
        eventmedia: updatedEventMedia,
      };
      console.log("my data", InstaUrl);
      console.log("my datas", Eventdata?.instaurl);
      console.log("my data full", data);

      dispatch(createevent(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);

          setisWalletModalOpen(true);
          localStorage.removeItem("eventData");
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
  async function handlePreviewClick(values: z.infer<typeof formSchema>) {
    console.log("New Preview Tags are as======> ", chooseHashTags);
    // setLoader(true);
    // setisWalletModalOpen(false);
    const EventMediaAlready = [...(Eventdata?.eventmedia || [])];
    const imagesOfGallery = await handleFileChangeapi();
    console.log("images of gallery", imagesOfGallery, EventMediaAlready);

    const updatedEventMedia = [...EventMediaAlready, ...imagesOfGallery].filter((media) => !removedImages.includes(media));
    console.log("images updated", updatedEventMedia);
    // const updatedEventMedia = EventMediaAlready.concat(imagesOfGallery);

    console.log("images updated", updatedEventMedia);
    const utcEventStartTime = EventStartTime ? convertToUTC(EventStartTime) : Eventdata?.eventstarttime;
    const utcEventEndTime = EventEndTime ? convertToUTC(EventEndTime) : Eventdata?.eventendtime;
    const utcTicketStartTime = TicketStartDate ? convertToUTC(TicketStartDate) : Eventdata?.eventstartdate;
    const utcTicketEndTime = TicketEndDate ? convertToUTC(TicketEndDate) : Eventdata?.eventenddate;

    // const updatedCategoryTypes = Eventdata?.eventcategory.map(
    //   (category: string, index: number) => ({
    //     label: category,
    //   })
    // );
    // setCategoryTypes(updatedCategoryTypes);
    const isFree = ticketTypes.every((ticket) => ticket.selected === "free");

    const updatedCategoryTypes = categoryTypes;
    const eventhashtags = chooseHashTags;
    const updatedValues = {
      ...values,
      isFree: isFree,
      eventmedia: updatedEventMedia,
      ticketsdata: filteredTicketTypes,
      eventcategory: updatedCategoryTypes?.label,
      // eventtags: eventhashtags,

      // utcEventStartTime: EventStartTime,
      utcEventEndTime: EventEndTime,

      eventstartdate: utcTicketStartTime,
      eventenddate: utcTicketEndTime,

      eventstarttime: utcEventStartTime,
      eventendtime: utcEventEndTime,
    };

    setEventAllData(updatedValues);
    console.log("my updated", updatedValues);
    if (updatedValues !== null) {
      localStorage.setItem("eventData", JSON.stringify(updatedValues));
      router.push("/preview-event");
    } else {
      console.log("error");
    }
  }
  console.log("Form errors:", form.formState.errors);
  function convertToLocalTimestamp(localDateTime: string): string {
    // Create a Date object from the local date-time string
    const localDate = new Date(localDateTime);

    // If the input string is in a known format, ensure we are getting the correct local time
    if (isNaN(localDate.getTime())) {
      throw new Error("Invalid date format");
    }

    // Extract local time components
    const localYear = localDate.getFullYear();
    const localMonth = localDate.getMonth() + 1; // Months are 0-indexed
    const localDateNum = localDate.getDate();
    const localHours = localDate.getHours();
    const localMinutes = localDate.getMinutes();

    // Format the components to match the 'yyyy-MM-ddTHH:mm' format
    const formattedLocal = `${localYear}-${String(localMonth).padStart(2, "0")}-${String(localDateNum).padStart(2, "0")}T${String(
      localHours
    ).padStart(2, "0")}:${String(localMinutes).padStart(2, "0")}`;

    return formattedLocal;
  }

  function convertUTCToLocalTime(datess: any) {
    const utcDateStr = "2024-10-02T08:00"; // Initial date string without seconds and Z

    // Add ":00" for seconds and "Z" to indicate UTC time
    const utcDateWithSeconds = `${datess}:00Z`;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(utcDateStr, datess, "this is timestamp");

    // Create a Date object from the UTC date string
    const utcDate = new Date(utcDateWithSeconds);

    // Convert to local time zone
    const localDateStr = utcDate.toLocaleString("en-GB", {
      timeZone: timeZone,
      hour12: false,
    });

    // Extract the date and time parts from the localDateStr
    const [date, time] = localDateStr.split(", ");

    // Convert the date from 'DD/MM/YYYY' to 'YYYY-MM-DD'
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;

    // Extract the hours and minutes from the time
    const [hours, minutes] = time.split(":");

    // Return the final string in 'YYYY-MM-DDTHH:MM' format
    console.log("this is is", `${formattedDate}T${hours}:${minutes}`);
    return `${formattedDate}T${hours}:${minutes}`;
  }

  useEffect(() => {
    if (EventData || Eventdata) {
      if (Eventdata?.eventmainimg) {
        const imageName = Eventdata?.eventmainimg.split("/").pop() || "Upload Image";
        setMainImgName(imageName);
      }

      if (Eventdata?.eventmedia) {
        const files = Eventdata?.eventmedia
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
      let ticketsWithCheckedOptions;

      if (Eventdata?.isFree == true && selected === "free") {
        console.log("comming in  if");

        ticketsWithCheckedOptions = Eventdata?.ticketsdata?.map((ticket: any) => ({
          ...ticket,
          options: ticket?.options?.map((option: any) => ({
            ...option,
            checked: ticket?.options.some((o: any) => o?.id === option?.id), // Ensure checked options are marked
          })),
        }));

        setTicketTypes(ticketsWithCheckedOptions);
      } else if (Eventdata?.isFree == false && selected === "paid") {
        console.log("comming in else if");
        ticketsWithCheckedOptions = Eventdata?.ticketsdata?.map((ticket: any) => ({
          ...ticket,
          options: ticket?.options?.map((option: any) => ({
            ...option,
            checked: ticket?.options.some((o: any) => o?.id === option?.id), // Ensure checked options are marked
          })),
        }));

        setTicketTypes(ticketsWithCheckedOptions);
      } else {
        console.log("comming in else");
        setTicketTypes([
          {
            type: "",
            price: 0,
            no: 0,
            options: [],
            dropdown: true,
            selected: "free",
          },
        ]);
      }

      // const updatedCategoryTypes = Eventdata?.eventcategory.map(
      //   (category: string, index: number) => ({
      //     label: category,
      //   })
      // );

      // setCategoryTypes(updatedCategoryTypes);

      // console.log("updatedCategoryTypes", updatedCategoryTypes);

      const updatedCategoryTypes = typeof Eventdata?.eventcategory === "string" ? Eventdata?.eventcategory : Eventdata?.eventcategory.label;

      setCategoryTypes({ label: updatedCategoryTypes });

      console.log("updatedCategoryTypes", updatedCategoryTypes);

      // const updatedCategoryTypes = Eventdata?.eventcategory || [];
      // setCategoryTypes(updatedCategoryTypes);
      // const now = new Date();
      // const offset = -now.getTimezoneOffset(); // getTimezoneOffset returns the difference in minutes from UTC, so we negate it

      // const hours = String(Math.floor(offset / 60)).padStart(2, '0');
      // const minutes = String(offset % 60).padStart(2, '0');
      // const sign = offset >= 0 ? '+' : '-';

      // const timeZoneOffset = `${sign}${hours}:${minutes}`;
      // console.log(timeZoneOffset);

      // console.log("this is time stamp",timeZoneOffset,(Eventdata?.eventstartdate),Eventdata?.eventenddate,Eventdata?.eventendtime )
      // const utcDateStr = '2024-10-02T08:00:00Z'; // UTC time

      // // Create a Date object from the UTC date string
      // const utcDate = new Date(utcDateStr);

      // // Convert to local time zone
      // const localDateStr = utcDate.toLocaleString('en-GB', { timeZone: 'Asia/Karachi', hour12: false });

      // // Display the local date and time
      // console.log("this is time stamp",localDateStr);

      // const localTime = convertUTCToLocalTime();
      // console.log("this is time stamp",localTime);

      form.reset({
        eventname: Eventdata?.eventname || form.getValues("eventname"),
        eventcategory: { label: updatedCategoryTypes || form.getValues("eventcategory") },
        eventHashtags: tagsParsedData || form.getValues("eventHashtags"),
        eventdescription: Eventdata?.eventdescription || form.getValues("eventdescription"),
        eventlocation: Eventdata?.eventlocation || form.getValues("eventlocation"),
        eventstartdate: convertUTCToLocalTime(Eventdata?.eventstartdate) || form.getValues("eventstartdate"),
        eventenddate: convertUTCToLocalTime(Eventdata?.eventenddate) || form.getValues("eventenddate"),

        eventstarttime: convertUTCToLocalTime(Eventdata?.eventstarttime) || form.getValues("eventstarttime"),
        eventendtime: convertUTCToLocalTime(Eventdata?.eventendtime) || form.getValues("eventendtime"),
        // eventmainimg: mainimgName || form.getValues("eventmainimg"),
        eventcoverimg: Eventdata?.eventcoverimg || form.getValues("eventcoverimg"),

        // compticketno:0,
        fburl: Eventdata?.fburl || form.getValues("fburl"),
        instaurl: Eventdata?.instaurl || form.getValues("instaurl"),
        youtubeurl: Eventdata?.youtubeurl || form.getValues("youtubeurl"),
        telegramurl: Eventdata?.telegramurl || form.getValues("telegramurl"),
        twitterurl: Eventdata?.twitterurl || form.getValues("twitterurl"),
        tiktokurl: Eventdata?.tiktokurl || form.getValues("tiktokurl"),
        linkedinurl: Eventdata?.linkedinurl || form.getValues("linkedinurl"),
        tickets: ticketsWithCheckedOptions || form.getValues("tickets"),
      });
    }
  }, [EventData, Eventdata, selected]);

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
    console.log("Current Hash tags are AS==================> ", typeof EventData?.eventHashtags);
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
      className="min-h-screen  bg-cover bg-no-repeat  pb-[80px]"
    >
      {loader && <ScreenLoader />}
      <div className="pxpx mx-2xl  w-full pt-[120px] lg:pt-[132px]  ">
        <Backward />

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
            <div className="gradient-slate  w-full lg:w-[440px] pt-[16px] pb-[16px] px-[24px]  create-container-head relative ">
              {/* <div className="w-[392px] pt-[20px] pb-[24px] relative lg:pt-[26px] lg:pb-[36px] gradient-slate"> */}

              <Image src={CoverImg || imageUrl} alt="bg-frame" className="w-full lg:w-[392px] lg:h-[392px] h-[345px] " width={100} height={345} />
              {/* <Image
              src={CoverImg || imageUrl}
              alt="bg-img"
              className=" md:hidden w-full  h-[345px] lg:w-[345px]"
              width={345}
              height={345}
            /> */}
              <label
                htmlFor="uploadcover"
                className="flex gap-2 items-center justify-center w-full cursor-pointer absolute"
                onClick={(e) => e.stopPropagation()}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px] gradient-slate">
                  <Image src={greenpencile} alt="pencil" />
                  <p className="text-[#00D059] text-sm font-extrabold">Edit Image</p>
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
                galleryFiles.length > 0 ? " block" : " flex items-center justify-center"
              }`}
            >
              <div>
                {galleryFiles?.length > 0 ? (
                  <>
                    <div className="mt-4 pb-4 relative">
                      <div className="flex flex-wrap gap-[12px]">
                        {galleryFiles.length > 0 ? (
                          <div className="mt-4 pb-4 relative">
                            <div className="flex flex-wrap gap-[12px]">
                              {galleryFiles.map((file: any, index) => (
                                <div key={index} className="relative lg:w-[120px] lg:h-[120px]  h-[57px] w-[57px]  rounded-[12px]">
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
                        ) : (
                          <p>No img</p>
                        )}
                      </div>
                    </div>
                    <label
                      htmlFor="galleryUpload"
                      // className={`pb-3 gallery-box-same  border-none font-bold border border-[#292929] placeholder:font-normal gradient-slatee rounded-md cursor-pointer flex justify-center items-end pr-[40px] ${
                      //   galleryFiles.length > 0
                      //     ? " gallery-box h-full"
                      //     : "pt-9 gallery-top"
                      // }`}
                      className={`pb-3 gallery-box-same border-none font-bold border border-[#292929]
                        placeholder:font-normal gradient-slatee rounded-md cursor-pointer flex justify-center items-end 
                        ${
                          galleryFiles.length >= 10
                            ? "opacity-50 cursor-not-allowed"
                            : galleryFiles.length > 0
                            ? "gallery-box h-full"
                            : "pt-9 gallery-top"
                        }`}
                    >
                      <div
                        className="flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]"
                        style={{
                          position: "absolute",
                          bottom: "24px",
                        }}
                      >
                        <Image src={greenpencile} alt="pencil" />
                        <p className="text-[#00D059] text-sm font-extrabold">Edit Media</p>
                      </div>

                      {/* <span className="pl-[0.75rem] uploadImageButton flex items-center">
                     <Image src={cam} alt="pencil" /> {"Upload Media"}
                   </span> */}
                      <input
                        type="file"
                        multiple
                        accept="image/*, video/*"
                        // accept="image/png, image/jpg, image/jpeg, image/svg, video/mp4, video/avi, video/mov, video/mkv"
                        className="hidden"
                        id="galleryUpload"
                        disabled={galleryFiles?.length >= 10}
                        onChange={handleFileChange}
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
        </div>
        {/* <div className="w-full pt-[20px] pb-[24px] relative lg:pt-[26px] lg:pb-[36px]">
          <Image
            src={CoverImg || imageUrl}
            alt="bg-frame"
            className="w-full h-[281px] object-cover"
            width={100}
            height={281}
          />
          <label
            htmlFor="uploadcover"
            className="flex gap-2 items-center justify-between w-full cursor-pointer"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex justify-center items-center rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]">
                <Image src={greenpencile} alt="pencil" />
                <p className="text-[#00D059] text-sm font-extrabold">
                  Edit Image
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef2}
              type="file"
              accept="image/png, image/jpg, image/jpeg, image/svg"
              id="uploadcover"
              className="hidden"
              onChange={handleCoverSingleFileChange} // Ensure this handler function is defined to handle file changes
            />
          </label>
        </div> */}
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
            <form
              className=" w-full"
              // onSubmit={(event) => {
              //   console.log("Form submit triggered");
              //   form.handleSubmit(EventCreation)(event);
              // }}
            >
              <div className="flex items-start gap-[24px] w-full common-container">
                <FormField
                  control={form.control}
                  name="eventname"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm font-bold text-gray-500 absolute left-3  uppercase pt-[16px] pb-[4px]">Event Name</FormLabel>
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

                {/* Event Catgory DropDown */}
                <FormField
                  control={form.control}
                  name="eventcategory"
                  render={({ field }) => (
                    <FormItem
                      className="relative pb-[8px] w-full rounded-md border border-[#292929] gradient-slate 
                    pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 
                    file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] 
                    focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <div className="flex items-center justify-between" onClick={handleCatDropdownToggle}>
                        <div className="flex flex-col">
                          <p className="text-sm font-bold text-gray-500 pb-[4px] uppercase">EVENT category</p>
                          <p>{categoryTypes ? categoryTypes?.label : "Select Event Category"}</p>
                        </div>
                        <Image src={isCatDropdownOpen ? arrowdown : arrowdown} width={11} height={11} alt="arrow" />
                      </div>
                      {isCatDropdownOpen && (
                        <div className="h-[210px] overflow-auto scrollbar-hide absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
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
                              {/* {categoryTypes?.some(
                                (o: any) => o.label === option.label
                              ) && (
                                <Image
                                  src={tick}
                                  width={10}
                                  height={10}
                                  alt="tick"
                                />
                              )} */}
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
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-[24px]">
                <FormField
                  control={form.control}
                  name="eventdescription"
                  render={({ field }) => (
                    <FormItem className="relative w-full gradient-slate-input space-y-0  h-[260px]  pb-3">
                      <FormLabel className="text-sm text-[#8F8F8F]  absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">Event Description</FormLabel>
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

              <div className="mt-[24px]">
                {/* <FormField
                  control={form.control}
                  name="eventlocation"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Event location
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Location"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setEventLocation(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
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
                          value={field.value || Eventdata?.eventlocation || ""}
                        />
                      </FormControl>
                      {/* Optional display of the selected location */}
                      {/* {selectedLocation && (
        <div className="mt-4">
          <p>
            <strong>Selected Location:</strong>{" "}
            {selectedLocation}
          </p>
        </div>
      )} */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                {/* <FormField
                  control={form.control}
                  name="eventstartdate"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Ticketing Start Date & Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          aria-label="Date and time"
                          placeholder="Enter Start Date"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setTicketStartDate(e.target.value);
                            field.onChange(e);
                          }}
                          onKeyDown={(e) => e.preventDefault()}

                          // max={extractDate(EventStartTime)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventenddate"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Ticketing End Date & Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          aria-label="Date and time"
                          placeholder="Enter End Date"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setTicketEndDate(e.target.value);
                            field.onChange(e);
                          }}
                          onKeyDown={(e) => e.preventDefault()}
                          min={TicketStartDate}
                          // max={extractDate(EventStartTime)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <div className="w-full">
                  <ThemeProvider theme={themeMui}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DateTimePicker"]}>
                        <FormField
                          control={form.control}
                          name="eventstartdate"
                          render={({ field }) => {
                            return (
                              <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">Ticket Start Date & Time</FormLabel>
                                <FormControl>
                                  <div className=" w-full">
                                    <StyledDateTimePicker
                                      disablePast
                                      //  {...field}
                                      // onChange={(e: any) => {
                                      //   setEventEndTime(e);
                                      //   field.onChange(e);
                                      // }}
                                      value={field.value ? dayjs(field.value) : null}
                                      onKeyDown={(e: any) => e.preventDefault()}
                                      onChange={(e: any) => {
                                        if (e && e.isValid()) {
                                          const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                          setTicketStartDate(formattedDate);
                                          field.onChange(formattedDate);
                                        }
                                      }}
                                      //  label="Event End Date & Time"
                                      minDateTime={dayjs().startOf("day")}
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
                                          placeholder: "MM / DD / YYYY HH:MM AA",
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
                            //  const adjustedEventStartTime = dayjs(EventStartTime).add(5, 'hour');
                            const adjustedEventStartTime = dayjs(TicketStartDate).add(10, "minute");

                            // Default to the current time if the adjusted start time has passed
                            const defaultEndTime = dayjs().isAfter(adjustedEventStartTime) ? dayjs() : adjustedEventStartTime;
                            return (
                              <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">Ticket End Date & Time</FormLabel>
                                <FormControl>
                                  <div className=" w-full">
                                    <StyledDateTimePicker
                                      value={field.value ? dayjs(field.value) : null}
                                      referenceDate={adjustedEventStartTime}
                                      onKeyDown={(e: any) => e.preventDefault()}
                                      onChange={(e: any) => {
                                        if (e && e.isValid()) {
                                          const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                          setTicketEndDate(formattedDate);
                                          field.onChange(formattedDate);
                                        }
                                      }}
                                      disablePast
                                      //  label="Event End Date & Time"
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
                                          placeholder: "MM / DD / YYYY HH:MM AA",
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

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
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
                            //  const adjustedEventStartTime = dayjs(EventStartTime).add(5, 'hour');
                            return (
                              <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929] pt-[12px]">
                                <FormLabel className="text-sm text-gray-500  uppercase  pb-[4px] text-[#8f8f8f] ">Event Start Date & Time</FormLabel>
                                <FormControl>
                                  <div className=" w-full">
                                    <StyledDateTimePicker
                                      referenceDate={referenceEventDate}
                                      disablePast
                                      value={field.value ? dayjs(field.value) : null}
                                      onKeyDown={(e: any) => e.preventDefault()}
                                      onChange={(e: any) => {
                                        if (e && e.isValid()) {
                                          const formattedDate = e.format("YYYY-MM-DDTHH:mm");
                                          setEventStartTime(formattedDate);
                                          field.onChange(formattedDate);
                                        }
                                      }}
                                      //  label="Event End Date & Time"
                                      // minDateTime={dayjs(TicketEndDate)}
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
                                          placeholder: "MM / DD / YYYY HH:MM AA",
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
                                  <div className=" w-full">
                                    <StyledDateTimePicker
                                      value={field.value ? dayjs(field.value) : null}
                                      onKeyDown={(e: any) => e.preventDefault()}
                                      onChange={(e: any) => {
                                        if (e && e.isValid()) {
                                          const formattedDate = e.format("YYYY-MM-DDTHH:mm");
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
                                        textField: {
                                          inputProps: { readOnly: true },
                                          placeholder: "MM / DD / YYYY HH:MM AA",
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
                            <FormItem className="relative w-full space-y-0  input-custom-container">
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
                              <FormItem className="relative w-full space-y-0  input-custom-container">
                                <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">
                                  Event Ticket Price (£)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Enter Price"
                                    className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                    {...field}
                                    onChange={(e) => {
                                      handleInputChange(index, "price", parseFloat(e.target.value));
                                      field.onChange(e);
                                    }}
                                    onWheel={(e: any) => e.target.blur()}
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
                            <FormItem className="relative w-full space-y-0  input-custom-container">
                              <FormLabel className="text-sm text-[#8F8F8F] absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                                Event Number of Tickets
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter No. of Tickets"
                                  className="pt-12 pb-6 placeholder:text-[16px] placeholder:font-extrabold placeholder:text-[#FFFFFF]"
                                  {...field}
                                  onChange={(e) => {
                                    handleInputChange(index, "no", parseInt(e.target.value, 10));
                                    field.onChange(e);
                                  }}
                                  onWheel={(e: any) => e.target.blur()}
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
                          <p className="text-sm text-[#8F8F8F] uppercase">WHATS INCLUDED</p>
                          <Image src={ticket?.dropdown ? arrowdown : arrowdown} width={11} height={11} alt="arrow" />
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

              {/* <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="compticketno"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Complimentary number of tickets
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter No. of Tickets"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
                          {...field}
                          onWheel={(e: any) => e.target.blur()}
                          min="0"
                          onChange={(e) => {
                            setCompTicketNo(e.target.value);
                            field.onChange(e);
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Facebook</FormLabel>
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
                            // Prevent the user from modifying the base URL
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Instagram</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
                          // value={InstaUrl}
                          {...field}
                          // onChange={(e) => {
                          //   setInstaUrl(e.target.value);
                          //   field.onChange(e);
                          // }}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Prevent the user from modifying the base URL
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Telegram</FormLabel>
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Youtube</FormLabel>
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
                            // Prevent the user from modifying the base URL
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Tiktok</FormLabel>
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Linkedin</FormLabel>
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
                            // Prevent the user from modifying the base URL
                            if (value.startsWith("https://linkedin.com/in/")) {
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
              <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] md:w-[49%] w-full mt-[24px] common-container ">
                <FormField
                  control={form.control}
                  name="twitterurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">Twitter</FormLabel>
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
                            // Prevent the user from modifying the base URL
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
              </div>
              {/* <div className="flex justify-end items-center mt-[36px] edit-btn">
                <Button
                  type="submit"
                  className=" flex  justify-center items-center font-bold py-[12px] px-[68px] rounded-[200px]  font-extrabold h-[52px] edit-btn"
                >
                  Submit
                </Button>
              </div> */}
              <div className="flex items-center justify-end gap-[20px]">
                <div className="flex justify-end items-center mt-[36px] edit-btn">
                  <button
                    className="flex h-[52px] py-[12px] px-[68px] edit-btn justify-center items-center rounded-[44px] gap-[6px] gradient-bg gradient-border-edit "
                    // onClick={handlePreviewClick}
                    // onClick={() => setActionType("preview")}

                    onClick={(event) => handleFormSubmit(event, "preview")}
                    disabled={!isCategorySelected}
                  >
                    Preview
                  </button>
                </div>
                <div className="flex justify-end items-center mt-[36px] edit-btn">
                  <Button
                    type="submit"
                    className=" flex  justify-center items-center font-bold py-[12px] px-[68px] rounded-[200px]  font-extrabold h-[52px] edit-btn"
                    // onClick={() => setActionType("create")}
                    onClick={(event) => handleFormSubmit(event, "create")}
                    disabled={!isCategorySelected}
                  >
                    Submit
                  </Button>
                </div>
              </div>
              {/* <div className="flex items-center justify-end gap-[20px]">
                <div className="flex justify-end items-center mt-[36px] edit-btn">
                  <button className="flex h-[52px] py-[12px] px-[68px] edit-btn justify-center items-center rounded-[44px] gap-[6px] gradient-bg gradient-border-edit ">
                    Preview
                  </button>
                </div>
                <div className="flex justify-end items-center mt-[36px] edit-btn">
                  <Button
                    type="submit"
                    className=" flex  justify-center items-center font-bold py-[12px] px-[68px] rounded-[200px]  font-extrabold h-[52px] edit-btn"
                  >
                    Submit
                  </Button>
                </div>
              </div> */}
            </form>
          </Form>
        </div>
        {/* {isWalletModalOpen && (
         

          <Receviepayment
            onClose={() => setisWalletModalOpen(false)}
            open={() => setisWalletModalOpen(true)}
            eventData={eventAllData}
          />
        )} */}

        {isWalletModalOpen && <EventSubmmitModal onClose={() => setisWalletModalOpen(false)} open={() => setisWalletModalOpen(true)} />}
      </div>
    </section>
  );
}
export default EditeventOnBack;
