"use client";

import { ArrowLeft, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { useLanguage, LanguageSelector } from "../layout/navbar/LanguageSelector";

interface DashboardNavbarProps {
  link?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
  };
  returnData: {
    label: string;
    href: string;
  };
}

export function DashboardNavbar({ link, returnData }: DashboardNavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { label: t("dashboard_nav_home"), href: "/dashboard" },
    { label: t("dashboard_nav_challenges"), href: "/dashboard/challenges" },
    { label: t("dashboard_nav_training"), href: "/dashboard/training" },
    { label: t("dashboard_nav_score"), href: "/dashboard/score" },
    { label: t("dashboard_nav_pro_plan"), href: "/dashboard/pro/plan" },
    { label: t("dashboard_nav_campaign"), href: "/dashboard/campaign" },
    { label: t("dashboard_nav_wallet"), href: "/dashboard/wallet" },
    { label: t("dashboard_nav_notifications"), href: "/dashboard/notifications" },
    { label: t("dashboard_nav_contract"), href: "/dashboard/contract" },
    { label: t("dashboard_nav_clubs"), href: "/dashboard/clubs" },
    { label: t("dashboard_nav_mission"), href: "/dashboard/mission" },
    { label: t("dashboard_nav_providers"), href: "/dashboard/providers" },
    { label: t("dashboard_nav_settings"), href: "/dashboard/settings" },
    { label: t("dashboard_nav_upload"), href: "/dashboard/challenges/upload" },
  ];

  const visibleLinks = navLinks.slice(0, 5);
  const hiddenLinks = navLinks.slice(5);

  return (
    <nav className="w-full py-6 border-b border-gray-200">
      <div className="w-[90%] sm:w-[85%] md:w-[80%] mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href={returnData.href}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {returnData.label}
            </Link>
            <h1 className="font-kensmark font-bold text-xl">Open League</h1>
            <LanguageSelector />
          </div>

          <div className="flex items-center gap-2">
            <ul
              className="flex items-center gap-2"
              role="tablist"
              aria-label={t("dashboard_aria_nav")}
            >
              {visibleLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className="flex-shrink-0">
                    <Link
                      href={item.href}
                      className={clsx(
                        "inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-semibold transition-colors",
                        isActive
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((x) => !x)}
                className="cursor-pointer px-4 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center"
              >
                <MoreHorizontal className="w-5 h-5 text-gray-700" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-md py-2 z-50">
                  {hiddenLinks.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                          "block px-4 py-2 text-sm transition-colors",
                          isActive
                            ? "text-black font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {link && (
            <Link
              href={link.href}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#060318] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {link.icon && <span className="ml-1">{link.icon}</span>}
              {link.label}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
