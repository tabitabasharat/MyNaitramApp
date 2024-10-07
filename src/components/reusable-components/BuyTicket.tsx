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
}: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams<any>();

  const [token, setToken] = useState<any>();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("SIGNIN");
  const [Useremail, setUserEmail] = useState<any>();
  const [userIds, setUserIds] = useState<any>("");
  const [canBuyTicket, setCanBuyTicket] = useState<any>();
  const [myid, setMyid] = useState<any>("");
  const [viewTicket, setViewTicket] = useState<any>(false);
  const [myEventId, setMyEventId] = useState<any>(false);

  console.log("my event id  in", event);
  useEffect(() => {
    const id =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setMyid(id);
    dispatch(getTicketsById(id));
    TicketHandle();
  }, []);

  const EventDetail = useAppSelector(
    (state: any) => state?.getTicket?.specificEvent?.data
  );
  console.log("this is the events detail", EventDetail);
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setToken(token);
  }, [isLoginDialogOpen]);
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    setUserIds(token);
  }, [isLoginDialogOpen]);
  useEffect(() => {
    const useremail =
      typeof window !== "undefined" ? localStorage.getItem("email") : null;
    setUserEmail(useremail);
    console.log("user login email", useremail);
  }, []);

  console.log("my id", userId, userIds);

  useEffect(() => {
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : null;
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
    const id =
      typeof window !== "undefined" ? localStorage.getItem("_id") : null;
    console.log("my event ID ", myEventId);

    const currentUrl: any =
      typeof window !== "undefined" ? window.location.href : null;

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
      dispatch(ticketStatus(data)).then((res: any) => {
        if (res?.payload?.status === 200) {
          if (res?.payload?.data?.exists == true) {
            setViewTicket(true);
          } else {
            setViewTicket(false);
          }
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Dialog>
      <div className="w-full event-width-adjustment bg-[#007A3535] rounded-xl flex flex-col lg:flex-row items-center justify-center lg:items-center lg:justify-between px-6 py-4 gap-4">
        <div>
          <p className="font-bold text-[24px] text-center lg:text-left">
            {/* £10 - £1000 */}

            {ticketlength === 1
              ? `£${endPrice}`
              : startPrice && endPrice
              ? `£${startPrice > endPrice ? endPrice : startPrice} - £${
                  startPrice < endPrice ? endPrice : startPrice
                }`
              : "£0"}
          </p>
          {/* <p className="text-muted text-sm md:text-base mt-1 text-center lg:text-left text-[13px] lg:text-[14px]">
            Price may vary due to different ticket types
          </p> */}
          <p className="mt-[5px] font-extrabold text-[#00D059]">
            One ticket per person
          </p>
        </div>
        {viewTicket ? (
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
                  >
                    {userId != userIds ? "Buy Tickets" : "Manage Event"}
                  </Button>
                )}
              </DialogTrigger>
            ) : (
              // {isLoggedIn && (
              <Dialog
                open={isLoginDialogOpen}
                onOpenChange={setIsLoginDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    disabled={eventType === "Past Events" && true}
                    onClick={() => {
                      console.log(token);
                    }}
                    className="text-black px-[4rem] lg:py-7 w-full lg:w-auto"
                  >
                    {/* {EventDetail?.data?.data    ?  "View Ticket" : "Buy Ticket"} */}
                    {eventType === "Past Events"
                      ? "Event Ended"
                      : EventDetail?.data?.data
                      ? "View Ticket"
                      : "Buy Ticket"}
                  </Button>
                </DialogTrigger>
                {authMode === "SIGNIN" && isLoginDialogOpen && (
                  <SignInModal
                    redirectRoute={`/viewallevents`}
                    setAuthMode={setAuthMode}
                    setSigninModal={() => setIsLoginDialogOpen(false)}
                  />
                )}
                {authMode === "SIGNUP" && (
                  <SignUpModal
                    setAuthMode={setAuthMode}
                    setSigninModal={() => setIsLoginDialogOpen(false)}
                  />
                )}
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
