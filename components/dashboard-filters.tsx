"use client"

import * as React from "react"
import { IconFilter } from "@tabler/icons-react"

import { dashboardData } from "@/app/dashboard/oasis-data"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export interface FilterProps {
  dateRange: string
  articleType: string
  institution: string
  onFilterChange: (filters: {
    dateRange?: string
    articleType?: string
    institution?: string
  }) => void
}

export function DashboardFilters({
  dateRange,
  articleType,
  institution,
  onFilterChange,
}: FilterProps) {
  const institutions = dashboardData.institutions

  return (
    <Card className="border-none shadow-none">
      <CardContent className="flex flex-wrap items-center gap-4 p-4 sm:px-6">
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium">Date Range</p>
            <Select 
              value={dateRange} 
              onValueChange={(value) => onFilterChange({ dateRange: value })}
            >
              <SelectTrigger className="h-9 w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="last6months">Last 6 Months</SelectItem>
                <SelectItem value="last3months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium">Article Status</p>
            <Select 
              value={articleType} 
              onValueChange={(value) => onFilterChange({ articleType: value })}
            >
              <SelectTrigger className="h-9 w-[180px]">
                <SelectValue placeholder="Select article status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium">Institution</p>
            <Select 
              value={institution} 
              onValueChange={(value) => onFilterChange({ institution: value })}
            >
              <SelectTrigger className="h-9 w-[220px]">
                <SelectValue placeholder="Select institution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutions</SelectItem>
                {institutions.map((inst, index) => (
                  <SelectItem key={index} value={inst}>
                    {inst}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Separator orientation="vertical" className="hidden h-8 sm:block" />
        
        <div className="ml-auto flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <IconFilter className="size-4" />
                <span>Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Date Range</p>
                  <Select 
                    value={dateRange} 
                    onValueChange={(value) => onFilterChange({ dateRange: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="last6months">Last 6 Months</SelectItem>
                      <SelectItem value="last3months">Last 3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Article Status</p>
                  <Select 
                    value={articleType} 
                    onValueChange={(value) => onFilterChange({ articleType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select article status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Institution</p>
                  <Select 
                    value={institution} 
                    onValueChange={(value) => onFilterChange({ institution: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select institution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Institutions</SelectItem>
                      {institutions.map((inst, index) => (
                        <SelectItem key={index} value={inst}>
                          {inst}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  )
} 