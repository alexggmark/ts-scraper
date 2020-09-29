import React, { useEffect, useState } from 'react'

const LoadingCounter = () => {
  const [counter, setCounter] = useState(0)

  const counterTimer = () => {
    let counterCache = 0
    setInterval(() => {
      counterCache++
      setCounter(counterCache)
    }, 1000)
  }

  useEffect(() => {
    counterTimer()
  }, [])

  return (
    <div className="loading-trans__text">
      <p>Scraping BBC News and The Guardian {counter}s</p>
      <p className="loading-trans__text-small">This can take up to 60s</p>
    </div>
  )
}

export default LoadingCounter