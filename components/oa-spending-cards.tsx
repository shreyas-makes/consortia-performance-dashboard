"use client"

import { IconTrendingUp } from "@tabler/icons-react"

import { dashboardData } from "@/app/dashboard/oasis-data"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface OASpendingCardsProps {
  dateRange: string
  articleType: string
  institution: string
}

export function OASpendingCards({
  dateRange,
  articleType,
  institution,
}: OASpendingCardsProps) {
  // Get the total spending data
  const currentSpending = dashboardData.currentSpend
  const projectedSpending = dashboardData.totalSpend
  
  // In a real implementation, we would filter based on the filters
  
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Spending So Far</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            €{currentSpending.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +10.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Year-to-date spending
          </div>
          <div className="text-muted-foreground">
            Based on approved articles
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Projected Spending (2024)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            €{projectedSpending.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +7.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Projected spending for 2024
          </div>
          <div className="text-muted-foreground">
            Based on current publication trends
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 