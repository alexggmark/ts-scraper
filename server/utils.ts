/**
 * Check if rawUrl is in fullUrl and either removes or returns
 * @param rawUrl - base URL
 * @param fullUrl - complete URL with/without rawUrl
 */
export const removeRawUrlFromFullUrl = (rawUrl: string, fullUrl: string): string => {
  if (fullUrl.indexOf(rawUrl) === -1) { return fullUrl }
  return fullUrl.replace(rawUrl, '')
}