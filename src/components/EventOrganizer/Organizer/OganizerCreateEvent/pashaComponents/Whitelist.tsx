import React, { useState } from 'react';

interface WhitelistProps {
    onLimitChange?: (value: string) => void;
}

const Whitelist: React.FC<WhitelistProps> = ({ onLimitChange }) => {
    const [limit, setLimit] = useState<string>('');

    const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;


        const sanitizedValue = value.replace(/[^0-9]/g, '');

        setLimit(sanitizedValue);

        if (onLimitChange) {
            onLimitChange(sanitizedValue);
        }
    };

    return (
        <div className="relative w-full" style={{ marginTop: "24px" }}>
            <label
                className="absolute left-3 text-white font-semibold text-[16px]"
                style={{ top: '30px', transform: 'translateY(-50%)' }}
            >
                WHITELIST LIMIT{" "}<span style={{ color: "#BA0202" }}>*</span>
            </label>
            <input
                type="text" // Use "text" type to control invalid input
                value={limit}
                onChange={handleLimitChange}
                placeholder="Enter Limit"
                required
                className="pt-[38px] pb-[10px] placeholder:text-[12px] placeholder:font-extrabold placeholder:text-[#8F8F8F] w-full rounded-md border border-[#292929] gradient-slate px-[12px] text-base text-white focus:border-[#087336] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BFBFBF] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
    );
};

export default Whitelist;
