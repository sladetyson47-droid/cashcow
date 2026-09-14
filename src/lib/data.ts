// CashCow data layer.
// Everything the UI shows comes from `getSnapshot()`. Today it is served by the
// sample dataset below; when QuickBooks / AccuLynx credentials are present the
// adapters in ./sources replace it with real numbers. Shapes stay identical.

export type Money = number; // USD

export const company = {
  name: "Slade Roofing",
  syncedAgo: "14 min ago",
  multipleLow: 2.5,
  multipleMid: 3.0,
  multipleHigh: 3.5,
};

// ---------- Channels (fully-loaded) ----------
export type CostLine = { label: string; amount: Money };
export type Channel = {
  id: string;
  name: string;
  what: string; // what's in the cost stack, plain english
  jobs: number;
  spent: Money; // fully loaded
  direct: Money; // direct spend only (ads, fees)
  back: Money; // revenue attributed
  stack: CostLine[];
  advice?: string;
  sdeImpact?: Money; // annual SDE change if acted on
};

export const channels: Channel[] = [
  {
    id: "lsa",
    name: "Google LSA leads",
    what: "ads + Brady's time + materials + crew on 31 jobs",
    jobs: 31,
    spent: 212_000,
    direct: 36_600,
    back: 418_000,
    stack: [
      { label: "LSA ad spend", amount: 36_600 },
      { label: "Sales time · 310 hrs × loaded rate", amount: 23_250 },
      { label: "Drive · 6,100 mi", amount: 4_000 },
      { label: "Materials + crew · 31 jobs", amount: 139_000 },
      { label: "Overhead share", amount: 9_150 },
    ],
    advice: "Your best dollar. Every extra $1K here has returned about $1.97 fully loaded. Push budget until the per-dollar number starts falling.",
  },
  {
    id: "agents",
    name: "Insurance agent referrals",
    what: "lunches + Justin's time + materials + crew on 24 jobs",
    jobs: 24,
    spent: 186_000,
    direct: 8_400,
    back: 351_000,
    stack: [
      { label: "Lunches, gifts, events", amount: 8_400 },
      { label: "Justin's time · 260 hrs", amount: 19_500 },
      { label: "Drive · 4,800 mi", amount: 3_150 },
      { label: "Materials + crew · 24 jobs", amount: 146_000 },
      { label: "Overhead share", amount: 8_950 },
    ],
    advice: "Cheapest leads you have. Formalize it: a referral thank-you program costs less than one Angi month.",
  },
  {
    id: "door",
    name: "Door knocking",
    what: "salary + truck + materials + crew on 19 jobs",
    jobs: 19,
    spent: 164_000,
    direct: 0,
    back: 259_000,
    stack: [
      { label: "Canvasser salary share", amount: 31_000 },
      { label: "Truck + fuel", amount: 6_900 },
      { label: "Materials + crew · 19 jobs", amount: 118_000 },
      { label: "Overhead share", amount: 8_100 },
    ],
  },
  {
    id: "meta",
    name: "Meta ads",
    what: "ad spend + sales time + materials + crew on 11 jobs",
    jobs: 11,
    spent: 98_000,
    direct: 21_000,
    back: 131_000,
    stack: [
      { label: "Meta ad spend", amount: 21_000 },
      { label: "Sales time · 140 hrs", amount: 10_500 },
      { label: "Materials + crew · 11 jobs", amount: 61_000 },
      { label: "Overhead share", amount: 5_500 },
    ],
    advice: "Positive but thin. Lead quality is the problem, not volume — 140 sales hours for 11 jobs. Tighten targeting before adding budget.",
  },
  {
    id: "repeat",
    name: "Repeat & word of mouth",
    what: "no lead cost · materials + crew on 42 jobs",
    jobs: 42,
    spent: 391_000,
    direct: 0,
    back: 612_000,
    stack: [
      { label: "Materials + crew · 42 jobs", amount: 372_000 },
      { label: "Overhead share", amount: 19_000 },
    ],
  },
  {
    id: "angi",
    name: "Angi leads",
    what: "lead fees + 84 hrs sales time + drive · 3 jobs closed",
    jobs: 3,
    spent: 41_250,
    direct: 14_200,
    back: 28_900,
    stack: [
      { label: "Angi lead fees", amount: 14_200 },
      { label: "Sales time · 84 hrs × loaded rate", amount: 6_300 },
      { label: "Drive · 1,900 mi", amount: 1_250 },
      { label: "Materials + crew · 3 jobs", amount: 17_900 },
      { label: "Overhead share", amount: 1_600 },
    ],
    advice: "Angi costs you $12K a year after everything. Same sales hours on Google LSA would return about $49K. Cancel Angi, move the budget.",
    sdeImpact: 12_350,
  },
  {
    id: "radio",
    name: "Radio",
    what: "spots + production · 1 job traced",
    jobs: 1,
    spent: 18_000,
    direct: 16_500,
    back: 7_000,
    stack: [
      { label: "Spots", amount: 14_000 },
      { label: "Production", amount: 2_500 },
      { label: "Materials + crew · 1 job", amount: 1_500 },
    ],
    advice: "One traced job in twelve months. Cut it, or make the ad send people to a trackable number so the app can actually see it.",
    sdeImpact: 11_000,
  },
];

