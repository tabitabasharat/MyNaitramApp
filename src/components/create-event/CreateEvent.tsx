"use client";
import LocationAutocompleteReact from "./reactLocation";
import React from "react";
import "./CreateEvent.css";
import Image from "next/image";
import ufo from "@/assets/UFO_SVG.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useRef, useEffect } from "react";
import Editicon from "@/assets/Editicon.svg";
import addicon from "@/assets/Wallet/Plus.svg";
import Link from "next/link";
import Head from "next/head";
import LocationAutocomplete from "./Locationinput";
import Autocomplete from "react-google-autocomplete";
import { usePlacesWidget } from "react-google-autocomplete";
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
import {
  SuccessToast,
  ErrorToast,
} from "../reusable-components/Toaster/Toaster";
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

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import { createevent } from "@/lib/middleware/event";
import api from "@/lib/apiInterceptor";
import arrowdown from "../../assets/arrow-down-drop.svg";
import img1 from "../../assets/Handbag (1).svg";
import img2 from "../../assets/Cake.svg";
import img3 from "../../assets/Crown.svg";
import img4 from "../../assets/Shield Star.svg";
import tick from "../../assets/fi-rr-check.svg";
import { updateEvent } from "@/lib/middleware/event";
import Protectedroute from "@/lib/ProtectedRoute/Protectedroute";
import ResponsiveDateTimePickers from "./DateTimePickerMui";

import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import calendaricon from "@/assets/calender.svg";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
};

