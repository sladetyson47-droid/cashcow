# Data sources

Each adapter exports `isConfigured()` and a `fetch*()` that returns the same
shapes as `src/lib/data.ts`. When configured, the nightly sync writes to the
database and `getSnapshot()` reads from there instead of the sample dataset.

| Source | Env vars | Gives us |
|---|---|---|
| QuickBooks Online | `QBO_CLIENT_ID`, `QBO_CLIENT_SECRET`, `QBO_REALM_ID`, `QBO_REFRESH_TOKEN` | P&L lines, categorized expenses, payroll, owner add-backs |
| AccuLynx | `ACCULYNX_API_KEY` | jobs, squares, contract value, lead source, invoices |
| Meta Ads | `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID` | campaign spend |
| Google Ads / LSA | `GOOGLE_ADS_*` | campaign spend |
