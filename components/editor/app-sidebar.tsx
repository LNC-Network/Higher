"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "../ui/input"

import { Button } from "../ui/button"

const articles = [
  { id: 1, title: "Article 1" },
  { id: 2, title: "Article 2" },
  { id: 3, title: "Article 3" },
]


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Article</DialogTitle>
              <DialogDescription>
                Create a new article.
              </DialogDescription>
              <Input placeholder="Enter Title" />
              <Button className="mt-4">Create</Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </SidebarHeader>
      <SidebarContent className="p-2">
        {articles.map((article) => (
          <Button variant="ghost" key={article.id}>{article.title}</Button>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Settings</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>
                Manage your account settings and preferences.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </SidebarFooter>
    </Sidebar >
  )
}
