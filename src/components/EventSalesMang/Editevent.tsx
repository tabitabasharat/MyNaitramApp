"use client";
import React from "react";
// import "./CreateEvent.css";
import "@/components/create-event/CreateEvent.css";
import Image from "next/image";
import ufo from "@/assets/UFO_SVG.png";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useRef, useEffect } from "react";
import Editicon from "@/assets/Editicon.svg";
import addicon from "@/assets/add-icon.svg";
import greenpencile from "@/assets/Pencil.svg";
import bgframe from "@/assets/Frame 1597878544.svg";
import Link from "next/link";
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
import { getEventByEventId } from "@/lib/middleware/event";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import { createevent } from "@/lib/middleware/event";
import api from "@/lib/apiInterceptor";
import arrowdown from "@/assets/aboutdropdown.svg";
import arrowup from "@/assets/Arrow up.svg"
import img1 from "../../assets/Handbag (1).svg";
import img2 from "../../assets/Cake.svg";
import img3 from "../../assets/Crown.svg";
import img4 from "../../assets/Shield Star.svg";
import tick from "../../assets/fi-rr-check.svg";
import { updateEvent } from "@/lib/middleware/event";
import Protectedroute from "@/lib/ProtectedRoute/Protectedroute";
import Backward from "../Backward/Backward";
import Editbutton from "../ui/Editbutton";
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
const formSchema = z.object({
  eventname: z.string().min(1, { message: "Event name cannot be empty." }),
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

  compticketno: z.any().refine((val) => val !== undefined && val !== null, {
    message: "Complimentary ticket cannot be empty.",
  }),

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
    .url({ message: "Invalid LinkedIn URL." })
    .min(1, { message: "LinkedIn URL cannot be empty." }),
    twitterurl: z
    .string()
    .url({ message: "Invalid Twitter URL." })
    .min(1, { message: "Twitter URL cannot be empty." }),
  telegramurl: z
    .string()
    .url({ message: "Invalid Telegram URL." })
    .min(1, { message: "Twitter URL cannot be empty." }),

  // eventmainimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  eventcoverimg: z.string().nonempty({ message: "Image URL cannot be empty." }),
  eventmainimg: z.string().optional(),

  tickets: z
    .array(
      z.object({
        type: z.string().min(1, { message: "Ticket type cannot be empty." }),
        price: z.any(),
        no: z.any(),
        options: z
          .array(
            z.object({
              id: z.number(),
              label: z.string(),
            })
          )
          .optional(),
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
type GalleryFile = File | { type: any; url: any };

function Editevent() {
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

  // const [galleryFiles, setGalleryFiles] = useState<GalleryFile[]>([]);
  // const [galleryFiles, setGalleryFiles] = useState<{ file: File; url: string }[]>([]);
  const [eventID, setEventId] = useState("");

  useEffect(() => {
    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventId(value);
    console.log("my event id is", value);
    dispatch(getEventByEventId(value));
  }, []);
  const EventData = useAppSelector(
    (state) => state?.getEventByEventID?.eventIdEvents?.data
  );

  console.log("my event data ", EventData);

  const imageUrl = EventData?.coverEventImage.startsWith("http") || EventData?.coverEventImage.startsWith("https")
    ? EventData?.coverEventImage
    : bgframe;
  console.log("image src is", imageUrl);
  const userLoading = useAppSelector((state) => state?.getEventByEventID);
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

      fburl: "",
      instaurl: "",
      youtubeurl: "",
      telegramurl: "",
      tiktokurl: "",
      twitterurl:"",
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

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const filesArray = Array.from(event.target.files).map((file) => ({
  //       file, // Keep the original file object
  //       url: URL.createObjectURL(file), // Create an object URL for the file
  //       type: file.type.startsWith("video") ? "video" : "image", // Determine type based on file type
  //     }));

  //     setGalleryFiles((prevFiles) => [...prevFiles, ...filesArray]);
  //   }
  // };
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const filesArray = Array.from(event.target.files);
  //     const newFiles = filesArray.map(file => ({
  //       file,
  //       url: URL.createObjectURL(file),
  //     }));
  //     setGalleryFiles(prevFiles => [...prevFiles, ...newFiles]); // Update state with all selected files
  //   }
  // };

  const handleFileChangeapi = async () => {
    if (galleryFiles) {
      setLoader(true);

      try {
        const filesArray = Array.from(galleryFiles);

        console.log("Gallery files:", filesArray);

        const formData = new FormData();

        filesArray.forEach((file: any) => formData.append("files", file));

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
  // const handleFileChangeapi = async () => {
  //   if (galleryFiles && galleryFiles.length > 0) {
  //     setLoader(true);

  //     try {
  //       const formData = new FormData();

  //       // Filter to include only files that are instances of File
  //       galleryFiles
  //         .filter((file) => file instanceof File)
  //         .forEach((file) => formData.append("files", file));

  //       // Upload files to the server
  //       const res: any = await api.post(
  //         `${API_URL}/upload/uploadMultiple`,
  //         formData
  //       );

  //       if (res?.status === 200) {
  //         setLoader(false);
  //         setEventsFile(res?.data?.imageUrls);
  //         SuccessToast("Images Uploaded Successfully");
  //         return res?.data?.imageUrls;
  //       } else {
  //         setLoader(false);
  //         ErrorToast(res?.payload?.message || "Error uploading image");
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       setLoader(false);
  //     }
  //   }
  // };

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

  // const removeImage = (index: number) => {
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

  useEffect(() => {
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserid(userID);
    console.log("user ID logged in is", userID);
  }, []);

  const filteredTicketTypes = ticketTypes.map((ticket) => ({
    type: ticket?.type,
    price: ticket?.price,
    no: ticket?.no,
    options: ticket?.options?.map((option) => ({
      id: option?.id,
      label: option?.label,
    })),
  }));
  async function EventCreation(values: z.infer<typeof formSchema>) {
    console.log("my values", values);
    console.log(" Event Creation");

    setLoader(true);

    // const EventMediaAlready = EventData?.eventmedia;
    const EventMediaAlready = [...(EventData?.eventmedia || [])];
    const imagesOfGallery = await handleFileChangeapi();
    console.log("images of gallery", imagesOfGallery, EventMediaAlready);

    // Use concat to add new images to the copied array
    const updatedEventMedia = EventMediaAlready.concat(imagesOfGallery);

    console.log("images updated", updatedEventMedia);
    // const imagesOfGallery = await handleFileChangeapi();
    // console.log("imge o gallery",imagesOfGallery,EventMediaAlready)
    // for (let i of imagesOfGallery ){
    //   EventMediaAlready.push(i)
    //   console.log(i)

    // }

    // console.log("image os updaed",EventMediaAlready)
    try {
      const data = {
        userId: userid,
        eventId: eventID,
        name: Eventname || EventData?.name || "",
        category: EventCategory || EventData?.category || "",
        eventDescription: Eventdescription || EventData?.eventDescription || "",
        location: EventLocation || EventData?.location || "",
        ticketStartDate: TicketStartDate || EventData?.ticketStartDate || "",
        ticketEndDate: TicketEndDate || EventData?.ticketEndDate || "",
        startTime: EventStartTime || EventData?.startTime || "",
        endTime: EventEndTime || EventData?.endTime || "",
        // mainEventImage: MainImg || EventData?.mainEventImage || "",
        coverEventImage: CoverImg || EventData?.coverEventImage || "",

        tickets: filteredTicketTypes || EventData?.tickets || "",
        totalComplemantaryTickets:
          CompTicketNo || EventData?.totalComplemantaryTickets || "",
        fbUrl: FBUrl || EventData?.fbUrl || "",
        instaUrl: InstaUrl || EventData?.instaUrl || "",
        youtubeUrl: YoutubeUrl || EventData?.youtubeUrl || "",
        twitterUrl: TwitterUrl || EventData?.twitterUrl || "",
        tiktokUrl: tiktokUrl || EventData?.tiktokUrl || "",
        linkedinUrl: linkedinUrl || EventData?.linkedinUrl || "",
        eventmedia: updatedEventMedia || EventData?.eventmedia || "",
      };
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
  console.log("Form errors:", form.formState.errors);

  useEffect(() => {
    if (EventData) {
      if (EventData?.mainEventImage) {
        const imageName =
          EventData?.mainEventImage.split("/").pop() || "Upload Image";
        setMainImgName(imageName);
      }

      // if (EventData?.eventmedia) {
      //   const files = EventData?.eventmedia.map((url: any) => ({
      //     type:
      //       url?.endsWith(".mp4") ||
      //       url?.endsWith(".avi") ||
      //       url?.endsWith(".mov") ||
      //       url?.endsWith(".mkv")
      //         ? "video"
      //         : "image",
      //     url,
      //   }));
      //   setGalleryFiles(files);
      // }
      if (EventData?.eventmedia) {
        const files = EventData?.eventmedia
          .map((media: any) => {
            if (typeof media === "string") {
              // Handling URLs
              return {
                type:
                  media.endsWith(".mp4") ||
                  media.endsWith(".avi") ||
                  media.endsWith(".mov") ||
                  media.endsWith(".mkv")
                    ? "video"
                    : "image",
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

      const ticketsWithCheckedOptions = EventData?.tickets?.map(
        (ticket: any) => ({
          ...ticket,
          options: ticket?.options?.map((option: any) => ({
            ...option,
            checked: ticket?.options.some((o: any) => o?.id === option?.id), // Ensure checked options are marked
          })),
        })
      );

      setTicketTypes(ticketsWithCheckedOptions);
      // const mainimgName = EventData?.mainEventImage.split("/").pop();

      form.reset({
        eventname: EventData?.name || form.getValues("eventname"),
        eventcategory: EventData?.category || form.getValues("eventcategory"),
        eventdescription:
          EventData?.eventDescription || form.getValues("eventdescription"),
        eventlocation: EventData?.location || form.getValues("eventlocation"),
        eventstartdate:
          EventData?.ticketStartDate || form.getValues("eventstartdate"),
        eventenddate:
          EventData?.ticketEndDate || form.getValues("eventenddate"),

        eventstarttime:
          EventData?.startTime || form.getValues("eventstarttime"),
        eventendtime: EventData?.endTime || form.getValues("eventendtime"),
        //  eventmainimg: mainimgName || form.getValues("eventmainimg"),
        eventcoverimg:
          EventData?.coverEventImage || form.getValues("eventcoverimg"),

        compticketno:
          EventData?.totalComplemantaryTickets ||
          form.getValues("compticketno"),
        fburl: EventData?.fbUrl || form.getValues("fburl"),
        instaurl: EventData?.instaUrl || form.getValues("instaurl"),
        youtubeurl: EventData?.youtubeUrl || form.getValues("youtubeurl"),
        telegramurl: EventData?.twitterUrl || form.getValues("telegramurl"),
        tiktokurl: EventData?.tiktokUrl || form.getValues("tiktokurl"),
        linkedinurl: EventData?.linkedinUrl || form.getValues("linkedinurl"),
        tickets: ticketsWithCheckedOptions || form.getValues("tickets"),
      });
    }
  }, [EventData]);

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

  return (
    <section
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
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
                src={CoverImg || imageUrl}
                alt="bg-frame"
                className="w-full lg:w-[392px] lg:h-[392px] h-[345px] "
                width={100}
                height={345}
              />
              {/* <Image
                src={CoverImg || imageUrl}
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
                    <Image src={greenpencile} alt="pencil" />
                    <p className="text-[#00D059] text-sm font-extrabold">
                      Edit Image
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
            <div className="gradient-slate w-full pt-[16px] pb-[16px] px-[24px] h-[424px] create-container-head relative ">
              <div>
                {galleryFiles?.length > 0 && (
                  <div className="mt-4 pb-4 relative">
                    <div className="flex flex-wrap gap-[12px]">
                      {galleryFiles.length > 0 && (
                        <div className="mt-4 pb-4 relative">
                          <div className="flex flex-wrap gap-[13px]">
                            {galleryFiles.map((file: any, index) => (
                              <div
                                key={index}
                                className="relative w-[120px] h-[120px] rounded-[12px]"
                              >
                                {file?.type === "video" ? (
                                  <video
                                    src={
                                      typeof file.url === "string"
                                        ? file.url
                                        : URL.createObjectURL(file)
                                    }
                                    className="w-full h-full object-cover relative rounded-[12px]"
                                    width={120}
                                    height={120}
                                    controls
                                  >
                                    Your browser does not support the video tag.
                                  </video>
                                ) : (
                                  <img
                                    src={
                                      typeof file.url === "string"
                                        ? file.url
                                        : URL.createObjectURL(file)
                                    }
                                    alt={`Gallery Image ${index + 1}`}
                                    className="w-full h-full object-cover relative rounded-[12px]"
                                    width={120}
                                    height={120}
                                  />
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
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <label
                  htmlFor="galleryUpload"
                  className={`pb-3 gallery-box-same  border-none font-bold border border-[#292929] placeholder:font-normal gradient-slatee rounded-md cursor-pointer flex justify-center items-end pr-[40px] ${
                    galleryFiles.length > 0
                      ? " gallery-box h-full"
                      : "pt-9 gallery-top"
                  }`}
                >
                  <div className="flex justify-center items-center  rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]"
                  style={{
                    position:"absolute",
                    bottom:"24px"
                  }}>
                    <Image src={greenpencile} alt="pencil" />
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
        <div className="px-[24px] py-[16px] relative create-container mt-[32px]">
          <div className="flex justify-between">
            <h1 className="text-[24px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
              {" "}
              Host <span className="text-primary">Event</span>
            </h1>
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
              onSubmit={(event) => {
                console.log("Form submit triggered");
                form.handleSubmit(EventCreation)(event);
              }}
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
                          // value={Eventdescription}
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
              {ticketTypes.map((ticket, index) => (
                <div
                  className="flex flex-col gap-[12px] w-full mt-[24px] common-container"
                  key={index}
                >
                  <div className="flex items-center gap-[24px]">
                    {/* Event Ticket Type Field */}
                    <FormField
                      control={form.control}
                      name={`tickets.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="relative w-full space-y-0">
                          <FormLabel className="text-sm text-gray-500 absolute left-3 top-0 uppercase pt-[16px] pb-[4px]">
                          Event Ticket Name
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
                          Event Ticket Price (£)
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
                  <FormField
                    control={form.control}
                    name={`tickets.${index}.options`}
                    render={({ field }) => (
                      <FormItem className="pb-[8px] w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                        <div
                          className="flex items-center justify-between"
                          onClick={() => handleDropdown(index)}
                        >
                          <p className="text-sm text-gray-500 uppercase">
                            WHATS INCLUDED
                          </p>
                          <Image
                            src={ticket?.dropdown ? arrowup : arrowdown}
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
                                onClick={() =>
                                  handleOptionToggle(index, option)
                                }
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
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}

              {/* What's Included Section */}
              {/* <div className="pb-[8px]  w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
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
                  </div> */}

              {/* Add Ticket Type Button */}
              <div className="flex justify-end items-center mt-[12px] ticket-btn">
                <Button
                  className=" h-[32px] py-[8px] px-[12px] gap-[9.75px] flex items-center justify-between rounded-[100px] text-[11px] font-extrabold"
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
                  name="twitterurl"
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
                  className=" flex  justify-center items-center font-bold py-[12px] px-[68px] rounded-[200px]  font-extrabold h-[52px] edit-btn"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
export default Editevent;
