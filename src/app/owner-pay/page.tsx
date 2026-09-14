import { TrendChart } from "@/components/charts";
import { Label, PageHead, Tile } from "@/components/ui";
import { people, pnl, sde, trend, usd } from "@/lib/data";

const kinds: Record<string, string> = {
  owner: "Owner benefit",
  financing: "Financing",
  noncash: "Non-cash",
  onetime: "One-time",
};

export default function OwnerPay() {
  const s = sde();
  const addBacks = pnl.addBacks.reduce((t, a) => t + a.amount, 0);
  return (
    <div className="flex flex-col flex-1">
      <PageHead kicker="What the owner actually takes home · TTM" title={<span className="text-lime">{usd(s)}</span>} />
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1">
        <section className="lg:col-span-7 flex flex-col lg:border-r border-line">
          <div className="grid grid-cols-3 border-y border-line">
            <Tile label="Reported net" value={usd(pnl.reportedNet, { compact: true })} sub="what the P&L says" className="border-r border-line" />
            <Tile label="Add-backs" value={usd(addBacks, { compact: true })} sub="owner perks, interest, one-offs" subTone="lime" className="border-r border-line" />
            <Tile label="True SDE" value={usd(s, { compact: true })} sub="what a buyer values" subTone="lime" />
          </div>
          <div className="px-6 md:px-10 py-6">
            <Label className="pb-2">Add-backs · every line a buyer&apos;s CPA will accept</Label>
            {pnl.addBacks.map((a) => (
              <div key={a.label} className="flex items-center justify-between py-3 border-t border-line text-[15px]">
                <div className="flex flex-col">
                  <span>{a.label}</span>
                  <span className="label text-[11px] text-muted-2">{kinds[a.kind]}</span>
                </div>
                <span className="num font-bold">{usd(a.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between py-3 border-t-2 border-fg text-[15px] font-bold">
              <span>Reported net + add-backs</span>
              <span className="num text-lime">{usd(s)}</span>
            </div>
          </div>
          <div className="px-6 md:px-10 pb-8">
            <Label className="pb-2">Monthly</Label>
            <TrendChart months={trend.months} series={[{ name: "True SDE", data: trend.sde }, { name: "Reported profit", data: trend.reported }]} />
          </div>
        </section>
        <section className="lg:col-span-5 bg-panel px-6 md:px-8 py-6">
          <Label className="pb-2">Per person, per working day</Label>
          {people.map((p) => (
            <div key={p.name} className="flex items-center justify-between py-3 border-t border-line text-[15px]">
              <div className="flex flex-col">
                <span>{p.name}</span>
                <span className="text-[12px] text-muted-2">{p.note ?? p.role}</span>
              </div>
              <span className={`num font-bold text-[18px] ${p.perDay < 0 ? "text-orange" : p.perDay > 1000 ? "text-lime" : ""}`}>{usd(p.perDay)}</span>
            </div>
          ))}
          <div className="text-[13px] text-muted mt-4">Margin each person generates after their fully loaded cost, divided by days worked. Admin roles read negative by design — they are overhead.</div>
        </section>
      </div>
    </div>
  );
}
