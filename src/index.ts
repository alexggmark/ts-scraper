import {
  API_URL
} from './constants'

async function scraperTest(): Promise<string> {
  try {
    const response = await fetch('http://localhost:4000/bbc')
    const text = await response.text()
    console.log(text)
    return text
  } catch (err) {
    console.log(err)
    return new Promise(reject => reject)
  }
}

console.log('Running app')

scraperTest()
