"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Provider component for theme management.
 * Handles application-wide theme state and switching.
 *
 * Features:
 * - Light/Dark mode support
 * - Theme persistence
 * - System theme detection
 * - Dynamic theme switching
 */

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
