import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import {
  CaretLeft,
  Clock,
  SealCheck,
  StripeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Input } from "../ui/input";
import Image from "next/image";
import { shimmer, toBase64 } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import axios from "axios";
import { API_URL } from "@/lib/client";
import { useEffect, useState } from "react";
import ScreenLoader from "../loader/Screenloader";
import { ErrorToast } from "../reusable-components/Toaster/Toaster";
import { useAppSelector } from "@/lib/hooks";
import { useParams } from 'next/navigation'

const PaymentsModal = ({
  onNext,
  handleNext,
  ticketPrice,
  profileInformation,
  ticketType,
  event,
  ticketIndex
}: {
  onNext: () => void;
  handleNext: any;
  ticketPrice: any;
  profileInformation: any;
  event: any;
  ticketType:any;
  ticketIndex:any

}) => {
  console.log("this is payemtn modal", ticketPrice, profileInformation, event);

  const [loader, setLoader] = useState(false);
  const [userIds, setUserId] = useState<any>();
  const [eventid, setEventid] = useState<any>();
  const [email,setEmail]=useState<any>()
  const params = useParams<any>()
  console.log("this is params",params)
  async function OnclickSubmit() {
    console.log(userIds,eventid,profileInformation,ticketType,ticketIndex,ticketPrice,ticketIndex,"this is ticket type")
    try{
      setLoader(true);
  
      const data = await axios.post(`${API_URL}/create-checkout-session`, {
        userId: userIds,
        ticketType: ticketType,
        ticketPrice: ticketPrice,
        fullName: profileInformation?.full_name,
        email: email,
        phoneNo:profileInformation?.phone,
        eventId: params?.id,
        ismobile:false,
        isindex:ticketIndex
      });
     
      setLoader(false);
      

      if (data?.data?.url) {
        typeof window !== "undefined"?  window.location.href =data?.data?.url :null
      } else {
        console.error("No URL received");
      }

    }catch(error:any){
      setLoader(false)
      ErrorToast(error?.response?.data?.error      )
      console.log("this is the error",error)
    }
  }
  

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
      const email=localStorage.getItem("email")
      setEmail(email)
    setUserId(token);
  }, []);


  
  const EventData = useAppSelector(
    (state) => state?.getEventByEventID?.eventIdEvents?.data
  );
  console.log("my data in apayment modal", EventData);

  const ConvertDate = (originalDateStr: string): string => {
    const originalDate = new Date(originalDateStr);
  
    // Extract the day, date, month, and year
    const dayOfWeek = originalDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const date = originalDate.getDate();
    const month = originalDate.toLocaleDateString("en-US", { month: "long" });
    const year = originalDate.getFullYear();
  
    // Function to get ordinal suffix
    const getOrdinalSuffix = (date: number) => {
      if (date > 3 && date < 21) return "th"; // covers 11th to 19th
      switch (date % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
  
    const ordinalSuffix = getOrdinalSuffix(date);
  
    // Construct the formatted date string
    const formattedDate = `${dayOfWeek}, ${date}${ordinalSuffix} ${month} ${year}`;
  
    return formattedDate;
  };


  useEffect(() => {
    const currentUrl:any =  typeof window !== "undefined" ? window.location.href:null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventid(value);
    console.log("my event id is", value);
    // dispatch(getEventById(value));
  }, []);

  
  return (
    <DialogContent className="sm:max-w-md lg:max-w-[650px]">
      {loader && <ScreenLoader />}
      <ScrollArea className="max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            <div className="flex items-center gap-4 pb-4">
              <button
                onClick={() => handleNext("CompleteYourProfile")}
                className="bg-white/10 p-2 w-fit rounded-full cursor-pointer"
              >
                <CaretLeft size={17} weight="bold" />
              </button>
              <p>Payments</p>
            </div>
          </DialogTitle>
          <Separator className="scale--[1.12] bg-[#292929]" />
        </DialogHeader>

        <div>
          <div className="flex justify-between mt-6">
            <p className="text-muted text-sm">YOUR PURCHASE</p>
            {/* <p className="font-light flex space-x-1">
              <Clock size={20} className="text-primary" weight="fill" />
              <span className="font-bold text-primary pr-1">12:43 </span>{" "}
              <span className="hidden lg:block">left to finish the order</span>
              <span className="lg:hidden">left to order</span>
            </p> */}
          </div>
          <div className="flex flex-col gap-3 border border-muted rounded-lg pb-2 pt-4 px-4 mt-2">
            <div className="border border-muted p-3 rounded-lg">
              <div className="flex gap-4">
                <Image
                  src={EventData?.coverEventImage
                    }
                  width={800}
                  height={800}
                  className="w-[60px] rounded-lg object-cover"
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 1800)
                  )}`}
                  alt="event"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-primary text-sm">
                      {ConvertDate(EventData?.startTime)}
                    </p>
                    <p className="font-bold leading-[1.2] my-1">
                      {EventData?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <p style={{fontWeight:"bold"}} className="font-light">{ticketType}</p>
              <p className="font-bold">£{ticketPrice}</p>
            </div>
            {/* <div className="flex justify-between">
              <p className="font-light">Regular Package</p>
              <p className="font-bold">£{ticketPrice}</p>
            </div>{" "}
            <div className="flex justify-between mb-2">
              <p className="font-light">Fees</p>
              <p className="font-bold">£{ticketPrice}</p>
            </div> */}
            {/* <Input placeholder="ENTER CODE" /> */}
            {/* <div className="flex justify-between">
              <p className="font-light">Discount</p>
              <div className="flex items-center gap-1 font-light text-sm">
                <SealCheck
                  className="text-white translate-y-[-0.1rem]"
                  size={15}
                  weight="fill"
                />
                <div className="text-[#BFBFBF] items-center flex gap-1">
                  <p className="line-through">£31.16</p>
                  <p>12%</p>
                </div>
              </div>
            </div> */}
            <Separator />
            <div className="flex justify-between mb-2 font-bold">
              <p>Total</p>
              <p>£{ticketPrice}</p>
            </div>
          </div>
          <p className="text-sm mt-6">PAYMENT METHOD</p>
          <div className="flex justify-between items-center font-bold border border-muted rounded-lg p-3 mt-3">
            <p>Credit/Debit Card</p>
            <StripeLogo size={18} weight="fill" />
          </div>
        </div>
        <DialogFooter className="w-full mt-4 pt-4 bg-[#101010] border-t border-muted">
          <Button onClick={OnclickSubmit} className="w-full">
            Pay: £{ticketPrice}
          </Button>
        </DialogFooter>
      </ScrollArea>
    </DialogContent>
  );
};

export default PaymentsModal;
