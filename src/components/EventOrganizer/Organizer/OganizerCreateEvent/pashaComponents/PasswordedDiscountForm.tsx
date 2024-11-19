import React, { useState } from 'react';
import "./Form.css";
import addIcon from "@/assets/Wallet/Plus.svg";
import deleteIcon from "@/assets/Wallet/delete-icon.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import deleteicon from "@/assets/Wallet/delete-icon.svg";
import addicon from "@/assets/Wallet/Plus.svg";
const PasswordedDiscountForm = () => {
    const [emails, setEmails] = useState<string[]>(['']);
    const [passwords, setPasswords] = useState<string[]>(['']);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [showCSVForm, setShowCSVForm] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showAutoPasswordForm, setShowAutoPasswordForm] = useState(false);
    const [showButtons, setShowButtons] = useState(true);

    const handleAddField = (type: string) => {
        if (type === 'email') {
            setEmails([...emails, '']);
        } else {
            setPasswords([...passwords, '']);
        }
    };

    const handleRemoveField = (type: string, index: number) => {
        if (type === 'email') {
            setEmails(emails.filter((_, i) => i !== index));
        } else {
            setPasswords(passwords.filter((_, i) => i !== index));
        }
    };


    const handleCSVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {

            console.log('CSV File Selected:', e.target.files[0]);
        }
    };

    const handleInputChange = (type: string, index: number, value: string) => {
        if (type === 'email') {
            const updatedEmails = [...emails];
            updatedEmails[index] = value;
            setEmails(updatedEmails);
        } else {
            const updatedPasswords = [...passwords];
            updatedPasswords[index] = value;
            setPasswords(updatedPasswords);
        }
    };

    const handleShowForm = (formType: string) => {
        setShowEmailForm(formType === 'email');
        setShowCSVForm(formType === 'csv');
        setShowPasswordForm(formType === 'manualPassword');
        setShowAutoPasswordForm(formType === 'autoPassword');
        setShowButtons(false);
    };

    return (
        <div>
            {showButtons && (
                <>
                    <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "24px" }}>
                        <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
                            <div className="flex justify-start items-center ticket-btn">
                                <Button
                                    style={{
                                        height: "52px",
                                        background: "linear-gradient(#FFFFFF0F, #FFFFFF0F) padding-box,linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%) border-box"
                                    }}
                                    className="flex items-center justify-between bg-[#0F0F0F] text-[#E6E6E6] h-[32px] px-[26px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"

                                    onClick={() => handleShowForm('email')}
                                >
                                    <Image src={addicon} alt="Add-icon" height={12.5} width={12.5} style={{ color: "#E6E6E6" }} />
                                    Add Private Emails
                                </Button>
                            </div>
                            <div className="flex justify-start items-center ticket-btn">
                                <Button
                                    style={{
                                        height: "52px",
                                        background: "linear-gradient(#FFFFFF0F, #FFFFFF0F) padding-box,linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%) border-box"
                                    }}
                                    className="flex items-center justify-between bg-[#0F0F0F] text-[#E6E6E6] h-[32px] px-[26px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"

                                    onClick={() => handleShowForm('csv')}
                                >
                                    <Image src={addicon} alt="Add-icon" height={12.5} width={12.5} style={{ color: "#E6E6E6" }} />
                                    Upload CSV (emails)
                                </Button>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
                            <div className="flex justify-start items-center ticket-btn">
                                <Button
                                    style={{
                                        height: "52px",
                                        background: "linear-gradient(#FFFFFF0F, #FFFFFF0F) padding-box,linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%) border-box"
                                    }}
                                    className="flex items-center justify-between bg-[#0F0F0F] text-[#E6E6E6] h-[32px] px-[26px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"

                                    onClick={() => handleShowForm('manualPassword')}
                                >
                                    <Image src={addicon} alt="Add-icon" height={12.5} width={12.5} style={{ color: "#E6E6E6" }} />
                                    Add Password Manually
                                </Button>
                            </div>

                            <div className="flex justify-start items-center ticket-btn">
                                <Button
                                    style={{
                                        height: "52px",
                                        background: "linear-gradient(#FFFFFF0F, #FFFFFF0F) padding-box,linear-gradient(360deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.06) 100%) border-box"
                                    }}
                                    className="flex items-center justify-between bg-[#0F0F0F] text-[#E6E6E6] h-[32px] px-[26px] gap-[9.75px] rounded-full border-[0.86px] border-transparent text-[11px] font-extrabold"

                                    onClick={() => handleShowForm('autoPassword')}
                                >
                                    <Image src={addicon} alt="Add-icon" height={12.5} width={12.5} style={{ color: "#E6E6E6" }} />
                                    Generate Password Automatically
                                </Button>
                            </div>
                        </div>

                    </div>

                </>
            )}

            {showEmailForm && (
                <FormSection
                    labeltext="PRIVATE EMAIL"
                    label="EMAIL"
                    fields={emails}
                    placeholder="Enter Email"
                    onAdd={() => handleAddField('email')}
                    onRemove={(index) => handleRemoveField('email', index)}
                    onChange={(index, value) => handleInputChange('email', index, value)}
                />
            )}

            {showCSVForm && (
                <div className="relative pb-[16px] w-full rounded-md border border-[#292929] gradient-slate mt-[24px] pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">

                    <p style={{ marginBottom: '10px', color: "#8F8F8F", fontSize: "12px" }}>Upload CSV File</p>


                    <input type="file" accept=".csv" onChange={handleCSVChange} style={{ marginRight: "20px" }} className=' text-[16px]' />
                </div>
            )}

            {showPasswordForm && (
                <FormSection
                    labeltext="MANUAL PASSWORD"
                    label="PASSWORD"
                    fields={passwords}
                    placeholder="Enter Password"
                    type="text"
                    onAdd={() => handleAddField('password')}
                    onRemove={(index) => handleRemoveField('password', index)}
                    onChange={(index, value) => handleInputChange('password', index, value)}
                />
            )}

            {showAutoPasswordForm && (
                <FormSection
                    labeltext="AUTOMATIC GENERATED PASSWORDS"
                    label="PASSWORD"
                    fields={passwords}
                    placeholder="Generated Password"
                    type="text"
                    onAdd={() => handleAddField('password')}
                    onRemove={(index) => handleRemoveField('password', index)}
                    onChange={(index, value) => handleInputChange('password', index, value)}
                />
            )}
        </div>
    );
};