const themeMui: any = createTheme({
  // typography: {
  //   fontFamily: '"ClashGrotesk"',
  // },
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Text color for the dialog root
        },
        paper: {
          backgroundColor: "#505050", // Dark background for the dialog
          color: "#ffffff", // Default text color
          borderRadius: "12px", // Rounded corners
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#505050", // Dark background for the dialog
          // width: "90%",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Default text color for Typography
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          // Default styles for all tabs
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
          color: "#ffffff", // Default text color for buttons
          backgroundColor: "transparent", // Default background color
          borderRadius: "8px", // Rounded corners
          "&:hover": {
            backgroundColor: "#155a8a", // Darker color on hover
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
          // Apply styles to the root of the TextField
          "&.MuiFormControl-root": {
            // Styles specific to FormControl root
            margin: "10px 0",
            width: "100%",
            border: "none",
            outline: "0",
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
            // Customize the label
            color: "#aaa", // Label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            // Focused label color
            color: "#fff",
          },
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
  &. MuiTypography-root {
    color: #ffffff;
  }
  //  & .MuiDialog-paper {
  //  background-color: #eaea87;
  //  }

  & .MuiIconButton-root {
    color: #808080;
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
  }
`;
const formSchema = z.object({
  eventname: z.string().min(1, { message: "Event name cannot be empty." }),
  location: z.string().min(1, { message: "Event name cannot be empty." }),

  eventcategory: z
    .string()
    .min(1, { message: "Event category cannot be empty." }),
  eventlocation: z
    .string()
    .min(1, { message: "Event location cannot be empty." }),
  eventstartdate: z
    .string()
    .min(1, { message: "Event start date cannot be empty." }),
  eventenddate: z
    .string()
    .min(1, { message: "Event end date cannot be empty." }),

  eventstarttime: z
    .string()
    .min(1, { message: "Event start time cannot be empty." }),
  eventendtime: z
    .string()
    .min(1, { message: "Event end time cannot be empty." }),

  eventdescription: z
    .string()
    .min(1, { message: "Event description cannot be empty." }),

  compticketno: z
    .string()
    .min(1, { message: "Complimentary ticket number cannot be empty." }),
  fburl: z
    .string()
    .url({ message: "Invalid Facebook URL." })
    .min(1, { message: "Facebook URL cannot be empty." }),
  instaurl: z
    .string()
    .url({ message: "Invalid Instagram URL." })
    .min(1, { message: "Instagram URL cannot be empty." }),
  youtubeurl: z
    .string()
    .url({ message: "Invalid YouTube URL." })
    .min(1, { message: "YouTube URL cannot be empty." }),
  tiktokurl: z
    .string()
    .url({ message: "Invalid TikTok URL." })
    .min(1, { message: "TikTok URL cannot be empty." }),
  linkedinurl: z
    .string()
    .url({ message: "Invalid Linkedin URL." })
    .min(1, { message: "Linkedin URL cannot be empty." }),
  telegramurl: z
    .string()
    .url({ message: "Invalid Twitter URL." })
    .min(1, { message: "Telegram URL cannot be empty." }),
  eventmainimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  eventcoverimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  tickets: z
    .array(
      z.object({
        type: z.string().min(1, { message: "Ticket type cannot be empty." }),
        price: z
          .string()
          .min(1, { message: "Ticket price must be greater than 0." }),
        no: z
          .string()
          .min(1, { message: "Number of tickets must be greater than 0." }),
      })
    )
    .refine((tickets) => tickets.length > 0, {
      message: "At least one ticket is required.",
    }),
});
type Option = {
  id: number;
  label: string;
  image: string;
};
function CreateEvent() {
  const theme = useTheme();

  function MuiIcon() {
    return (
      <Image src={calendaricon} alt="Date picker opening icon" width={32} />
    );
  }

  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  console.log("SELECTED PLACE", selectedPlace);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const [dropdown, setDropdown] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const [userid, setUserid] = useState<any>("");
  const [Eventname, setEventname] = useState("");
  const [EventCategory, setEventCategory] = useState("");
  const [EventLocation, setEventLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleLocationSelect = (location: string | null) => {
    setSelectedLocation(location);
  };
  const [TicketStartDate, setTicketStartDate] = useState("");
  const [TicketEndDate, setTicketEndDate] = useState("");

  const [EventStartTime, setEventStartTime] = useState("");
  const [EventEndTime, setEventEndTime] = useState<any>("");
  // const [EventEndTime, setEventEndTime] = useState<dayjs.Dayjs | null>(null);

  console.log("my event start date is", EventStartTime);
  console.log("my ticket start date is", TicketStartDate);

  console.log("my event enddate is", EventEndTime);
  console.log("my ticket endds date is", TicketEndDate);

  const [Eventdescription, setEventdescription] = useState("");

  const [CompTicketNo, setCompTicketNo] = useState("");
  const [MainImg, setMainImg] = useState("");
  const [MainImgName, setMainImgName] = useState<any>("");

  const [CoverImg, setCoverImg] = useState("");
  const [CoverImgName, setCoverImgName] = useState<any>("");

  const [FBUrl, setFBUrl] = useState("");
  const [InstaUrl, setInstaUrl] = useState("");
  const [TwitterUrl, setTwitterUrl] = useState("");

  const [YoutubeUrl, setYoutubeUrl] = useState("");

  const [tiktokUrl, settiktokUrl] = useState("");
  const [linkedinUrl, setlinkedinUrl] = useState("");
  const [eventsFiles, setEventsFile] = useState<any>([]);
  const router = useRouter();

  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { type: "", price: 0, no: 0, options: [], dropdown: true },
  ]);

  const options: Option[] = [
    { id: 1, label: "Merchandise Stalls", image: img1 },
    { id: 2, label: "Food and Beverages", image: img2 },
    { id: 3, label: "VIP Lounge", image: img3 },
    { id: 4, label: "Security and First Aid", image: img4 },
  ];
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const handleDropdown = (index: number) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket, i) =>
        i === index ? { ...ticket, dropdown: !ticket.dropdown } : ticket
      )
    );
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventname: "",
      eventcategory: "",
      eventlocation: "",
      eventstartdate: "",
      eventenddate: "",

      eventstarttime: "",
      eventendtime: "",
      eventmainimg: "",
      eventcoverimg: "",
      eventdescription: "",

      compticketno: "",
      fburl: "",
      instaurl: "",
      youtubeurl: "",
      telegramurl: "",
      tiktokurl: "",
      linkedinurl: "",
      tickets: [],
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setGalleryFiles((prevFiles) => [...prevFiles, ...filesArray]); // Update state with all selected files
      console.log("Gallery files:", [...galleryFiles, ...filesArray]);
    }
  };
  const handleFileChangeapi = async () => {
    if (galleryFiles) {
      setLoader(true);

      try {
        const filesArray = Array.from(galleryFiles);

        console.log("Gallery files:", filesArray);

        const formData = new FormData();

        filesArray.forEach((file) => formData.append("files", file));

        //  console.log("my res before", formData)
        const res: any = await api.post(
          `${API_URL}/upload/uploadMultiple`,
          formData
        );

        if (res?.status === 200) {
          setLoader(false);

          console.log("gallery res", res);
          console.log("gallery image uploasssded");
          setEventsFile(res?.data?.imageUrls);

          console.log(res?.data?.data, "this is the gallery url");
          SuccessToast("Images Uploaded Successfully");
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

  const handleInputChange = (
    index: number,
    field: keyof TicketType,
    value: string | number | TicketTypeOption[]
  ) => {
    setTicketTypes((prevTickets) =>
      prevTickets.map((ticket, i) =>
        i === index ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const handleAddTicketType = (e: any) => {
    e.preventDefault();
    setTicketTypes((prevTickets) => [
      ...prevTickets,
      { type: "", price: 0, no: 0, options: [], dropdown: true },
    ]);
  };

  const handleDeleteTicketType = (index: number) => {
    setTicketTypes((prevTickets) => prevTickets.filter((_, i) => i !== index));
  };

  const handleSingleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        const res: any = await api.post(
          `${API_URL}/upload/uploadimage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

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
  const handleCoverSingleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        const res: any = await api.post(
          `${API_URL}/upload/uploadimage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

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
  const removeImage = (index: number) => {
    setGalleryFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserid(userID);
    console.log("user ID logged in is", userID);
  }, []);

  const filteredTicketTypes = ticketTypes.map((ticket) => ({
    type: ticket.type,
    price: ticket.price,
    no: ticket.no,
    options: ticket.options.map((option) => ({
      id: option.id,
      label: option.label,
    })),
  }));
  async function EventCreation(values: z.infer<typeof formSchema>) {
    console.log("my values", values);
    console.log(" Event Creation");

    setLoader(true);
    const imagesOfGallery = await handleFileChangeapi();
    try {
      const data = {
        userId: userid,
        name: Eventname,
        category: EventCategory,
        eventDescription: Eventdescription,
        location: EventLocation,
        ticketStartDate: TicketStartDate,
        ticketEndDate: TicketEndDate,
        startTime: EventStartTime,
        endTime: EventEndTime,
        mainEventImage: MainImg,
        coverEventImage: CoverImg,

        tickets: filteredTicketTypes,
        totalComplemantaryTickets: CompTicketNo,
        fbUrl: FBUrl,
        instaUrl: InstaUrl,
        youtubeUrl: YoutubeUrl,
        twitterUrl: TwitterUrl,
        tiktokUrl: tiktokUrl,
        linkedinUrl: linkedinUrl,
        eventmedia: imagesOfGallery,
      };
      dispatch(createevent(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);

          router.push("/viewallevents");
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
  console.log("Form errors:", form.formState.errors);

  function extractDate(dateTime: string): string {
    // Create a new Date object from the input string
    const date = new Date(dateTime);

    // Format the date to 'YYYY-MM-DD'
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function addTimeToDate(
    inputDate: string,
    hoursToAdd: number,
    minutesToAdd: number
  ): string {
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
  // const locationAPIKEY="AIzaSyBvDU_PrmegdrMY46LXg-OMF7CqPgd1jUk"
  const locationAPIKEY = "AIzaSyA78WzK8evJ7Vier7fUXAqjM5KDhDwyq88";

  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "center",
      }}
      className="min-h-screen  bg-cover bg-no-repeat  pb-[80px] create-inner"
    >
      {loader && <ScreenLoader />}
      <div className="pxpx mx-2xl  w-full   ">
        <div className="px-[24px] py-[16px] relative create-container ">
          <div className="flex justify-between">
            <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
              {" "}
              Create <span className="text-primary">Event</span>
            </h1>
          </div>

          <Image
            src={ufo}
            width={350}
            height={350}
            className="absolute right-[0] bottom-0"
            alt="ufo-img"
          />
        </div>
        {/* <div className="flex flex-col items-center justify-center min-h-screen w-full">
          <LocationAutocompleteReact/>
        </div> */}
        {/* <div className="flex flex-col items-center justify-center min-h-screen">
          <p>Location check</p>
        <Autocomplete
          style={{ width: "90%" }}
            apiKey={locationAPIKEY}
            onPlaceSelected={(place) => {
              console.log("selected", place?.formatted_address);
              setSelectedPlace(place); 
            }}
          />
        </div> */}

        <div className="gradient-slate w-full pt-[32px] pb-[88px] px-[60px]  create-container-head">
          {/* <div className="flex flex-col items-center justify-center min-h-screen">
            <p>Location Autocomplete</p>
            <h1 className="text-2xl mb-5">Location Autocomplete</h1>

            <LocationAutocomplete onLocationSelect={handleLocationSelect} />

          
            {selectedLocation && (
              <div className="mt-4">
                <p>
                  <strong>Selected Location:</strong> {selectedLocation}
                </p>
              </div>
            )}
          </div> */}

          <Form {...form}>
            <form
              className=" w-full"
              onSubmit={(event) => {
                console.log("Form submit triggered");
                form.handleSubmit(EventCreation)(event);
              }}
            >
              <div className="flex items-start gap-[24px] w-full common-container">
                <FormField
                  control={form.control}
                  name="eventlocation"
                  render={() => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3  uppercase pt-[16px] pb-[4px]">
                        Event Location
                      </FormLabel>
                      <FormControl>
                        <LocationAutocomplete
                          onLocationSelect={handleLocationSelect}
                        />
                      </FormControl>
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
              <div className="flex items-start gap-[24px] w-full common-container">
                <FormField
                  control={form.control}
                  name="eventname"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm font-bold text-gray-500 absolute left-3  uppercase pt-[16px] pb-[4px]">
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

                <FormField
                  control={form.control}
                  name="eventcategory"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3  uppercase pt-[16px] pb-[4px]">
                        Event Category
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Event Category"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] mt-0"
                          {...field}
                          onChange={(e) => {
                            setEventCategory(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
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
                    <FormItem className="relative w-full  space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Event Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          value={Eventdescription}
                          className="pt-11 create-txtarea-input "
                          onChange={(e) => {
                            setEventdescription(e.target.value);
                            field.onChange(e);
                          }}
                          placeholder="Enter Event Description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-[24px]">
                <FormField
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
                />
              </div>

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="eventstartdate"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Ticketing Start Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          aria-label="Date"
                          placeholder="Enter Start Date"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setTicketStartDate(e.target.value);
                            field.onChange(e);
                          }}

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
                        Ticketing End Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          aria-label="Date"
                          placeholder="Enter End Date"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setTicketEndDate(e.target.value);
                            field.onChange(e);
                          }}
                          min={TicketStartDate}
                          // max={extractDate(EventStartTime)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="eventstarttime"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Event Start Date & time
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          aria-label="Date and time"
                          placeholder="Enter Start Time"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setEventStartTime(e.target.value);
                            field.onChange(e);
                          }}
                          min={addTimeToDate(TicketEndDate, 0, 0)}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="eventendtime"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Event End Date & time
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          aria-label="Date and time"
                          placeholder="Enter End Time"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setEventEndTime(e.target.value);
                            field.onChange(e);
                          }}
                          min={EventStartTime}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>
              <>
                <ThemeProvider theme={themeMui}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker"]}>
                      <FormField
                        control={form.control}
                        name="eventendtime"
                        render={({ field }) => (
                          <FormItem className="relative w-full space-y-0 gradient-slate  ps-[12px]  rounded-md border border-[#292929]">
                            <FormLabel className="text-sm text-gray-500  uppercase pt-[16px] pb-[4px]  ">
                              Event End Date & Time
                            </FormLabel>
                            <FormControl>
                              <div className=" w-full">
                                <StyledDateTimePicker
                                  //  {...field}
                                  onChange={(e: any) => {
                                    setEventEndTime(e); // Update local state
                                    field.onChange(e);
                                    console.log("my end date new", e) // Update form control
                                  }}
                                  //  label="Event End Date & Time"
                                  minDateTime={dayjs("2024-10-15T08:30")}
                                  // slots={{ openPickerIcon: MuiIcon }} // Custom icon
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
                        )}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </ThemeProvider>
              </>
              {/* <ResponsiveDateTimePickers /> */}

              {/* <ThemeProvider theme={themeMui}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <StyledDateTimePicker
                      minDateTime={dayjs("2024-10-15T08:30")}
                      onChange={(e) => {
                        setEventEndTime(e);
                        console.log("my start time new", e);
                      }}
                      slots={{ openPickerIcon: MuiIcon }}
                      slotProps={{
                        tabs: {
                          hidden: false,
                        },
                        toolbar: {
                          // color:"white",
                          // Customize value display
                          toolbarFormat: "YYYY",
                          // Change what is displayed given an empty value
                          // toolbarPlaceholder: '??',
                          // Show the toolbar
                          hidden: false,
                        },
                        calendarHeader: {
                          sx: { color: "white" },
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </ThemeProvider> */}

              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container ">
                <FormField
                  control={form.control}
                  name="eventmainimg"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        Main event image
                      </FormLabel>
                      <UploadSimple
                        className="absolute right-[24px] top-[30%] "
                        size={20}
                      />

                      <FormControl>
                        <div>
                          <label
                            htmlFor="upload"
                            className="pt-9 pb-3 font-bold   border border-[#292929]  placeholder:font-normal gradient-slate rounded-md cursor-pointer flex justify-between items-center "
                          >
                            {/* <span>{field.value?.name || "Upload Image"}</span> */}
                            <span className="pl-[0.75rem]">
                              {MainImgName || "Upload Image"}
                            </span>

                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/png image/jpg image/jpeg image/svg"
                              className="hidden"
                              id="upload"
                              onChange={handleSingleFileChange}
                            />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="eventcoverimg"
                  render={({ field }) => (
                    <FormItem className="relative w-full space-y-0">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                        cover event image
                      </FormLabel>
                      <UploadSimple
                        className="absolute right-[24px] top-[30%] "
                        size={20}
                      />

                      <FormControl>
                        <div>
                          <label
                            htmlFor="upload2"
                            className="pt-9 pb-3 font-bold   border border-[#292929]  placeholder:font-normal gradient-slate rounded-md cursor-pointer flex justify-between items-center "
                          >
                            <span className="pl-[0.75rem]">
                              {CoverImgName || "Upload Image"}
                            </span>
                            <input
                              ref={fileInputRef2}
                              type="file"
                              accept="image/png image/jpg image/jpeg image/svg"
                              className="hidden"
                              id="upload2"
                              onChange={handleCoverSingleFileChange}
                            />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                <FormItem className="relative w-full space-y-0">
                  <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                    Gallery media
                    {galleryFiles?.length > 0 && (
                      <div className="mt-4 pb-4 relative">
                        <div className="flex flex-wrap gap-[12px]">
                          {galleryFiles?.map((file, index) => {
                            const isVideo = file.type.startsWith("video/");
                            const isImage = file.type.startsWith("image/");
                            return (
                              <div
                                key={index}
                                className="relative w-[80px] h-[80px] bg-gray-200 rounded-[12px]"
                              >
                                {isVideo ? (
                                  <video
                                    src={window.URL.createObjectURL(file)}
                                    className="w-full h-full object-cover relative rounded-[12px]"
                                    width={80}
                                    height={80}
                                    controls
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                ) : isImage ? (
                                  <Image
                                    src={window.URL.createObjectURL(file)}
                                    alt={`Gallery Image ${index + 1}`}
                                    className="w-full h-full object-cover relative rounded-[12px]"
                                    width={80}
                                    height={80}
                                  />
                                ) : (
                                  <p className="w-full h-full flex items-center justify-center text-red-500">
                                    Unsupported media type
                                  </p>
                                )}
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="trash_button"
                                >
                                  <Image
                                    src={crossicon}
                                    alt="remove"
                                    width={20}
                                    height={20}
                                  />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </FormLabel>
                  <FormControl>
                    <div>
                      <label
                        htmlFor="galleryUpload"
                        className={`pb-3 gallery-box-same font-bold border border-[#292929] placeholder:font-normal gradient-slate rounded-md cursor-pointer flex justify-end items-end pr-[40px] ${
                          galleryFiles.length > 0
                            ? "h-[200px] gallery-box"
                            : "pt-9 gallery-top"
                        }`}
                      >
                        <span className="pl-[0.75rem] uploadImageButton">
                          {"Upload Images"}
                        </span>
                        <input
                          type="file"
                          multiple
                          accept="image/png, image/jpg, image/jpeg, image/svg, video/mp4, video/avi, video/mov, video/mkv"
                          className="hidden"
                          id="galleryUpload"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              </div>
              {ticketTypes.map((ticket, index) => (
                <div
                  className="flex flex-col gap-[12px] w-full mt-[24px] common-container"
                  key={index}
                >
                  <div className="flex items-center gap-[24px] common-container">
                    {/* Event Ticket Type Field */}
                    <FormField
                      control={form.control}
                      name={`tickets.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="relative w-full space-y-0">
                          <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                            Event Ticket Type
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Type"
                              className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
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

                    {/* Event Ticket Price Field */}
                    <FormField
                      control={form.control}
                      name={`tickets.${index}.price`}
                      render={({ field }) => (
                        <FormItem className="relative w-full space-y-0">
                          <FormLabel className="text-sm text-gray-500 absolute left-3 uppercase pt-[16px] pb-[4px]">
                            Event Ticket Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter Price"
                              className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
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

                    {/* Event Number of Tickets Field */}
                    <FormField
                      control={form.control}
                      name={`tickets.${index}.no`}
                      render={({ field }) => (
                        <FormItem className="relative w-full space-y-0">
                          <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                            Event Number of Tickets
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter No. of Tickets"
                              className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
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

                  {/* What's Included Section */}
                  <div className="pb-[8px]  w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                    <div
                      className="flex items-center justify-between"
                      onClick={() => handleDropdown(index)}
                    >
                      <p className="text-sm text-gray-500 uppercase">
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
                      <div>
                        {options?.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center justify-between pt-[8px] cursor-pointer"
                            onClick={() => handleOptionToggle(index, option)}
                          >
                            <div className="flex items-center gap-[10px]">
                              <Image
                                src={option.image}
                                width={16}
                                height={16}
                                alt="img"
                              />
                              <p className="text-[16px] text-[#FFFFFF] font-normal items-center">
                                {option?.label}
                              </p>
                            </div>
                            {ticket?.options.some(
                              (o) => o.id === option.id
                            ) && (
                              <Image
                                src={tick}
                                width={10}
                                height={10}
                                alt="tick"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Ticket Type Button */}
              <div className="flex justify-end items-center mt-[12px] ticket-btn">
                <Button
                  style={{
                    background:
                      "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                  }}
                  className="flex items-center justify-between bg-[#0F0F0F] text-[#00D059] h-[32px] py-[8px] px-[12px] gap-[9.75px]  rounded-full  
               border-[0.86px] border-transparent text-[11px] font-extrabold"
                  onClick={handleAddTicketType}
                >
                  <Image src={addicon} alt="Add-icon" height={12} width={12} />
                  Add Ticket Type
                </Button>
              </div>

              <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container">
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
              </div>

              <div className="flex items-start lg:gap-[24px] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container">
                <FormField
                  control={form.control}
                  name="fburl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Facebook
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setFBUrl(e.target.value);
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
                  name="instaurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Instagram
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
                          {...field}
                          onChange={(e) => {
                            setInstaUrl(e.target.value);
                            field.onChange(e);
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Twitter
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            setTwitterUrl(e.target.value);
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
                  name="youtubeurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Youtube
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
                          {...field}
                          onChange={(e) => {
                            setYoutubeUrl(e.target.value);
                            field.onChange(e);
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Tiktok
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF]"
                          {...field}
                          onChange={(e) => {
                            settiktokUrl(e.target.value);
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
                  name="linkedinurl"
                  render={({ field }) => (
                    <FormItem className="relative w-full">
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Linkedin
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
                          {...field}
                          onChange={(e) => {
                            setlinkedinUrl(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end items-center mt-[36px] edit-btn">
                <Button
                  type="submit"
                  className="font-bold py-[12px] px-[68px] rounded-[200px]  font-extrabold h-[52px] edit-btn"
                >
                  Host Event
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
export default Protectedroute(CreateEvent);
