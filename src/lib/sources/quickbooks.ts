// QuickBooks Online adapter (stub). Fill in once the Intuit app exists.
export const isConfigured = () =>
  Boolean(process.env.QBO_CLIENT_ID && process.env.QBO_CLIENT_SECRET && process.env.QBO_REALM_ID);

export async function fetchProfitAndLoss(_range: { from: string; to: string }) {
  if (!isConfigured()) return null;
  // TODO: OAuth2 refresh → GET /v3/company/{realmId}/reports/ProfitAndLoss?start_date&end_date&summarize_column_by=Month
  throw new Error("QuickBooks adapter not implemented yet");
}
