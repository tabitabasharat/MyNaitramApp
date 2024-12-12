"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableFooter } from "@mui/material";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import bg from "@/assets/V2assets/Frame 1597878436.svg";
import ether from "@/assets/V2assets/fi_4125334.svg";
import filter from "@/assets/V2assets/filter.svg";
import dropdown from "@/assets/V2assets/Drpdown 1.svg";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "../ui/input";
import userlogo from "@/assets/V2assets/yIm-M5-BpSDdTEIJRt5D6xphizhIdozXjqSITgK4phWq7MmAU3qE7Nw7POGCiPGyhtJ3ZFP8iJ29TFl-RLcGBWX5qI4-ZcnCPcsY 1.svg";
import AllEventsGrid from "../reusable-components/AllEventsGrid";
import EventCard from "../reusable-components/EventCard";
import Card from "../reusable-components/Card";
import avatar from "@/assets/V2assets/Avatar.svg";
import arrowdown from "@/assets/V2assets/Frame.svg";

import { ArrowElbowRightDown } from "@phosphor-icons/react";

function createData2(
  item: string,
  Price: string,
  Rarity: number,
  Quantity: number,
  From: string,
  To: any,
  month: string,
  php: any
) {
  return { item, Price, Rarity, Quantity, From, To, month, php };
}

