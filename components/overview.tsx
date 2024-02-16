"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 20) + 10,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 20) + 10,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 20) + 10,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 20) + 10,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 20) + 10,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 20) + 10,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 20) + 10,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 20) + 10,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 20) + 10,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 20) + 10,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 20) + 10,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 20) + 10,
  },
];

const dat = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function Overview() {
  return (
   <>
   <p>Tranche sexe :</p>
    <ResponsiveContainer width="100%" height={300}>
    <PieChart className="flex items-center justify-center">
    <Pie
          data={dat}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {dat.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      
    </ResponsiveContainer>
    <p>Tranche Age :</p>
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
          tickFormatter={(value) => `${value} ans`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
      
    </ResponsiveContainer>
   </>
  );
}
