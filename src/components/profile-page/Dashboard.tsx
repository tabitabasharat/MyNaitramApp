import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'MON', value: 25 },
  { name: 'TUE', value: 96 },
  { name: 'WED', value: 80 },
  { name: 'THU', value: 120 },
  { name: 'FRI', value: 100 },
  { name: 'SAT', value: 50 },
  { name: 'SUN', value: 0 },
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
        width: '100%',
        height: '100%',
        padding: '20px',
      }}
    >
      <div className="flex justify-between">
        {' '}
        <div
          className="text-primary"
          style={{ fontSize: '30px', fontWeight: 'bold' }}
        >
          <span className="text-white">$</span>
          {data.reduce((acc, item) => acc + item.value, 0).toFixed(2)}{' '}
          <span className="text-[12px] text-muted">MRT</span>
        </div>
        <div className="text-primary flex gap-2 text-sm">
          <ArrowUpRight size={20} weight="bold" /> 2.54%
        </div>
      </div>
      <ResponsiveContainer
        width="120%"
        height="85%"
        className="scale-[0.83] -translate-x-[47px] lg:-translate-x-[50px] xl:-translate-x-[70px] translate-y-[1rem]"
      >
        <BarChart data={data} margin={{ top: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="name" stroke="#BFBFBF" />
          <YAxis stroke="#BFBFBF" />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            content={<CustomTooltip />}
          />
          <Bar dataKey="value" fill="#00D05952" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
