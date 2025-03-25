"use client"

import * as React from "react"
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Article, dashboardData } from "@/app/dashboard/oasis-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface OADataTableProps {
  dateRange: string
  articleType: string
  institution: string
}

export function OADataTable({
  dateRange,
  articleType,
  institution,
}: OADataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const articles = dashboardData.articles
  
  // In a real implementation, we would filter the articles based on the filters
  // For this demo, we'll filter the institution if selected
  const filteredArticles = React.useMemo(() => {
    if (institution === "all") return articles
    
    return articles.filter(
      article => article.approvingInstitution === institution
    )
  }, [articles, institution])

  const columns: ColumnDef<Article>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "doi",
      header: "DOI",
      cell: ({ row }) => (
        <div className="text-xs font-medium">
          <a 
            href={`https://doi.org/${row.getValue("doi")}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline text-primary"
          >
            {row.getValue("doi")}
          </a>
        </div>
      ),
    },
    {
      accessorKey: "articleTitle",
      header: "Article Title",
      cell: ({ row }) => (
        <div className="font-medium max-w-[300px] truncate" title={row.getValue("articleTitle")}>
          {row.getValue("articleTitle")}
        </div>
      ),
    },
    {
      accessorKey: "journalTitle",
      header: "Journal",
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("journalTitle")}
        </div>
      ),
    },
    {
      accessorKey: "approvingInstitution",
      header: "Institution",
      cell: ({ row }) => (
        <div className="font-medium">
          {row.getValue("approvingInstitution")}
        </div>
      ),
    },
    {
      accessorKey: "articleStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("articleStatus") as string
        return (
          <div className="flex items-center">
            <Badge 
              variant={status === "Approved" ? "default" : "destructive"} 
              className={`gap-1 items-center ${status === "Approved" ? "bg-green-500" : ""}`}
            >
              {status === "Approved" ? (
                <IconCircleCheckFilled className="size-3.5" />
              ) : (
                <IconCircleXFilled className="size-3.5" />
              )}
              {status}
            </Badge>
          </div>
        )
      },
    },
    {
      accessorKey: "onlineDate",
      header: "Online Date",
      cell: ({ row }) => {
        const rawDate = row.getValue("onlineDate") as string;
        // Format as DD/MM/YYYY to match the display in the image
        const formatDate = (dateStr: string) => {
          const date = new Date(dateStr);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        };
        
        return (
          <div className="font-medium">
            {formatDate(rawDate)}
          </div>
        );
      },
    },
    {
      accessorKey: "customerApcListPrice",
      header: "Price",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("customerApcListPrice"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
        }).format(amount)
 
        return <div className="font-medium tabular-nums">{formatted}</div>
      },
    },
  ]

  const table = useReactTable({
    data: filteredArticles,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <Card className="px-0 border-none shadow-none">
      <CardHeader className="px-6">
        <CardTitle>Article Details</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border mx-6">
          <div className="flex items-center py-4 px-4">
            <Input
              placeholder="Filter by article title..."
              value={(table.getColumn("articleTitle")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("articleTitle")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 p-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 