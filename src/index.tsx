import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { scraperTest } from './WebScraper'

const App = () => {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    scraperTest()
      .then((res) => {
        setArticles(JSON.parse(res))
      })
  }, [])

  return (
    <div>
      <h1>TEFSTING</h1>
      <p>{articles.map((item, index) => {
        return (
          <div className="block">
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
