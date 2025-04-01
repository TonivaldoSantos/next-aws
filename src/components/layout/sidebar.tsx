"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaChartLine, FaCog } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const sidebarLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <FaChartLine className="h-4 w-4" />,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <FaUser className="h-4 w-4" />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <FaCog className="h-4 w-4" />,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Mobile sidebar with Sheet component
  const mobileSidebar = (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <nav className="flex flex-col gap-2 mt-8">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors",
                pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );

  // Desktop sidebar
  const desktopSidebar = (
    <div className={cn("hidden md:flex md:flex-col md:gap-2 md:min-h-screen md:p-4 md:border-r", className)}>
      <div className="mb-8 ml-3 font-semibold">Menu</div>
      <nav className="flex flex-col gap-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors",
              pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {mobileSidebar}
      {desktopSidebar}
    </>
  );
}
