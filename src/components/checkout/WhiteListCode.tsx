"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import "./ticket.css";
import Image from "next/image";
import Iconpop from "@/assets/buyticket-icon.svg";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ticketsType, ticketsType2 } from "@/lib/dummyData";

import GradientBorder from "../ui/gradient-border";
import { ScrollArea } from "../ui/scroll-area";
import { Minus, Plus, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getEventById } from "@/lib/middleware/event";
import { useState, useEffect } from "react";
import { setContractEditor } from "@/lib/reducer/setBuyTicket";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  verificationcode: z
    .string()
    .min(1, { message: "WhiteList Code cannot be empty." })
    
});

// import { setTicketPrice } from "@/lib/reducer/setBuyTicket";
const WhiteListCode = ({ onNext, setTicketPrice, setTicketType }: any) => {
  const [selectedTicket, setSelectedTicket] = useState("");
  const [selectedTicketPrice, setSelectedTicketPrice] = useState(0);
  const [selectedTicketType, setSelectedTIcketType] = useState<any>();
  const [verificationcode, setVerficationCode] = useState("");
  const [eventid, setEventid] = useState<any>();
  const count = useAppSelector((state) => state);
  console.log(count);

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verificationcode: "",
    },
  });
  const dispatch = useAppDispatch();
  function buyTicket() {
    console.log("hellothis is good", selectedTicketPrice);
    setTicketPrice(selectedTicketPrice);

    setTicketType(selectedTicketType);
    // dispatch(setContractEditor(selectedTicketPrice));

    onNext();
  }

  useEffect(() => {
    const currentUrl:any = typeof window !== "undefined"? window.location.href :null;
    const parts = currentUrl.split("/");
    const value = parts[parts.length - 1];
    setEventid(value);
    console.log("my event id is", value);
    // dispatch(getEventById(value));
  }, []);

  const EventDetail = useAppSelector(
    (state) => state?.getEventById?.specificEvent?.data?.data[0]?.eventTickets
  );
  console.log("tickets data in checkout modal", EventDetail);

  async function verificationCode(values: z.infer<typeof formSchema>) {
   console.log("my code is",verificationcode )
  }

  
  return (
    <DialogContent className="sm:max-w-md lg:max-w-[600px] text-white pb-[24px] ">
      <div>
        <DialogHeader className="mb-5">
          <DialogTitle className="font-bold text-2xl mb-1">
            Whitelist Code
          </DialogTitle>
          <Separator className="scale--[1.12] bg-[#292929]" />
        </DialogHeader>

        <div className=" w-full">
          <Form {...form}>
            <form className=" mt-[24px]  " onSubmit={form.handleSubmit(verificationCode)}>
              <FormField
                control={form.control}
                name="verificationcode"
                render={({ field }) => (
                  <FormItem className="relative ">
                    <FormLabel className="text-[13px] text-[#8F8F8F] absolute left-3 top-3">
                      Whitelist Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Whitelist Code"
                        className="pt-11 pb-5 font-bold placeholder:font-normal "
                        {...field}
                        onChange={(e) => {
                          setVerficationCode(e.target.value);
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="w-full mt-[24px]  bg-[#101010] border-t border-muted">
              <Button className="mt-[16px]  leading-[24px] text-center font-extrabold pt-[16px] pb-[16px] w-full text-[#030303] ">
                Submit
              </Button>
            </DialogFooter>
            </form>
            
          </Form>
        </div>
      </div>
    </DialogContent>
  );
};

export default WhiteListCode;
