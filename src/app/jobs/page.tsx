import { TrendChart } from "@/components/charts";
import { Label, PageHead, Tile } from "@/components/ui";
import { jobs, pct, usd } from "@/lib/data";

export default function Jobs() {
  const delta = jobs.costPerSquare - jobs.costPerSquareBenchmark;
  return (
    <div className="flex flex-col flex-1">
      <PageHead
        kicker="Cost per square · fully loaded"
        title={
          <>
            {usd(jobs.costPerSquare)} <span className="text-[18px] text-muted font-medium">/ sq</span>
          </>
        }
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        <section className="lg:col-span-7 lg:border-r border-line">
          <div className="grid grid-cols-3 border-y border-line">
            <Tile label="Vs. benchmark" value={`${delta > 0 ? "+" : ""}${usd(delta)}`} sub={`roofers your size: ${usd(jobs.costPerSquareBenchmark)}`} subTone={delta > 0 ? "orange" : "lime"} className="border-r border-line" />
            <Tile label="Jobs · TTM" value={String(jobs.types.reduce((t, x) => t + x.jobs, 0))} className="border-r border-line" />
            <Tile label="Avg ticket" value={usd(15_400, { compact: true })} />
          </div>
          <div className="px-6 md:px-10 py-6">
            <Label className="pb-2">Cost per square, monthly</Label>
            <TrendChart months={["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]} series={[{ name: "$/sq", data: jobs.bySquareTrend }]} unit="usd" />
          </div>
          <div className="px-6 md:px-10 pb-8">
            <Label className="pb-2">By job type</Label>
            <div className="label hidden md:flex text-[11px] text-muted-2 pb-1">
              <div className="flex-1">Type</div>
              <div className="w-[80px] text-right">Jobs</div>
              <div className="w-[110px] text-right">Avg ticket</div>
              <div className="w-[90px] text-right">Margin</div>
            </div>
            {jobs.types.map((t) => (
              <div key={t.type} className="flex items-center py-3 border-t border-line text-[15px]">
                <div className="flex-1">{t.type}</div>
                <div className="num w-[80px] text-right text-muted">{t.jobs}</div>
                <div className="num w-[110px] text-right">{usd(t.avgTicket)}</div>
                <div className={`num w-[90px] text-right font-bold ${t.margin < 0.3 ? "text-orange" : "text-lime"}`}>{pct(t.margin, 0)}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="lg:col-span-5 bg-panel px-6 md:px-8 py-6">
          <Label className="pb-2">Recent jobs · from AccuLynx</Label>
          {jobs.recent.map((j) => {
            const m = (j.revenue - j.cost) / j.revenue;
            return (
              <div key={j.id} className="flex items-center justify-between py-3 border-t border-line text-[15px]">
                <div className="flex flex-col">
                  <span>{j.customer}</span>
                  <span className="text-[12px] text-muted-2">
                    {j.id} · {j.squares} sq · {j.source}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="num font-bold">{usd(j.revenue)}</span>
                  <span className={`num text-[12px] ${m < 0.3 ? "text-orange" : "text-lime"}`}>{pct(m, 0)} margin</span>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
