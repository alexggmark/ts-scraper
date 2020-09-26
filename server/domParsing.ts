import { JSDOM } from 'jsdom'
import * as http from 'http'
import {
  CORS_HOST
} from './constants'

interface DataStructure {
  title: string | null,
  url: string | null,
  content: string | null
}

const emptyNulls = {
  title: null,
  url: null,
  content: null
}

function domContentPromise(link: string, content: string): Promise<string | null> {
  return new Promise((resolve) => {
    const options = {
      host: CORS_HOST,
      path: `/https://www.bbc.co.uk${link}`,
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

export default async function domParser(body: string, link: string, title: string, content: string): Promise<DataStructure[]> {
  const dom = new JSDOM(body)
  const response = dom.window.document.querySelectorAll(link)
  const hrefStore: string[] = []

  const data = await Promise.all(Object.keys(response).map((key) => {
    return new Promise<DataStructure>((resolve) => {
      if (!response[key].href || hrefStore.find((item) => item === response[key].href)) {
        resolve(emptyNulls)
      }
      hrefStore.push(response[key].href)
      domContentPromise(response[key].href, content)
        .then((res) => {
          console.log(res?.slice(0, 20))
          resolve({
            title: response[key].querySelector(title).textContent,
            url: response[key].href,
            content: res
          })
        })
    })
  }))

  console.log('Finished?')
  console.log('Finished?')
  console.log('Finished?')
  console.log('Finished?')
  console.log('Finished?')
  console.log('Finished?')

  const result = data.filter(item => item.title !== null)

  return result
}