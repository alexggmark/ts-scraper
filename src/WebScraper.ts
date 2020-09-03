import {
  API_URL
} from './constants'

export async function scraperTest(): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/bbc`)
    const text = await response.text()
    console.log(JSON.parse(text))
    return text
  } catch (err) {
    console.log(err)
    return new Promise(reject => reject)
  }
}
