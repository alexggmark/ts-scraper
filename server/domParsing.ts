import { JSDOM } from 'jsdom'

interface DataStructure {
  title: string,
  url: string
}

export default function domParser(body: string, link: string, title: string): DataStructure[] {
  const dom = new JSDOM(body)
  const response = dom.window.document.querySelectorAll(link)
  const data = Object.keys(response).map((key) => {
    return {
      title: response[key].querySelector(title).textContent,
      url: response[key].href
    }
  })
  return data
}