"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart, Cell } from "recharts";

const LIME = "#d4ff3f";
const GRAY = "#3a3a3a";
const ORANGE = "#ff7a3f";

const tooltipStyle = {
  contentStyle: { background: "#1c1c1c", border: "1px solid #3a3a3a", borderRadius: 0, fontSize: 12 },
  labelStyle: { color: "#9a9a92" },
  itemStyle: { color: "#f4f4f0" },
};

export function TrendChart({
  months,
  series,
  height = 160,
  unit = "k",
}: {
  months: string[];
  series: { name: string; data: number[]; color?: string; dashed?: boolean }[];
  height?: number;
  unit?: "k" | "usd" | "pct";
}) {
  const format = (n: number) => (unit === "k" ? `$${Math.round(n / 1000)}K` : unit === "usd" ? `$${n}` : `${n}%`);
  const rows = months.map((m, i) => {
    const r: Record<string, number | string> = { m };
    series.forEach((s) => (r[s.name] = s.data[i]));
    return r;
  });
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <XAxis dataKey="m" tick={{ fill: "#6a6a64", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis hide domain={["auto", "auto"]} />
        <Tooltip {...tooltipStyle} formatter={(v) => format(Number(v))} />
        {series.map((s, i) => (
          <Line
            key={s.name}
            type="monotone"
            dataKey={s.name}
            stroke={s.color ?? (i === 0 ? LIME : GRAY)}
            strokeWidth={i === 0 ? 4 : 3}
            strokeDasharray={s.dashed ? "4 4" : undefined}
            dot={false}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarRank({
  rows,
  height = 220,
  threshold = 1,
}: {
  rows: { name: string; value: number }[];
  height?: number;
  threshold?: number;
}) {
  const format = (n: number) => `$${n.toFixed(2)}`;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={rows} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="name" width={170} tick={{ fill: "#c9c9c2", fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip {...tooltipStyle} formatter={(v) => format(Number(v))} cursor={{ fill: "#1c1c1c" }} />
        <Bar dataKey="value" isAnimationActive={false} label={{ position: "right", fill: "#f4f4f0", fontSize: 12, formatter: (v: unknown) => format(Number(v)) }}>
          {rows.map((r) => (
            <Cell key={r.name} fill={r.value >= threshold ? LIME : ORANGE} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
