import Link from "next/link";
import { Btn, Label, PageHead, Pill } from "@/components/ui";
import { channels, company, overhead, perDollar, perDollarDirect, usd } from "@/lib/data";

export default async function EveryDollar({ searchParams }: { searchParams: Promise<{ c?: string; mode?: string }> }) {
  const { c, mode } = await searchParams;
  const direct = mode === "direct";
  const ranked = [...channels].sort((a, b) => perDollar(b) - perDollar(a));
  const selected = channels.find((x) => x.id === c) ?? channels.find((x) => x.id === "angi")!;
  const totalSpent = channels.reduce((t, x) => t + x.spent, 0);
  const totalBack = channels.reduce((t, x) => t + x.back, 0);
  const sel = perDollar(selected);
  const zero = overhead.zeroReturn.reduce((t, z) => t + z.monthly, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
      <section className="lg:col-span-7 flex flex-col lg:border-r border-line">
        <PageHead
          kicker="Every dollar out, what came back"
          title={
            <>
              {usd(totalSpent, { compact: true })} spent → {usd(totalBack, { compact: true })} back
            </>
          }
          right={
            <div className="flex gap-1.5">
              <Link href={`/every-dollar?c=${selected.id}`}>
                <Pill on={!direct}>Fully loaded</Pill>
              </Link>
              <Link href={`/every-dollar?c=${selected.id}&mode=direct`}>
                <Pill on={direct}>Direct only</Pill>
              </Link>
            </div>
          }
        />

        <div className="label hidden md:flex px-10 pb-2 text-[11px] text-muted-2">
          <div className="flex-1">Where the money went</div>
          <div className="w-[110px] text-right">Spent</div>
          <div className="w-[110px] text-right">Came back</div>
          <div className="w-[90px] text-right">Per $1</div>
        </div>

        <div className="flex flex-col px-6 md:px-10">
          {ranked.map((ch) => {
            const spent = direct ? ch.direct : ch.spent;
            const pd = direct ? perDollarDirect(ch) : perDollar(ch);
            const active = ch.id === selected.id;
            return (
              <Link
                key={ch.id}
                href={`/every-dollar?c=${ch.id}${direct ? "&mode=direct" : ""}`}
                className={`flex flex-wrap md:flex-nowrap items-center py-3 border-t border-line text-[15px] ${active ? "bg-panel -mx-4 px-4" : "hover:bg-panel/60"}`}
              >
                <div className="flex-1 min-w-[200px] flex flex-col gap-0.5">
                  <span>{ch.name}</span>
                  <span className="text-[12px] text-muted-2">{ch.what}</span>
                </div>
                <div className="num w-[110px] text-right text-muted">{spent > 0 ? usd(spent, { compact: true }) : "—"}</div>
                <div className="num w-[110px] text-right">{usd(ch.back, { compact: true })}</div>
                <div className={`num w-[90px] text-right font-bold text-[18px] ${pd === null ? "text-muted-2" : pd >= 1.5 ? "text-lime" : pd < 1 ? "text-orange" : ""}`}>
                  {pd === null ? "n/a" : `$${pd.toFixed(2)}`}
                </div>
              </Link>
            );
          })}
          <div className="border-t border-line" />
        </div>

        <div className="flex flex-wrap gap-x-7 gap-y-2 px-6 md:px-10 py-4 text-[13px] text-muted">
          <span>
            Overhead not tied to a job: <b className="num text-fg">{usd(overhead.total, { compact: true })}</b> · {Math.round(overhead.pctOfRevenue * 100)}% of revenue · roofers avg {overhead.benchmark}
          </span>
          <span className="text-orange">
            {overhead.zeroReturn.length} items with zero return → {usd(zero, { compact: true })} / mo
          </span>
        </div>
      </section>

      <section className="lg:col-span-5 flex flex-col bg-panel">
        <div className="flex flex-col gap-1 px-8 pt-8 pb-5 border-b border-line">
          <Label>Selected · {selected.name}</Label>
          <div className={`num text-[64px] font-black leading-none ${sel >= 1.5 ? "text-lime" : sel < 1 ? "text-orange" : ""}`}>${sel.toFixed(2)}</div>
          <div className="text-[15px] text-fg-2">back for every dollar it actually costs you</div>
        </div>

        <div className="flex flex-col px-8 py-5 border-b border-line">
          <Label className="pb-2.5">What it really costs · TTM</Label>
          {selected.stack.map((l) => (
            <div key={l.label} className="flex justify-between py-2 text-[14px] border-t border-line">
              <span>{l.label}</span>
              <span className="num">{usd(l.amount)}</span>
            </div>
          ))}
          <div className="flex justify-between py-2.5 text-[15px] font-bold border-t-2 border-fg">
            <span>All in</span>
            <span className="num">{usd(selected.spent)}</span>
          </div>
          <div className="flex justify-between py-2.5 text-[15px] font-bold">
            <span>Revenue from those {selected.jobs} job{selected.jobs === 1 ? "" : "s"}</span>
            <span className={`num ${selected.back < selected.spent ? "text-orange" : "text-lime"}`}>{usd(selected.back)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-8 py-5 flex-1">
          <Label>CashCow says</Label>
          <div className="text-[16px] leading-[1.45]">{selected.advice ?? "Holding steady. Nothing to change here this month."}</div>
          {selected.sdeImpact && (
            <div className="text-[13px] text-muted">
              Adds ~{usd(selected.sdeImpact, { compact: true })} SDE → <b className="text-lime">+{usd(selected.sdeImpact * company.multipleMid, { compact: true })}</b> to sale price at {company.multipleMid}×.
            </div>
          )}
        </div>

        <div className="flex gap-2.5 px-8 py-5 border-t border-line">
          {selected.sdeImpact ? <Btn primary>Mark as cut</Btn> : <Btn primary>Add budget</Btn>}
          <Btn href="/jobs">See the {selected.jobs} job{selected.jobs === 1 ? "" : "s"}</Btn>
        </div>
      </section>
    </div>
  );
}
