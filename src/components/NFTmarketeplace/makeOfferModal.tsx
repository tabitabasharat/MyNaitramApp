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
import image1 from "@/assets/image28.svg";
import Image from "next/image";
import Select, { SingleValue } from 'react-select';
import './makeOffer.css';
import { DatePicker } from "../organisms/DatePicker";
const formSchema = z.object({
  BIO: z.string().min(1, { message: "Description cannot be empty." }),
});

interface MakeOfferModalProps {
  open: boolean;
  onClose: () => void;
}
interface OptionType {
  value: string;
  label: string;
}
const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '54px',
    padding: '0 16px',
    color: '#BFBFBF',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '21.6px',
    border: 'none',
    boxShadow: state.isFocused ? 'none' : '',
    '&:hover': {
      border: 'none',
    },
  }),
  valueContainer: (base: any) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    height: '100%',
  }),
  placeholder: (base: any) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    color: '#BFBFBF',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '21.6px',
  }),
  dropdownIndicator: (base: any, state: any) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '0',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow when the dropdown is open
    transition: 'transform 0.2s ease', // Smooth transition for the rotation
  }),
  menu: (base: any) => ({
    ...base,
    background: 'linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)',
    borderRadius: '8px',
  }),
  menuList: (base: any) => ({
    ...base,
    padding: '0',
  }),
  option: (base: any, state: any) => ({
    ...base,
    color: state.isSelected ? 'white' : '#BFBFBF',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '21.6px',
    background: state.isSelected
      ? 'transparent'
      : state.isFocused
        ? 'transparent'
        : 'transparent',
    borderRadius: '8px',
    '&:hover': {
      background: 'transparent',
      color: '#00D059',
    },
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: 'none !important',
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#BFBFBF',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '21.6px',
  }),
  css19bb58m: (base: any) => ({
    ...base,
    display: window.innerWidth <= 335 ? 'none' : 'block', // Adjust display based on screen width
  }),
};


