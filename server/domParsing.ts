import { JSDOM } from 'jsdom'
import * as http from 'http'
import { removeRawUrlFromFullUrl } from './utils'
import { sourceObject } from './sourceObject'
import DataStructure from './interfaceDataStructure'
import {
  CORS_HOST
} from './constants'

/**
 * Still need to determine better way to do this with TS, current used to return
 * object which aligns with DataStructure interface - used to create empty
 * results to be filtered out, without breaking map
 */
const emptyNulls = {
  rawUrl: null,
  title: null,
  url: null,
  content: null,
  source: null
}

/**
 * Scrapes each link given and runs JSOM on results to querySelectorAll over
 * relevant HTML elements to produce content
 * @param link - main article link for scraping
 * @param content - selector: main article content select "... > p"
 * @param rawUrl - base URL for properly formatted scraping
 */
function domContentPromise(link: string, content: string, rawUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    const options = {
      host: CORS_HOST,
      path: `/${rawUrl}${removeRawUrlFromFullUrl(rawUrl, link)}`,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }

    http.get(options, (response: http.IncomingMessage) => {
      response.setEncoding('utf8')
      let body = ''
      let domContentString = ''
      response.on('data', (chunk: string) => {
        body += chunk
      })
      response.on('end', () => {
        const dom = new JSDOM(body)
        const domResponse = dom.window.document.querySelectorAll(content)
        domResponse.forEach((item: HTMLParagraphElement) => {
          domContentString += item.textContent
        })
        resolve(domContentString)
      })
    })
  })
}

/**
 * Runs JSDOM on scrape results to produce querySelector-able HTML elements,
 * runs async map on each link item, then runs domContentPromise scrape on each
 * to collect actual page content
 * @param body - initial landing page scrape HTML
 * @param link - selector: all main article links on site
 * @param title - selector: item object nested inside link
 * @param content - selector: main article content
 * @param rawUrl - base URL for request site
 */
export default async function domParser(
  body: string,
  link: string,
  title: string | null,
  content: string,
  rawUrl: string
): Promise<DataStructure[]> {
  const dom = new JSDOM(body)
  const response = dom.window.document.querySelectorAll(link)
  const hrefStore: string[] = []

  /**
   * Running async map to await scrape results for each link
   */
  const data = await Promise.all(Object.keys(response).map((key) => {
    return new Promise<DataStructure>((resolve) => {
      if (!response[key].href || typeof response[key].href === 'undefined' || hrefStore.find((item) => item === response[key].href)) {
        resolve(emptyNulls)
        return
      }
      hrefStore.push(response[key].href)

      /**
       * Runs domContentPromise on each main article URL to return full data
       */
      domContentPromise(response[key].href, content, rawUrl)
        .then((res) => {
          console.log(res?.slice(0, 20))
          resolve({
            rawUrl,
            title: title === null ? response[key].textContent : response[key].querySelector(title).textContent,
            url: removeRawUrlFromFullUrl(rawUrl, response[key].href),
            content: res,
            source: sourceObject.find(item => item.rawUrl === rawUrl).route
          })
        })
        .catch(() => {
          resolve(emptyNulls)
        })
    })
  }))

  /**
   * Filters empty response objects set by emptyNulls
   */
  const result = data.filter(item => item.title !== null)

  return result
}