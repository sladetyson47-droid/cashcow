// AccuLynx adapter (stub). Docs: https://apidocs.acculynx.com
export const isConfigured = () => Boolean(process.env.ACCULYNX_API_KEY);

export async function fetchJobs(_since: string) {
  if (!isConfigured()) return null;
  // TODO: GET https://api.acculynx.com/api/v2/jobs?pageSize=100&... with Authorization: Bearer ACCULYNX_API_KEY
  throw new Error("AccuLynx adapter not implemented yet");
}
