"use client"

import * as React from "react"
import {
  IconChartBar,
  IconDatabase,
  IconFileDescription,
  IconFileWord,
  IconInnerShadowTop,
  IconReport,
  IconSearch,
  IconSettings,
  IconHelp,
} from "@tabler/icons-react"

import { NavGroup } from "@/components/nav-group"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navAnalysis: [
    {
      title: "Performance and Spending",
      url: "/dashboard",
      icon: IconChartBar,
    },
    {
      title: "Deal Summary",
      url: "/deal-summary",
      icon: IconFileDescription,
    },
  ],
  navDocuments: [
    {
      title: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      title: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      title: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup title="Analysis" items={data.navAnalysis} />
        <NavGroup title="Documents" items={data.navDocuments} />
      </SidebarContent>
      <SidebarFooter>
        {/* Removed NavUser component */}
      </SidebarFooter>
    </Sidebar>
  )
}
