import { cookies } from "next/headers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "../store 1/storeProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { ThemeProvider } from "@/components/Theme-provider";
import { ModeToggle } from "@/components/ThemeModeToggle";
import { Toaster } from "@/components/ui/sonner";
import AppNavbar from "@/components/app-sidebar";
import UserDataProvider from "@/lib/UserDataProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Stock Prediction App",
  description: "Made by Jacob B.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const userId = await UserDataProvider();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} static antialiased min-h-screen`}
      >
        <StoreProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppNavbar userId={userId?.id ?? null} userName={userId?.name ?? null} />
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
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
      </body>
    </html>
  );
}
