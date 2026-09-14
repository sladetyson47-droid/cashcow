# APP_CONTEXT — CashCow
Updated: 2026-09-14

## What it is
Financial command center for roofing company owners: true SDE, fully-loaded ROI on every dollar, valuation, Exit Advisor (Pro tier).

## Stack & structure
Next.js 16 (app router, TS, Tailwind v4), recharts. `src/lib/data.ts` = sample dataset + calcs (single source of truth for the UI). `src/lib/sources/*` = adapter stubs (QBO, AccuLynx). Pages: / every-dollar owner-pay jobs marketing valuation exit-advisor. Run: `npm run dev`. Fonts via Google Fonts <link> (next/font blocked by sandbox proxy).

## Live surfaces
Repo: github.com/sladetyson47-droid/cashcow. Deploy: Vercel (auto from main).

## Accounts & connectors
QuickBooks: Slade's books are in QBO; Tyson waiting on the Intuit login → then register app at developer.intuit.com. AccuLynx: API key from company admin / support@acculynx.com.

## Secrets & config
See src/lib/sources/README.md for env var names. None set yet.

## Decisions
Design: "Scoreboard" look (dark #101010, lime #d4ff3f, Archivo), left sidebar nav. Fully-loaded ROI = direct + sales time + materials + crew + overhead share. Slade-only first, multi-tenant later. Supabase added when real data lands.

## Dead ends
Chrome extension "Browser 1/2" are not Tyson's MacBook; desktop-app browser pane timed out repeatedly (Sep 14). GitHub token in this sandbox is repo-scoped: cannot create repos via API.

## Open items
QBO app credentials (Tyson). AccuLynx API key (Tyson/admin).
