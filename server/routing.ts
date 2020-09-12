import * as http from 'http'
import domParser from './domParsing'
import {
  CORS_URL
} from './constants'

const sourceObject = [
  {
    route: '/bbc',
    domHeading: '.gs-c-promo-heading',
    domTitle: '.gs-c-promo-heading__title',
    url: `${CORS_URL}/https://www.bbc.co.uk/news`
  }
]

const routing = (req: http.IncomingMessage, res: http.ServerResponse): void => {
  sourceObject.map((item) => {
    if (req.url !== item.route) { return }

    http.get(item.url, (response: http.IncomingMessage) => {
      response.setEncoding('utf8')
      let body = ''
      response.on('data', (chunk: string) => {
        body += chunk
      })
      response.on('end', () => {
        const fetchResult = JSON.stringify(domParser(body, item.domHeading, item.domTitle))
        res.end(fetchResult)
      })
    }).on('error', (e) => {
      console.log(`Error: ${e.message}`)
    })
  })
}

export default routing