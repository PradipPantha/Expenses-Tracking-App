"use client"

import React from "react"
import {
  ResponsiveContainer,
  Line,
  Bar,
  PieChart as RechartsPieChart,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
} from "recharts"

interface ChartProps {
  data: any[]
  margin?: { top?: number; right?: number; bottom?: number; left?: number }
  children?: React.ReactNode
}

interface PieChartProps extends ChartProps {
  colors?: string[]
}

export const ChartContainer: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

export const ChartTooltip: React.FC<{ content?: TooltipProps["content"] }> = ({ content }) => {
  return <Tooltip content={content} />
}

export const LineChart: React.FC<ChartProps> = ({ data, margin, children }) => {
  return (
    <RechartsLineChart data={data} margin={margin}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      {children}
      <Line type="monotone" dataKey="expenses" stroke="#8884d8" activeDot={{ r: 6 }} />
      <Line type="monotone" dataKey="income" stroke="#82ca9d" activeDot={{ r: 6 }} />
    </RechartsLineChart>
  )
}

export const BarChart: React.FC<ChartProps> = ({ data, margin, children }) => {
  return (
    <RechartsBarChart data={data} margin={margin}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      {children}
      <Bar dataKey="expenses" fill="#8884d8" />
      <Bar dataKey="income" fill="#82ca9d" />
    </RechartsBarChart>
  )
}

export const PieChart: React.FC<PieChartProps> = ({ data, margin, children, colors }) => {
  const defaultColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <RechartsPieChart margin={margin}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={colors ? colors[index % colors.length] : defaultColors[index % defaultColors.length]}
          />
        ))}
      </Pie>
      {children}
    </RechartsPieChart>
  )
}