const analytics = [
  createData2(
    "AKEMIWRLD",
    "1,249 ETH",
    1234,
    1,
    "Null Address",
    "You",
    "10 Mon Ago..",
    avatar
  ),
  createData2(
    "AKEMIWRLD",
    "1,249 ETH",
    1234,
    1,
    "Null Address",
    "12345678",
    "10 Mon Ago..",
    avatar
  ),
  createData2(
    "AKEMIWRLD",
    "-----",
    1234,
    1,
    "Null Address",
    "You",
    "10 Mon Ago..",
    avatar
  ),
];

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("Collected");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenchain, setIsOpenchain] = useState(false);
  const [isOpenrecent, setIsOpenrecent] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("Status");
  const [selectedChain, setSelectedChain] = useState<string>("Chains");
  const [selectedrecent, setSelectedrecent] =
    useState<string>("Recently Received");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
        setIsOpen(false);
        setIsOpenchain(false);
        setIsOpenrecent(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filters = ["Status", "Collected", "Activity", "Favorites", "Owned"];
  const chain = ["Chains", "Collected", "Activity", "Favorites", "Owned"];
  const recent = [
    "Recently Received",
    "Collected",
    "Activity",
    "Favorites",
    "Owned",
  ];

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const closeDropdown = (dropdown: string) => {
    if (dropdown === "filter") setIsOpen(false);
    if (dropdown === "chain") setIsOpenchain(false);
    if (dropdown === "recent") setIsOpenrecent(false);
  };

  // Status filter handeling
  const applyFilter = (filter: string) => {
    setSelectedFilter(filter);
    setIsOpen(false);
  };

  // chain Filter hanbeling
  const applychain = (chain: string) => {
    setSelectedChain(chain);
    setIsOpenchain(false);
  };

  //recent Filter hanbdeling
  const applyrecent = (recent: string) => {
    console.log("dfugdsjfgdsjfgdsjfgdsjfdsg");
    setSelectedrecent(recent);
    setIsOpenrecent(false);
  };

  const tabs = ["Collected", "Activity"];

  const renderTab = (tab: string) => (
    <div className="w-full sm:w-[150px]">
      <p
        role="button"
        aria-selected={selectedTab === tab}
        className={`pb-[10px] text-sm text-center cursor-pointer ${
          selectedTab === tab
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
    <div className="gradient-slate border border-[#292929] flex justify-between items-center w-full sm:w-[143px] p-[15px] rounded-md cursor-pointer">
      <p className="text-[#BFBFBF] text-base">Filter</p>
      <Image src={filter} alt="filter-icon" />
    </div>
  );

  const FilterButton1 = () => (
    <>
      <div className="flex relative flex-col">
        {/* Filter Button */}
        <div
          onClick={toggleDropdown}
          className="border border-[#292929] gradient-slate max-[500px]:w-fit w-[30%] p-[15px] rounded-lg min-[501px]:w-[143px] flex items-center justify-between"
        >
          <h2 className="text-[16px] max-[500px]:hidden font-normal max-[390px]:hidden leading-5 text-[#BFBFBF]">
            Filter
          </h2>
          <img
            src="/Images/Nft_animakid_img/filtr.svg"
            width={22}
            height={22}
            className="w-[22px] h-[22px] max-w-[22px]"
            alt="Filter Icon"
          />
        </div>

        {/* Dropdown Content (Visible only below 500px screen width) */}
        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="flex flex-col min-[501px]:hidden absolute z-[1] top-[58px] right-[0px] p-[16px] gradient-slate rounded-[8px] border border-[#292929] mt-[8px] gap-[16px]"
          >
            {/* Filter Dropdown */}
            <div className="relative inline-block text-left w-[209px]">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full gradient-slate border border-[#292929] text-white p-[15px] rounded-md"
              >
                <span className="text-sm font-normal text-[#BFBFBF]">
                  {selectedrecent}
                </span>
                <Image
                  src={arrowdown}
                  alt="dropdown-icon"
                  width={22}
                  height={22}
                  className={`w-[22px] h-[22px] transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isOpen && (
                <div className="absolute z-10 mt-2 w-full gradient-slate border border-[#292929] rounded-md shadow-lg">
                  <ul className="py-1">
                    {/* Replace `filters` with your list */}
                    {recent.map((filter, index) => (
                      <li
                        key={index}
                        className={`px-4 py-2 cursor-pointer ${
                          selectedrecent === filter
                            ? "font-bold text-[#00D059]"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          applyrecent(filter);
                          setIsOpen(!isOpen);
                        }}
                      >
                        {filter}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Status Dropdown */}
            <div className="relative inline-block text-left w-[209px]">
              <button
                onClick={() => setIsOpenchain(!isOpenchain)}
                className="flex items-center justify-between w-full gradient-slate border border-[#292929] text-white p-[15px] rounded-md"
              >
                <span className="text-sm font-normal text-[#BFBFBF]">
                  {selectedFilter}
                </span>
                <Image
                  src={arrowdown}
                  alt="dropdown-icon"
                  width={24}
                  height={24}
                  className={`w-[24px] h-[24px] transform transition-transform duration-300 ${
                    isOpenchain ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isOpenchain && (
                <div className="absolute z-10 mt-2 w-full gradient-slate border border-[#292929] rounded-md shadow-lg">
                  <ul className="py-1">
                    {/* Replace `chain` with your list */}
                    {filters.map((filter, index) => (
                      <li
                        key={index}
                        className={`px-4 py-2 cursor-pointer ${
                          selectedFilter === filter
                            ? "font-bold text-[#00D059]"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          applyFilter(filter);
                          setIsOpenchain(!isOpenchain);
                        }}
                      >
                        {filter}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Chain Dropdown */}
            <div className="relative inline-block text-left w-[209px]">
              <button
                onClick={() => setIsOpenrecent(!isOpenrecent)}
                className="flex items-center justify-between w-full gradient-slate border border-[#292929] text-white p-[15px] rounded-md"
              >
                <span className="text-sm font-normal text-[#BFBFBF]">
                  {selectedChain}
                </span>
                <Image
                  src={arrowdown}
                  alt="dropdown-icon"
                  width={24}
                  height={24}
                  className={`w-[24px] h-[24px] transform transition-transform duration-300 ${
                    isOpenrecent ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isOpenrecent && (
                <div className="absolute z-10 mt-2 w-full gradient-slate border border-[#292929] rounded-md shadow-lg">
                  <ul className="py-1">
                    {/* Replace `recent` with your list */}
                    {chain.map((filter, index) => (
                      <li
                        key={index}
                        className={`px-4 py-2 cursor-pointer ${
                          selectedChain === filter
                            ? "font-bold text-[#00D059]"
                            : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          applychain(filter);
                          setIsOpenrecent(!isOpenrecent);
                        }}
                      >
                        {filter}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );

  useEffect(() => {
    console.log("State is getting update ==> ", selectedrecent);
  }, [selectedrecent]);

  return (
    <section className="min-h-screen sm:pb-[8rem] lg:px-0 bg-v2 ">
      {/* // <section className="min-h-screen bg-cover bg-no-repeat bg-reward"> */}
      {/* Background Image */}
      <div className="pt-[0px] lg:pt-[85px] ">
        <Image
          src={bg}
          alt="bg"
          className="w-full object-none h-[360px] sm:h-auto sm:object-contain"
        />
      </div>

      <div className="xl:px-[90px] sm:px-[35px] px-[24px] pb-[66px] sm:pb-[247px]">
        {/* Profile Info */}
        <div className="relative ">
          <div className="gradient-profile max-[386px]:bottom-[170px] max-[386px]:bottom-[122px] max-[385px]:bottom-[152px] max-[639px]:bottom-[124px] bottom-[145px] md:bottom-[177px] sm:bottom-[145px] absolute">
            <Image
              src={userlogo}
              alt="user-logo"
              className=" w-[88px] rounded-[9px] h-[88px]"
            />
          </div>
          <h3 className="text-[24px] md:text-[30px] font-extrabold pt-[60px] sm:pb-[20px]">
            AKEMIWRLD
          </h3>
          <p className="flex items-center gap-[10px] sm:gap-[30px] flex-wrap text-[end] mt-[32px] pb-[10px] md:pt-[30px]">
            <div className="flex">
              <Image
                src={ether}
                alt="ether-icon"
                className="w-[20px] h-[20px]"
              />
              <span className="md:text-[20px] text-base ps-[10px] font-extrabold">
                0xC377...e1eB
              </span>
            </div>
            <div>
              <span className="text-[#8F8F8F] md:text-[20px] text-base font-normal sm:pt-[0px]">
                Joined September 2024
              </span>
            </div>
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-[30px] flex flex-col">
          <div className="flex">
            <div className="flex w-full sm:w-[300px] mb-[24px] md:mb-[32px]">
              {tabs.map((tab) => renderTab(tab))}
            </div>
            <div className="flex sm:block hidden border-b-2 border-b-[#292929] border border-x-transparent border-t-transparent mb-[24px] w-[0px]  sm:w-[76%] md:mb-[32px]"></div>
          </div>
          <div>
            {selectedTab === "Collected" ? (
              <div>
                <div className="flex max-[500px]:hidden flex-wrap xl:flex-nowrap gap-[10px] max-[500px]:gap-[17px]">
                  <FilterButton />
                  {/* Status Filter */}
                  <div
                    className="relative inline-block text-left w-[158px]"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="flex items-center justify-between w-full gradient-slate border border-[#292929] text-white p-[15px] rounded-md"
                    >
                      <span className="text-sm font-normal">
                        {selectedFilter}
                      </span>
                      <Image
                        src={arrowdown}
                        width={22}
                        height={22}
                        alt="dropdown-icon"
                        className={`w-[22px] h-[22px] transform transition-transform duration-300 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="absolute z-10 mt-2 w-full gradient-slate border border-[#292929] rounded-md shadow-lg">
                        <ul className="py-1">
                          {filters.map((filter, index) => (
                            <li
                              key={index}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                applyFilter(filter);
                                setIsOpen(!isOpen);
                              }}
                              className={`px-4 py-2 cursor-pointer ${
                                selectedFilter === filter
                                  ? "font-bold text-[#00D059]"
                                  : ""
                              }`}
                            >
                              {filter}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Chain Filter */}
                  <div
                    className="relative inline-block text-left w-[158px]"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={() => setIsOpenchain(!isOpenchain)}
                      className="flex items-center justify-between w-full gradient-slate border border-[#292929] text-white p-[15px] rounded-md"
                    >
                      <span className="text-sm font-normal">
                        {selectedChain}
                      </span>
                      <Image
                        src={arrowdown}
                        width={24}
                        height={24}
                        alt="dropdown-icon"
                        className={`w-[24px] h-[24px] transform transition-transform duration-300 ${
                          isOpenchain ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                    {isOpenchain && (
                      <div className="absolute z-10 mt-2 w-full gradient-slate border border-[#292929] rounded-md shadow-lg">
                        <ul className="py-1">
                          {chain.map((filter, index) => (
                            <li
                              key={index}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                applychain(filter);
                                setIsOpenchain(!isOpenchain);
                              }}
                              className={`px-4 py-2 cursor-pointer ${
                                selectedChain === filter
                                  ? "font-bold text-[#00D059]"
                                  : ""
                              }`}
                            >
                              {filter}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Search Input */}
                  <div className="w-[510px] relative">
                    <Input
                      className="w-full h-14 rounded-[8px] px-[16px] py-[18px] text-sm font-normal gradient-slate border border-[#292929]"
                      placeholder="Search"
                    />
                    <MagnifyingGlass
                      size={20}
                      className="absolute top-1/2 -translate-y-1/2 right-5"
                    />
                  </div>

                  {/* Recent Filter */}
                  <div
                    className="relative inline-block text-left w-[220px]"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={() => setIsOpenrecent(!isOpenrecent)}
                      className="flex items-center justify-between w-full gradient-slate border border-[#292929] text-white p-[15px] rounded-md"
                    >
                      <span className="text-sm font-normal">
                        {selectedrecent}
                      </span>
                      <Image
                        src={arrowdown}
                        width={24}
                        height={24}
                        alt="dropdown-icon"
                        className={`w-[24px] h-[24px] transform transition-transform duration-300 ${
                          isOpenrecent ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>
                    {isOpenrecent && (
                      <div className="absolute z-10 mt-2 w-full gradient-slate border border-[#292929] rounded-md shadow-lg">
                        <ul className="py-1">
                          {recent.map((filter, index) => (
                            <li
                              key={index}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                setSelectedrecent(filter);
                                setIsOpenrecent(!isOpenrecent);
                              }}
                              className={`px-4 py-2 cursor-pointer ${
                                selectedrecent === filter
                                  ? "font-bold text-[#00D059]"
                                  : ""
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
                <div className="flex flex-wrap xl:flex-nowrap gap-[17px]">
                  <div className="flex w-full min-[501px]:hidden xl:flex-nowrap gap-[17px]">
                    {/* Search Input */}
                    <div className="w-[510px] relative">
                      <Input
                        className="w-full h-14 rounded-[8px] px-[16px] py-[18px] text-sm font-normal gradient-slate border border-[#292929]"
                        placeholder="Search"
                      />
                      <MagnifyingGlass
                        size={20}
                        className="absolute top-1/2 -translate-y-1/2 right-5"
                      />
                    </div>
                    <FilterButton1 />
                  </div>
                </div>

                <div>
                  <div className="relative z-[0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-[24px] md:mt-[70px]">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <FilterButton />
                <TableContainer
                  component={Paper}
                  className="w-full mt-[24px] md:mt-[70px] xl:w-[900px]"
                  sx={{
                    boxShadow: "none",
                    background: "transparent",
                    overflow: "auto",
                    maxHeight: "100%",
                    "&::-webkit-scrollbar": {
                      width: 0,
                      height: 0,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      display: "none",
                    },
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <Table
                    sx={{
                      minWidth: 650,
                      borderBottom: "none",
                      // borderTop: "1px solid #292929",
                      borderLeft: "none",
                      borderRight: "none",
                      fontFamily: "var(--font-base)",
                      color: "white",
                      // background: "#0F0F0F",
                      fontSize: 16,
                      fontweight: 500,
                    }}
                    aria-label="simple table"
                  >
                    <TableHead className="table-gradient-new gradient-slate">
                      <TableRow
                        sx={{ border: "none" }}
                        className=" gradient-slate"
                      >
                        <TableCell
                          className="w-[123.33px] px-[16.5px] lg:px-[20px] lg:w-[105px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                          align="left"
                          sx={{
                            color: "#A6A6A6",
                            borderBottom: "1px solid #292929",
                            fontFamily: "var(--font-base)",
                            borderTop: "none",
                            borderLeft: "none",
                          }}
                        >
                          PFP
                        </TableCell>
                        <TableCell
                          className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[210px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                          align="left"
                          sx={{
                            color: "#A6A6A6",
                            borderBottom: "1px solid #292929",
                            fontFamily: "var(--font-base)",
                            borderTop: "none",
                            borderLeft: "none",
                          }}
                        >
                          Item
                        </TableCell>
                        <TableCell
                          className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[136px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                          align="left"
                          sx={{
                            color: "#A6A6A6",
                            borderBottom: "1px solid #292929",
                            fontFamily: "var(--font-base)",
                            borderTop: "none",
                            borderLeft: "none",
                          }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[130px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                          align="left"
                          sx={{
                            color: "#A6A6A6",
                            borderBottom: "1px solid #292929",
                            fontFamily: "var(--font-base)",
                            borderTop: "none",
                            borderLeft: "none",
                          }}
                        >
                          Rarity
                        </TableCell>
                        <TableCell
                          className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[130px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                          align="left"
                          sx={{
                            color: "#A6A6A6",
                            borderBottom: "1px solid #292929",
                            fontFamily: "var(--font-base)",
                            borderTop: "none",
                            borderLeft: "none",
                          }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[180px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                          align="left"
                          sx={{
                            color: "#A6A6A6",
                            borderBottom: "1px solid #292929",
                            fontFamily: "var(--font-base)",
                            borderTop: "none",
                            borderLeft: "none",
                          }}
                        >
                          From
                        </TableCell>
                        <TableCell
                          className="w-[60px] px-[16.5px] lg:px-[20px] lg:w-[180px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                          align="left"
                          sx={{
                            color: "#A6A6A6",
                            borderBottom: "1px solid #292929",
                            fontFamily: "var(--font-base)",
                            borderTop: "none",
                            borderLeft: "none",
                          }}
                        >
                          To
                        </TableCell>
                        <TableCell
                          className="w-[90px] px-[16.5px] lg:px-[20px] lg:w-[180px] text-[#A6A6A6] font-mormal text-[10px] lg:text-sm "
                          align="left"
                          sx={{
                            color: "#A6A6A6",
                            borderBottom: "1px solid #292929",
                            fontFamily: "var(--font-base)",
                            borderTop: "none",
                            borderLeft: "none",
                          }}
                        >
                          To
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "transparent",
                        height: "8px",
                      }}
                    >
                      <TableCell
                        colSpan={5}
                        sx={{
                          padding: 0,
                          border: "none",
                        }}
                      />
                    </TableRow>
                    <TableBody className="border-0 gradient-slate">
                      {analytics.map((row, rowIndex) => (
                        <TableRow
                          key={row.item}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            borderBottom: "none",
                            fontFamily: "var(--font-base)",
                            padding: "20px",
                          }}
                          className=" text-[white] border-0 text-[10px] font-normal lg:text-sm"
                        >
                          <TableCell
                            sx={{
                              padding: "20px",
                              borderBottom: "none",
                              fontFamily: "var(--font-base)",
                            }}
                            align="left"
                            component="th"
                            scope="row"
                            className=" text-[white] text-[10px] font-normal lg:text-sm"
                          >
                            <Image src={row.php} alt={`${row.item} image`} />
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              borderLeft: "none",
                              fontFamily: "var(--font-base)",
                              padding: "20px",
                              color: "white",
                            }}
                            align="left"
                            component="th"
                            scope="row"
                            className=" text-[white] text-[10px] font-normal lg:text-sm"
                          >
                            {row.item}
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              borderLeft: "none",
                              fontFamily: "var(--font-base)",
                              padding: "20px",
                              color: "#8F8F8F",
                            }}
                            align="left"
                            component="th"
                            scope="row"
                            className=" text-[10px] font-normal lg:text-sm"
                          >
                            {row.Price}
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              borderLeft: "none",
                              fontFamily: "var(--font-base)",
                              padding: "20px",
                              color: "#8F8F8F",
                            }}
                            align="left"
                            component="th"
                            scope="row"
                            className="text-[10px] font-normal lg:text-sm"
                          >
                            #{row.Rarity}
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              borderLeft: "none",
                              fontFamily: "var(--font-base)",
                              padding: "20px",
                              color: "#8F8F8F",
                            }}
                            align="left"
                            component="th"
                            scope="row"
                            className="text-[10px] font-normal lg:text-sm"
                          >
                            {row.Quantity}
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              borderLeft: "none",
                              fontFamily: "var(--font-base)",
                              padding: "20px",
                              color: "#8F8F8F",
                            }}
                            align="left"
                            component="th"
                            scope="row"
                            className="text-[10px] font-normal lg:text-sm"
                          >
                            {row.From}
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              borderLeft: "none",
                              fontFamily: "var(--font-base)",
                              padding: "20px",
                              color: "#8F8F8F",
                            }}
                            align="left"
                            component="th"
                            scope="row"
                            className=" text-[10px] font-normal lg:text-sm"
                          >
                            {row.To}
                          </TableCell>
                          <TableCell
                            sx={{
                              padding: "20px",
                              borderBottom: "none",
                              color: "#8F8F8F",
                              fontFamily: "var(--font-base)",
                            }}
                            className="border-0 text-[10px] font-normal lg:text-sm"
                            align="left"
                          >
                            {row.month}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
