import { Button } from "@/components/ui/button";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import ticket from "@/assets/Ticket2.svg";
import arrow from "@/assets/Arrow Right.svg";
import heroImg from "@/assets/hero-img.png";
import thumb from "@/assets/thumbs.png";
import star from "@/assets/star.png";
import { FadeReveal } from "@/components/animations/FadeReveal";
import { Reveal } from "@/components/animations/Reveal";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { getTicketByQR } from "@/lib/middleware/wallet";

import { useState, useEffect } from "react";
import Receviepayment from "@/components/popups/receviepayment/Receviepayment";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ScreenLoader from "@/components/loader/Screenloader";
import { SuccessToast, ErrorToast } from "@/components/reusable-components/Toaster/Toaster";
import { useMediaQuery } from "react-responsive";

const formSchema = z.object({
  subject: z.string().min(1, { message: "Ticket Id cannot be empty." }),
});

const Hero = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 390px)",
  });

  const isMobilemd = useMediaQuery({
    query: "(max-width: 440px)",
  });

  const placeholderText = isMobile
    ? "Search by Ticket ID Num..."
    : isMobilemd
    ? "Search by Ticket ID Number / Tran..."
    : "Search by Ticket ID Number / Transaction ID";

  const router = useRouter();
  const [isClaimOpen, setIsClaimOpen] = useState(false);
  const [collectID, setCollectID] = useState("");
  const dispatch = useAppDispatch();
  const [eventId, setEventId] = useState<any>("");
  const [loader, setLoader] = useState(false);
  const [ticketid, setTicketId] = useState<any>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
    },
  });

  // Handler to toggle the popup
  const handleTogglePopup = () => {
    setIsClaimOpen(!isClaimOpen); // Toggle isClaimOpen to control the popup
  };

  // useEffect(() => {
  //   const currentUrl: any =
  //     typeof window !== "undefined" ? window.location.href : null;
  //   const parts = currentUrl.split("/");
  //   const value = parts[parts.length - 1];
  //   setCollectID(value);
  //   console.log("my event id is", value);
  // }, []);
  async function verifyBlockchain() {
    if (!ticketid) {
      ErrorToast("Ticket Id cannot be empty");
      return;
    }

    setLoader(true);
    try {
      const currentUrl: any = typeof window !== "undefined" ? window.location.href : null;
      const parts = currentUrl.split("/");
      const value = parts[parts.length - 1];

      const data = {
        // ticketId : value,
        ticketInput: ticketid,
      };

      dispatch(getTicketByQR(ticketid)).then((res: any) => {
        console.log("inside the login", res);
        if (res?.payload?.status === 200) {
          setLoader(false);
          console.log("ticket res", res?.payload?.data);
          localStorage.setItem("ticketId", ticketid);
          router.push(`/wallet/specific-qr-code/${ticketid}`);
        } else {
          setLoader(false);

          ErrorToast("Ticket Not Found");
        }
      });
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
    }
  }
  return (
    <section
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(/hero-bg.png)",
        backgroundPosition: "center",
      }}
      className="min-h-screen lg:h-screen bg-cover bg-no-repeat relative overflow-clip  pt-[10rem] lg:pt-0"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center h-full pt-[150px] px-[24px] md:pxpx mx-2xl relative">
        <div className="lg:w-1/2 xl:w-[40%] z-[8] flex flex-col justify-center items-center lg:justify-start lg:items-start gap-[40px]">
          <div>
            <Reveal y={100} width="100%">
              <h1 className="font-extrabold text-[40px] lg:text-[64px] leading-[1.1] text-center lg:text-start">Revolutionize Your Experience</h1>
            </Reveal>
            <Reveal y={100} width="100%">
              <p className="mt-[12px] text-muted text-base text-center lg:text-start md:w-[60%] lg:w-full md:mx-auto lg:mx-0">
                Discover a new way to engage with events through Naitram and enhance your experience from start to finish. Whether you're attending a
                concert, festival, charity, educational, sport, entertainment, or corporate event.
              </p>
            </Reveal>
          </div>
          <Reveal y={100} width="100%">
            <div className="flex flex-col md:flex-row gap-[12px] w-full md:w-fit md:mx-auto lg:mx-0">
              <Button
                onClick={() => {
                  router.push("/about");
                }}
                variant="secondary"
                className="p-[12px] font-extrabold text-sm"
              >
                Learn More
              </Button>
              <Button
                onClick={() => {
                  // router.push("https://apps.apple.com/pk/app/naitram-fan-centric-tickets/id6736828037");
                  router.push("/download-app");
                }}
                className="flex items-center gap-[4px] p-[12px]"
              >
                <DownloadSimple size={20} weight="bold" />
                <p className=" font-extrabold text-sm"> Download App</p>
              </Button>
            </div>
          </Reveal>
          <Reveal y={100} width="100%">
            <div className="mb-[35px] pt-[4px] flex flex-col items-center lg:items-start">
              <p className="font-extrabold text-base mb-[12px]">Verify Ticket on Blockchain</p>
              <Form {...form}>
                <form
                  className="w-full md:w-[491px]"
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    verifyBlockchain();
                  }}
                >
                  <FormField
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="relative add-bank-account-border rounded-[44px] md:mb-[20px] space-y-0">
                        <Image
                          src={arrow}
                          alt="arrow"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-[12]"
                          onClick={() => verifyBlockchain()}
                        />
                        <Image src={ticket} alt="ticket" className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
                        <FormControl>
                          <input
                            placeholder={placeholderText}
                            className="placeholder:text-white placeholder:w-full focus:border-green-500 hover:border-green-500 focus:ring-0 focus:outline-none w-full
                               backdrop-blur-18 bg-opacity-40 bg-black rounded-[44px] placeholder:text-sm  placeholder:font-[300] pb-[12px] pt-[12px] pl-[45px] pr-[45px]
                               bg-transparent  z-10"
                            onChange={(e) => {
                              setTicketId(e.target.value);
                              field.onChange(e);
                            }}
                            onKeyDown={(e) => {
                              if (/[^0-9]/.test(e.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) {
                                e.preventDefault();
                              }
                              // Prevent leading space
                              if (e.key === " " && field.value.trim().length === 0) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </Reveal>
        </div>
        <FadeReveal extraStyle="z-[5] w-[500px] scale-[2] lg:scale-[3] translate-y-[33%] lg:translate-x-[-20%]">
          <Image
            src={heroImg}
            className=" mt-[60px] mr-[50px]"
            style={{
              marginTop: "60px !important",
              marginRight: "50px !important",
            }}
            width={1000}
            height={1000}
            placeholder="blur"
            alt="Hero-IMG"
          />
        </FadeReveal>
        <FadeReveal extraStyle="absolute bottom-0 lg:bottom-[8%] right-[14%] z-[8] w-[110px] lg:w-[130px]">
          <Image src={thumb} width={500} height={500} alt="Hero-IMG" />
        </FadeReveal>
        <FadeReveal extraStyle="absolute bottom-[15%] lg:bottom-[27%] left-[5%] lg:left-auto lg:right-[37%] z-[8] w-[100px]">
          <Image src={star} width={500} height={500} alt="Hero-IMG" />
        </FadeReveal>
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[7]"></div>
    </section>
  );
};

export default Hero;