export const perDollar = (c: Channel) => c.back / c.spent;
export const perDollarDirect = (c: Channel) => (c.direct > 0 ? c.back / c.direct : null);

// Overhead not tied to a job
export const overhead = {
  total: 318_000,
  pctOfRevenue: 0.11,
  benchmark: "9–12%",
  zeroReturn: [
    { label: "3 unused software seats", monthly: 412 },
    { label: "Truck #4 (idle 61% of days)", monthly: 1_180 },
  ],
};

// ---------- P&L / SDE ----------
export const pnl = {
  revenue: 2_850_000,
  cogs: 1_750_000,
  reportedNet: 291_400,
  ebitda: 402_900,
  grossMarginDelta: -1.2, // pts vs prior year
  thisWeekOwner: 9_370,
  thisWeekSpent: 41_200,
  thisWeekBackPerDollar: 3.1,
  addBacks: [
    { label: "Owner salary (Tyler)", amount: 96_000, kind: "owner" },
    { label: "Owner truck, fuel, insurance", amount: 18_400, kind: "owner" },
    { label: "Family on payroll above market", amount: 22_000, kind: "owner" },
    { label: "Owner health insurance", amount: 14_200, kind: "owner" },
    { label: "Interest", amount: 11_800, kind: "financing" },
    { label: "Depreciation", amount: 24_600, kind: "noncash" },
    { label: "One-time: shop roof + lawsuit settlement", amount: 8_800, kind: "onetime" },
  ] as { label: string; amount: Money; kind: "owner" | "financing" | "noncash" | "onetime" }[],
};

export const sde = () => pnl.reportedNet + pnl.addBacks.reduce((s, a) => s + a.amount, 0);
export const grossMargin = () => (pnl.revenue - pnl.cogs) / pnl.revenue;
export const ebitdaMargin = () => pnl.ebitda / pnl.revenue;

// 14-point trend, oldest → newest (monthly, TTM + 2)
export const trend = {
  months: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  sde: [28, 31, 30, 36, 35, 39, 37, 44, 46, 49, 48, 53, 55, 58].map((n) => n * 1000),
  reported: [15, 17, 16, 21, 20, 23, 22, 27, 28, 30, 29, 33, 34, 36].map((n) => n * 1000),
  ebitda: [22, 25, 24, 30, 29, 33, 31, 37, 39, 41, 40, 45, 47, 50].map((n) => n * 1000),
  margin: [37.1, 37.8, 38.2, 39.4, 39.0, 39.8, 38.9, 40.1, 39.6, 38.8, 38.4, 38.2, 38.7, 38.6],
};

// ---------- Owner / team daily ----------
export const people = [
  { name: "Tyler (owner)", role: "Owner", perDay: 1_874, note: "SDE ÷ working days" },
  { name: "Brady", role: "Sales", perDay: 612, note: "gross profit on closed jobs − loaded cost" },
  { name: "Justin", role: "Adjuster / sales", perDay: 548 },
  { name: "Forrest", role: "Crew lead", perDay: 431, note: "crew-day margin" },
  { name: "Crew B", role: "Crew", perDay: 388 },
  { name: "Karen", role: "Admin", perDay: -142, note: "overhead — expected negative" },
];

// ---------- Jobs ----------
export const jobs = {
  costPerSquare: 287,
  costPerSquareBenchmark: 265,
  bySquareTrend: [271, 268, 274, 279, 276, 283, 281, 288, 285, 290, 287, 287],
  types: [
    { type: "Full replacement", jobs: 88, avgTicket: 24_100, margin: 0.41 },
    { type: "Insurance claim", jobs: 31, avgTicket: 19_800, margin: 0.39 },
    { type: "Repair", jobs: 62, avgTicket: 2_900, margin: 0.24 },
    { type: "Commercial", jobs: 4, avgTicket: 61_000, margin: 0.33 },
  ],
  recent: [
    { id: "J-2291", customer: "Hansen · Snowflake", squares: 32, revenue: 26_400, cost: 15_900, source: "Google LSA" },
    { id: "J-2290", customer: "Ortiz · Pinetop", squares: 24, revenue: 19_200, cost: 11_800, source: "Agent referral" },
    { id: "J-2289", customer: "Lund · Show Low", squares: 41, revenue: 33_800, cost: 21_400, source: "Repeat" },
    { id: "J-2288", customer: "Baker · Taylor", squares: 6, revenue: 3_100, cost: 2_500, source: "Angi" },
    { id: "J-2287", customer: "Whitmer · Flagstaff", squares: 29, revenue: 24_900, cost: 14_600, source: "Door knocking" },
  ],
};

