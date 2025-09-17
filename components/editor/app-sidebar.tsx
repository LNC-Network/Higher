"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        header
      </SidebarHeader>
      <SidebarContent>
        Content
      </SidebarContent>
      <SidebarFooter>
        Footer
      </SidebarFooter>
    </Sidebar>
  )
}
