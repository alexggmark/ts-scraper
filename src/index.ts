import {
  API_URL
} from './constants'

async function scraperTest(): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/bbc`)
    const text = await response.text()
    console.log(text.json())
    return text
  } catch (err) {
    console.log(err)
    return new Promise(reject => reject)
  }
}

console.log('Running app')

scraperTest()
