import React, { useEffect, useState, useRef } from 'react'
import { render } from 'react-dom'
import { scraperTest } from './WebScraper'
import { truncateString } from './utils'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState([])
  const [articlesCache, setArticlesCache] = useState([])
  const [blockedCounter, setBlockedCounter] = useState(0)
  const filterInput = useRef()

  useEffect(() => {
    scrapeAndCompile()
  }, [])

  const scrapeAndCompile = async () => {
    setLoading(true)
    const scrapeResults = await scraperTest()
    const results = JSON.parse(scrapeResults)
    setArticlesCache(results)
    setArticles(results)
    setLoading(false)
  }

  const filterResults = (string: string) => {
    const filteredArticles = articlesCache.filter((item) => {
      return !item.title.toLowerCase().includes(string) && !item.content.toLowerCase().includes(string)
    })
    setBlockedCounter(articlesCache.length - filteredArticles.length)
    setArticles(filteredArticles)
  }

  const handleInput = () => {
    const input = filterInput.current.value
    if (input === '') {
      setArticles(articlesCache)
      setBlockedCounter(0)
      return
    }
    filterResults(input)
  }

  return (
    <div>
      <h1>Ts-Scraper</h1>
      <h3>Filter <strong>out</strong> news based on search term</h3>
      <p>Blocking: {blockedCounter}</p>
      <input ref={filterInput} onInput={handleInput} placeholder="Filter" />
      {loading ? 'LOADING' : (
        <>
          {articles.map((item, index) => {
            return (
              <div className="block" key={index}>
                <p><a href={`https://www.bbc.co.uk${item.url}`}>{item.title}</a></p>
                <p>{item.content ? truncateString(item.content, 120) : 'No preview text'}</p>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

render(
  <App />,
  document.getElementById('app')
)
