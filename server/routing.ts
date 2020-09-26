import * as http from 'http'
import domParser from './domParsing'
import {
  CORS_HOST
} from './constants'

const sourceObject = [
  {
    route: '/bbc',
    domHeading: '.gs-c-promo-heading',
    domTitle: '.gs-c-promo-heading__title',
    domContentText: '.story-body__inner > p',
    url: 'https://www.bbc.co.uk/news'
  }
]

const routing = (req: http.IncomingMessage, res: http.ServerResponse): void => {
  sourceObject.map((item) => {
    if (req.url !== item.route) { return }

    const options = {
      host: CORS_HOST,
      path: `/${item.url}`,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }

    http.get(options, (response: http.IncomingMessage) => {
      response.setEncoding('utf8')

      let body = ''
      response.on('data', (chunk: string) => {
        body += chunk
      })
      response.on('end', async () => {
        const fetchResult = await domParser(
          body,
          item.domHeading,
          item.domTitle,
          item.domContentText
        )
        res.end(JSON.stringify(fetchResult))
      })
    }).on('error', (e) => {
      console.log(`Error: ${e.message}`)
    })
  })
}

export default routing