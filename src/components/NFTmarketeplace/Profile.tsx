"use client";

import Image from "next/image";
import React, { useState } from "react";
import bg from "@/assets/V2assets/Frame 1597878436.svg";
import ether from "@/assets/V2assets/fi_4125334.svg";
import filter from "@/assets/V2assets/filter.svg";
import dropdown from "@/assets/V2assets/Drpdown 1.svg"
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "../ui/input";
import userlogo from "@/assets/V2assets/yIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY 1.svg"
import AllEventsGrid from "../reusable-components/AllEventsGrid";
import EventCard from "../reusable-components/EventCard";
import Card from "../reusable-components/Card";

const Profile = () => {
    const [selectedTab, setSelectedTab] = useState("Collected");
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenchain, setIsOpenchain] = useState(false);
    const [isOpenrecent, setIsOpenrecent] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>("Status");
    const [selectedChain, setSelectedChain] = useState<string>("Chains");
    const [selectedrecent, setSelectedrecent] = useState<string>("Recently Received");

    const filters = ["Status", "Collected", "Activity", "Favorites", "Owned"];
    const chain = ["Chains", "Collected", "Activity", "Favorites", "Owned"];
    const recent = ["Recently Received", "Collected", "Activity", "Favorites", "Owned"];

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const applyFilter = (filter: string) => {
        setSelectedFilter(filter);
        setIsOpen(false); // Close dropdown after selection
    };
    const toggleDropdownchain = () => {
        setIsOpenchain((prev) => !prev);
    };

    const applychain = (filter: string) => {
        setSelectedChain(filter);
        setIsOpenchain(false); // Close dropdown after selection
    };
    const toggleDropdownrecent = () => {
        setIsOpenrecent((prev) => !prev);
    };

    const applyrecent = (filter: string) => {
        setSelectedrecent(filter);
        setIsOpenrecent(false); // Close dropdown after selection
    };

    const tabs = ["Collected", "Activity"];

    const renderTab = (tab: string) => (
        <div className="w-full sm:w-[150px]">
            <p
                role="button"
                aria-selected={selectedTab === tab}
                className={`pb-[10px] text-sm text-center cursor-pointer ${selectedTab === tab
                    ? "text-[#00D059] font-bold border-2 border-t-0 border-x-0 border-b-[#00A849]"
                    : "border-2 border-t-0 border-x-0 font-normal border-b-[#292929]"
                    }`}
                onClick={() => setSelectedTab(tab)}
            >
                {tab}
            </p>
        </div>
    );

    const FilterButton = () => (
        <div className="gradient-slate flex justify-between items-center w-[143px] p-[16px] rounded-md cursor-pointer">
            <p className="text-[#BFBFBF] text-base">Filter</p>
            <Image src={filter} alt="filter-icon" />
        </div>
    );

    return (
        <div>
            {/* Background Image */}
            <div className="pt-[0px] lg:pt-[85px] ">
                <Image src={bg} alt="bg" className="w-full" />
            </div>

            <div className="xl:px-[90px] sm:px-[35px] px-[24px] pb-[247px]">
                {/* Profile Info */}
                <div className="relative">
                    <Image src={userlogo} alt="user-logo" className=" w-[88px] h-[88px] border border-red bottom-[160px] sm:bottom-[145px] absolute" />
                    <h3 className="text-[24px] md:text-[30px] font-extrabold pt-[60px] pb-[20px]">AKEMIWRLD</h3>
                    <p className="flex items-center pt-[32px] flex-wrap pb-[10px] md:pt-[30px]">
                        <Image src={ether} alt="ether-icon" className="w-[20px] h-[20px]" />
                        <span className="md:text-[20px] text-base ps-[10px] font-extrabold">
                            0xC377...e1eB
                        </span>
                        <span className="text-[#8F8F8F] md:text-[20px] text-base font-normal pt-[10px] sm:pt-[0px] ps-[30px]">
                            Joined September 2024
                        </span>
                    </p>
                </div>

                {/* Tabs */}
                <div className="mt-[30px]">
                    <div className="flex">
                        {tabs.map((tab) => renderTab(tab))}
                    </div>
                    <div>
                     <div className="flex flex-wrap xl:flex-nowrap gap-[17px] md:mt-[32px] mt-[24px]">
                            <FilterButton />
                            <div className="relative inline-block text-left w-[158px]">
                            
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center justify-between w-full gradient-slate text-white p-4 rounded-md"
                                >
                                    <span className="text-sm font-normal">{selectedFilter}</span>
                                    <Image src={dropdown} alt="dropwodn-icon" className={`w-[24px] h-[24px] transform transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
                                </button>

                             
                                {isOpen && (
                                    <div className="absolute z-10 mt-2 w-full gradient-slate rounded-md shadow-lg">
                                        <ul className="py-1">
                                            {filters.map((filter) => (
                                                <li
                                                    key={filter}
                                                    onClick={() => applyFilter(filter)}
                                                    className={`px-4 py-2 cursor-pointer ${selectedFilter === filter ? "font-bold text-[#00D059]" : ""
                                                        }`}
                                                >
                                                    {filter}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="relative inline-block text-left w-[158px]">
                                <button
                                    onClick={toggleDropdownchain}
                                    className="flex items-center justify-between w-full gradient-slate text-white p-4 rounded-md"
                                >
                                    <span className="text-sm font-normal">{selectedChain}</span>
                                    <Image src={dropdown} alt="dropwodn-icon" className={`w-[24px] h-[24px] transform transition-transform duration-300 ${isOpenchain ? "rotate-180" : "rotate-0"}`} />
                                </button>

                                
                                {isOpenchain && (
                                    <div className="absolute z-10 mt-2 w-full gradient-slate rounded-md shadow-lg">
                                        <ul className="py-1">
                                            {chain.map((filter) => (
                                                <li
                                                    key={filter}
                                                    onClick={() => applychain(filter)}
                                                    className={`px-4 py-2 cursor-pointer ${selectedChain === filter ? "font-bold text-[#00D059]" : ""
                                                        }`}
                                                >
                                                    {filter}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="w-[510px] relative ">
                                <Input
                                    className="w-full h-14 rounded-[8px] px-[16px] py-[18px] text-sm font-normal"
                                    placeholder="Search"
                                />
                                <MagnifyingGlass size={20} className="absolute top-1/2 -translate-y-1/2 right-5" />
                            </div>
                            <div className="relative inline-block text-left w-[220px]">
                                <button
                                    onClick={toggleDropdownrecent}
                                    className="flex items-center justify-between w-full gradient-slate text-white p-4 rounded-md"
                                >
                                    <span className="text-sm font-normal">{selectedrecent}</span>
                                    <Image src={dropdown} alt="dropwodn-icon" className={`w-[24px] h-[24px] transform transition-transform duration-300 ${isOpenrecent ? "rotate-180" : "rotate-0"}`} />
                                </button>

                               
                                {isOpenrecent && (
                                    <div className="absolute z-10 mt-2 w-full gradient-slate rounded-md shadow-lg">
                                        <ul className="py-1">
                                            {recent.map((filter) => (
                                                <li
                                                    key={filter}
                                                    onClick={() => applyrecent(filter)}
                                                    className={`px-4 py-2 cursor-pointer ${selectedrecent === filter ? "font-bold text-[#00D059]" : ""
                                                        }`}
                                                >
                                                    {filter}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[24px] md:mt-[70px]">
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;