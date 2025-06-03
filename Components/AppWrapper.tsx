"use client";

import { useEffect, useState } from "react";
import StoreProvider from "../store/StoreProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppNavbar from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/themeModeToggle";
import { Toaster } from "@/components/ui/sonner";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const metaUserId = document.querySelector('meta[name="user-id"]')?.getAttribute("content");
    const metaSidebar = document.querySelector('meta[name="sidebar-state"]')?.getAttribute("content");

    if (metaUserId) setUserId(metaUserId);
    setSidebarOpen(metaSidebar === "true");
  }, []);

  return (
    <StoreProvider>
      <SidebarProvider defaultOpen={sidebarOpen}>
        <AppNavbar userId={userId} />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="max-xs:absolute mt-1 ml-1 top-2 left-2 h-7 w-7">
            <SidebarTrigger />
          </div>
          <div className="absolute top-2 right-2">
            <ModeToggle />
          </div>
          {children}
          <Toaster />
        </ThemeProvider>
      </SidebarProvider>
    </StoreProvider>
  );
}
