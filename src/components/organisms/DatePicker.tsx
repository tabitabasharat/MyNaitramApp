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
  closeDatePicker: () => void;
};

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function DatePicker({
  setSelectedDate,
  closeDatePicker,
}: DatePickerProps) {
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
              <Calendar
                mode="single"
                selected={field.value}
                className="bg-black text-white border border-black"
                onSelect={(date: any) => {
                  field.onChange(date);
                  setSelectedDate(date);
                  // closeDatePicker(); 
                }}
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
