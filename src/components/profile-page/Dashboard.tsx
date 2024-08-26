import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  defs,
  linearGradient,
  stop,
  LabelList,
} from "recharts";

const data = [
  { name: "MON", value: 25 },
  { name: "TUE", value: 96 },
  { name: "WED", value: 80 },
  { name: "THU", value: 120 },
  { name: "FRI", value: 100 },
  { name: "SAT", value: 50 },
  { name: "SUN", value: 0 },
];

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

const Dashboard = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "24px",
      }}
    >
      <div className="flex justify-between">
        <div
          className="text-primary"
          style={{ fontSize: "30px", fontWeight: "bold" }}
        >
          <span className="text-[24px] text-[white] font-bold">$</span>
          {data.reduce((acc, item) => acc + item.value, 0).toFixed(2)}{" "}
          <span className="text-[16px] font-extrabold text-[#D9D9D9]">MRT</span>
        </div>
        <div className="text-primary flex gap-[4px] font-bold text-[12px]">
          <ArrowUpRight size={14} weight="bold" /> 2.54%
        </div>
      </div>
      <ResponsiveContainer
        width="120%"
        height="85%"
        className="scale-[0.83] -translate-x-[47px] lg:-translate-x-[50px] xl:-translate-x-[70px] translate-y-[1rem]"
      >
        <BarChart data={data} margin={{ top: 20, bottom: 5 }}>
          <defs className="border-t-2 border-[#00D059]">
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0, 208, 89, 0.32)" />
              <stop offset="100%" stopColor="rgba(0, 208, 89, 0)" />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#BFBFBF" }} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<CustomTooltip />}
          />
          <Bar
            dataKey="value"
            fill="url(#colorUv)"
            // stroke="#00D059"
            width="100%"
            height="2px"
            stroke="#00D059"
            // fill="#00D059"
          >
            <rect
              stroke="none"
              // fill={fill}
            />
            <line
              stroke={"#2967c1"}
              strokeWidth={2}
              strokeDasharray={"10 5"}
            />
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
