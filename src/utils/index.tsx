import {
  API_URL
} from '../constants'

export async function webScraper(): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/bbc`)
    const text = await response.text()
    console.log(text)
    return text
  } catch (err) {
    console.log(err)
    return new Promise(reject => reject)
  }
}

export const truncateString = (text: string, limit: number): string => {
  return text.slice(0, limit)
}
