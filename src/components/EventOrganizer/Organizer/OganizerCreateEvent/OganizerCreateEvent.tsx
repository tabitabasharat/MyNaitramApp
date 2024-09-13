"use client";

import WalletChooseModal from "@/components/Walletchoose/WalletChooseModal";
import React from "react";
import "@/components/create-event/CreateEvent.css";
import Image from "next/image";
import ufo from "@/assets/UFO_SVG.png";
import cam from "@/assets/Camera.svg";
import bgframe from "@/assets/uploadFrame.svg";
import newCover from "@/assets/Wallet/coverimg-create-event.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import Editicon from "@/assets/Editicon.svg";
// import addicon from "@/assets/add-icon.svg";
import addicon from "@/assets/Wallet/Plus.svg";
import Backward from "@/components/Backward/Backward";
import deleteicon from "@/assets/Wallet/delete-icon.svg";
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
} from "@/components/reusable-components/Toaster/Toaster";
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
import bgframe2 from "@/assets/uploadframe2.svg";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "@/components/loader/Screenloader";
import { createevent } from "@/lib/middleware/event";
import api from "@/lib/apiInterceptor";
import arrowdown from "@/assets/arrow-down-drop.svg";

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

const formSchema = z.object({
  eventname: z.string().min(1, { message: "Event name cannot be empty." }),

  // eventcategory: z.array(categorySchema).nonempty({ message: "At least one category is required." }),

  eventcategory: z.array(
    z.object({
      options: z
        .array(
          z.object({
            id: z.number(),
            label: z.string(),
          })
        )
        .min(1, { message: "Event Category is required" }),
    })
  ),

  // eventcategory: z.array(z.any()).min(1, { message: "Event Category is required" }),

  // Ensure at least one category is selected

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
    .min(1, { message: "Twitter URL cannot be empty." }),
  // eventmainimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  eventmainimg: z.string().optional(),
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
type CateOption = {
  label: string;
  // image: string;
};
interface EventData {
  // Add all other fields from your form schema
  eventmedia?: any[]; // Adjust the type based on what imagesOfGallery returns
}
function OganizerCreateEvent() {
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  const [EventLocation, setEventLocation] = useState("");
  const [TicketStartDate, setTicketStartDate] = useState("");
  const [TicketEndDate, setTicketEndDate] = useState("");

  const [EventStartTime, setEventStartTime] = useState("");

  const [EventEndTime, setEventEndTime] = useState("");

  const [Eventdescription, setEventdescription] = useState("");
  console.log("event des", Eventdescription);

  const [CompTicketNo, setCompTicketNo] = useState("");
  const [MainImg, setMainImg] = useState("");
  const [MainImgName, setMainImgName] = useState<any>("");

  const [CoverImg, setCoverImg] = useState("");
  const [CoverImgName, setCoverImgName] = useState<any>("");

  const [FBUrl, setFBUrl] = useState("https://www.facebook.com/");
  const [InstaUrl, setInstaUrl] = useState("https://instagram.com/");
  const [TwitterUrl, setTwitterUrl] = useState("https://www.x.com/");

  const [YoutubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/");

  const [tiktokUrl, settiktokUrl] = useState("https://www.tiktok.com/@");
  const [linkedinUrl, setlinkedinUrl] = useState("https://www.linkedin.com/");
  const [eventsFiles, setEventsFile] = useState<any>([]);
  const router = useRouter();

  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { type: "", price: 0, no: 0, options: [], dropdown: true },
  ]);

  const [categoryTypes, setCategoryTypes] = useState<any>([]);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);

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
    { label: "Auto, Biat & Air" },
    { label: "Hobbies" },
    { label: "Family & Education" },
    { label: "School Activities" },
    { label: "Other" },
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
    const formattedUTC = `${utcYear}-${String(utcMonth).padStart(
      2,
      "0"
    )}-${String(utcDate).padStart(2, "0")}T${String(utcHours).padStart(
      2,
      "0"
    )}:${String(utcMinutes).padStart(2, "0")}`;

    return formattedUTC;
  }

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventname: "",
      eventcategory: [],
      eventlocation: "",
      eventstartdate: "",
      eventenddate: "",

      eventstarttime: "",
      eventendtime: "",
      eventmainimg: "",
      eventcoverimg: "",

      eventdescription: "",

      compticketno: "",
      fburl: "https://www.facebook.com/",
      instaurl: "https://instagram.com/",
      youtubeurl: "https://www.youtube.com/",
      telegramurl: "https://www.x.com/",
      tiktokurl: "https://www.tiktok.com/@",
      linkedinurl: "https://www.linkedin.com/",
      tickets: [],
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setGalleryFiles((prevFiles) => [...prevFiles, ...filesArray]); // Update state with all selected files
    }
  };
  const handleFileChangeapi = async () => {
    if (galleryFiles) {
      setLoader(true);

      try {
        const filesArray = Array.from(galleryFiles);

        const formData = new FormData();

        filesArray.forEach((file) => formData.append("files", file));

        const res: any = await api.post(
          `${API_URL}/upload/uploadMultiple`,
          formData
        );

        if (res?.status === 200) {
          setLoader(false);

          setEventsFile(res?.data?.imageUrls);

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

  console.log("Form errors:", form.formState.errors);

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
    if (index === 0) {
      return;
    }
    const updatedTicketTypes = ticketTypes.filter((_, i) => i !== index);
    setTicketTypes(updatedTicketTypes);
  };

  const handleCoverSingleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const filename = file?.name;
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

          form.setValue("eventcoverimg", res?.data?.data);

          setCoverImg(res?.data?.data);
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
  const isCategorySelected = categoryTypes?.length > 0;

  console.log("is cat", isCategorySelected);

  async function EventCreation(values: z.infer<typeof formSchema>) {
    // setLoader(true);
    console.log("my values", values);

    const imagesOfGallery = await handleFileChangeapi();

    setisWalletModalOpen(true);
    const utcEventStartTime = convertToUTC(EventStartTime);
    setEventStartTime(utcEventStartTime);

    const utcEventEndTime = convertToUTC(EventEndTime);
    setEventEndTime(utcEventEndTime);

    const utcTicketStartTime = convertToUTC(TicketStartDate);
    setTicketStartDate(utcTicketStartTime);

    const utcTicketEndTime = convertToUTC(TicketEndDate);
    setTicketEndDate(utcTicketEndTime);

    const categorylabels = categoryTypes?.map(
      (category: any) => category?.label
    );

    const updatedValues = {
      ...values,
      eventmedia: imagesOfGallery,
      ticketsdata: filteredTicketTypes,

      eventcategory: categorylabels,
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
  }
  async function handlePreviewClick(values: z.infer<typeof formSchema>) {
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

    const categorylabels = categoryTypes?.map(
      (category: any) => category?.label
    );

    const updatedValues = {
      ...values,
      eventmedia: imagesOfGallery,
      ticketsdata: filteredTicketTypes,

      eventcategory: categorylabels,

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

  // const handleCateOptionToggle = (index: number, option: cateOption) => {
  //   setCategoryTypes((prevCategories) =>
  //     prevCategories.map((category, i) =>
  //       i === index
  //         ? {
  //             ...category,
  //             options: category.options.some((o) => o.id === option.id)
  //               ? category.options.filter((o) => o.id !== option.id)
  //               : [...category.options, option],
  //           }
  //         : category
  //     )
  //   );
  // };
  // const handleCateOptionToggle = (option: any) => {
  //   setCategoryTypes((prev: any) =>
  //     prev.some((o: any) => o.id === option.id)
  //       ? prev.filter((o: any) => o.id !== option.id)
  //       : [...prev, option]
  //   );
  // };

  const handleCateOptionToggle = (option: any) => {
    setCategoryTypes((prev: any) =>
      prev.some((o: any) => o.label === option.label)
        ? prev.filter((o: any) => o.label !== option.label)
        : [...prev, option]
    );
  };
  console.log("my cat", categoryTypes);

  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "center",
      }}
      className="min-h-screen  bg-cover bg-no-repeat  pb-[80px] pt-[120px] lg:pt-[120px]"
    >
      {loader && <ScreenLoader />}
      <div className="pxpx mx-2xl w-full   ">
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

              <Image
                src={ufo}
                width={350}
                height={350}
                className="absolute right-[0] bottom-0"
                alt="ufo"
              />
            </div>
            <div className="gradient-slate  w-full lg:w-[440px] pt-[16px] pb-[16px] px-[24px]  create-container-head relative ">
              {/* <div className="w-[392px] pt-[20px] pb-[24px] relative lg:pt-[26px] lg:pb-[36px] gradient-slate"> */}

              <Image
                src={CoverImg || newCover}
                alt="bg-frame"
                className="w-full lg:w-[392px] lg:h-[392px] h-[345px] "
                width={100}
                height={345}
              />
              {/* <Image
                src={CoverImg || newCover}
                alt="bg-img"
                className=" md:hidden w-full  h-[345px] lg:w-[345px]"
                width={345}
                height={345}
              /> */}
              <label
                htmlFor="uploadcover"
                className="flex gap-2 items-center justify-between w-full cursor-pointer"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]">
                    <Image src={cam} alt="pencil" />
                    <p className="text-[#00D059] text-sm font-extrabold">
                      Upload Image
                    </p>
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

              <Image
                src={ufo}
                width={350}
                height={350}
                className="absolute right-[0] bottom-0"
                alt="ufo"
              />
            </div>
            <div
              className={`gradient-slate w-full pt-[16px] pb-[16px] px-[24px] h-[270px] lg:h-[424px] create-container-head relative${
                galleryFiles.length > 0
                  ? " block"
                  : "flex items-center justify-center"
              }`}
            >
              {galleryFiles?.length > 0 ? (
                <>
                  <div className="mt-4 pb-4 relative">
                    <div className="flex flex-wrap gap-[24px] lg:gap-[13px] max-h-[148px] lg:max-h-[264px] pt-[9px] overflow-auto">
                      {galleryFiles?.map((file, index) => {
                        const isVideo = file.type.startsWith("video/");
                        const isImage = file.type.startsWith("image/");
                        return (
                          <div
                            key={index}
                            className="relative  h-[57px] w-[57px] lg:w-[120px] lg:h-[120px]  rounded-[12px]"
                          >
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
                  <label
                    htmlFor="galleryUpload"
                    className={`pb-3 gallery-box-same border-none font-bold border border-[#292929] placeholder:font-normal gradient-slatee rounded-md cursor-pointer flex justify-center items-end  ${
                      galleryFiles.length > 0
                        ? " gallery-box"
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
                      <Image src={cam} alt="pencil" />
                      <p className="text-[#00D059] text-sm font-extrabold">
                        Upload Media
                      </p>
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
                    <p className="text-[16px] text-extrabold">
                      There's No Gallery Media
                    </p>
                    <label
                      htmlFor="galleryUpload"
                      className={`pb-3 gallery-box-same  border-none font-bold border border-[#292929] placeholder:font-normal gradient-slatee rounded-md cursor-pointer flex justify-center items-end  ${
                        galleryFiles.length > 0
                          ? " gallery-box"
                          : " gallery-tops"
                      }`}
                    >
                      <div className="flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]">
                        <Image src={cam} alt="pencil" />
                        <p className="text-[#00D059] text-sm font-extrabold">
                          Upload Media
                        </p>
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
        {/* <div className="w-full pt-[20px] pb-[24px] relative lg:pt-[26px] lg:pb-[36px]">
          <Image
            src={CoverImg || bgframe}
            alt="bg-frame"
            className="w-full hidden md:block w-full h-[281px] object-cover"
            width={100}
            height={281}
          />
          <Image
            src={CoverImg || bgframe2}
            alt="bg-img"
            className="w-full md:hidden w-full h-[281px] object-cover"
            width={100}
            height={281}
          />
          <label
            htmlFor="uploadcover"
            className="flex gap-2 items-center justify-between w-full cursor-pointer"
          >
            <div className="absolute px-[10px] top-1/2 h-[92%] sm:h-[auto] md:h-[auto] lg:h-[auto] left-1/2 transform flex flex-col w-full justify-between  sm:jutify-center md:jutify-center lg:jutify-center items-center -translate-x-1/2 -translate-y-1/2">
              <div>
                <p className="text-[30px] flex-wrap mt-[60px] flex text-center lg:mb-[10px] font-extrabold">
                  Upload Cover Artwork
                </p>
              </div>
              <div className="flex justify-center mb-[68px] items center  rounded-[44px]  gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]">
                <Image src={cam} alt="pencil" />
                <p className="text-[#00D059] text-sm font-extrabold">
                  Upload Image
                </p>
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
        </div> */}
        {/* <div className="w-full pt-[20px] pb-[24px] relative lg:pt-[26px] lg:pb-[36px]">
        <Image src={CoverImg || bgframe} alt="bg-frame" className="w-full hidden md:block" />
        <Image src={CoverImg || bgframe2} alt="bg-img" className="w-full md:hidden" />
          <label
            htmlFor="upload"
            className="flex gap-2 items-center justify-between w-full cursor-pointer"
          >
            <div className="absolute top-1/2 h-[92%] sm:h-[auto] md:h-[auto] lg:h-[auto] left-1/2 transform flex flex-col w-full justify-between  sm:jutify-center md:jutify-center lg:jutify-center items-center -translate-x-1/2 -translate-y-1/2">
              <div>
                <p className="text-[30px] flex-wrap mt-[60px] flex text-center lg:mb-[10px] font-extrabold">
                  Upload Cover Artwork
                </p>
              </div>
              <div className="flex justify-center mb-[68px] items center  rounded-[44px]  gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]">
                <Image src={cam} alt="pencil" />
                <p className="text-[#00D059] text-sm font-extrabold">
                  Upload Image
                </p>
              </div>
            </div>
          </label>
        </div> */}
        <div className="px-[24px] py-[16px] relative create-container mt-[46px] ">
          <div className="flex justify-between">
            <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
              {" "}
              Host <span className="text-primary">Event</span>
            </h1>
            {/* <Image src={Editicon} alt="Edit-icon" /> */}
          </div>

          <Image
            src={ufo}
            width={350}
            height={350}
            className="absolute right-[0] bottom-0"
            alt="ufo"
          />
        </div>
        <div className="gradient-slate w-full pt-[32px] pb-[88px] px-[60px]  create-container-head">
          <Form {...form}>
            <form
              className=" w-full"
              // onSubmit={(event) => handleFormSubmit(event)}
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

                {/* <FormField
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
                /> */}
                {/* {categoryTypes.map((ticket, index) => (
                  <FormField
                    control={form.control}
                 
                    name="eventcategory"
                    render={({ field }) => (
                      <FormItem
                        className="relative pb-[8px] w-full rounded-md border border-[#292929] 
                      gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] 
                      file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] 
                      focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <div
                          className="flex items-center justify-between"
                          onClick={() => handlecateDropdown(index)}
                        >
                          <div className="flex flex-col">
                            <p className="text-sm font-bold text-gray-500 pb-[4px] uppercase">
                              EVENT category
                            </p>
                            <p>Select Event Category</p>
                          </div>
                          <Image
                            src={ticket?.dropdown ? arrowdown : arrowdown}
                            width={11}
                            height={11}
                            alt="arrow"
                          />
                        </div>
                        {ticket?.dropdown && (
                          <div className="h-[210px] overflow-auto absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929]  rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                            {optionscate?.map((option) => (
                              <div
                                key={option.id}
                                className="flex items-center justify-between pt-[8px] cursor-pointer"
                                onClick={() =>
                                  handleCateOptionToggle(index, option)
                                }
                              >
                                <div className="flex items-center gap-[10px]">
                                  <p className="text-[16px] text-[#FFFFFF] font-normal items-center">
                                    {option.label}
                                  </p>
                                </div>
                                {ticket?.options?.some(
                                  (o) => o?.id === option?.id
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
                        {}

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))} */}

                <FormField
                  control={form.control}
                  name="eventcategory"
                  render={({ field }) => (
                    <FormItem className="relative pb-[8px] w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                      <div
                        className="flex items-center justify-between"
                        onClick={handleCatDropdownToggle}
                      >
                        <div className="flex flex-col">
                          <p className="text-sm font-bold text-gray-500 pb-[4px] uppercase">
                            EVENT category
                          </p>
                          <p>Select Event Category</p>
                        </div>
                        <Image
                          src={isCatDropdownOpen ? arrowdown : arrowdown}
                          width={11}
                          height={11}
                          alt="arrow"
                        />
                      </div>
                      {isCatDropdownOpen && (
                        <div className="h-[210px] overflow-auto absolute left-0 top-full mt-2 w-full bg-[#292929] border border-[#292929] rounded-md z-50 gradient-slate px-[12px] pb-[16px] pt-[8px]">
                          {optionscate?.map((option) => (
                            <div
                              key={option.label}
                              className="flex items-center justify-between pt-[8px] cursor-pointer"
                              onClick={() => handleCateOptionToggle(option)}
                            >
                              <div className="flex items-center gap-[10px]">
                                <p className="text-[16px] text-[#FFFFFF] font-normal items-center">
                                  {option.label}
                                </p>
                              </div>
                              {categoryTypes?.some(
                                (o: any) => o.label === option.label
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <div className="mt-[24px]">
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
              </div> */}
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
                        <div className=" absolute inset-0 pb-3 overflow-auto top-[28px] h-[200px]">
                          <Editor
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
                        Ticketing Start Date & Time
                      </FormLabel>
                      <FormControl>
                        <Input
                          // type="date"
                          // aria-label="Date"
                          type="datetime-local"
                          aria-label="Date and time"
                          placeholder="Enter Start Date"
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] w-full  "
                          {...field}
                          onChange={(e) => {
                            setTicketStartDate(e.target.value);
                            console.log(
                              "my ticket date and time",
                              e.target.value
                            );
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
                        Ticketing End Date & time
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
                            // const utcTime = convertToUTC(e.target.value);

                            // // // Update state and form field with UTC time
                            // setEventStartTime(utcTime);
                            // field.onChange(utcTime);
                            setEventStartTime(e.target.value);
                            field.onChange(e);
                          }}
                          // min={addTimeToDate(TicketEndDate, 0, 0)}
                          min={TicketEndDate}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
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
                />
              </div>

              {/* <div className="flex items-start gap-[24px] w-full mt-[24px] common-container ">
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
                            <span className="pl-[0.75rem]">
                              {MainImgName || "Upload Image"}
                            </span>

                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
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
              </div> */}

              {/* <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
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
                          accept="image/*, video/*"
                          // accept="image/png, image/jpg, image/jpeg, image/svg, video/mp4, video/avi, video/mov, video/mkv"
                          className="hidden"
                          id="galleryUpload"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </FormControl>
                </FormItem>
              </div> */}

              {/* {ticketTypes.map((ticket, index) => (
                <div
                  className="flex items-start gap-[24px] w-full mt-[24px] common-container"
                  key={index}
                >
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
                              handleInputChange(index, "type", e.target.value);
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
              ))} */}

              {/* <div className="pb-[8px] mt-[12px] w-full rounded-md border border-[#292929] gradient-slate  pt-[16px] px-[12px]  text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                <div
                  className="flex items-center justify-between "
                  onClick={handleDropdown}
                >
                  <p className="text-sm text-gray-500 uppercase">
                    WHATS INCLUDED
                  </p>
                  <Image
                    src={Dropdown ? arrowdown : arrowdown}
                    width={11}
                    height={11}
                    alt="arrow"
                  />
                </div>
                {Dropdown && (
                  <div>
                    {options?.map((option) => (
                      <div
                        key={option?.id}
                        className="flex items-center justify-between pt-[8px] cursor-pointer"
                        onClick={() => handleOptionToggle(option)}
                      >
                        <div className="flex items-center gap-[10px]  ">
                          <Image
                            src={option.image}
                            width={16}
                            height={16}
                            alt="img"
                          />
                          <p className="text-[16px] text-[#FFFFFF] font-normal items-center">
                            {option.label}
                          </p>
                        </div>
                        {selectedOptions.some((o) => o.id === option.id) && (
                          <Image src={tick} width={10} height={10} alt="tick" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                To use the selected options elsewhere 
                 <div>
                  Selected Options:{" "}
                  {selectedOptions.map((o) => o.label).join(", ")}
                </div>
              </div> */}

              {/* <div className="flex justify-end items-center mt-[12px] ticket-btn">
                <Button
                  className="font-bold h-[32px] py-[8px] px-[12px] gap-[9.75px] flex items-center justify-between rounded-[100px] text-[11px] font-extrabold "
                  onClick={handleAddTicketType}
                >
                  <Image src={addicon} alt="Add-icon" height={12} width={12} />
                  Add Ticket Type
                </Button>
              </div> */}

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
                  <div className="pb-[16px]  w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
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
                    {/* {ticket?.dropdown && (
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
                    )} */}
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
                                width={10}
                                height={10}
                                alt="tick"
                              />
                            )}
                          </div>
                        ))}
                        <div className="column-separator"></div>{" "}
                        {/* Empty div to control the separator placement */}
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
                  // className=" font-bold h-[32px] py-[8px] px-[12px] gap-[9.75px] flex items-center justify-between rounded-[100px] text-[11px] font-extrabold"
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Instagram
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter URL"
                          // value={InstaUrl}
                          className="pt-12 pb-6 font-bold placeholder:font-normal placeholder:text-[#FFFFFF] "
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Twitter
                      </FormLabel>
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Tiktok
                      </FormLabel>
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
                      <FormLabel className="text-sm text-gray-500 absolute left-3 top-2 uppercase pt-[16px] pb-[4px]">
                        Linkedin
                      </FormLabel>
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

                            if (value.startsWith("https://www.linkedin.com/")) {
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
              <div className="flex items-center justify-end lg:gap-[20px] gap-[12px] lg:flex-nowrap md:flex-nowrap wrap-btns mt-[36px]">
                <div className="flex justify-end items-center  edit-btn">
                  <button
                    className="w-full lg:w-fit flex h-[52px] py-[17px] px-[55.25px] lg:py-[12px] lg:px-[68px] edit-btn justify-center items-center rounded-[44px] gap-[6px] gradient-bg gradient-border-edit "
                    // onClick={handlePreviewClick}
                    // onClick={() => setActionType("preview")}
                    // disabled={!isCategorySelected}
                    onClick={(event) => handleFormSubmit(event, "preview")}
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
        {isWalletModalOpen && (
          <WalletChooseModal
            onClose={() => setisWalletModalOpen(false)}
            open={() => setisWalletModalOpen(true)}
            eventData={eventAllData}
          />
        )}
      </div>
    </section>
  );
}
export default OganizerCreateEvent;
