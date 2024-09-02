"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogPortal,
} from "@/components/ui/newdialog";
import { Separator } from "../ui/separator";
import Image from "next/image";
import Iconpop from "@/assets/launchprofileicon.svg";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { deleteAccount } from "@/lib/middleware/profile";
import { Wall, Wallet } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import close from "@/assets/close12.svg";
import { TelegramLogo } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import tick from "@/assets/fi-rr-check.svg";
import EventSubmmitModal from "../EventSubmmitModal/EventSubmmitModal";

type Option = {
  id: number;
  label: string;
};
const options: Option[] = [
  { id: 1, label: "Ethereum" },
  { id: 2, label: "Binance Smart Chain" },
  { id: 3, label: "Tron" },
  { id: 4, label: "Polygon" },
  { id: 5, label: "Bitcoin" },
  { id: 6, label: "Avalanch" },
  { id: 7, label: "Solana" },
];

const formSchema = z.object({
  walletAddress: z
    .string()
    .min(1, { message: "Telegram Url cannot be empty." }),
});

type LunchModalProps = {
  onClose: () => void; // Function to close the dialog
  open: ()=> void; // Boolean to control the dialog's visibility
};

const LunchModal: React.FC<LunchModalProps> = ({ onClose, open }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: "",
    },
  });
  const userLoading = useAppSelector((state) => state?.getShowProfile);
  const [walletaddress , setwalletaddress] = useState ()
  const [isCreateModalOpen, setisCreateModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [Dropdown, setDropdown] = useState(true);
  const [validationError, setValidationError] = useState("");
  const handleOptionToggle = (option: Option) => {
    if (selectedOptions.some((o) => o.id === option.id)) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions([option]);
    }
  };
  const handleSubmit = () => {
    if (selectedOptions.length === 0) {
      setValidationError("Please select at least one option.");
      return;
    }
    setValidationError("");
  };
  const WalletModalhandler = () => {
    setisCreateModalOpen(true);
    console.log("clicked");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          showCloseIcon={false}
          style={{
            background:
              "linear-gradient(#0F0F0F, #1A1A1A) padding-box,linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
          }}
          className="flex flex-col w-[650px] text-white px-[0px] gap-[24px] pt-[22px] pb-[0px] flex items-center justify-center bg-[#0F0F0F] border-[0.86px] border-transparent "
        >
          <div className="w-full">
            <DialogHeader className="flex items-end">
              <DialogTitle className="font-bold pe-[24px] text-2xl mb-1">
                <Image
                  src={close}
                  sizes="28px"
                  alt="close-btn"
                  className="cursor-pointer"
                  onClick={onClose}
                />
              </DialogTitle>
              <Separator className="scale--[1.12] bg-[#292929]" />
            </DialogHeader>
          </div>
          <div className="px-6">
            <p className="text-[#BFBFBF] pb-[20px] lg:pb-[24px] text-sm font-bold lg:font-normal">
              Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Curabitur tempus urna at turpis condimentum
              lobortis.
            </p>
            <div>
              <h2 className="text-[20px] font-bold text-[#BFBFBF] lg:text-[14px] font-bold">
                Please Choose Your Wallet
              </h2>
              <Form {...form}>
                <form
                  className="w-full my-[12px] mt-[5px]"
                  onSubmit={handleSubmit}
                >
                  <FormField
                    control={form.control}
                    name="walletAddress"
                    render={({ field }) => (
                      <FormItem className="relative md:mb-6 space-y-0">
                        <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-3 top-3">
                          Wallet
                        </FormLabel>
                        <Wallet
                          className="absolute right-3 top-[30%]"
                          size={28}
                        />

                        <FormControl>
                          <Input
                            placeholder="Enter Wallet Address"
                            className="pt-11 pb-5 text-base placeholder:font-normal"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setValidationError("");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pb-[8px] mt-[12px] mb-[30px] lg:mb-[42px] w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold pb-[16px] text-white">
                        Chain
                      </p>
                    </div>
                    <Separator className="scale--[1.12] bg-[#292929]" />
                    {Dropdown && (
                      <div className="pt-[14px]">
                        {options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-center justify-between pt-[2px] cursor-pointer"
                            onClick={() => handleOptionToggle(option)}
                          >
                            <div className="flex items-center gap-[10px]">
                              <p className="text-[14px] text-[#FFFFFF] font-normal items-center">
                                {option.label}
                              </p>
                            </div>
                            {selectedOptions.some(
                              (o) => o.id === option.id
                            ) && (
                              <Image
                                src={tick}
                                width={10}
                                height={10}
                                alt="tick"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {validationError && (
                      <p className="text-red-500 text-sm mt-2">
                        {validationError}
                      </p>
                    )}
                  </div>

                  <DialogFooter className="w-full border-t border-muted">
                    <div className="w-full p-[24px]">
                      <Button
                        type="button" // Change to "button" to prevent form submission
                        className="w-full"
                        disabled={
                          !selectedOptions.length ||
                          !form.watch("walletAddress")
                        }
                        onClick={() => {
                          if (
                            selectedOptions.length &&
                            form.watch("walletAddress")
                          ) {
                            WalletModalhandler(); // Show the popup
                          }
                        }}
                      >
                        Submit
                      </Button>
                      {isCreateModalOpen && (
                        <EventSubmmitModal
                          onClose={() => setisCreateModalOpen(false)}
                          open={() => setisCreateModalOpen(true)}
                        />
                      )}
                    </div>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default LunchModal;
