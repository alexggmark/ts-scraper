import React, { useEffect, useState, useRef } from 'react'
import { render } from 'react-dom'
import { scraperTest } from './WebScraper'
import { truncateString } from './utils'
import './tailwind.output.css'

const blankObject = [
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' },
  { url: 'sdfds', title: 'dsfsdf', content: 'sdfdsfsdf sdfdsfds' }
]

const App = () => {
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState([])
  const [articlesCache, setArticlesCache] = useState([])
  const [blockedCounter, setBlockedCounter] = useState(0)
  const filterInput = useRef()

  // useEffect(() => {
  //   scrapeAndCompile()
  // }, [])

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
    <div className="bg-gray-100">
      <header
        className="
          max-w-100
          bg-gray-900
          p-6
        "
      >
        <h1 className="text-white text-2xl">Ts-Scraper</h1>
      </header>
      <section
        className="
          bg-white
          shadow-sm
          max-w-100
        "
      >
        <div
          className="
            max-w-3xl
            mx-auto
            flex
            flex-row
            items-center
            py-3
            mb-6
          "
        >
          {loading ? (
            <div className="w-full text-center">
              'LOADING'
            </div>
          ) : (
            <>
              <div className="w-1/2">
                <h3>Filter <strong>out</strong> news based on search term</h3>
                <p>Blocking: {blockedCounter}</p>
              </div>
              <div className="w-1/2">
                <input
                  className="
                    border
                    border-black
                    border-dotted
                    w-full
                    rounded-full
                    outline-none
                    px-4
                    py-2
                  "
                  ref={filterInput}
                  onInput={handleInput}
                  placeholder="Enter filter term!"
                />
              </div>
            </>
          )}
        </div>
      </section>
      {loading ? (
        <>
          'LOADING'
        </>
      ) : (
        <>
          {blankObject.map((item, index) => {
            return (
              <div
                className="
                  transition
                  duration-100
                  ease-in-out
                  max-w-3xl
                  mx-auto
                  my-2
                  px-4
                  py-3
                  bg-white
                  rounded-sm
                  shadow-sm
                  transform
                  hover:bg-red-500
                  hover:text-white
                  hover:translate-x-1
                "
                key={index}
              >
                <a href={`https://www.bbc.co.uk${item.url}`}>
                  <p className="text-lg">{item.title}</p>
                  <p className="text-sm text-gray-400">{item.content ? truncateString(item.content, 120) : 'No preview text'}</p>
                </a>
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
