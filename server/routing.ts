import * as http from 'http'
import domParser from './domParsing'

const routing = (req: http.IncomingMessage, res: http.ServerResponse): void => {
  if (req.url === '/bbc') {
    const domHeading = '.gs-c-promo-heading'
    const domTitle = '.gs-c-promo-heading__title'
    http.get('http://localhost:3000/https://www.bbc.co.uk/news', (response: http.IncomingMessage) => {
      response.setEncoding('utf8')
      let body = ''
      response.on('data', (chunk: string) => {
        body += chunk
      })
      response.on('end', () => {
        const fetchResult = JSON.stringify(domParser(body, domHeading, domTitle))
        res.end(fetchResult)
      })
    }).on('error', (e) => {
      console.log(`Error: ${e.message}`)
    })
  }
}

export default routing