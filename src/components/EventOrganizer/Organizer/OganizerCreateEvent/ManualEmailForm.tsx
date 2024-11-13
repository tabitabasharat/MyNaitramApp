import React, { useState } from 'react';
import "./Form.css"
import addicon from "@/assets/Wallet/Plus.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import deleteicon from "@/assets/Wallet/delete-icon.svg";
const ManualEmailForm = () => {
    const [emails, setEmails] = useState<string[]>(['']);
    const [showManualForm, setShowManualForm] = useState<boolean>(false);
    const [showCSVForm, setShowCSVForm] = useState<boolean>(false);
    const [showButtons, setShowButtons] = useState<boolean>(true);

    const handleAddEmail = () => {
        setEmails([...emails, '']);
    };

    const handleRemoveEmail = (index: number) => {
        const updatedEmails = emails.filter((_, i) => i !== index);
        setEmails(updatedEmails);
    };

    const handleEmailChange = (index: number, value: string) => {
        const updatedEmails = [...emails];
        updatedEmails[index] = value;
        setEmails(updatedEmails);
    };

    const handleCSVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {

            console.log('CSV File Selected:', e.target.files[0]);
        }
    };

    const handleShowManualForm = () => {
        setShowManualForm(true);
        setShowCSVForm(false);
        setShowButtons(false);
    };

    const handleShowCSVForm = () => {
        setShowCSVForm(true);
        setShowManualForm(false);
        setShowButtons(false);
    };

    return (
        <div>

            {showButtons && (
                <>
                    <div className="flex justify-start items-center mt-[24px] ticket-btn">
                        <Button
                            style={{
                                height: "52px",
                                background: "linear-gradient(#FFFFFF0F, #FFFFFF0F) padding-box,linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%) border-box"
                            }}
                            className="flex items-center justify-between bg-[#0F0F0F] text-[#E6E6E6] h-[32px] px-[26px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"

                            onClick={handleShowManualForm}
                        >
                            <Image src={addicon} alt="Add-icon" height={12.5} width={12.5} style={{ color: "#E6E6E6" }} />
                            Add Emails manually
                        </Button>
                    </div>
                    <div className="flex justify-start items-center mt-[24px] ticket-btn">
                        <Button
                            style={{
                                height: "52px",
                                background: "linear-gradient(#FFFFFF0F, #FFFFFF0F) padding-box,linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%) border-box"
                            }}
                            className="flex items-center justify-between bg-[#0F0F0F] text-[#E6E6E6] h-[32px] px-[26px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"

                            onClick={handleShowCSVForm}
                        >
                            <Image src={addicon} alt="Add-icon" height={12.5} width={12.5} className='text-[#E6E6E6]' />
                            Upload CSV (emails)
                        </Button>
                    </div>


                </>
            )}


            {showManualForm && (
                <div className="relative pb-[16px] w-full rounded-md border border-[#292929] gradient-slate mt-[24px] pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">

                    <p style={{ marginBottom: '10px', color: "#8F8F8F", fontSize: "12px" }}>Manual Emails</p>
                    {emails.map((email, index) => (
                        <div >
                            <div key={index} style={{ marginBottom: "24px" }}
                            >

                                <div className="relative w-full">
                                    <label
                                        className="absolute left-3 text-white font-semibold text-[16px]"
                                        style={{ top: '20px', transform: 'translateY(-50%)' }}
                                    >
                                        {`EMAIL ${index + 1}`}
                                    </label>
                                    <input
                                        className="pt-[26px] pb-[10px] placeholder:text-[12px] placeholder:font-extrabold placeholder:text-[#8F8F8F] w-full rounded-md border border-[#292929] gradient-slate px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        value={email}
                                        onChange={(e) => handleEmailChange(index, e.target.value)}
                                        placeholder= {`Enter Email ${index + 1}`}
                                        required
                                        style={{ marginRight: '8px' }}
                                    />
                                </div>



                                {index > 0 && (


                                    <div className="flex justify-end items-center mt-[12px] ticket-btn mt-2">
                                        <Button
                                            className=" bg-[#FF1717B2] text-white font-bold h-[32px] py-[8px] px-[12px] gap-[8px] flex items-center justify-between rounded-[100px] text-[11px] font-extrabold"
                                            onClick={() => handleRemoveEmail(index)}
                                        >
                                            <Image src={deleteicon} alt="delete-icon" height={12} width={12} />
                                            Delete
                                        </Button>
                                    </div>


                                )}
                            </div>
                        </div>
                    ))}


                    <div className="flex justify-start   items-center mt-[24px] ticket-btn" style={{ width: "133px" }}>
                        <Button
                            style={{
                                height: "32px",

                                background:
                                    "linear-gradient(#0F0F0F, #1A1A1A) padding-box, linear-gradient(272.78deg, rgba(15, 255, 119, 0.32) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(15, 255, 119, 0.32) 100%) border-box",
                            }}
                            className="flex items-center justify-center bg-[#0F0F0F] text-[#00D059] h-[32px] px-[26px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"

                            onClick={handleAddEmail}
                        >
                            <Image src={addicon} alt="Add-icon" height={12.5} width={12.5} />
                            Additional Field
                        </Button>

                    </div>


                </div>
            )}


            {showCSVForm && (
                <div className="relative pb-[16px] w-full rounded-md border border-[#292929] gradient-slate mt-[24px] pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">

                    <p style={{ marginBottom: '10px', color: "#8F8F8F", fontSize: "12px" }}>Upload CSV File</p>


                    <input type="file" accept=".csv" onChange={handleCSVChange} style={{marginRight:"20px"}} className=' text-[16px]'  />
                </div>
            )}
        </div>
    );
};

export default ManualEmailForm;
