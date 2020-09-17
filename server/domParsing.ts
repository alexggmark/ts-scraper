import { JSDOM } from 'jsdom'
import * as http from 'http'
import {
  CORS_URL
} from './constants'

interface DataStructure {
  title: string | null,
  url: string | null,
  content: string | null
}

function domContentPromise(link: string, content: string): Promise<string | null> {
  console.log(`ContentPromise: Link: ${link}`)
  return new Promise((resolve, reject) => {
    http.get(`${CORS_URL}/${link}`, (response: http.IncomingMessage) => {
      // console.log(`Connected: ${CORS_URL}/${link}`)
      response.setEncoding('utf8')
      let body: string
      let domContentString: string
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
    }).on('error', (e) => {
      reject(e.message)
    })
  })
}

export default async function domParser(body: string, link: string, title: string, content: string): Promise<DataStructure[]> {
  const dom = new JSDOM(body)
  const response = dom.window.document.querySelectorAll(link)
  const hrefStore: string[] = []

  const data = await Promise.all(Object.keys(response).map(async (key) => {
    if (hrefStore.find((item) => item === response[key].href)) {
      return {
        title: null,
        url: null,
        content: null
      }
    }
    hrefStore.push(response[key].href)
    // myPromise = await domContentPromise(response[key].href, content)
    return {
      title: response[key].querySelector(title).textContent,
      url: response[key].href,
      content: await domContentPromise(response[key].href, content)
    }
  }))

  console.log(data)
  return data
}