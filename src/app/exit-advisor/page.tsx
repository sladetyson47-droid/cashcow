import { Btn, Label, PageHead, Pill } from "@/components/ui";
import { exitProjection, moves, usd, valuation } from "@/lib/data";

const tone = { good: "text-lime", warn: "text-yellow", bad: "text-orange" };

export default function ExitAdvisor() {
  const v = valuation();
  const p = exitProjection();
  const ranked = [...moves].sort((a, b) => b.valueAdded - a.valueAdded);
  const inPlan = moves.filter((m) => m.inPlan).length;
  const nowPct = Math.round((p.now / p.after) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
      <section className="lg:col-span-4 flex flex-col justify-between gap-8 px-6 md:px-10 pt-9 pb-8 lg:border-r border-line bg-panel">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-1">
            <Label className="text-[12px]">Worth today</Label>
            <div className="num text-[52px] font-black leading-none">{usd(p.now, { compact: true })}</div>
            <div className="text-[13px] text-muted">
              {usd(v.sde, { compact: true })} SDE × 3.0 (small roofer, owner-run)
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Label className="text-[12px]">If you do the {moves.length} below</Label>
            <div className="num text-[52px] font-black leading-none text-lime">{usd(p.after, { compact: true })}</div>
            <div className="text-[13px] text-muted">
              {usd(p.sdeAfter, { compact: true })} SDE × {p.multipleAfter} (less owner risk, cleaner books)
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="label text-[11px] text-muted">Today</div>
            <div className="h-7 border-2 border-lime relative">
              <div className="absolute inset-y-0 left-0 bg-line-2" style={{ width: `${nowPct}%` }} />
              <div className="absolute inset-y-0 right-0 bg-lime/90" style={{ width: `${100 - nowPct}%` }} />
            </div>
            <div className="label text-[11px] text-lime text-right">+{usd(p.after - p.now, { compact: true })} in 12 months</div>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <Label>Multiple drivers · where you stand</Label>
          {v.drivers.slice(0, 5).map((d) => (
            <div key={d.label} className="flex justify-between text-[13px]">
              <span>{d.label}</span>
              <span className={tone[d.status]}>{d.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lg:col-span-8 flex flex-col">
        <PageHead
          kicker="Moves, ranked by dollars added to your sale price"
          title={<span className="text-[15px] font-medium text-muted">What a broker or CPA would tell you before listing. Updated nightly.</span>}
          right={
            <div className="flex gap-1.5">
              <Pill on>All</Pill>
              <Pill>In my plan · {inPlan}</Pill>
            </div>
          }
        />

        <div className="flex flex-col px-6 md:px-10 flex-1">
          {ranked.map((m) => (
            <div key={m.id} className="flex flex-col md:flex-row gap-3 md:gap-6 md:items-start py-[18px] border-t border-line">
              <div className="num md:w-[130px] shrink-0 text-[30px] font-black text-lime leading-none">+{usd(m.valueAdded, { compact: true })}</div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="text-[17px] font-bold">{m.title}</div>
                <div className="text-[14px] text-fg-2 leading-[1.4]">{m.body}</div>
                <div className="label text-[11px] text-muted-2">
                  {m.lever} · {m.category} · {m.horizon}
                </div>
              </div>
              {m.inPlan ? <Btn primary className="shrink-0 self-start">In plan</Btn> : <Btn className="shrink-0 self-start">Add to plan</Btn>}
            </div>
          ))}
          <div className="border-t border-line" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-6 md:px-10 py-[18px] border-t border-line bg-panel">
          <div className="text-[14px] text-muted">
            Best time to list based on your seasonality: <b className="text-fg">{v.bestMonthToList}</b>, after the March peak lands in trailing-12.
          </div>
          <Btn>Export buyer data room</Btn>
        </div>
      </section>
    </div>
  );
}
