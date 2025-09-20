import { AppSidebar } from "@/components/editor/app-sidebar"
import { SiteHeader } from "@/components/editor/site-header"
import Writer from "@/components/editor/text-editor"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"


export default function Page() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <Writer />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
