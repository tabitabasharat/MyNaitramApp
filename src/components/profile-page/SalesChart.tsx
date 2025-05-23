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

const SalesChart = () => {
  const dispatch = useAppDispatch();
  const eventSales = useAppSelector((state: any) => state.getSalesData);



  const grossSalesByDay = eventSales?.salesData?.data?.grossSalesByDay || {};

  const chartData = Object.entries(grossSalesByDay).map(([day, amount]) => ({
    name: day.slice(0, 3).toUpperCase(), // Abbreviate day names
    value: amount,
  }));
  return (
    <div
      style={{
        // width: "100%",
        height: "100%",
        // padding: "24px",
      }}
      className=" lg:p-[24px] p-[16px]"
    >
      <div className="flex justify-between">
        <div
          className="text-primary"
          style={{ fontSize: "30px", fontWeight: "bold" }}
        >
          <span className="text-[24px] text-[white] font-bold">Gross Sales</span>
     

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

export default SalesChart;
