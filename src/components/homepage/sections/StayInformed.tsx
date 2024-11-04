import EventCard from "@/components/reusable-components/EventCard";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { events } from "@/lib/dummyData";
import { Envelope } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import ufo from "@/assets/ufo.png";
import GradientBorder from "@/components/ui/gradient-border";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { StayInformedEmail } from "@/lib/middleware/signin";
import {
  ErrorToast,
  SuccessToast,
} from "@/components/reusable-components/Toaster/Toaster";
import { getViewPastEventsBox } from "@/lib/middleware/event";

const StayInformed = () => {
  const [Email, setEmail] = useState<any>("");
  const [loader,setLoader] = useState(false);
  const dispatch = useAppDispatch();
  const EventsPastData = useAppSelector(
    (state: any) => state?.getPastEventsBox?.ViewPastEvents?.data
  );
  const filteredEvent = EventsPastData?.events?.filter(
    (event: any) => event.name === "TAKEOVR Boat Party"
  );

  const filteredEventRoof = EventsPastData?.events?.filter(
    (event: any) => event.name === "Rooftop Event"
  );

  const filteredEventVerified = EventsPastData?.events?.filter(
    (event: any) => event.name === "Naitram Verified"
  );

  console.log("tgis paste event", filteredEvent, EventsPastData);

  const handleEmailInputChange = (e:any) => {
    const input = e.target.value;
    // Allow only letters, numbers, and "@"
    const regex = /^[a-zA-Z0-9@]*$/;
    if (regex.test(input)) {
      setEmail(input); // Update state only if input is valid
    }
  };

  async function handleEmail() {
  
    setLoader(true);
    try {
      const data = {
        email: Email,

      };
      dispatch(StayInformedEmail(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          setLoader(false);
          SuccessToast("Email Sent Successfully");
          setEmail("");

        }  else {
          ErrorToast(res?.payload?.message || "Something went wrong");
        }
      });
    } catch (error) {
      console.error("Error:", error);
      ErrorToast(error);
    }
  }

  useEffect(()=>{
    const data={
      page:1
    }
dispatch(getViewPastEventsBox(data))
  },[])
  return (
    <div
      style={{ height: "" }}
      className="pxpx mx-2xl flex gap-4 h-[1180px] md:h-[600px] md:mt-10 md:mb-20  "
    >
      {filteredEvent && (
        <div className="w-1/2 hidden lg:block h-full">
          <EventCard
            likedEvents={[]}
            eventType={"Past Events"}
            height="600px"
            img={filteredEvent[0]?.coverEventImage}
            title={filteredEvent[0]?.name}
            eventId={filteredEvent[0]?.id}
          />
        </div>
      )}

      <div className="flex-col w-full lg:w-1/2 ">
        <div className="flex flex-col md:flex-row h-[60.5%] md:h-[58%] gap-4">
          {filteredEventRoof && (
            <EventCard
              likedEvents={[]}
              eventType={"Past Events"}
              height="350px"
              img={filteredEventRoof[0]?.coverEventImage}
              title={filteredEventRoof[0]?.name}
              eventId={filteredEventRoof[0]?.id}
            />
          )}
          {/* <EventCard height="600px" img={events[12].img} title={events[12].title} /> */}

          {filteredEventVerified && (
            <EventCard
              likedEvents={[]}
              eventType={"Past Events"}
              height="350px"
              img={filteredEventVerified[0]?.coverEventImage}
              title={filteredEventVerified[0]?.name}
              eventId={filteredEventVerified[0]?.id}
            />
          )}
        </div>

        <div className="h-[42%] w-full pt-4">
          <GradientBorder className="h-[75%] md:h-full">
            <div className="bg-black h-full w-full rounded-lg px-8 py-6">
              <h1 className="text-[25px] lg:text-[27px] xl:text-[37px] font-bold text-center md:text-left">
                Stay Informed, Stay Ahead
              </h1>
              <p className="text-muted mt-2 text-center md:text-left text-sm md:text-base">
                Enter your email address and join our community today. Stay
                connected and ahead of the curve with our regular updates.
              </p>
              <div className="relative h-[45px]">
                <Envelope
                  size={27}
                  weight="fill"
                  className="absolute top-6 left-3"
                />
                <input
                  type="text"
                  value={Email}
                  onChange={handleEmailInputChange}
                  placeholder="Enter your email"
                  // onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full rounded-full bg-white/10 mt-4 border border-[#3C3C3C] outline-none focus:border-[#087336] px-[3.2rem] placeholder:text-muted"
                />
                <Button
                  variant="secondary"
                  className="absolute right-0 h-[45px] top-4 hidden md:block"
                  // onClick={handleEmail}
                  onClick={handleEmail} disabled={loader}
                >
                  Join Now
                </Button>
                <Button
                  variant="secondary"
                  className="md:hidden h-[45px] w-full mt-4"
                  // onClick={handleEmail}
                  onClick={handleEmail} disabled={loader}
                >
                  Join Now
                </Button>
                <Image
                  src={ufo}
                  width={300}
                  height={300}
                  className="absolute right-0 top-0 pointer-events-none"
                  alt="ufo"
                />
              </div>
            </div>
          </GradientBorder>
        </div>
      </div>
    </div>
  );
};

export default StayInformed;
