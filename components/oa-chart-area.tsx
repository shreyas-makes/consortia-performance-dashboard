"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"

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

interface Article {
  AllocationMonth: string;
  ArticleStatus: "Approved" | "Rejected";
  oaApprovalDate: string;
}

export interface OAChartAreaProps {
  dateRange: string
  articleType: string
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
  dateRange,
  articleType,
  institution,
}: OAChartAreaProps) {
  const isMobile = useIsMobile()
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
      const monthYear = date.toLocaleString('en-US', { month: 'short', year: 'numeric' })
      monthlyData.set(monthYear, { month: monthKey, approved: 0, rejected: 0 })
    }

    // Process each article from the mock data
    const articles = Array.isArray(dashboardData) ? dashboardData : []
    
    // If we have no data, create some demo data
    if (articles.length === 0) {
      console.warn("No article data found, using demo data")
      
      // Return demo data for the last 12 months
      return Array.from(monthlyData.entries())
        .map(([monthYear, data]) => ({
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
    
    articles.forEach((article: any) => {
      // Check if the article has oaApprovalDate
      if (!article.oaApprovalDate) return
      
      try {
        const approvalDate = new Date(article.oaApprovalDate)
        
        // Skip if article is outside the selected range
        if (approvalDate < startDate) return
        
        const monthKey = approvalDate.toLocaleString('en-US', { month: 'short' })
        const monthYear = approvalDate.toLocaleString('en-US', { month: 'short', year: 'numeric' })
        
        // Initialize the month if it doesn't exist in our map
        if (!monthlyData.has(monthYear)) {
          monthlyData.set(monthYear, { month: monthKey, approved: 0, rejected: 0 })
        }

        const currentData = monthlyData.get(monthYear)
        if (article.ArticleStatus === "Approved") {
          currentData.approved++
        } else if (article.ArticleStatus === "Rejected") {
          currentData.rejected++
        }
        monthlyData.set(monthYear, currentData)
      } catch (error) {
        console.error("Error processing article:", error)
      }
    })

    // Convert map to array and sort by date
    return Array.from(monthlyData.entries())
      .map(([monthYear, data]) => ({
        month: data.month,
        approved: data.approved,
        rejected: data.rejected
      }))
      .sort((a, b) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return months.indexOf(a.month) - months.indexOf(b.month)
      })
      .reverse() // Most recent months first
  }, [viewRange])

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