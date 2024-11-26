"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  CaretLeft,
  Envelope,
  Phone,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const formSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password cannot exceed 20 characters." })
    .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must include at least one lowercase letter." })
    .regex(/\d/, { message: "Password must include at least one number." })
    .regex(/[@$!%*?&]/, { message: "Password must include at least one special character (e.g., @$!%*?&)." })
    .regex(/^\S*$/, { message: "Password cannot contain spaces." }),
  phone: z
    .string()
    .min(1, { message: "Phone Number cannot be empty." })
    .max(15, { message: "Phone number cannot be more than 15 digits." })
    .regex(/^\+?\d{1,15}$/, { message: "Phone number must be valid." }),
});



const CompleteinfoModal = ({ isOpen, onClose, selectedTicketId, setProfileInformation, onNext }: any) => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [password, setPassword] = useState(""); // Password input
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  
  useEffect(() => {
    const email =
      typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";
    const name =
      typeof window !== "undefined" ? localStorage.getItem("name") || "" : "";
    setName(name);
    setEmail(email);
  }, []);

  function processPhoneNumber(input: string) {
    const parsed = formSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, errors: parsed.error.format() };
    }

    const phoneNumber = input.replace('+', '');
    return { success: true, number: Number(phoneNumber) };
  }

  const result = processPhoneNumber("+1234567890123");
  if (result.success) {
    console.log("Valid phone number:", result.number);
  } else {
    console.error("Validation errors:", result.errors);
  }
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted values:", values);
  };
  
  // const onSubmit = (values: z.infer<typeof formSchema>) => {
  //   if (selectedTicketId === "panel4") {
  //     setIsModalOpen(true); // Open next modal if panel4 is selected
  //   }
  //   setProfileInformation({ ...values, full_name: name });
  //   onNext(); // Trigger the next step logic
  //   console.log("Form Submitted:", values);
  // };

  useEffect(() => {
    const email =
      typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";
    const name =
      typeof window !== "undefined" ? localStorage.getItem("name") || "" : "";
    setName(name);
    setEmail(email);
  }, []);

  useEffect(() => {
    console.log("Modal isOpen:", isOpen);
  }, [isOpen]);
  const getTextBasedOnTicket = () => {
    if (selectedTicketId === 'panel2') {
      return "RSVP Form";
    } else if (selectedTicketId === 'panel1' || selectedTicketId === 'panel3' || selectedTicketId === 'panel4') {
      return "Submit your details";
    }
    return "Submit your details"; // Default fallback
  };

  return (
    <>
      {selectedTicketId === "panel4" ? (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[550px] p-[0px] lg:max-w-[650px]">
            <DialogHeader>
              <DialogTitle className="my-[16px] mx-[24px] font-bold text-2xl">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-white/10 p-2 w-fit rounded-full cursor-pointer"
                  >
                    <CaretLeft size={17} weight="bold" />
                  </button>
                  <p>Enter Password</p>
                </div>
              </DialogTitle>
              <Separator className="scale--[1.12] bg-[#292929]" />
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
                <FormItem className="relative w-full px-[24px] py-[55px]">
                  <FormLabel className="text-[12px] font-bold text-[#8F8F8F] absolute left-[45%] bottom-[105px]">
                    PASSWORD
                  </FormLabel>
                  <FormControl className="h-[90px]">
                    <Input
                      type="password"
                      placeholder="Enter the password for this event"
                      className="pt-10 pb-5 font-bold placeholder:text-center placeholder:text-base placeholder:text-[#D9D9D9] placeholder:font-normal"
                      {...form.register("password")}
                      onChange={(e) => {
                        form.setValue("password", e.target.value.trim()); // Trim input value
                      }} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <DialogFooter className="w-full mt-6 pe-[24px] py-[16px] bg-[#101010] border-t border-muted">
                  <Button type="submit" className="w-full md:w-fit text-sm sm:text-base font-extrabold text-[#030303] px-[77.5px] py-[12px]">
                    Next
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[550px] lg:max-w-[650px]">
            <DialogHeader>
              <DialogTitle className="font-bold text-2xl">
                <div className="flex items-center gap-4 pb-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-white/10 p-2 w-fit rounded-full cursor-pointer"
                  >
                    <CaretLeft size={17} weight="bold" />
                  </button>
                  <p>{getTextBasedOnTicket()}</p>
                </div>
              </DialogTitle>
              <Separator className="scale--[1.12] bg-[#292929]" />
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Removed Full Name input field */}
                <FormItem className="relative w-full">
                  <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-3">
                    FULL NAME
                  </FormLabel>
                  <User className="absolute right-3 translate-y-[0.9rem]" size={20} />
                  <FormControl>
                    <Input
                      disabled
                      placeholder={name}
                      className="pt-10 pb-5 font-bold placeholder:font-normal"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <FormItem className="relative w-full  ">
                    <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">
                      EMAIL
                    </FormLabel>
                    <Envelope
                      className="absolute right-3 z-10 translate-y-[1.2rem]"
                      size={20}
                    />
                    <FormControl className="">
                      <Input
                        disabled
                        // placeholder={email}
                        value={email}
                        className="pt-10 pb-5 font-bold placeholder:font-normal  whitespace-nowrap w-full overflow-x-auto"
                        style={{ paddingRight: "2.5rem" }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="relative w-full">
                        <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-5">
                          PHONE NUMBER
                        </FormLabel>
                        <Phone
                          className="absolute right-3 translate-y-[1.2rem]"
                          size={20}
                        />
                        <FormControl>
                          <Input
                            type="tel"
                            inputMode="numeric"
                            pattern="\d*"
                            placeholder="+00 000-000"
                            className="pt-10 pb-5 font-bold placeholder:font-normal"
                            {...field}
                            onChange={(e: any) => {
                              field.onChange(e);
                            }}
                            onKeyDown={(e) => {
                              if (
                                e.key.match(/[^0-9]/) &&
                                !["Backspace", "ArrowLeft", "ArrowRight"].includes(
                                  e.key
                                )
                              ) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {selectedTicketId === "panel2" ? (<FormItem className="relative w-full">
                  <FormLabel className="text-[11px] text-[#8F8F8F] absolute left-3 top-3">
                    Additional field
                  </FormLabel>
                  <User className="absolute right-3 translate-y-[0.9rem]" size={20} />
                  <FormControl>
                    <Input
                      disabled
                      placeholder={name}
                      className="pt-10 pb-5 font-bold placeholder:font-normal"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>) : (null)}

                <DialogFooter className="w-full mt-6 pt-4 bg-[#101010] border-t border-muted">
                  <Button type="submit" className="w-fit px-8">
                    Go to Payments
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CompleteinfoModal;
