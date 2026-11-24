"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  History,
  House,
  Plus,
  Settings,
  type LucideIcon,
} from "lucide-react";

type Tab = {
  href: string;
  label: string;
  icon: LucideIcon;
  primary?: boolean;
};

const TABS: Tab[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/analytic", label: "Analytic", icon: BarChart3 },
  { href: "/record", label: "Record", icon: Plus, primary: true },
  { href: "/history", label: "History", icon: History },
  { href: "/setting", label: "Setting", icon: Settings },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Điều hướng chính"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
    >
      <ul className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {TABS.map(({ href, label, icon: Icon, primary }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className="flex flex-col items-center justify-center gap-1 py-1"
              >
                {primary ? (
                  <span className="flex size-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                    <Icon className="size-6" />
                  </span>
                ) : (
                  <>
                    <Icon
                      className={`size-6 ${active ? "text-blue-600" : "text-zinc-500"}`}
                    />
                    <span
                      className={`text-xs ${active ? "font-medium text-blue-600" : "text-zinc-500"}`}
                    >
                      {label}
                    </span>
                  </>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
