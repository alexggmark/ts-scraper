import {
  API_URL
} from './constants'

export async function scraperTest(): Promise<string> {
  try {
    console.log(`Running scrape: ${API_URL}/bbc`)
    console.log('Test 1')
    const response = await fetch(`${API_URL}/bbc`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    const text = await response.text()
    console.log(text)
    return text
  } catch (err) {
    console.log(err)
    return new Promise(reject => reject)
  }
}

export async function webScraper(): Promise<string> {
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
