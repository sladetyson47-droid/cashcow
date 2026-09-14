import { Btn, Label, PageHead, Tile } from "@/components/ui";
import { company, pct, usd, valuation } from "@/lib/data";

const tone = { good: "text-lime", warn: "text-yellow", bad: "text-orange" };

export default function Valuation() {
  const v = valuation();
  return (
    <div className="flex flex-col flex-1">
      <PageHead
        kicker="What a buyer would pay · estimate"
        title={
          <>
            {usd(v.low, { compact: true })} – {usd(v.high, { compact: true })}
          </>
        }
        right={<Btn primary href="/exit-advisor">How to raise it</Btn>}
      />
      <div className="px-6 md:px-10 pb-4 text-[15px] text-muted max-w-3xl">
        {usd(v.sde, { compact: true })} SDE × {company.multipleLow}–{company.multipleHigh}. Small roofing companies trade on a multiple of seller&apos;s discretionary earnings; the multiple moves with the risk factors below. Estimate, not an appraisal.
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-line">
        <Tile label="SDE (TTM)" value={usd(v.sde, { compact: true })} sub={`${pct(v.sdeMargin)} of revenue`} subTone="lime" className="border-r border-b lg:border-b-0 border-line" />
        <Tile label="Adjusted EBITDA" value={usd(v.ebitda, { compact: true })} sub={`${pct(v.ebitda / v.revenue)} margin`} className="lg:border-r border-b lg:border-b-0 border-line" />
        <Tile label="Revenue (TTM)" value={usd(v.revenue, { compact: true })} sub={`+${Math.round(v.revenueGrowth * 100)}% / yr`} subTone="lime" className="border-r border-line" />
        <Tile label="Gross margin" value={pct(v.grossMargin)} sub="roofers avg 35–45%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        <div className="lg:col-span-7 px-6 md:px-10 py-6 lg:border-r border-line">
          <Label className="pb-2">What buyers check</Label>
          {v.drivers.map((d) => (
            <div key={d.label} className="flex justify-between py-3 border-t border-line text-[15px]">
              <span>{d.label}</span>
              <span className={`num font-bold ${tone[d.status]}`}>{d.value}</span>
            </div>
          ))}
        </div>
        <div className="lg:col-span-5 px-6 md:px-10 py-6 bg-panel flex flex-col gap-4">
          <Label>Value at each multiple</Label>
          {[company.multipleLow, company.multipleMid, company.multipleHigh, 4.0].map((m) => (
            <div key={m} className="flex items-center gap-4">
              <div className="num w-[48px] text-[14px] text-muted">{m.toFixed(1)}×</div>
              <div className="flex-1 h-6 bg-line-2 relative">
                <div className="absolute inset-y-0 left-0 bg-lime" style={{ width: `${(m / 4) * 100}%` }} />
              </div>
              <div className="num w-[80px] text-right font-bold">{usd(v.sde * m, { compact: true })}</div>
            </div>
          ))}
          <div className="text-[13px] text-muted mt-2">
            Every $1 of SDE you add is worth about ${company.multipleLow.toFixed(2)}–${company.multipleHigh.toFixed(2)} at the closing table. Every risk you remove moves the multiple.
          </div>
        </div>
      </div>
    </div>
  );
}
