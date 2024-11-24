import { ArrowUpRight } from "@phosphor-icons/react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    LabelList,
} from "recharts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import { getBalanceByID, getgraphByID } from "@/lib/middleware/wallet";
import timelapicon from "@/assets/system-uicons_files-history.svg"
import Image from "next/image";
import Link from "next/link";


const CustomBar = (props: any) => {
    const { x, y, width, height, fill } = props;
    const adjustedWidth = width * 0.8; // Adjust width to 80% of its original size

    return (
        <rect
            x={x + (width - adjustedWidth) / 2}
            y={y}
            width={adjustedWidth}
            height={height}
            fill={fill}
            rx={4}
            ry={4}
        />
    );
};

const data = [
    {
        name: '01 Oct',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '02 Oct',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '03 Oct',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: '04 Oct',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '05 Oct',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: '06 Oct',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: '07 Oct',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const Analyticbarchart = () => {
    const [activeTab, setActiveTab] = useState<"USER" | "ORGANISER">("ORGANISER");

    return (
        <div
            style={{
            }}
            className=" lg:p-[24px] w-full md:w-[618px] border-linear rounded-[8px] gradient-slate p-[16px]"
        >
            <div className="flex justify-between">
                <p className="font-bold text-[20px]">Sales</p>
            </div>
            <div className="flex mt-[24px]">
                <div className="w-[120px]">
                    <p
                        className={`text-center text-sm font-bold pb-[16px] ${activeTab === "USER"
                            ? "-[white] text-[#00A849] border-[#00A849] font-bold border-b-2"
                            : "border-b-2 text-white font-normal border-[#292929]"
                            } cursor-pointer`}
                        onClick={() => setActiveTab("USER")}
                    >
                        Ticket Sales
                    </p>
                </div>

                <div className="w-[120px]">
                    <p
                        className={`text-center text-sm font-bold pb-[16px] ${activeTab === "ORGANISER"
                            ? "text-[#00A849] border-[#00A849] font-bold border-b-2"
                            : "border-b-2 text-white font-normal border-solid border-[#292929]"
                            } cursor-pointer`}
                        onClick={() => setActiveTab("ORGANISER")}
                    >
                        Revenue
                    </p>
                </div>
            </div>
            <ResponsiveContainer
                width="115%"
                height="65%"
                className="scale-[0.83] ms-[16px] sm:ms-[0px] md:ms-[0px] lg:ms-[0px] flex-items-center justify-center lg:w-[120%] -translate-x-[47px] lg:-translate-x-[50px] xl:-translate-x-[70px] translate-y-[1rem]"
            >
                <BarChart
                    className="lg:w-[120%] max-width-adjustment-in-graph w-[135%]"
                    data={data}
                    barSize={27}
                    margin={{ top: 20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(0, 208, 89, 0.1)" />
                            <stop offset="100%" stopColor="rgba(0, 208, 89, 0.1)" />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#292929" strokeWidth={0.5} vertical={false} strokeDasharray="5 5" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tick={{
                            fontSize: 10,
                            fontWeight: 'normal',
                            fill: '#D9D9D9',
                        }}
                        tickLine={false}
                    />
                    <YAxis
                        axisLine={false}
                        tick={{
                            fontSize: 10,
                            fontWeight: 'normal',
                            fill: '#D9D9D9',
                        }}
                        tickLine={false}
                        tickFormatter={(value) => `£${value}`}
                    />
                    <YAxis />
                    <Tooltip
                        cursor={{ fill: "transparent" }}
                        content={<CustomBar />}
                    />
                    <Bar dataKey="uv" stackId="stack" shape={<CustomBar />} fill="#00D059" />
                    <Bar dataKey="pv" stackId="stack" shape={<CustomBar />} fill="url(#customGradient)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Analyticbarchart;