// ---------- Valuation ----------
export const valuation = () => {
  const s = sde();
  return {
    sde: s,
    ebitda: pnl.ebitda,
    revenue: pnl.revenue,
    grossMargin: grossMargin(),
    sdeMargin: s / pnl.revenue,
    revenueGrowth: 0.18,
    low: s * company.multipleLow,
    mid: s * company.multipleMid,
    high: s * company.multipleHigh,
    drivers: [
      { label: "Owner dependence", value: "High · 61% of sales", status: "bad" },
      { label: "Books clean", value: "214 uncategorized", status: "bad" },
      { label: "Insurer concentration", value: "Top 2 = 38%", status: "warn" },
      { label: "Revenue trend", value: "+18% / yr", status: "good" },
      { label: "Recurring revenue", value: "None", status: "bad" },
      { label: "Customer concentration", value: "Top customer 4%", status: "good" },
      { label: "Backlog", value: "$412K · 7 weeks", status: "good" },
      { label: "Avg job size", value: "$15,400", status: "good" },
      { label: "Working capital", value: "$186K", status: "good" },
    ] as { label: string; value: string; status: "good" | "warn" | "bad" }[],
    bestMonthToList: "April",
  };
};

// ---------- Exit advisor ----------
export type Move = {
  id: string;
  title: string;
  body: string;
  valueAdded: Money;
  lever: "Multiple" | "SDE";
  category: string;
  horizon: string;
  inPlan: boolean;
};

export const moves: Move[] = [
  {
    id: "owner-out-of-sales",
    title: "Get yourself out of sales",
    body: "You personally sold 61% of revenue. Buyers discount that hard — it walks out the door with you. Move Brady to lead on LSA and referral leads; target under 25% in 12 months. Lifts the multiple 3.0 → 3.5.",
    valueAdded: 310_000,
    lever: "Multiple",
    category: "owner dependence",
    horizon: "12 months",
    inPlan: true,
  },
  {
    id: "repair-pricing",
    title: "Raise price on repairs 8%",
    body: "Repair jobs run 24% gross margin vs 41% on replacements. Your close rate on repairs is 71% — there's room. +$62K SDE at current volume.",
    valueAdded: 186_000,
    lever: "SDE",
    category: "pricing",
    horizon: "30 days",
    inPlan: false,
  },
  {
    id: "clean-books",
    title: "Clean up the books",
    body: "214 uncategorized transactions and 3 personal expenses running through the business. Buyers' CPAs walk when they see this. Costs you ~0.3× on the multiple. One afternoon with Karen.",
    valueAdded: 146_000,
    lever: "Multiple",
    category: "financial hygiene",
    horizon: "1 week",
    inPlan: true,
  },
  {
    id: "maintenance-plan",
    title: "Start a roof maintenance plan",
    body: "Zero recurring revenue today. 300 past customers × $249/yr inspection plan at 40% take = $30K ARR, and buyers pay a premium multiple on recurring.",
    valueAdded: 124_000,
    lever: "Multiple",
    category: "recurring revenue",
    horizon: "90 days",
    inPlan: false,
  },
  {
    id: "cut-dead-spend",
    title: "Cut Angi, radio, 3 idle software seats, Truck #4",
    body: "$28K/yr going out with under $0.70 coming back per dollar. Straight to SDE.",
    valueAdded: 84_000,
    lever: "SDE",
    category: "spend",
    horizon: "this week",
    inPlan: false,
  },
];

export const exitProjection = () => {
  const v = valuation();
  const sdeAfter = v.sde + 62_000 + 28_000 + 30_000 * 0.8;
  const multipleAfter = 3.7;
  return { now: v.mid, after: sdeAfter * multipleAfter, sdeAfter, multipleAfter };
};

// ---------- formatting ----------
export const usd = (n: Money, opts: { compact?: boolean } = {}) => {
  if (opts.compact) {
    const abs = Math.abs(n);
    if (abs >= 1_000_000) return `${n < 0 ? "-" : ""}$${(abs / 1_000_000).toFixed(2).replace(/\.?0+$/, "")}M`;
    if (abs >= 1_000) return `${n < 0 ? "-" : ""}$${Math.round(abs / 1_000)}K`;
  }
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
};
export const pct = (n: number, digits = 1) => `${(n * 100).toFixed(digits)}%`;
