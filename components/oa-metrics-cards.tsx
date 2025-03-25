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
  // Filter articles based on the selected institution
  const filteredArticles = institution === "all" 
    ? dashboardData.articles 
    : dashboardData.articles.filter(article => article.approvingInstitution === institution)
  
  // Calculate metrics based on filtered articles
  const totalArticles = filteredArticles.length
  const approvedArticles = filteredArticles.filter(article => article.articleStatus === "Approved").length
  const rejectedArticles = filteredArticles.filter(article => article.articleStatus === "Rejected").length

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
            {totalArticles > 0 ? ((approvedArticles / totalArticles) * 100).toFixed(1) : "0"}% of total submissions
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
            {totalArticles > 0 ? ((rejectedArticles / totalArticles) * 100).toFixed(1) : "0"}% of total submissions
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 