const options = [
  { value: 'ETH', label: 'ETH' },
  { value: 'BTC', label: 'BTC' },
  { value: 'USD', label: 'USD' },
];
const durationOptions = [
  { value: '12h', label: '12 Hours' },
  { value: '1d', label: '1 Day' },
  { value: '3d', label: '3 Days' },
  { value: '7d', label: '7 Days' },
  { value: '1Month', label: '1 Month' },
  { value: 'custom', label: 'Custom Date' },
];
const MakeOfferModal: React.FC<MakeOfferModalProps> = ({ open, onClose }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('ETH');
  const [selectedDuration, setSelectedDuration] = useState<string>('Select');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isStartPickerOpen, setIsStartPickerOpen] = useState(false);
  const [isEndPickerOpen, setIsEndPickerOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      BIO: "",
    },
  });
  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      setSelectedCurrency(selectedOption.value);
    }
  };
  const handleDurationChange = (selectedOption: SingleValue<{ value: string; label: string }>) => {
    if (selectedOption) {
      setSelectedDuration(selectedOption.value);
    }
  };
  const toggleStartPicker = () => {
    setIsStartPickerOpen(!isStartPickerOpen);
    setIsEndPickerOpen(false); // Close end picker if open
  };
  const toggleEndPicker = () => {
    setIsEndPickerOpen(!isEndPickerOpen);
    setIsStartPickerOpen(false); // Close start picker if open
  };
  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={onClose}>
        <form className=" w-full">
          <DialogContent className=" w-full max-w-[650px] h-[723px] max-h-[90vh] p-[0] gap-[0px] over-flow-x-hidden overflow-y-auto scrollbar-hide">
            <DialogHeader className="space-y-0 pl-[24px] w-full pr-[24px] pt-[20px]">
              <DialogTitle className="font-extrabold  pb-[16px] text-[20px] md:text-[24px] leading-[27.6px]">Make an Offer</DialogTitle>
            </DialogHeader>
            <Separator className="scale--[1.12] bg-[#292929]" />


            <div className="flex gap-[16px] pt-[24px] pl-[24px] pr-[24px] ">
              <div className="w-[120px] imageFolder h-[120px] makeAnOffer-gradient  max-[600px]:h-[100px]  max-[600px]:w-[100px]  ">
                <Image className=" pt-[1px] rounded-[9px] w-full h-[99%] object-cover" src={image1} alt="/" />
              </div>
              <div className="flex flex-col gap-[11px] justify-center ">
                <p className="text-[24px] leading-[27.6px] font-[800] text-[white] max-[540px]:text-[20px] max-[540px]:leading-[20px]  ">A Fasty Brush Flower Arts</p>
                <p className="text-[14px] leading-[16.8px] font-[400] text-[#BFBFBF]" >@silent-blue</p>

              </div>
            </div>


            <div className="mt-[32px] rounded-[12px] gradient-slate border border-[#292929]  p-[16px] ml-[24px] mr-[24px]"
              style={{ background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)", }}>
              <div className="flex flex-col gap-[15px]">

                <div className="flex justify-between">
                  <p className="text-[16px] leading-[22.4px] font-[400] text-[white] max-[540px]:text-[14px] max-[540px]:leading-[19.6px]">Balance</p>
                  <p className="text-[#757575] text-[16px] leading-[22.4px] font-[400] max-[540px]:text-[14px] max-[540px]:leading-[19.6px]">0 ETH</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[16px] leading-[22.4px] font-[400] text-[white] max-[540px]:text-[14px] max-[540px]:leading-[19.6px]">Floor Price</p>
                  <p className="text-[#757575] text-[16px] leading-[22.4px] font-[400] max-[540px]:text-[14px] max-[540px]:leading-[19.6px]">5.88 USDC</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[16px] leading-[22.4px] font-[400] text-[white] max-[540px]:text-[14px] max-[540px]:leading-[19.6px]">Best Offer</p>
                  <p className="text-[#757575] text-[16px] leading-[22.4px] font-[400] max-[540px]:text-[14px] max-[540px]:leading-[19.6px]">5USDC</p>
                </div>
              </div>


            </div>
            <div className='flex gap-[10px] mt-[17px] mr-[24px] ml-[24px] max-[450px]:gap-[5px]'>

              <input
                type="number"
                className="text-[14px] h-[54px] font-[400] leading-[19.6px] text-[#BFBFBF] w-full px-[16px] py-[19px]  bg-transparent gradient-slate border border-[#292929] rounded-[8px] focus:outline-none placeholder:text-[14px] placeholder:leading-[19.6px] font-[400] text-[#BFBFBF] max-[450px]:w-[60%] "
                placeholder="Price"
                style={{ background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)", }}
              />

              <Select
                className="w-[40%] h-[54px]   bg-transparent gradient-slate border border-[#292929] rounded-[8px] text-[#BFBFBF] font-[400]
    text-[16px] leading-[21.6px] "
                options={options}
                onChange={handleChange}
                styles={customStyles}
                value={options.find((option) => option.value === selectedCurrency)}
              />


            </div>
            <div className="flex flex-col mt-[32px] gap-[8px] mr-[24px] ml-[24px]">
              <p className="font-[800] text-[14px] leading-[19.6px] text-[#FFFFFF]">Duration</p>
              <div className="flex justify-between max-[540px]:flex-col gap-[5px]">
                <Select
                  className="w-[40%] h-[54px]  bg-transparent  gradient-slate border border-[#292929] rounded-[8px] text-[#BFBFBF] font-[400] text-[16px] leading-[21.6px] max-[540px]:w-full"
                  placeholder="Select"
                  options={durationOptions}
                  onChange={handleDurationChange}
                  styles={customStyles}
                  value={durationOptions.find(option => option.value === selectedDuration)}
                />
                {selectedDuration === "custom" ? (

                  <div className="flex  max-[540px]:flex-col  gap-[5px]  relative">
                    <input
                      type="text"
                      readOnly
                      value={startDate ? startDate.toDateString() : ""}
                      onClick={toggleStartPicker}
                      className=" h-[54px]  w-full pt-[16px] pb-[16px] pl-[16px] pr-[16px] bg-transparent  gradient-slate border border-[#292929] rounded-[8px] text-[#BFBFBF] font-[400] text-[16px] leading-[21.6px]"
                      placeholder="Start Date"
                      style={{
                        background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)",
                      }}
                    />
                    {isStartPickerOpen && (
                      <div
                        className="fixed inset-0 z-50 flex items-end max-[540px]:justify-center justify-end"

                      >
                        <DatePicker
                          setSelectedDate={(date) => {
                            setStartDate(date);
                            setIsStartPickerOpen(false);
                          }}
                          closeDatePicker={() => setIsStartPickerOpen(false)}
                        />
                      </div>
                    )}
                    <input
                      type="text"
                      readOnly
                      value={endDate ? endDate.toDateString() : ""}
                      onClick={toggleEndPicker}
                      className={`w-full h-[54px] pt-[16px] pb-[16px] pl-[16px] pr-[16px] bg-transparent gradient-slate border border-[#292929] rounded-[8px] text-[#BFBFBF] font-[400] text-[16px] leading-[21.6px] `}
                      placeholder="End Date"
                      style={{
                        background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)",
                      }}
                    />
                    {isEndPickerOpen && (
                      <div className="fixed inset-0  z-50 mt-2 flex items-end justify-end max-[540px]:justify-center">
                        <DatePicker
                          setSelectedDate={(date) => {
                            setEndDate(date);
                            setIsEndPickerOpen(false);
                          }}
                          closeDatePicker={() => setIsEndPickerOpen(false)}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  // Show single input for default duration
                  <input
                    type="text"
                    className="text-[14px] h-[54px] font-[400] leading-[19.6px] text-[#BFBFBF] w-full px-[16px] py-[19px] bg-transparent gradient-slate border border-[#292929] rounded-[8px] focus:outline-none placeholder:text-[14px] placeholder:leading-[19.6px] font-[400] text-[#BFBFBF]"
                    placeholder="5th Nov, 2024 - 5:25 PM"
                    style={{
                      background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)",
                    }}
                  />
                )}




              </div>


            </div>




            <DialogFooter className="w-[92.5%] mt-[104px] mb-[24px] mr-[24px] ml-[24px] max-[615px]:w-[90.5%] max-[515px]:w-[89.5%] max-[480px]:w-[88.5%] max-[445px]:w-[87%]  max-[397px]:w-[86%] max-[364px]:w-[85%] max-[347px]:w-[84%]">

              <Button
                className="w-full text-sm font-extrabold text-center w-full rounded-[100px] py-[12px] text-[black] bg-[#00D059]"
              >
                Make Offer
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </Form>
  );
};

export default MakeOfferModal;