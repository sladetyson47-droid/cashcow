import { TrendChart } from "@/components/charts";
import { Btn, Label, Tile } from "@/components/ui";
import { channels, company, ebitdaMargin, grossMargin, perDollar, pnl, sde, trend, usd, valuation } from "@/lib/data";

export default function Overview() {
  const s = sde();
  const v = valuation();
  const ranked = [...channels].sort((a, b) => perDollar(b) - perDollar(a));
  const dead = channels.filter((c) => c.sdeImpact);
  const deadValue = dead.reduce((t, c) => t + (c.sdeImpact ?? 0), 0) * company.multipleMid;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
      <section className="lg:col-span-7 flex flex-col justify-between px-6 md:px-10 pt-10 pb-8 lg:border-r border-line">
        <div className="flex flex-col gap-1.5">
          <Label className="text-[13px]">You are actually making</Label>
          <div className="num text-[88px] md:text-[132px] font-black leading-[0.95] text-lime">{usd(s, { compact: true })}</div>
          <div className="text-[18px] text-fg-2 mt-2">
            a year. Books say <b className="text-fg">{usd(pnl.reportedNet, { compact: true })}</b>. You&apos;d sell for{" "}
            <b className="text-fg">
              {usd(v.low, { compact: true })}–{usd(v.high, { compact: true })}
            </b>{" "}
            today.
          </div>
        </div>
        <div className="mt-8">
          <TrendChart
            months={trend.months}
            series={[
              { name: "True SDE", data: trend.sde },
              { name: "Reported profit", data: trend.reported },
            ]}
          />
        </div>
      </section>

      <section className="lg:col-span-5 flex flex-col">
        <div className="grid grid-cols-2 border-b border-line">
          <Tile label="EBITDA" value={usd(pnl.ebitda, { compact: true })} sub={`${(ebitdaMargin() * 100).toFixed(1)}%`} subTone="lime" className="border-r border-b border-line" />
          <Tile label="Gross margin" value={`${(grossMargin() * 100).toFixed(1)}%`} sub={`↓ ${Math.abs(pnl.grossMarginDelta)} pts`} subTone="orange" className="border-b border-line" />
          <Tile label="This week, yours" value={usd(pnl.thisWeekOwner)} sub={`${usd(Math.round(pnl.thisWeekOwner / 5))} / day`} className="border-r border-line" />
          <Tile label="Spent this week" value={usd(pnl.thisWeekSpent, { compact: true })} sub={`$${pnl.thisWeekBackPerDollar.toFixed(2)} back per $1`} />
        </div>

        <div className="flex flex-col px-7 py-5 flex-1">
          <Label className="pb-2.5">Every dollar, ranked</Label>
          {ranked.map((c, i) => {
            const pd = perDollar(c);
            return (
              <div key={c.id} className={`flex items-center justify-between py-2.5 text-[15px] ${i < ranked.length - 1 ? "border-b border-line" : ""}`}>
                <span>{c.name}</span>
                <span className={`num font-bold text-[18px] ${pd >= 1.5 ? "text-lime" : pd < 1 ? "text-orange" : ""}`}>×{pd.toFixed(1)}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-7 py-5 bg-panel-2 border-t border-line">
          <div className="text-[15px] text-fg-2">
            Kill {dead.map((d) => d.name.replace(" leads", "")).join(" + ")} → <b className="text-lime">+{usd(deadValue, { compact: true })}</b> on your sale price
          </div>
          <Btn primary href="/exit-advisor">
            Exit advisor
          </Btn>
        </div>
      </section>
    </div>
  );
}
