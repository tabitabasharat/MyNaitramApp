import React, { useState } from 'react';
import "./Form.css";
import addicon from "@/assets/Wallet/Plus.svg";
import deleteicon from "@/assets/Wallet/delete-icon.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Define the Props interface outside the component
interface RsvpTicketingProps {
    onLimitChange?: (limit: string) => void;
}

const RsvpTicketing: React.FC<RsvpTicketingProps> = ({ onLimitChange }) => {
    const [fields, setFields] = useState<string[]>([]); // Start with an empty array
    const [rsvpDeadline, setRsvpDeadline] = useState('');
    const [rsvpCapacity, setRsvpCapacity] = useState('');
    const [whatIncluded, setWhatIncluded] = useState('');
    const [selectedOption, setSelectedOption] = useState('email');

    const handleAddField = () => {
        setFields([...fields, '']); // Add a new empty field
    };

    const handleRemoveField = (index: number) => {
        const updatedFields = fields.filter((_, i) => i !== index); // Remove the field at the specified index
        setFields(updatedFields);
    };

    const handleFieldChange = (index: number, value: string) => {
        const updatedFields = [...fields];
        updatedFields[index] = value; // Update the value of the specific field
        setFields(updatedFields);
    };

    const handleRsvpDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRsvpDeadline(e.target.value);
    };

    const handleRsvpCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Remove non-numeric characters
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        setRsvpCapacity(sanitizedValue);
        if (onLimitChange) {
            onLimitChange(sanitizedValue);
        }
    };

    const handleWhatIncludedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWhatIncluded(e.target.value);
    };

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div>

            <div >


                <div className="flex items-start gap-[24px] w-full mt-[24px] common-container">
                    <div className="relative w-full">
                        <label className="absolute left-3 text-white font-semibold text-[16px]" style={{ top: '30px', transform: 'translateY(-50%)' }}>RSVP Deadline</label>
                        <input
                            type="text"
                            value={rsvpDeadline}
                            onChange={handleRsvpDeadlineChange}
                            placeholder="Enter RSVP Deadline"
                            className="pt-[38px] pb-[10px] placeholder:text-[12px] placeholder:font-extrabold placeholder:text-[#8F8F8F] w-full rounded-md border border-[#292929] gradient-slate px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="relative w-full">
                        <label className="absolute left-3 text-white font-semibold text-[16px]" style={{ top: '30px', transform: 'translateY(-50%)' }}>RSVP Capacity</label>
                        <input
                            type="number"
                            value={rsvpCapacity}
                            onChange={handleRsvpCapacityChange}
                            placeholder="Enter RSVP Capacity"
                            className="pt-[38px] pb-[10px] placeholder:text-[12px] placeholder:font-extrabold placeholder:text-[#8F8F8F] w-full rounded-md border border-[#292929] gradient-slate px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>
                <div className="flex items-start lg:gap-[24px] md:w-[49%] xl:gap-[24px] gap-[16px] w-full mt-[24px] common-container ">

                    <div className="relative w-full" >
                        <label className="absolute left-3 text-white font-semibold text-[16px]"
                            style={{ top: '30px', transform: 'translateY(-50%)' }} >What’s Included</label>
                        <input
                            type="text"
                            value={whatIncluded}
                            onChange={handleWhatIncludedChange}
                            placeholder="Enter What’s Included"
                            className="pt-[38px] pb-[10px] placeholder:text-[12px] placeholder:font-extrabold placeholder:text-[#8F8F8F] w-full rounded-md border border-[#292929] gradient-slate px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                </div>

                <div className="relative pb-[16px] mt-[24px] w-full rounded-md border border-[#292929] gradient-slate pt-[16px] px-[12px] text-base text-white">
                <p style={{ marginBottom: '10px', color: "#8F8F8F", fontSize: "12px" }}>RSVP DETAILS</p>
                    <div className="mt-[24px]">
                        <div className="flex justify-start items-center">
                            <input
                                type="radio"
                                id="email"
                                name="contact"
                                value="email"
                                checked={selectedOption === 'email'}
                                onChange={handleOptionChange}
                                className="mr-[8px]"
                            />
                            <label className="text-white">Email</label>
                        </div>
                        <div className="flex justify-start items-center mt-[8px]">
                            <input
                                type="radio"
                                id="phone"
                                name="contact"
                                value="phone"
                                checked={selectedOption === 'phone'}
                                onChange={handleOptionChange}
                                className="mr-[8px]"
                            />
                            <label className="text-white">Phone</label>
                        </div>
                        <div className="flex justify-start items-center mt-[8px]">
                            <input
                                type="radio"
                                id="secondEmail"
                                name="contact"
                                value="secondEmail"
                                checked={selectedOption === 'secondEmail'}
                                onChange={handleOptionChange}
                                className="mr-[8px]"
                            />
                            <label className="text-white">Second Email</label>
                        </div>
                    </div>


                   

                    {fields.map((field, index) => (
                        <div key={index}>
                            <div className="relative w-full mt-[24px]">
                                <label className="absolute left-3 text-white font-semibold text-[16px]" style={{ top: '30px', transform: 'translateY(-50%)' }}>
                                    {`ADDITIONAL FIELD ${index + 1}`}
                                </label>
                                <input
                                    type="Enter Field"
                                    value={field}
                                    onChange={(e) => handleFieldChange(index, e.target.value)}
                                    placeholder={`Enter Field ${index + 1}`}
                                    className="pt-[38px] pb-[10px] placeholder:text-[12px] placeholder:font-extrabold placeholder:text-[#8F8F8F] w-full rounded-md border border-[#292929] gradient-slate px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>



                            <div className="flex justify-end items-center mt-[12px] ticket-btn mt-2">
                                <Button
                                    className=" bg-[#FF1717B2] text-white font-bold h-[32px] py-[8px] px-[12px] gap-[8px] flex items-center justify-between rounded-[100px] text-[11px] font-extrabold"
                                    onClick={() => handleRemoveField(index)}
                                >
                                    <Image src={deleteicon} alt="delete-icon" height={12} width={12} />
                                    Delete
                                </Button>
                            </div>

                        </div>
                    ))}

<div className="flex justify-start items-center mt-[24px]">
                        <Button
                            style={{
                                height: "32px",
                                background: "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                            }}
                            className="flex items-center justify-center bg-[#0F0F0F] text-[#00D059] h-[32px] px-[26px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"
                            onClick={handleAddField}
                        >
                            <Image src={addicon} alt="Add-icon" height={12.5} width={12.5} />
                            Additional Field
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RsvpTicketing;
