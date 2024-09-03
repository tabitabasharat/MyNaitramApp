"use client";
import FilterSideBar from "@/components/organisms/FilterSideBar";
import AccountSidebarLink from "@/components/reusable-components/AccountSidebarLink";
import AllEventsGrid from "@/components/reusable-components/AllEventsGrid";
import MobileAllEventsList from "@/components/reusable-components/MobileAllEventsList";
import { events } from "@/lib/dummyData";
import { Link } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import calender from "../../../assets/Calender.svg";
import calendercheck from "../../../assets/Calender Check.svg";
import calenderX from "../../../assets/Calender X.svg";
import calendercheckgreen from "../../../assets/Calender Checkgreen.svg";
import calenderXgreen from "../../../assets/Calender Xgreen.svg";
import caledndergreen from "../../../assets/Calendergreen.svg";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "@phosphor-icons/react";
import "./viewevents.css";
import { useAppSelector } from "@/lib/hooks";

const eventimges = [
  { id: 1, title: "All Events", imges: calender },
  { id: 2, title: "Past Events", imges: calenderX },
  { id: 3, title: "Your Events", imges: calendercheck },
];

const greenimges = [
  { id: 1, title: "All Events", imges: caledndergreen },
  { id: 2, title: "Past Events", imges: calenderXgreen },
  { id: 3, title: "Your Events", imges: calendercheckgreen },
];

const AllNaitramEvents = ({ setPopupOpen }: any) => {
  // State to manage the selected event
  const [selectedEvent, setSelectedEvent] = useState<{
    id: number;
    title: string;
  } | null>(null);

  // Set the default event to "All Events" when the component mounts
  useState(() => {
    setSelectedEvent(eventimges[0]);
  });

  // Handle click to set the selected event
  const handleClick = (id: number) => {
    const event = eventimges.find((e) => e.id === id);
    if (event) {
      setSelectedEvent(event);
    }
  };

  // Determine the current images and title based on the selected event
  const currentImages = selectedEvent === null ? eventimges : greenimges;
  const title = selectedEvent ? selectedEvent.title : "All Events";

  const [searchTerm, setSearchTerm] = useState("");
  const clearInput = () => {
    setSearchTerm("");
  };

  const EventsAllData = useAppSelector(
    (state) => state?.getViewAllEvents?.ViewallEvents?.data
  );

  console.log("All Events are", EventsAllData);

  const EventsPastData = useAppSelector(
    (state) => state?.getPastEvents?.ViewPastEvents?.data
  );

  console.log("All Past Events are", EventsPastData);

  const myEvents = useAppSelector(
    (state) => state?.getUserLiveEvents?.myLiveEvents?.data
  );

  console.log("my Live Events are", myEvents);
  const [searchQueryAll, setSearchQueryAll] = useState("");
  const [searchQueryPast, setSearchQueryPast] = useState("");
  const [searchQueryLive, setSearchQueryLive] = useState("");
  const filteredAllEvents = EventsAllData?.events?.filter((item:any) =>
    item?.name
      .toLowerCase()
      .includes(searchQueryAll.toLowerCase())
  );
  const filteredPastEvents = EventsPastData?.events?.filter((item:any) =>
    item?.name
      .toLowerCase()
      .includes(searchQueryPast.toLowerCase())
  );
  const filteredLiveEvents = myEvents?.events?.filter((item:any) =>
    item?.name
      .toLowerCase()
      .includes(searchQueryLive.toLowerCase())
  );

  const getFilteredEvents = () => {
    switch (title) {
      case "All Events":
        return filteredAllEvents;
      case "Past Events":
        return filteredPastEvents;
      case "Your Events":
        return filteredLiveEvents;
      default:
        return [];
    }
  };
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(/blur-green.png)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen pt-[76px] bg-cover bg-no-repeat"
    >
      <section className="min-h-screen pxpx mx-2xl pt-[32px] pb-[120px] md:pt-[56px] md:pb-20">
        <div className="grid grid-cols-3 gap-[4px] events md:gap-4">
          {currentImages.map((event) => (
            <div
              key={event.id}
              onClick={() => handleClick(event.id)}
              className={`relative border  flex flex-col flex items-center justify-center md:items-start rounded-[44px] md:rounded-lg w-full md:px-[12px] md:pt-[16px] md:pb-[12px] cursor-pointer  duration-300 ${
                selectedEvent?.id === event.id
                  ? "gradient-slate text-[#13FF7A] border-[1px] border-solid  hover:border-[#13FF7A] border-[#13FF7A] "
                  : "gradient-slate border-muted"
              }`}
            >
              <Image
                src={event.imges}
                alt={event.title}
                width={20}
                height={20}
                className="rounded-lg transition-transform duration-300 hidden md:block"
                style={{
                  filter:
                    selectedEvent?.id === event.id ? "none" : "grayscale(100%)",
                }}
              />
              <p className="md:m-0 my-[12px] text-sm md:mt-[8px]">
                {event.title}
              </p>
            </div>
          ))}
        </div>
        <h2 className="font-bold text-[32px] mb-[24px] lg:text-[48px] mt-[40px] md:mb-[2rem] 2xl:mt-10">
          🗓 {title}
        </h2>

        {/* Search web */}

        <div className="md:flex justify-start gap-10 w-full">
          
          <FilterSideBar />

             {/* Search inputs for different event types */}
             <div className="w-full lg:mt-0 mt-[24px]">
            <div className="w-full relative mb-[32px]">
              {title === "All Events" && (
                <Input
                  value={searchQueryAll}
                  className="w-full h-14 rounded-[8px] px-[16px] py-[18px] text-sm font-normal"
                  onChange={(event) => setSearchQueryAll(event.target.value)}
                  placeholder="Search All Events"
                />
              )}
              {title === "Past Events" && (
                <Input
                  value={searchQueryPast}
                  className="w-full h-14 rounded-[8px] px-[16px] py-[18px] text-sm font-normal"
                  onChange={(event) => setSearchQueryPast(event.target.value)}
                  placeholder="Search Past Events"
                />
              )}
              {title === "Your Events" && (
                <Input
                  value={searchQueryLive}
                  className="w-full h-14 rounded-[8px] px-[16px] py-[18px] text-sm font-normal"
                  onChange={(event) => setSearchQueryLive(event.target.value)}
                  placeholder="Search Your Events"
                />
              )}
              <MagnifyingGlass
                size={20}
                className="absolute top-1/2 -translate-y-1/2 right-5"
              />
            </div>
            <AllEventsGrid
            events={getFilteredEvents()}
              // events={events}
              eventType={title}
            />
          {/* All Naitram Events */}
          {/* <div className="w-full">
            <div className="w-full relative mb-[32px]">
              <Input
                value={searchTerm}
                className="w-full h-14 rounded-[8px] px-[16px] py-[18px] text-sm font-normal"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search Event"
              />
              <MagnifyingGlass
                size={20}
                className="absolute top-1/2 -translate-y-1/2 right-5"
              />
            </div>

            <AllEventsGrid events={events} eventType={title} />
          </div> */}
        </div>
        </div>
      </section>
    </div>
  );
};

export default AllNaitramEvents;
