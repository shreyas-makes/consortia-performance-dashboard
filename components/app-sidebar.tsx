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
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
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
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
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
              <a href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Springer Nature</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup title="Analysis" items={data.navAnalysis} />
        <NavGroup title="Documents" items={data.navDocuments} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
