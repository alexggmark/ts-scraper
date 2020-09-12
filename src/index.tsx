import React, { useEffect, useState, useRef } from 'react'
import { render } from 'react-dom'
import { scraperTest } from './WebScraper'

const App = () => {
  const [articles, setArticles] = useState([])
  const [articlesCache, setArticlesCache] = useState([])
  const [blockedCounter, setBlockedCounter] = useState(0)
  const filterInput = useRef()

  useEffect(() => {
    scraperTest()
      .then((res) => {
        const results = JSON.parse(res)
        setArticlesCache(results)
        setArticles(results)
      })
  }, [])

  const filterResults = (string: string) => {
    const filteredArticles = articlesCache.filter((item) => {
      return !item.title.toLowerCase().includes(string)
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
      <h1>TEFSTING</h1>
      <p>Blocking: {blockedCounter}</p>
      <input ref={filterInput} onInput={handleInput} placeholder="Filter" />
      <p>{articles.map((item, index) => {
        return (
          <div className="block" key={index}>
            <p><a href={`https://www.bbc.co.uk${item.url}`}>{item.title}</a></p>
          </div>
        )
      })}</p>
    </div>
  )
}

render(
  <App />,
  document.getElementById('app')
)
