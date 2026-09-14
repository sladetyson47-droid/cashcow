"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "@/lib/data";

const items = [
  { href: "/", label: "Overview" },
  { href: "/every-dollar", label: "Every dollar" },
  { href: "/owner-pay", label: "Owner pay" },
  { href: "/jobs", label: "Jobs" },
  { href: "/marketing", label: "Marketing" },
  { href: "/valuation", label: "Valuation" },
  { href: "/exit-advisor", label: "Exit advisor · Pro" },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="md:w-[200px] md:shrink-0 md:min-h-screen flex md:flex-col bg-panel border-b md:border-b-0 md:border-r border-line">
      <div className="px-5 py-5 md:pt-[26px] md:pb-[22px] text-[22px] font-black tracking-[-0.02em] text-lime">CASHCOW</div>
      <nav className="flex md:flex-col gap-0.5 px-2.5 overflow-x-auto md:overflow-visible">
        {items.map((it) => {
          const active = path === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`label whitespace-nowrap px-3.5 py-3 text-[12px] ${
                active ? "bg-lime text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="hidden md:block flex-1" />
      <div className="hidden md:block label px-5 py-5 text-[11px] text-muted-2 leading-relaxed">
        {company.name}
        <br />
        TTM · synced {company.syncedAgo}
      </div>
    </aside>
  );
}
