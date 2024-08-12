'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const FormSchema = z.object({
  date: z.date({
    required_error: 'A date of birth is required.',
  }),
});

export function DatePicker({datelabel}) {
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
                    <p className={datelabel ? "decoration-none" : "underline"}>
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>{datelabel? datelabel : "Choose Date"}</span>
                      )}
                    </p>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
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
