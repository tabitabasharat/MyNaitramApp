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
type DatePickerProps = {
  setSelectedDate: (date: Date | null) => void;
};

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function DatePicker({ setSelectedDate }: DatePickerProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form className=" cursor-pointer">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <p className="underline">
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Choose Date</span>
                      )}
                    </p>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-black" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    className="bg-black text-white border border-black"
                    onSelect={(date: any) => {
                      field.onChange(date);
                      setSelectedDate(date); // Call the parent state setter when the date is selected
                    }}
                    // disabled={(date: any) =>
                    //   date > new Date() || date < new Date('1900-01-01')
                    // }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
