"use client";
import { getEventsByUID } from "@/lib/middleware/organizer";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateLiveActivity } from "@/lib/middleware/profile";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect, useRef } from "react";
import { getUserByID, updateProfile } from "@/lib/middleware/profile";
import ScreenLoader from "@/components/loader/Screenloader";
import {
  SuccessToast,
  ErrorToast,
} from "@/components/reusable-components/Toaster/Toaster";
import api from "@/lib/apiInterceptor";
import add from "@/assets/Plus.svg";
import { styled } from "@mui/material/styles";
import { API_URL } from "@/lib/client";
import { usePathname } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import tick from "@/assets/fi-rr-check.svg";
import Link from "next/link";
import { getScannerByEventID } from "@/lib/middleware/scanner";

type Option = {
  id: number;
  label: string;
};
const options: Option[] = [
  { id: 1, label: "Naitram Launch Party 2024" },
  { id: 2, label: "Takeovr Party 2024" },
  { id: 3, label: "Women Party" },
  { id: 4, label: "Takeovr Party 2024" },
  { id: 5, label: "Takeovr Party 2024" },
  { id: 6, label: "Takeovr Party 2024" },
];

const formSchema = z.object({
  full_name: z.string().min(2, { message: "name cannot be empty." }),
});

const ScannerLogin = () => {
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  // const [selectedEventID, setSelectedEventID] = useState();
  const [selectedEventID, setSelectedEventID] = useState<number | undefined>(undefined);

  const [Dropdown, setDropdown] = useState(true);
  const [validationError, setValidationError] = useState("");
  const [eventName,setEventName]=useState<any>("")
  const userLoading = useAppSelector((state) => state?.getUserDetail);

  useEffect(() => {
    const userid =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("user id ", userid);

    dispatch(getEventsByUID(userid));
  }, []);

  const EventsData = useAppSelector(
    (state) => state?.getEventsByUID?.myEvents?.data
  );
  console.log("my events data", EventsData);

  const EventScanner = useAppSelector(
    (state) => state?.getScannerbyEID?.myScanners?.data
  );

  console.log("my events Scanner", EventScanner);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
    },
  });

  useEffect(() => {
    const userid = localStorage.getItem("_id");
    console.log("user id ", userid);
    dispatch(getUserByID(userid));
  }, []);

  const handleOptionToggle = (option: Option) => {
    if (selectedOptions.some((o:any) => o.id === option.id)) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions([option]);
      dispatch(getScannerByEventID(option?.id));
      setSelectedEventID(option?.id)
    }
  };

  console.log("my selected options", selectedOptions);

  return (
    <div className="w-full lg:w-[600px] md:ps-[90px] lg:ps-[100px] xl:ps-[172px] md:mx-auto mt-[44px] px-[24px] lg:px-[0px] md:mt-[90px] lg:mx-0 relative lg:h-[auto] h-[90vh]">
      {loader && <ScreenLoader />}
      {userLoading?.loading && <ScreenLoader />}

      <h2 className="font-extrabold ms-[24px] md:ms-[0px] text-[20px] lg:text-[24px]">
        Event Selection
      </h2>
      <div className="pb-[8px] mt-[44px] mb-[30px] lg:mb-[20px] w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold lg:pb-[12px] pb-[16px] text-white">
            Choose Event
          </p>
        </div>
        <Separator className="scale--[1.12] bg-[#292929]" />
        {Dropdown && (
          <div className="pt-[16px] lg:pt-[12px]">
            {EventsData?.data?.map((option: any) => (
              <div
                key={option?.id}
                className="flex items-center justify-between pt-[2px] cursor-pointer"
                onClick={() => handleOptionToggle(option)}
              >
                <div className="flex items-center gap-[10px]">
                  <p className="text-[14px] text-[#FFFFFF] font-normal items-center">
                    {option?.name}
                  </p>
                </div>
                {selectedOptions.some((o:any) => o.id === option.id) && (
                  <Image src={tick} width={10} height={10} alt="tick" />
                )}
              </div>
            ))}
          </div>
        )}
        {validationError && (
          <p className="text-red-500 text-sm mt-2">{validationError}</p>
        )}
      </div>
      <Link href={`/organizer-event/add-scanner/${selectedEventID}`}>
        <div className="flex mb-[24px] lg:mb-[32px] justify-end">
          <Button
            type="submit"
            className="max-w-fit gradient-border-btn rounded-[44px] bg-[black] text-[#00D059] font-extrabold py-[8px] lg:py-[16px] lg:px-[24px] px-[12px] text-sm md:text-base md:w-fit"
          >
            <Image
              src={add}
              alt="add"
              className="me-[8px] w-[12px] h-[12px] lg:w-[20px] lg:h-[20px]"
            />{" "}
            New Scanner
          </Button>
        </div>
      </Link>
      <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[60px] mt-[34px]  lg:mt-[32px]">
        <div className="flex w-full  md:w-full lg:w-[600px] flex-col lg:flex-col gap-6 md:gap-8 mt-[0px] lg:mt-[32px]">
          <div className="w-full md:w-full lg:w-[428px]">
            {selectedOptions.length > 0 && (
              <h3 className="text-sm font-normal lg:text-[24px] lg:font-extrabold mb-[10px] lg:mb-[16px] ">
               {selectedOptions[0]?.name}
              </h3>
            )}

            <Form {...form}>
              <form
                // onSubmit={form.handleSubmit(updateActivity)}
                className="w-full"
              >
                {EventScanner?.length > 0 ? (
                  EventScanner?.map((event: any, index: any) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem className="relative mb-4 md:mb-6 space-y-0">
                          <FormLabel className="text-[14px] lg:text-[16px] lg:font-extrabold text-white font-bold absolute left-3 top-3">
                            {event?.email}{" "}
                            {/* Use event.label to display dynamic label */}
                          </FormLabel>
                          <FormControl>
                            <Input
                              readOnly
                              value={event?.isadmin ? "Admin" : "Generic"}
                              placeholder={event?.isadmin ? "Admin" : "Generic"}
                              className="text-[#8F8F8F] pt-11 pb-5 text-[12px] placeholder:font-bold"
                              // {...field}
                              // onChange={(e) => {
                              //   setFbUrl(e.target.value); // Update this function as needed
                              //   field.onChange(e);
                              // }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))
                ) : (
                  <>{selectedOptions.length > 0 && <h1>No Scanner Found</h1>}</>
                )}
              </form>
            </Form>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerLogin;
