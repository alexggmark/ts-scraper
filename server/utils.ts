export const removeRawUrlFromFullUrl = (rawUrl: string, fullUrl: string): string => {
  if (fullUrl.indexOf(rawUrl) === -1) { return fullUrl }
  return fullUrl.replace(rawUrl, '')
}