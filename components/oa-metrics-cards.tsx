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

export interface OAMetricsCardsProps {
  dateRange: string
  articleType: string
  institution: string
}

export function OAMetricsCards({
  dateRange,
  articleType,
  institution,
}: OAMetricsCardsProps) {
  // In a real implementation, we would filter the metrics based on the filters
  // For this demo, we'll just use the total values
  const totalArticles = dashboardData.totalArticles
  const approvedArticles = dashboardData.approvedArticles
  const rejectedArticles = dashboardData.rejectedArticles

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Articles (2024)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalArticles}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Year-to-date article count
          </div>
          <div className="text-muted-foreground">
            Compared to previous year
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Approved Articles</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {approvedArticles}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +8.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Articles approved for open access
          </div>
          <div className="text-muted-foreground">
            {((approvedArticles / totalArticles) * 100).toFixed(1)}% of total submissions
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Rejected Articles</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {rejectedArticles}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.2%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Articles rejected for open access
          </div>
          <div className="text-muted-foreground">
            {((rejectedArticles / totalArticles) * 100).toFixed(1)}% of total submissions
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 