"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Back from "@/assets/Back-2.svg";
import RadioButton from "@/assets/RadioButtonImage.svg";
import BuyNowImage from "@/assets/BuyNow-DummyImage.svg";
import SetaPrice from "@/assets/setAPrice.svg";
import Select, { SingleValue } from 'react-select';
import ArrowDown from "@/assets/arrowBottom-white.svg";
import left from '@/assets/Caret Left.svg';
import "./makeOffer.css";

interface OptionType {
    value: string;
    label: string;
}
type SaleOptionProps = {
    title: string;
    description: string;
    selected: boolean;
    onSelect: () => void;
};

const SaleOption: React.FC<SaleOptionProps> = ({
    title,
    description,
    selected,
    onSelect,
}) => {
    return (
        <div
            className='gradient-slate-input flex justify-between w-full py-[20px] px-[12px] items-center'
            style={{ background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)", }}

            onClick={onSelect}
        >
            {/* Text Section */}
            <div>
                <p className="font-[800] text-[16px] leading-[20px]">{title}</p>
                <p className="text-[#8F8F8F] font-[700] text-[12px] leading-[16.2px]">{description}</p>
            </div>


            <div
                className={`w-[13px] h-[13px] flex items-center justify-center rounded-full ${selected ? "border-none bg-transparent" : "border-2 border-[#00D059] bg-transparent"
                    }`}
            >
                {selected && <Image className="h-full w-full" src={RadioButton} alt="RadioButton" />}
            </div>

            {/* </div> */}

        </div>
    );
};
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
  dropdownIndicator: (base: any) => ({
    ...base,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: '0',
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
      ? '#00D059'
      : 'transparent',
    borderRadius: '8px',
    '&:hover': {
      background: '#00D059',
      color: 'black',
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

const BuyNow = () => {
    const [selectedOption, setSelectedOption] = React.useState<string>("fixed-price");
    const [selectedCurrency, setSelectedCurrency] = useState<string>('ETH');
    const [selectedDuration, setSelectedDuration] = useState<string>('1 Month');

    const handleChange = (selectedOptions: SingleValue<OptionType>) => {
        if (selectedOptions) {
            setSelectedCurrency(selectedOptions.value);
        }
    };
    const handleDurationChange = (selectedOption: SingleValue<OptionType>) => {
        if (selectedOption) {
          setSelectedDuration(selectedOption.value);
        }
      };
    return (
      <div className="relative">
        <section className=" pt-[173px] pb-[108px] flex flex-col gap-[40px] b pl-[92px] pr-[97px] max-[992px]:pl-[0px] max-[992px]:pr-[0px]  max-[992px]:pt-[0px] max-[992px]:pb-[0px] ">
            <div className=" max-[992px]:bg-buyNow withoutImage max-[992px]:pl-[92px] max-[992px]:pr-[97px]  max-[992px]:pt-[174px]  max-[992px]:pb-[108px] max-[768px]:pl-[24px] max-[768px]:pr-[24px]  max-[768px]:pt-[100px]  max-[768px]:pb-[100px] ">
            <div className="flex gap-[16px] items-center custom-border max-[1180px]:pb-[24px] max-[1180px]:mb-[24px]  ">
            <Image className="block max-[992px]:hidden" src={Back} alt="backButton" />
<Image className="hidden max-[992px]:block" src={left} alt="Left" />



                <p className="font-[800] text-[24px] leading-[27.6px] max-[500px]:text-[20px] max-[500px]:leading-[24px] "> List For Sale</p>
            </div>
            <div className="flex w-full justify-between  max-[1180px]:flex-col-reverse max-[1180px]:gap-[40px]">
                <div className="flex flex-col w-[50%] max-[1000px]:w-[70%] max-[850px]:w-[85%] max-[768px]:w-[100%]">
                    <div className="flex flex-col gap-[40px] mt-[40px]">
                        <div className="flex flex-col gap-[12px]">
                            <p className="font-[800] text-[20px] leading-[32px] max-[500px]:text-[18px] max-[500px]:leading-[28.8px]">Choose a Type of Sale</p>

                            <SaleOption
                                title="FIXED PRICE"
                                description="The Item Is Listed At The Price You Set"
                                selected={selectedOption === "fixed-price"}
                                onSelect={() => setSelectedOption("fixed-price")}
                            />
                        </div>
                        <div className="flex flex-col gap-[20px]">
                            <div className="flex gap-[10px]">
                                <p className="font-[800] text-[20px] leading-[32px] max-[500px]:text-[18px] max-[500px]:leading-[28.8px]">Set a Price</p>
                                <Image src={SetaPrice} alt='setPrice' />
                            </div>
                            <p className="font-[800] text-[16px] leading-[19.2px]">Starting Price</p>
                            <div className='flex gap-[10px]'>

                                <input
                                    type="text"
                                    className="text-[14px] h-[54px] font-[400] leading-[19.6px] text-[#BFBFBF] w-full px-[16px] py-[19px]  bg-transparent gradient-slate-input focus:outline-none placeholder:text-[14px] placeholder:leading-[19.6px] font-[400] text-[#BFBFBF] max-[540px]:w-[50%] "
                                    placeholder="Price"
                                    style={{ background: "linear-gradient(360deg, #0F0F0F 72%, #1A1A1A 100%)", }}
                                />
<Select
  className="w-[40%] h-[54px] bg-transparent rounded-[8px] gradient-slate-input text-[#BFBFBF] font-[400] text-[16px] leading-[21.6px] max-[540px]:w-[50%]"
  options={options}
  onChange={handleChange}
  styles={customStyles}
  value={options.find((option) => option.value === selectedCurrency)}
/>



                            </div>


                        </div>
                        <div className="flex flex-col gap-[12px]">
                            <p className="font-[800] text-[20px] leading-[32px] max-[500px]:text-[18px] max-[500px]:leading-[28.8px]">Duration</p>
                            <Select
  className="w-full h-[54px] bg-transparent rounded-[8px] gradient-slate-input text-[#BFBFBF] font-[400] text-[16px] leading-[21.6px] max-[540px]:w-[100%]"
  placeholder="1 Month"
                  options={durationOptions}
                  onChange={handleDurationChange}
                  styles={customStyles}
                  value={durationOptions.find(option => option.value === selectedDuration)}
                />

                        </div>
                        <div className="flex  w-full justify-between align-center">
                            <p className="font-[800] text-[20px] leading-[32px] max-[500px]:text-[18px] max-[500px]:leading-[28.8px]">More Options</p>
                            <Image src={ArrowDown} alt="down Arrow" />


                        </div>
                        <div className="flex flex-col gap-[12px]">
                            <p className="font-[800] text-[20px] leading-[32px] max-[500px]:text-[18px] max-[500px]:leading-[28.8px]">Summary</p>
                            <div className="flex flex-col gap-[20px] gradient-slate-input p-[16px]">
                                <div className="flex w-full justify-between">
                                    <p className="font-[400] text-[14px] leading-[19.6px]">Listing Price</p>
                                    <p className="text-[#757575]  text-[16px] leading-[22.4px] font-[400] max-[500px]:text-[14px] max-[500px]:leading-[19.6px]">-- ETH</p>
                                </div>
                                <div className="flex w-full justify-between">
                                    <p className="font-[400] text-[14px] leading-[19.6px]">Platform Fee</p>
                                    <p className="text-[#757575]  text-[16px] leading-[22.4px] font-[400] max-[500px]:text-[14px] max-[500px]:leading-[19.6px]">2.5%</p>
                                </div>
                                <div className="flex w-full justify-between">
                                    <p className="font-[400] text-[14px] leading-[19.6px]">Creator Earnings</p>
                                    <p className="font-[400] text-[14px] leading-[19.6px] max-[500px]:leading-[16.8px]">6.55%</p>
                                </div>

                            </div>
                       </div>

                    </div>
                    <div className="flex flex-col mt-[25px] pt-[25px] gap-[40px]"
                     style={{
                        borderTop: "1px solid",
                        borderImageSource:
                          "linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%)",
                        borderImageSlice: 1,
                      }}>
                        <div className="flex w-full justify-between align-center">
                            <p className="font-[800] text-[20px] leading-[32px] max-[350px]:text-[16px] max-[350px]:font-[600]">Total Potential Earnings</p>
                            <p className="text-[#00D059] font-[700] text-[20px] leading-[32px] max-[500px]:text-[18px] max-[500px]:leading-[28.8px]">-- ETH</p>
                        </div>
                        <Button
                //   onClick={() => FeedBackOnEvent()}
                className=" text-sm font-extrabold text-center w-full rounded-[100px] py-[12px] text-[black] bg-[#00D059]"
              style={{fontFamily: "var(--font-base)",}}>
               Complete Listing
              </Button>


                    </div>

                </div>
                <div className="BuyNowMarketPlace-gradient w-[400px]  h-[512px] max-[450px]:w-full  max-[450px]:h-auto">
                    <div className="flex flex-col p-[16px] w-full gap-[20px]">
                        <Image className='w-full h-[342px] max-[450px]:h-[219px] max-[450px]:w-[400px] max-[450px]:h-[400px] max-[395px]:h-auto' src={BuyNowImage} alt='Image PlaceHolder' />
                        <div className="flex flex-col gap-[12px]">
                            <p className="text-white font-[800] text-[18px] leading-[19.15px] max-[500px]:text-[16px] max-[500px]:leading-[16.51px] ">The Orbitians</p>
                            <p className="text-[#BFBFBF] font-[400] text-[14px] leading-[16.8px] max-[500px]:text-[12px] max-[500px]:leading-[14.4px]">@silent-blue</p>
                        </div>
                        <p className="text-[#00D059] font-[800] text-[24px] leading-[27.6px] -tracking-[0.04em] pb-[28px] max-[500px]:text-[20px] max-[500px]:leading-[23px]">-- ETH</p>
                    </div>

                </div>

            </div>




            </div>
        </section>
        <div className="absolute bottom: 0; right-0 w-[30%] h-[30%] bg-[#00D059] blur-[400px] rounded-[30%] -z-10 max-[992px]:hidden">
        </div>
        </div>
    )
}
export default BuyNow;