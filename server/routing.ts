import * as http from 'http'
import domParser from './domParsing'
import { sourceObject } from './sourceObject'
import {
  CORS_HOST
} from './constants'

const routing = (req: http.IncomingMessage, res: http.ServerResponse): void => {
  sourceObject.map((item) => {

    /**
     * Skip step if request URL doesn't match route
     */
    if (req.url !== item.route) { return }

    const options = {
      host: CORS_HOST,
      path: `/${item.scrapeUrl}`,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }

    /**
     * Make http.get request to cors-anywhere/scraperURL address, chunk results
     * and send to domParser for further scraping/compiling
     */
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
          item.domContentText,
          item.rawUrl
        )
        res.end(JSON.stringify(fetchResult))
      })
    }).on('error', (e) => {
      console.log(`Error: ${e.message}`)
    })
  })
}

export default routing