interface FormSectionProps {
    labeltext: string;
    label: string;
    fields: string[];
    placeholder: string;
    type?: string;
    onAdd: () => void;
    onRemove: (index: number) => void;
    onChange: (index: number, value: string) => void;
}




const FormSection: React.FC<FormSectionProps> = ({ labeltext, label, fields, placeholder, type = 'text', onAdd, onRemove, onChange }) => (
    <div className="relative pb-[16px] w-full rounded-md border border-[#292929] gradient-slate mt-[24px] pt-[16px] px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
        <p style={{ marginBottom: '10px', color: "#8F8F8F", fontSize: "12px" }}>{labeltext}</p>
        {fields.map((field, index) => (
            <div key={index} style={{ marginBottom: "24px" }}>
                <div className="relative w-full">
                    <label className="absolute left-3 text-white font-semibold text-[16px]"
                        style={{ top: '20px', transform: 'translateY(-50%)' }}>{`${label} ${index + 1}`}</label>
                    <input
                        type={type}
                        value={field}
                        placeholder={`${placeholder} ${index + 1}`}
                        onChange={(e) => onChange(index, e.target.value)}
                        className="pt-[26px] pb-[10px] placeholder:text-[12px] placeholder:font-extrabold placeholder:text-[#8F8F8F] w-full rounded-md border border-[#292929] gradient-slate px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"

                    /></div>
                {index > 0 && (


                    <div className="flex justify-end items-center mt-[12px] ticket-btn mt-2">
                        <Button
                            className=" bg-[#FF1717B2] text-white font-bold h-[32px] py-[8px] px-[12px] gap-[8px] flex items-center justify-between rounded-[100px] text-[11px] font-extrabold"
                            onClick={() => onRemove(index)}
                        >
                            <Image src={deleteicon} alt="delete-icon" height={12} width={12} />
                            Delete
                        </Button>
                    </div>


                )}
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
                onClick={onAdd}
            >
                <Image src={addicon} alt="Add-icon" height={12.5} width={12.5} />
                Additional Field
            </Button>
        </div>





    </div>
);

export default PasswordedDiscountForm;
