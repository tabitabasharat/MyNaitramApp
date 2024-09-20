"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: " space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-extrabold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse  space-y-1",
        head_row: "",
        head_cell: "text-white w-9 font-normal text-[.8rem] dark:text-slate-400",
        row: " w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative rounded-[4px] [&:has([aria-selected])]:rounded-[4px] focus-within:relative focus-within:z-20 dark:[&:has([aria-selected])]:bg-slate-800",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-[4px]"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "text-[#00A849] hover:bg-transparent hover:text-[#00A849] gradient-border rounded-[4px] focus:text-[#00A849] focus:bg-transparent", // Keep rounded-[4px]
        day_today: "bg-transparent text-[white] dark:bg-slate-800 dark:text-slate-50",
        day_outside:
          "day-outside text-[#5C5C5C] opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-[#5C5C5C] aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
        day_disabled: "text-[#5C5C5C] opacity-50 dark:text-slate-400",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
