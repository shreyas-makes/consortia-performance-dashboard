"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts"

import { dashboardData } from "@/app/dashboard/oasis-data"
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
  institution: string
}

const chartConfig = {
  approved: {
    label: "Approved",
    color: "#01324b",
  },
  rejected: {
    label: "Rejected",
    color: "#267E9E",
  },
} satisfies ChartConfig

export function OAChartArea({
  institution,
}: OAChartAreaProps) {
  const [viewRange, setViewRange] = React.useState("12m")

  // Process and format the data from dashboardData
  const processArticleData = React.useMemo(() => {
    // Create a map to store monthly counts
    const monthlyData = new Map()
    
    // Get current date for filtering
    const currentDate = new Date()
    const monthsToShow = viewRange === "3m" ? 3 : viewRange === "6m" ? 6 : 12
    const startDate = new Date(currentDate)
    startDate.setMonth(currentDate.getMonth() - monthsToShow)

    // Initialize all months in the range with zero counts
    for (let i = 0; i < monthsToShow; i++) {
      const date = new Date(currentDate)
      date.setMonth(currentDate.getMonth() - i)
      // Store only month for display, but keep year for sorting
      const monthKey = date.toLocaleString('en-US', { month: 'short' })
      // We need this as the Map key, even though it's not directly used in the destructuring later
      const dateKey = date.toLocaleString('en-US', { month: 'short', year: 'numeric' })
      monthlyData.set(dateKey, { month: monthKey, approved: 0, rejected: 0 })
    }
    
    // Get articles from dashboardData and ensure it's an array
    let articles = Array.isArray(dashboardData.articles) ? dashboardData.articles : []
    
    // Filter by institution if not "all"
    if (institution !== "all") {
      articles = articles.filter(article => article.approvingInstitution === institution)
    }

    // If no articles, use demo data
    if (!articles || articles.length === 0) {
      console.warn("No article data found after filtering, using demo data")
      
      // Return demo data for the last 12 months
      return Array.from(monthlyData.entries())
        // We need the first param (key) for the entries() method to work,
        // even though we only use data in the mapped result
        .map(([, data]) => ({
          month: data.month,
          approved: Math.floor(Math.random() * 3) + 1,
          rejected: Math.floor(Math.random() * 2)
        }))
        .sort((a, b) => {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          return months.indexOf(a.month) - months.indexOf(b.month)
        })
        .reverse()
    }
    
    // Process each article
    articles.forEach((article) => {
      if (!article.allocationMonth) return
      
      try {
        // Extract month from allocationMonth format (e.g., "Sep-24")
        const monthStr = article.allocationMonth.split('-')[0]
        
        // Use current year for simplicity
        // We need this as the Map key, even though it's not directly used in the destructuring later
        const dateKey = `${monthStr} ${new Date().getFullYear()}`
        
        // Initialize the month if it doesn't exist in our map
        if (!monthlyData.has(dateKey)) {
          monthlyData.set(dateKey, { month: monthStr, approved: 0, rejected: 0 })
        }

        const currentData = monthlyData.get(dateKey)
        if (article.articleStatus === "Approved") {
          currentData.approved++
        } else if (article.articleStatus === "Rejected") {
          currentData.rejected++
        }
        monthlyData.set(dateKey, currentData)
      } catch (error) {
        console.error("Error processing article:", error)
      }
    })

    // Convert map to array and sort by date
    return Array.from(monthlyData.entries())
      // We need the first param (key) for the entries() method to work,
      // even though we only use data in the mapped result
      .map(([, data]) => ({
        month: data.month,
        approved: data.approved,
        rejected: data.rejected
      }))
      .sort((a, b) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return months.indexOf(a.month) - months.indexOf(b.month)
      })
      .reverse() // Most recent months first
  }, [viewRange, institution])  // Added institution as a dependency

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Articles Per Month</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Monthly article counts by approval date
          </span>
          <span className="@[540px]/card:hidden">Monthly article counts</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={viewRange}
            onValueChange={(value) => value && setViewRange(value)}
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
              aria-label="Select time range"
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
            <BarChart
              data={processArticleData}
              margin={{ top: 16, right: 16, bottom: 36, left: 36 }}
              barGap={8}
            >
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
              <Bar
                dataKey="approved"
                fill={chartConfig.approved.color}
                name={chartConfig.approved.label}
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
              <Bar
                dataKey="rejected"
                fill={chartConfig.rejected.color}
                name={chartConfig.rejected.label}
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
} 