import { JSDOM } from 'jsdom'

interface DataStructure {
  title: string | null,
  url: string | null
}

export default function domParser(body: string, link: string, title: string): DataStructure[] {
  const dom = new JSDOM(body)
  const response = dom.window.document.querySelectorAll(link)
  const hrefStore: string[] = []
  const data = Object.keys(response).map((key) => {
    if (hrefStore.find((item) => item === response[key].href)) {
      return {
        title: null,
        url: null
      }
    }
    hrefStore.push(response[key].href)
    return {
      title: response[key].querySelector(title).textContent,
      url: response[key].href
    }
  }).filter(item => item.title !== null && item.title !== '')

  return data
}