import { ArrowUpRight } from "@phosphor-icons/react";
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import { getBalanceByID, getgraphByID } from "@/lib/middleware/wallet";
import timelapicon from "@/assets/system-uicons_files-history.svg"
import Image from "next/image";
import Link from "next/link";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="gradient-slate border border-muted rounded-lg p-1">
                <p className="label">{`$${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

const CustomBar = ({ fill, x, y, width, height }: any) => {
    return (
        <g>
            <rect x={x} y={y} width={width} height={height} fill={fill} />
            <line
                x1={x}
                y1={y}
                x2={x + width}
                y2={y}
                stroke="#00D059" // Top border color
                strokeWidth={2} // Top border thickness
            />
        </g>
    );
};

const Analyticbarchart = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const userid = typeof window !== "undefined" ? localStorage.getItem("_id") : null;
        dispatch(getBalanceByID(userid));
        dispatch(getgraphByID(userid));
    }, []);

    const mybalance = useAppSelector(
        (state) => state?.getBalanceByID?.myBalance?.data
    );
    console.log("my current balance ", mybalance);

    const myGraphHistory = useAppSelector(
        (state) => state?.getGraphById?.myGraphHistory?.data
    );
    console.log("my graph history ", myGraphHistory);

    // const chartData =
    //   myGraphHistory?.remainingDaysAmounts?.map((item: any) => ({
    //     name: item?.day.slice(0, 3).toUpperCase(), 
    //     value: item?.amount,
    //   })) || [];
    const [activeTab, setActiveTab] = useState<"USER" | "ORGANISER">("ORGANISER");

    const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const chartData = allDays.map((day) => {
        const foundDay = myGraphHistory?.remainingDaysAmounts?.find((item: any) => item.day === day);

        return {
            name: day.slice(0, 3).toUpperCase(), // Abbreviate day names
            value: foundDay ? foundDay.amount : 0, // Use the amount if found, otherwise 0
        };
    }) || [];
    return (
        <div
            style={{
                width: "618px",
                height: "100%",
                // padding: "24px",
            }}
            className=" lg:p-[24px] border-linear rounded-[8px] gradient-slate p-[16px]"
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
                height="85%"
                className="scale-[0.83] ms-[16px] sm:ms-[0px] md:ms-[0px] lg:ms-[0px] flex-items-center justify-center lg:w-[120%] -translate-x-[47px] lg:-translate-x-[50px] xl:-translate-x-[70px] translate-y-[1rem]"
            >
                <BarChart
                    className="lg:w-[120%] max-width-adjustment-in-graph w-[135%]"
                    data={chartData}
                    margin={{ top: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(0, 208, 89, 0.32)" />
                            <stop offset="100%" stopColor="rgba(0, 208, 89, 0)" />
                        </linearGradient>
                    </defs>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        // tick={<CustomXAxisTick />}
                        tick={{ fill: "#BFBFBF", fontSize: "11px", fontWeight: "900" }}
                        tickLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: "transparent" }}
                        content={<CustomTooltip />}
                    />
                    <Bar dataKey="value" fill="url(#colorUv)" shape={<CustomBar />}>
                        <LabelList
                            dataKey="value"
                            fontSize="11px"
                            fontWeight="700"
                            fill="#0FFF77"
                            position="insideBottom"
                            formatter={(value: any) => `$${value}`}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Analyticbarchart;
