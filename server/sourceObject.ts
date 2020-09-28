/**
 * @property {string} route - API route slug
 * @property {string} domHeading - selector: scrape page main link selector
 * @property {string | null} domTitle - selector: main article HTML containers/structure
 * @property {string} scrapeUrl - full URL to be scraped on load
 * @property {string} rawUrl - base URL for scrape request
 */
export const sourceObject = [
  {
    route: '/bbc',
    domHeading: '.gs-c-promo-heading',
    domTitle: '.gs-c-promo-heading__title',
    domContentText: '.story-body__inner p',
    scrapeUrl: 'https://www.bbc.co.uk/news',
    rawUrl: 'https://www.bbc.co.uk'
  },
  {
    route: '/guardian',
    domHeading: '.js-headline-text',
    domTitle: null,
    domContentText: '.content__article-body p',
    scrapeUrl: 'https://www.theguardian.com/theguardian/mainsection/uknews',
    rawUrl: 'https://www.theguardian.com'
  }
]
