import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import CheckOutModal from "@/components/checkout/CheckOutModal";
import { useEffect, useState } from "react";
import SignInModal from "../auth/SignInModal";
import SignUpModal from "../auth/SignUpModal";
import { AuthMode } from "@/types/types";
import { useAppSelector } from "@/lib/hooks";

const BuyTicket = ({ eventid, event, setShowTicket }: any) => {
  const [token, setToken] = useState<any>();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("SIGNIN");

  const EventDetail = useAppSelector(
    (state: any) => state?.getTicketStore?.specificEvent?.data
  );
  console.log("this is the events detail", EventDetail?.data?.data);
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setToken(token);
  }, [isLoginDialogOpen]);

  return (
    <Dialog>
      <div className="w-full lg:w-[665px] bg-[#007A3535] rounded-xl flex flex-col lg:flex-row items-center justify-center lg:items-center lg:justify-between px-6 py-4 gap-4">
        <div>
          <p className="font-bold text-[24px] text-center lg:text-left">
            £10 - £1000
          </p>
          <p className="text-muted text-sm md:text-base mt-1 text-center lg:text-left">
            Price may vary due to different ticket types
          </p>
        </div>

        {EventDetail?.data?.data ? (
          <div>
            <Button onClick={()=>{setShowTicket(true)}}>View Ticket</Button>
          </div>
        ) : (
          <div>
            {token ? (
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    console.log(token);
                  }}
                  // className="text-black px-[4rem] lg:py-7 w-full lg:w-fit"
                >
                  Buy Ticket
                </Button>
              </DialogTrigger>
            ) : (
              // {isLoggedIn && (
              <Dialog
                open={isLoginDialogOpen}
                onOpenChange={setIsLoginDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      console.log(token);
                    }}
                    className="text-black px-[4rem] lg:py-7 w-full lg:w-fit"
                  >
                    {EventDetail?.data?.data ? "View Ticket" : "Buy Ticket"}
                  </Button>
                </DialogTrigger>
                {authMode === "SIGNIN" && isLoginDialogOpen && (
                  <SignInModal
                    redirectRoute={`/events`}
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

        <CheckOutModal event={event} />
      </div>
    </Dialog>
  );
};

export default BuyTicket;
