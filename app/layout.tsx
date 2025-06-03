export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "../store/StoreProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { verifyJwt } from "@/lib/session";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/themeModeToggle";
import { Toaster } from "@/components/ui/sonner";
import AppNavbar from "@/components/app-sidebar";

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

  const token = cookieStore.get("token")?.value;

  const session = await verifyJwt(token);

  let userId = null;

  if (session?.email) {
    const { email } = session as { email: string };

    const user = await prisma.user.findUnique({
      where: { email },
    });

    userId = user?.id ?? null;
  }

  return (
    <StoreProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppNavbar userId={userId} />
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} static antialiased min-h-screen`}
          >
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
          </body>
        </html>
      </SidebarProvider>
    </StoreProvider>
  );
}
