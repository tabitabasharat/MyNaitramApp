import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect, useRef } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { submitFeedback } from "@/lib/middleware/event";
import { SuccessToast, ErrorToast } from "@/components/reusable-components/Toaster/Toaster";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  BIO: z.string().min(1, { message: "Description cannot be empty." }),
});

interface ReportProps {
  open: boolean;
  onClose: () => void;
  eventID: string;
  updateParentState: (newState: any) => void;
  closeModelOn: (newState: any) => void;
}

const FeedbackModal: React.FC<ReportProps> = ({ open, onClose, eventID, updateParentState, closeModelOn }) => {
  const [Description, setDescription] = useState("");
  const dispatch: any = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      BIO: "",
    },
  });

  async function FeedBackOnEvent() {
    // setLoader(true);
    updateParentState(true);
    const userID = localStorage.getItem("_id");
    if (userID) {
      const values = form.getValues();
      console.log("my values", values);
      try {
        const data = {
          userId: parseInt(userID, 10),
          eventId: parseInt(eventID, 10),
          text: values.BIO || "",
        };
        console.log("This is feedBack Payload Data ====> ", data);
        dispatch(submitFeedback(data)).then((res: any) => {
          console.log("Stop feedBack API status ===> ", res?.payload?.status);
          if (res?.payload?.status === 201) {
            // setLoader(false);
            updateParentState(false);
            closeModelOn(false);
            console.log("feedBack Event Successfully..!");
            SuccessToast("Event feedBack Successfully");
          } else {
            // setLoader(false);
            updateParentState(false);
            closeModelOn(false);
            ErrorToast("May be you have already feedBacked this Event!");
            // ErrorToast(res?.payload?.body?.message);
          }
        });
      } catch (error) {
        // setLoader(false);
        updateParentState(false);
        closeModelOn(false);
        console.error("Error:", error);
        // ErrorToast(error);
        ErrorToast("Error while Feedbacking");
      }
    } else {
      closeModelOn(false);
      updateParentState(false);
      ErrorToast("User not found..!");
      router.push("/viewallevents");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Form {...form}>
        <form className=" w-full">
          <DialogContent className="w-[650px] ">
            <DialogHeader className="space-y-0">
              <DialogTitle className="font-extrabold text-[20px] md:text-[24px]">Feedback</DialogTitle>
            </DialogHeader>
            <Separator className="scale--[1.12] bg-[#292929]" />

            <FormField
              control={form.control}
              name="BIO"
              render={({ field }) => (
                <FormItem className="relative w-full md:w-[602px] md:mb-[91px] h-[205px] space-y-0">
                  <FormLabel className="text-base z-1 w-[98%]  xl:w-[99.2%] h-[15%] md:h-[15%] xl:h-[15%] mt-[1px] gradient-slate text-[white] font-extrabold absolute left-1 ps-3 pt-3 top-0">
                    Leave feedback
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Feedback"
                      className="pt-[36px] pb-5 h-[105px] w-full sm:h-[205px] placeholder:text-[12px] placeholder:text-[#8F8F8F] placeholder:font-bold resize-none "
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Prevent leading space
                        if (value.trimStart().length === 0) {
                          setDescription("");
                          field.onChange("");
                        } else {
                          setDescription(value);
                          field.onChange(value);
                        }
                      }}
                      onKeyDown={(e) => {
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

            <Separator className="scale--[1.12] bg-[#292929]" />
            <DialogFooter className="w-full md:flex-row flex flex-row gap-[12px]">
              <Button
                onClick={onClose}
                className="text-sm font-extrabold w-full text-center table-gradient gradient-border-notify rounded-[100px] py-[12px] text-[#00D059]"
              >
                Cancel
              </Button>
              <Button
                onClick={() => FeedBackOnEvent()}
                className="text-sm font-extrabold text-center w-full rounded-[100px] py-[12px] text-[black] bg-[#00D059]"
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default FeedbackModal;
