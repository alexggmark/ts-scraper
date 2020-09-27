import {
  API_URL
} from '../constants/index'

export async function webScraper(): Promise<string> {
  try {
    const scrapeBBC = await fetch(`${API_URL}/bbc`)
    const responseBBC = await scrapeBBC.json()
    const scrapeGuardian = await fetch(`${API_URL}/guardian`)
    const responseGuardian = await scrapeGuardian.json()

    const response = [...responseGuardian, ...responseBBC]
    return JSON.stringify(response)
  } catch (err) {
    console.log(err)
    return new Promise(reject => reject)
  }
}

export const truncateString = (text: string, limit: number): string => {
  return text.slice(0, limit)
}
