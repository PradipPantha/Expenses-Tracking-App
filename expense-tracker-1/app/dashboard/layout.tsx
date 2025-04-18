"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Home,
  Menu,
  Moon,
  PieChart,
  Settings,
  Sun,
  User,
  SettingsIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"

interface NavLinkProps {
  href: string
  icon: React.ReactNode
  text: string
  isActive: boolean
}

function NavLink({ href, icon, text, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
      )}
    >
      {icon}
      {text}
    </Link>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    setOpen(false)
  }, [pathname, isMobile])

  const links = [
    { href: "/dashboard", icon: <Home className="h-4 w-4" />, text: "Dashboard" },
    { href: "/dashboard/expenses", icon: <CreditCard className="h-4 w-4" />, text: "Expenses" },
    { href: "/dashboard/income", icon: <DollarSign className="h-4 w-4" />, text: "Income" },
    { href: "/dashboard/reports", icon: <BarChart3 className="h-4 w-4" />, text: "Reports" },
    { href: "/dashboard/budget", icon: <PieChart className="h-4 w-4" />, text: "Budget" },
    { href: "/dashboard/profile", icon: <User className="h-4 w-4" />, text: "Profile" },
    { href: "/dashboard/settings", icon: <Settings className="h-4 w-4" />, text: "Settings" },
  ]

  const Sidebar = () => (
    <div className="flex flex-col gap-2 h-full">
      <div className="px-4 py-6 flex items-center gap-2 font-semibold">
        <CreditCard className="h-6 w-6" />
        <span>Expense Tracker</span>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium gap-1">
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              text={link.text}
              isActive={pathname === link.href}
            />
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <div className="space-y-1">
          <Label htmlFor="theme-mode">Theme</Label>
          <div className="flex gap-2 mt-2">
            <Button
              variant={resolvedTheme === "light" ? "default" : "outline"}
              size="sm"
              className="flex-1 justify-center"
              onClick={() => setTheme("light")}
            >
              <Sun className="h-4 w-4 mr-1" />
              Light
            </Button>
            <Button
              variant={resolvedTheme === "dark" ? "default" : "outline"}
              size="sm"
              className="flex-1 justify-center"
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-4 w-4 mr-1" />
              Dark
            </Button>
            <Button
              variant={resolvedTheme === "system" ? "default" : "outline"}
              size="sm"
              className="flex-1 justify-center"
              onClick={() => setTheme("system")}
            >
              <SettingsIcon className="h-4 w-4 mr-1" />
              System
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
      {isMobile && (
        <>
          <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4">
            <Button variant="outline" size="icon" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 font-semibold">
              <CreditCard className="h-5 w-5" />
              <span>Expense Tracker</span>
            </div>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </>
      )}
      {!isMobile && (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 shrink-0 border-r md:flex md:flex-col">
          <Sidebar />
        </aside>
      )}
      <main className={cn("flex flex-1 flex-col", !isMobile && "md:pl-64")}>
        {children}
      </main>
    </div>
  )
}
