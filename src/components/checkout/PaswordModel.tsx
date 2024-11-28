"use client";
import Image from "next/image";
import { DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import success from "@/assets/success.svg";
import { shimmer, toBase64 } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { DeviceMobile, DownloadSimple, Ticket, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { ScrollArea } from "../ui/scroll-area";
import ufo from "@/assets/ufo.png";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";

const PasswordModel = ({ setCurrentModal }: any) => {
  return (
    <DialogContent className="sm:max-w-md lg:max-w-[500px] px-0 pb-0 overflow-hidden">
      <ScrollArea className="max-h-[90vh]">
        <div className="w-full pt-4">
          <div className="px-10">
            {" "}
            <div className="rounded-full overflow-hidden size-[100px] mx-auto">
              <Image src={success} className="rounded-full object-cover" width={500} height={500} alt="expired-icon" />
            </div>
            <p className="text-center mx-auto mt-4">
              Your RSVP Ticket is submitted Succesfully. <br />
              We can't wait to see you there!
            </p>
            <DialogClose asChild>
              <Link href="/events">
                <Button onClick={() => setCurrentModal("BuyTicket")} className="w-full mt-14">
                  Browse Other Events
                </Button>
              </Link>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={() => setCurrentModal("BuyTicket")} variant="outline" className="w-full mt-4">
                Close
              </Button>
            </DialogClose>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

export default PasswordModel;
