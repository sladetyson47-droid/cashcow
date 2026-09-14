import { BarRank } from "@/components/charts";
import { Btn, Label, PageHead, Tile } from "@/components/ui";
import { channels, perDollar, perDollarDirect, usd } from "@/lib/data";

export default function Marketing() {
  const paid = channels.filter((c) => c.direct > 0).sort((a, b) => perDollar(b) - perDollar(a));
  const spend = paid.reduce((t, c) => t + c.direct, 0);
  const back = paid.reduce((t, c) => t + c.back, 0);
  const jobs = paid.reduce((t, c) => t + c.jobs, 0);
  return (
    <div className="flex flex-col flex-1">
      <PageHead
        kicker="Marketing · auto-ranked by what came back"
        title={
          <>
            {usd(spend, { compact: true })} in → {usd(back, { compact: true })} out
          </>
        }
        right={<Btn href="/every-dollar?c=lsa">See fully loaded</Btn>}
      />
      <div className="grid grid-cols-3 border-y border-line">
        <Tile label="Paid channels" value={String(paid.length)} className="border-r border-line" />
        <Tile label="Jobs from paid" value={String(jobs)} className="border-r border-line" />
        <Tile label="Cost per job" value={usd(Math.round(spend / jobs))} sub="direct spend only" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        <section className="lg:col-span-7 px-6 md:px-10 py-6 lg:border-r border-line">
          <Label className="pb-3">Revenue per $1 of direct spend</Label>
          <BarRank rows={paid.map((c) => ({ name: c.name, value: perDollarDirect(c) ?? 0 }))} threshold={2} height={paid.length * 46} />
          <div className="text-[13px] text-muted mt-3">Direct spend only (ads, lead fees, lunches). The Every Dollar tab adds sales time, materials, crew and overhead — that is the number to act on.</div>
        </section>
        <section className="lg:col-span-5 bg-panel px-6 md:px-8 py-6">
          <Label className="pb-2">Campaigns</Label>
          {paid.map((c) => {
            const pd = perDollar(c);
            return (
              <div key={c.id} className="flex items-center justify-between py-3 border-t border-line text-[15px]">
                <div className="flex flex-col">
                  <span>{c.name}</span>
                  <span className="text-[12px] text-muted-2">
                    {usd(c.direct, { compact: true })} spend · {c.jobs} jobs
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`num font-bold text-[18px] ${pd >= 1.5 ? "text-lime" : pd < 1 ? "text-orange" : ""}`}>×{pd.toFixed(1)}</span>
                  <span className="text-[11px] text-muted-2 label">fully loaded</span>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
