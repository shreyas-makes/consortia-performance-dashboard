"use client"

import * as React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { DashboardFilters } from "@/components/dashboard-filters"
import { OAChartArea } from "@/components/oa-chart-area"
import { OAMetricsCards } from "@/components/oa-metrics-cards"
import { OASpendingCards } from "@/components/oa-spending-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  // State for filter values
  const [dateRange, setDateRange] = React.useState("all")
  const [articleType, setArticleType] = React.useState("all")
  const [institution, setInstitution] = React.useState("all")
  
  // Handler for filter changes
  const handleFilterChange = (filters: {
    dateRange?: string
    articleType?: string
    institution?: string
  }) => {
    if (filters.dateRange !== undefined) setDateRange(filters.dateRange)
    if (filters.articleType !== undefined) setArticleType(filters.articleType)
    if (filters.institution !== undefined) setInstitution(filters.institution)
  }
  
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="@container/main flex flex-1 flex-col overflow-auto">
            <div className="flex flex-col gap-10 p-4 pb-8 md:gap-12 md:p-6 md:pb-10">
              {/* Dashboard Title */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">OA Performance and Spending</h1>
                <p className="text-muted-foreground">
                  Monitor publication metrics, track article status, and analyze institutional spending
                </p>
              </div>
              
              {/* Filter Controls */}
              <div className="flex flex-col gap-6 md:gap-8">
                <DashboardFilters 
                  dateRange={dateRange}
                  articleType={articleType}
                  institution={institution}
                  onFilterChange={handleFilterChange}
                />
              </div>
              
              {/* Metrics Cards */}
              <div className="flex flex-col gap-6 md:gap-8">                
                <OAMetricsCards
                  institution={institution}
                />
              </div>
              
              {/* Spending Section */}
              <div className="flex flex-col gap-6 md:gap-8">
                <h2 className="text-xl font-semibold px-4 md:px-0">Spending</h2>
                <OASpendingCards
                  institution={institution}
                />
              </div>
              
              {/* Charts */}
              <div className="flex flex-col gap-10 md:gap-12">
                {/* Chart with clear heading */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold px-4 md:px-0">Publication Trends</h2>
                  <OAChartArea
                    institution={institution}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
