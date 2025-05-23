"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import CheckOutModal from "@/components/checkout/CheckOutModal";
import { useEffect, useState } from "react";
import SignInModal from "../auth/SignInModal";
import SignUpModal from "../auth/SignUpModal";
import { AuthMode } from "@/types/types";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { whitelistcheck } from "@/lib/middleware/event";
import { useRouter } from "next/navigation";
import { getTicketsById } from "@/lib/middleware/event";
import { ticketStatus } from "@/lib/middleware/event";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { WarningToast } from "./Toaster/Toaster";

const BuyTicket = ({
  eventid,
  event,
  setShowTicket,
  startPrice,
  endPrice,
  userId,
  eventType,
  ticketlength,
  endTime,
  ticketEndTime,
  ticketStartTime,
  soldout,
  salesStop,
  allTickets,
}: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams<any>();
  const pathname = usePathname();

  const [token, setToken] = useState<any>();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("SIGNIN");
  const [Useremail, setUserEmail] = useState<any>();
  const [userIds, setUserIds] = useState<any>("");
  const [canBuyTicket, setCanBuyTicket] = useState<any>();
  const [myid, setMyid] = useState<any>("");
  const [viewTicket, setViewTicket] = useState<any>(false);
  const [myEventId, setMyEventId] = useState<any>(false);

  console.log("my event id  in", soldout);
  useEffect(() => {
    const id = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setMyid(id);
    dispatch(getTicketsById(id));
    TicketHandle();
  }, []);

  const EventDetail = useAppSelector((state: any) => state?.getTicket?.specificEvent?.data);
  const ticketStatusss = useAppSelector((state: any) => state?.ticketStatus?.status?.data?.exists);
  console.log("this is the events detail of event status", ticketStatusss);
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setToken(token);
  }, [isLoginDialogOpen]);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserIds(token);
  }, [isLoginDialogOpen]);

  useEffect(() => {
    const useremail = typeof window !== "undefined" ? localStorage.getItem("email") : null;
    setUserEmail(useremail);
    console.log("user login email", useremail);
  }, []);

  console.log("my id", userId, userIds);

  useEffect(() => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : null;
    if (currentUrl) {
      const url = new URL(currentUrl);
      const pathParts = url.pathname.split("/");
      const eventId = pathParts[pathParts.length - 1];
      setMyEventId(eventId);
      console.log("My event ID sis", eventId);
      // dispatch(getEventById(eventId));
    }
  }, []);

  async function TicketHandle() {
    const id = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("my event ID ", myEventId);

    const currentUrl: any = typeof window !== "undefined" ? window.location.href : null;

    const url = new URL(currentUrl);
    const pathParts = url.pathname.split("/");
    const eventId = pathParts[pathParts.length - 1];
    setMyEventId(eventId);
    console.log("My event IDs", eventId);

    try {
      const data = {
        eventId: eventId,
        userId: id,
      };
      dispatch(ticketStatus(data));
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function checkSalesStop() {
    if (userId == userIds) {
      return false;
    }
    return salesStop;
  }

  useEffect(() => {
    console.log("But Model tickets are as==>", allTickets);
  }, []);

  return (
    <Dialog>
      <div className="w-full event-width-adjustment bg-[#007A3535] rounded-xl flex flex-col lg:flex-row items-center justify-center lg:items-center lg:justify-between px-6 py-4 gap-4">
        <div>
          <p className="font-bold text-[24px] text-center lg:text-left">
            {/* {ticketlength === 1
              ? `£${endPrice}`
              : startPrice && endPrice
              ? `£${startPrice > endPrice ? endPrice : startPrice} - £${
                  startPrice < endPrice ? endPrice : startPrice
                }`
              : "£0"} */}

            {ticketlength === 1
              ? `£${endPrice}`
              : startPrice && endPrice
              ? startPrice == endPrice
                ? `£${startPrice}`
                : `£${startPrice > endPrice ? endPrice : startPrice} - £${startPrice < endPrice ? endPrice : startPrice}`
              : "£0"}
          </p>
          {/* <p className="text-muted text-sm md:text-base mt-1 text-center lg:text-left text-[13px] lg:text-[14px]">
            Price may vary due to different ticket types
          </p> */}
          <p className="mt-[5px] font-extrabold text-[#00D059]">One ticket per person</p>
        </div>

        {pathname === "/preview-event" ? (
          <div className="w-full lg:w-auto">
            <Button disabled className="text-black px-[4rem] lg:py-7 w-full lg:w-fit">
              Buy Ticket
            </Button>
          </div>
        ) : ticketStatusss ? (
          <div>
            <Button
              onClick={() => {
                setShowTicket(true);
                router.push("/wallet");
              }}
            >
              View Ticket
            </Button>
          </div>
        ) : (
          // new Date() > new Date(endTime) || new Date() > new Date(ticketEndTime)
          <div className="w-full lg:w-auto">
            {token ? (
              <DialogTrigger asChild>
                {new Date() > new Date(endTime) ? (
                  <Button
                    disabled
                    onClick={() => {
                      console.log(token);
                    }}
                    className="text-black px-[4rem] lg:py-7 w-full lg:w-fit"
                  >
                    Event Ended
                  </Button>
                ) : (
                  <Button
                    // disabled={ userId != userIds ? false:true}

                    onClick={() => {
                      // BuyTicket();
                      if (userId == userIds) {
                        router.push("/management");
                        console.log(token);
                      } else {
                        console.log(token);
                      }
                    }}
                    className="text-black px-[4rem] lg:py-7 w-full lg:w-fit"
                    disabled={userId != userIds ? soldout || checkSalesStop() : false}
                  >
                    {soldout ? "Sold out" : userId != userIds ? (salesStop ? "Sales are stopped" : "Buy Ticket") : "Manage Event"}
                  </Button>
                )}
              </DialogTrigger>
            ) : (
              // {isLoggedIn && (
              <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    disabled={eventType === "Past Events" && true}
                    onClick={() => {
                      console.log("dsjsjdksdjh=>", token);
                    }}
                    className="text-black px-[4rem] lg:py-7 w-full lg:w-auto"
                  >
                    {/* {EventDetail?.data?.data    ?  "View Ticket" : "Buy Ticket"} */}
                    {eventType === "Past Events" ? "Event Ended" : EventDetail?.data?.data ? "View Ticket" : "Buy Ticket"}
                  </Button>
                </DialogTrigger>
                {authMode === "SIGNIN" && isLoginDialogOpen && (
                  <SignInModal redirectRoute={`/viewallevents`} setAuthMode={setAuthMode} setSigninModal={() => setIsLoginDialogOpen(false)} />
                )}
                {authMode === "SIGNUP" && <SignUpModal setAuthMode={setAuthMode} setSigninModal={() => setIsLoginDialogOpen(false)} />}
              </Dialog>
            )}
          </div>
        )}

        {userId != userIds && <CheckOutModal event={event} />}
      </div>
    </Dialog>
  );
};
export default BuyTicket;
