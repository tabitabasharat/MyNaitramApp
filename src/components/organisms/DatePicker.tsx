"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// type DatePickerProps = {
//   setSelectedDate: (date: Date | null) => void;
// };
type DatePickerProps = {
  setSelectedDates: (dates: Date[]) => void; // Change to accept an array
};

// const FormSchema = z.object({
//   dates: z.date({
//     required_error: "A date of birth is required.",
//   }),
// });

const FormSchema = z.object({
  dates: z.array(z.date()).min(1, "At least one date is required."), 
});


export function DatePicker({ setSelectedDates }: DatePickerProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  // const handleSelectDate = (dates: Date[] | undefined) => {
  //   if (!dates) return;
  
  //   form.setValue("dates", dates);
  //   setSelectedDates(dates);
  // };
  const handleSelectDate = (dates: Date[] | undefined) => {
    if (!dates) return;

    // If the length exceeds 2, slice the array to keep only the first two
    const updatedDates = dates.length > 2 ? dates.slice(0, 2) : dates;

    // Update form values and parent state
    form.setValue("dates", updatedDates);
    setSelectedDates(updatedDates);
  };
  return (
    <Form {...form}>
      <form className=" cursor-pointer">
        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem>
              <Calendar
                mode="multiple"
                selected={field.value}
                className="bg-black text-white border border-black"
                // onSelect={(date: any) => {
                //   field.onChange(date);
                //   setSelectedDates(date);
                // }}
                onSelect={handleSelectDate}
                // disabled={(date: any) =>
                //   date > new Date() || date < new Date('1900-01-01')
                // }
                initialFocus
              />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
