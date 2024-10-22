// components/LiveAccntSetting.js
"use client";
import Image from "next/image";
import GradientBorder from "../ui/gradient-border";
import { shimmer, toBase64 } from "@/lib/utils";
import { Button } from "../ui/button";
import cam from "@/assets/Camera.svg";
import crossicon from "@/assets/cross-img-icon.svg";
import "@/components/create-event/CreateEvent.css";
import docicon from "@/assets/Wallet/docs.png";
import linkimg from "@/assets/Wallet/Link Simple.svg";
import backward from "@/assets/Back - Button.svg";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import upload from "@/assets/material-symbols_upload.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import ScreenLoader from "../loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import { createHelpCenter } from "@/lib/middleware/profile";
import { API_URL } from "@/lib/client";
import api from "@/lib/apiInterceptor";

const formSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Subject cannot be empty." })
    .regex(/^[A-Za-z\s]+$/, { message: "Subject must contain only letters." }),
  description: z.string().min(1, { message: "Description cannot be empty." }),
});

const Helpcenter = ({
  className,
  setPopupOpen,
}: {
  className?: string;
  setPopupOpen?: any;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [Subject, setSubject] = useState("");
  const [Description, setDescription] = useState("");
  const [imgSrc, setImageSrc] = useState<any>("");
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [eventsFiles, setEventsFile] = useState<any>([]);
  const [attachmentmsg, setattachmentmsg] = useState<any>(false);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const filesArray = Array.from(event.target.files);
  //     setGalleryFiles((prevFiles) => [...prevFiles, ...filesArray]); // Update state with all selected files
  //   }
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      setGalleryFiles((prevFiles) => {
        const totalFiles = prevFiles.length + filesArray.length;

        if (totalFiles > 10) {
          setattachmentmsg(true);

          return prevFiles;
        }

        return [...prevFiles, ...filesArray];
      });
    }
  };
  const removeImage = (index: number) => {
    setGalleryFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      description: "",
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

  const handleSingleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    console.log("Selected r img is:", file);

    if (file) {
      setLoader(true);

      try {
        const formData = new FormData();
        formData.append("file", file);
        const filename = file?.name;
        console.log("file name", filename);
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

          console.log("File uploaded", res);
          setImageSrc(res?.data?.data);
          console.log(res?.data?.data, "this is the file url");
          SuccessToast("File Uploaded Successfully");
        } else {
          setLoader(false);
          ErrorToast(res?.payload?.message || "Error uploading image");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  async function createCenter(values: z.infer<typeof formSchema>) {
    console.log("my val", values);
    setLoader(true);
    const imagesOfGallery = await handleFileChangeapi();
    const userID =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    try {
      const data = {
        userId: userID,
        subject: Subject,
        description: Description,
        Attachments: imagesOfGallery,
      };
      dispatch(createHelpCenter(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("Profile res", res?.payload?.data);
          SuccessToast("Submitted Successfully");
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

  return (
    <section className="min-h-screen bg-cover bg-no-repeat bg-reward">

    <div className="lg:pt-[134px] lg:pb-[116px] w-full xl:w-[80%] pb-[74px] py-[139px] md:px-[100px] lg:px-[216px] px-[24px]">
    <div className="flex gap-[16px] mb-[25px] md:mb-[32px] items-center ">
            <button onClick={() => router.back()}>
              <Image
                src={backward}
                alt="backward-btn"
                className="md:w-[38px] md:h-[38px] h-[28px] w-[28px]"
              />
            </button>
            <h3 className="font-extrabold text-[20px] lg:text-[24px] ">
            Help Center
            </h3>
          </div>
      {/* <h2 className="font-bold ms-[24px] lg:ms-[0px] text-[24px] lg:text-[32px] mb-[24px] sm:mb-[53px] lg:text-[16px]">
        Help Center
      </h2> */}
      <div className="flex gap-[8px] hidden">
        {["General", "Account", "Login"].map((text, index) => (
          <div
            key={index}
            style={{
              background:
                activeDiv === index
                  ? "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box"
                  : "linear-gradient(#0F0F0F, #1A1A1A) padding-box",
              borderImage:
                activeDiv === index
                  ? "linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%)"
                  : "none",
              borderImageSlice: activeDiv === index ? 1 : undefined,
            }}
            className={`text-sm font-bold p-[12px] rounded-[44px] border w-[92px] text-center cursor-pointer ${
              activeDiv === index
                ? "text-green-500 border-[0.86px] rounded-[44px] bg-[#1A1A1A]"
                : "text-[#E6E6E6] border-[#FFFFFF0F] gradient-slate"
            }`}
            onClick={() => handleClick(index)}
          >
            {text}
          </div>
        ))}
      </div>
      <div className="flex flex-col lg:flex-col gap-6 md:gap-8 mt-[12px] lg:mt-[30]">
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(createCenter)}
              className=" w-full"
            >
              {/* <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="relative mb-[12px] md:mb-[20px] space-y-0">
                    <FormLabel className="text-[12px] text-[#8F8F8F] font-extrabold md:font-bold absolute left-3 top-3">
                      SUBJECT
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Subject"
                        className="pt-11 pb-5 text-[#D9D9D9] text-base placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          setSubject(e.target.value);
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
                name="subject"
                render={({ field }) => (
                  <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                    <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                      SUBJECT
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Subject"
                        className="pt-11 pb-5 text-[#D9D9D9] text-base placeholder:font-normal"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Prevent leading space
                          if (value.trimStart().length === 0) {
                            setSubject("");
                            field.onChange("");
                          } else {
                            setSubject(value);
                            field.onChange(value);
                          }
                        }}
                        onKeyDown={(e) => {
                          // Prevent leading space
                          if (e.key === " " && field.value.length === 0) {
                            e.preventDefault();
                          }
                          // Allow letters and spaces
                          if (
                            !/^[A-Za-z\s]*$/.test(e.key) &&
                            !["Backspace", "Tab"].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="relative mb-[12px] md:mb-[20px] space-y-0">
                    <FormLabel className="text-[12px] text-[#8F8F8F] font-bold absolute left-3 top-3">
                      DESCRIPTION
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Vorem ipsum dolor sit amet consectetur"
                        className="pt-[36px] pb-5 h-[136px] text-[#D9D9D9] text-base placeholder:font-normal resize-none"
                        {...field}
                        onChange={(e) => {
                          setDescription(e.target.value);
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
                name="description"
                render={({ field }) => (
                  <FormItem className="relative mb-[16px] md:mb-4 space-y-0">
                    <FormLabel className="text-[12px] mb-3 z-1 font-bold w-[98%] sm:w-[99%] lg:w-[99%] h-[27%] mt-[0.5px] gradient-slate text-[#8F8F8F] absolute ps-3 left-1 pt-3 top-0">
                      DESCRIPTION
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Vorem ipsum dolor sit amet consectetur"
                        className="pt-[36px] pb-5 h-[136px] text-[#D9D9D9] text-base placeholder:font-normal  resize-none"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Prevent leading space
                          if (value.trimStart().length === 0) {
                            setDescription("");
                            field.onChange("");
                          } else {
                            setDescription(value);
                            field.onChange(value);
                          }
                        }}
                        onKeyDown={(e) => {
                          // Prevent leading space
                          if (e.key === " " && field.value.length === 0) {
                            e.preventDefault();
                          }
                          // Allow letters, numbers, and spaces
                          if (
                            !/^[A-Za-z0-9\s]*$/.test(e.key) &&
                            !["Backspace", "Tab"].includes(e.key)
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full border border-muted rounded-[12px]">
                <div className="ps-[12px] pr-[24px] py-[16px] relative create-container  w-full">
                  <div className="flex justify-between">
                    <h1 className="text-[16px] font-extrabold -tracking-[0.02em] leading-[27.6px]">
                      {" "}
                      ATTACHMENTS
                    </h1>
                    {/* <Image src={Editicon} alt="Edit-icon" /> */}
                  </div>

                  <Image
                    src={linkimg}
                    width={28}
                    height={28}
                    className="absolute right-[20px] bottom-0 top-[31%]"
                    alt="ufo"
                  />
                </div>
                <div
                  className={`  gradient-slate w-full pt-[16px] pb-[16px] ps-[12px] pr-[24px] h-[300px] lg:h-[330px] create-container-head relative ${
                    galleryFiles.length > 0
                      ? "block"
                      : "flex items-center justify-center lg:h-[200px]"
                  }`}
                >
                  {galleryFiles?.length > 0 ? (
                    <>
                      <div className="pb-[20px] relative">
                        <p className="pb-[8px] text-[#D9D9D980] text-[12px]">
                          Maximum 10 attachments can be uploaded
                        </p>
                        <div className="flex flex-wrap gap-[24px] lg:gap-[13px] max-h-[148px] lg:max-h-[206px] pt-[9px] overflow-auto">
                          {galleryFiles?.map((file, index) => {
                            const isVideo = file.type.startsWith("video/");
                            const isImage = file.type.startsWith("image/");
                            const isDocument =
                              file.type === "application/pdf" ||
                              file.type === "application/msword" ||
                              file.type ===
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                              file.type === "application/vnd.ms-excel" ||
                              file.type ===
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                              file.type === "application/vnd.ms-powerpoint" ||
                              file.type ===
                                "application/vnd.openxmlformats-officedocument.presentationml.presentation";

                            return (
                              <div
                                key={index}
                                className="relative h-[57px] w-[57px] lg:w-[80px] lg:h-[80px] rounded-[12px]"
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
                                ) : isDocument ? (
                                  <div className="w-full h-full flex items-center justify-center gradient-slate border border-muted text-gray-500 rounded-[12px]">
                                    <Image
                                      src={docicon} // Replace with your document icon
                                      alt="Document Icon"
                                      className="w-[40px] h-[40px]"
                                    />
                                  </div>
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
                          className="flex justify-center items-center rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]"
                          style={{ position: "absolute", bottom: "24px" }}
                        >
                          <Image
                            src={upload}
                            alt="pencil"
                            className="md:w-[22px] md:h-[22px] w-[16px] h-[16px]"
                          />
                          <p className="text-base font-extrabold mb-0 ">
                            Attachment
                          </p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*, video/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, text/plain"
                          className="hidden"
                          id="galleryUpload"
                          onChange={handleFileChange}
                          disabled={galleryFiles.length >= 10}
                        />
                      </label>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="py-[24px] flex items-center flex-col gap-[14px] justify-center w-[230px] sm:w-[300px] rounded-[12px] gradient-slate box-shadow-inset-empty border-gradient-emptyF">
                        <p className="text-[16px] text-extrabold">
                          There's No Attachment
                        </p>

                        <label
                          htmlFor="galleryUpload"
                          className={`pb-0 gallery-box-same border-none font-bold border border-[#292929] placeholder:font-normal gradient-slatee rounded-md cursor-pointer flex justify-center items-end  ${
                            galleryFiles.length > 0
                              ? " gallery-box"
                              : " gallery-tops"
                          }`}
                        >
                          <div className="flex justify-center items-center rounded-[44px] gap-[6px] w-[151px] gradient-bg gradient-border-edit p-[12px]">
                            <Image
                              src={upload}
                              alt="upload"
                              className="md:w-[22px] md:h-[22px] w-[16px] h-[16px]"
                            />
                            <p className="text-base font-extrabold mb-0 ">
                              Attachment
                            </p>
                          </div>

                          <input
                            type="file"
                            multiple
                            accept="image/*, video/*"
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
              {attachmentmsg == true && (
                <p className="text-[red] text-[12px] pt-[8px]">
                  You have reached your limit
                </p>
              )}

              <div className="flex justify-start  mt-[36px] md:mt-[50px]  mb-[70px] w-[100%] lg:w-[200px]">
                <Button
                  type="submit"
                  className="w-full p-[12px] font-extrabold py-[12px] text-sm md:text-base "
                  disabled={
                    eventsFiles.length === 0 && galleryFiles.length === 0
                  }
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Helpcenter;
