import Link from "next/link";
import type { ReactNode } from "react";

export const Label = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`label text-[11px] text-muted ${className}`}>{children}</div>
);

export const Tile = ({
  label,
  value,
  sub,
  subTone = "muted",
  className = "",
}: {
  label: string;
  value: string;
  sub?: string;
  subTone?: "muted" | "lime" | "orange";
  className?: string;
}) => (
  <div className={`flex flex-col gap-1.5 px-7 py-6 ${className}`}>
    <Label>{label}</Label>
    <div className="num text-[36px] font-bold leading-none">{value}</div>
    {sub && (
      <div
        className={`text-[13px] font-medium ${
          subTone === "lime" ? "text-lime" : subTone === "orange" ? "text-orange" : "text-muted"
        }`}
      >
        {sub}
      </div>
    )}
  </div>
);

export const Btn = ({
  children,
  href,
  primary,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  primary?: boolean;
  className?: string;
}) => {
  const cls = `label inline-flex items-center px-4 py-3 text-[12px] cursor-pointer select-none ${
    primary ? "bg-lime text-bg hover:bg-[#e6ff8a]" : "border border-line-2 text-fg-2 hover:border-muted"
  } ${className}`;
  return href ? (
    <Link href={href} className={cls}>
      {children}
    </Link>
  ) : (
    <button type="button" className={cls}>
      {children}
    </button>
  );
};

export const PageHead = ({ kicker, title, right }: { kicker: string; title: ReactNode; right?: ReactNode }) => (
  <div className="flex flex-wrap items-end justify-between gap-4 px-6 md:px-10 pt-8 pb-4">
    <div className="flex flex-col gap-1.5">
      <Label className="text-[13px]">{kicker}</Label>
      <div className="num text-[32px] md:text-[44px] font-black leading-none">{title}</div>
    </div>
    {right}
  </div>
);

export const Pill = ({ children, on }: { children: ReactNode; on?: boolean }) => (
  <span className={`label px-3 py-[7px] text-[11px] ${on ? "bg-fg text-bg" : "border border-line-2 text-muted"}`}>
    {children}
  </span>
);
