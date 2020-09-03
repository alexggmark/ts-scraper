import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { scraperTest } from './WebScraper'

const App = () => {
  useEffect(() => {
    scraperTest()
  }, [])

  return (
    <h1>TESTING</h1>
  )
}

render(
  <App />,
  document.getElementById('app')
)
