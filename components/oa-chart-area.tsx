"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"

import { dashboardData } from "@/app/dashboard/oasis-data"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export interface OAChartAreaProps {
  dateRange: string
  articleType: string
  institution: string
}

const chartConfig = {
  approved: {
    label: "Approved",
    color: "var(--success)",
  },
  rejected: {
    label: "Rejected",
    color: "var(--destructive)",
  },
  total: {
    label: "Total",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function OAChartArea({
  dateRange,
  articleType,
  institution,
}: OAChartAreaProps) {
  const isMobile = useIsMobile()
  const [viewRange, setViewRange] = React.useState("12m")

  // Get the article data by month
  const articlesByMonth = dashboardData.articlesByMonth
  
  // Format the data for the chart
  const chartData = articlesByMonth.map(item => ({
    month: item.month,
    approved: item.approved,
    rejected: item.rejected,
    total: item.total
  }))

  // Filter the chart data based on the view range
  // For this demo, we'll just use all the data
  const filteredChartData = chartData

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Articles Per Month</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Monthly article counts by approval status
          </span>
          <span className="@[540px]/card:hidden">Monthly article counts</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={viewRange}
            onValueChange={setViewRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="12m">Last 12 months</ToggleGroupItem>
            <ToggleGroupItem value="6m">Last 6 months</ToggleGroupItem>
            <ToggleGroupItem value="3m">Last 3 months</ToggleGroupItem>
          </ToggleGroup>
          <Select value={viewRange} onValueChange={setViewRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 12 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="12m" className="rounded-lg">
                Last 12 months
              </SelectItem>
              <SelectItem value="6m" className="rounded-lg">
                Last 6 months
              </SelectItem>
              <SelectItem value="3m" className="rounded-lg">
                Last 3 months
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="relative aspect-[2/1] w-full min-h-[200px]">
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={filteredChartData}
              margin={{ top: 16, right: 16, bottom: 36, left: 36 }}
            >
              <defs>
                <linearGradient id="approved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.approved.color} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={chartConfig.approved.color} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="rejected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.rejected.color} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={chartConfig.rejected.color} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartConfig.total.color} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={chartConfig.total.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={8}
                height={30}
              />
              <YAxis 
                width={35}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) => `${label}`}
                  />
                }
              />
              <Legend verticalAlign="bottom" height={36} />
              <Area
                type="monotone"
                dataKey="approved"
                fill="url(#approved)"
                stroke={chartConfig.approved.color}
                strokeWidth={2}
                fillOpacity={1}
                activeDot={{ r: 4 }}
                name={chartConfig.approved.label}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="rejected"
                fill="url(#rejected)"
                stroke={chartConfig.rejected.color}
                strokeWidth={2}
                fillOpacity={1}
                activeDot={{ r: 4 }}
                name={chartConfig.rejected.label}
                isAnimationActive={false}
              />
              <Area
                type="monotone"
                dataKey="total"
                fill="url(#total)"
                stroke={chartConfig.total.color}
                strokeWidth={2}
                fillOpacity={1}
                activeDot={{ r: 4 }}
                name={chartConfig.total.label}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
} 