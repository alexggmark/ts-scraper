import { JSDOM } from 'jsdom'
import * as http from 'http'
import { removeRawUrlFromFullUrl } from './utils'
import { sourceObject } from './sourceObject'
import {
  CORS_HOST
} from './constants'

interface DataStructure {
  rawUrl: string | null,
  title: string | null,
  url: string | null,
  content: string | null,
  source: string | null
}

const emptyNulls = {
  rawUrl: null,
  title: null,
  url: null,
  content: null,
  source: null
}

function domContentPromise(link: string, content: string, rawUrl: string): Promise<string | null> {
  console.log(`CORS_HOST: ${CORS_HOST}`)
  console.log(`rawUrl: ${rawUrl}`)
  console.log(`link: ${link}`)
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

  const data = await Promise.all(Object.keys(response).map((key) => {
    return new Promise<DataStructure>((resolve) => {
      if (!response[key].href || typeof response[key].href === 'undefined' || hrefStore.find((item) => item === response[key].href)) {
        resolve(emptyNulls)
        return
      }
      hrefStore.push(response[key].href)
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

  const result = data.filter(item => item.title !== null)

  return result
}