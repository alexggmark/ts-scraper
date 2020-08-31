import { JSDOM } from 'jsdom'

interface DataStructure {
  title: string,
  url: string
}

export default function domParser(body: string): DataStructure[] {
  const dom = new JSDOM(body)
  const response = dom.window.document.querySelectorAll('.gs-c-promo-heading')
  const data = Object.keys(response).map((key) => {
    return {
      title: response[key].querySelector('.gs-c-promo-heading__title').textContent,
      url: response[key].href
    }
  })
  return data
}