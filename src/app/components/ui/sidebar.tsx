"use client"

import type * as React from "react"
import { createContext, useContext, useState } from "react"
import { cn } from "../lib/utils"
import { Button } from "../ui/button"
import { Menu } from "lucide-react"

const SidebarContext = createContext({
  isOpen: true,
  setIsOpen: (value: boolean) => {},
})

export function SidebarProvider({
  children,
  defaultIsOpen = true,
}: {
  children: React.ReactNode
  defaultIsOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="flex min-h-screen">{children}</div>
    </SidebarContext.Provider>
  )
}

export function Sidebar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useContext(SidebarContext)

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-16",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useContext(SidebarContext)

  return (
    <div
      className={cn("flex h-14 items-center border-b px-4", isOpen ? "justify-between" : "justify-center", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 overflow-auto p-2", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-2", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroupLabel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useContext(SidebarContext)

  if (!isOpen) return null

  return (
    <div className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroupContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenu({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenuItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenuButton({
  className,
  children,
  isActive,
  asChild,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive?: boolean
  asChild?: boolean
}) {
  const { isOpen } = useContext(SidebarContext)
  const Comp = asChild ? "div" : "button"

  return (
    <Comp
      className={cn(
        "flex w-full items-center rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground",
        !isOpen && "justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isOpen, setIsOpen } = useContext(SidebarContext)

  return (
    <Button variant="ghost" size="icon" className={cn("", className)} onClick={() => setIsOpen(!isOpen)} {...props}>
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

export function SidebarInset({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isOpen } = useContext(SidebarContext)

  return (
    <div
      className={cn("flex flex-1 flex-col transition-all duration-300", isOpen ? "ml-64" : "ml-16", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarRail({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("absolute inset-y-0 right-0 w-1 bg-border", className)} {...props} />
}
