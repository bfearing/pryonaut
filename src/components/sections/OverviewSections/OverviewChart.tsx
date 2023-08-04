import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    total: 0,
  },
  {
    name: "Feb",
    total: 0,
  },
  {
    name: "Mar",
    total: 0,
  },
  {
    name: "Apr",
    total: 0,
  },
  {
    name: "May",
    total: 0,
  },
  {
    name: "Jun",
    total: 4,
  },
  {
    name: "Jul",
    total: 2,
  },
  {
    name: "Aug",
    total: 0,
  },
  {
    name: "Sep",
    total: 0,
  },
  {
    name: "Oct",
    total: 0,
  },
  {
    name: "Nov",
    total: 0,
  },
  {
    name: "Dec",
    total: 0,
  },
];

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          // tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#fa1dc6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}