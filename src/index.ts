// import { CorsAnywhere } from 'cors-anywhere'

async function scraperTest(): Promise<string> {
  // document.domain = 'https://www.bbc.co.uk'
  const response = await fetch('https://www.bbc.co.uk/news', {
    headers: {
      'Access-Control-Allow-Origin': 'https://www.bbc.co.uk/'
    }
  })
  console.log(response)
  const text = await response.text()
  console.log(text)
  return text
}

scraperTest()
