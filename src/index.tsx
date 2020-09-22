import React, { useEffect, useState, useRef } from 'react'
import { render } from 'react-dom'
import { scraperTest } from './WebScraper'
import { truncateString } from './utils'
import './index.css'
import './tailwind.output.css'
// import * as loader from './loader.gif'
const loader = require('./loader.gif')

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
  const [counter, setCounter] = useState(0)
  const [articles, setArticles] = useState([])
  const [articlesCache, setArticlesCache] = useState([])
  const [blockedCounter, setBlockedCounter] = useState(0)
  const filterInput = useRef()

  useEffect(() => {
    scrapeAndCompile()
  }, [])

  const scrapeAndCompile = async () => {
    setLoading(true)
    let counterCache = 0
    setInterval(() => {
      counterCache++
      setCounter(counterCache)
    }, 1000)
    const scrapeResults = await scraperTest()
    const results = JSON.parse(scrapeResults)
    setArticlesCache(results)
    setArticles(results)
    setCounter(0)
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
        <h1
          className="
            text-white
            text-3xl
            text-right
            font-serif
            font-thin
          "
        >
          NewsWithout.
        </h1>
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
            sm:flex-column
            md:flex-row
            items-center
            py-3
            mb-6
          "
        >
          {loading ? (
            <div className="w-full flex justify-center">
              <img className="w-16" src={loader.default} />
            </div>
          ) : (
            <>
              <div className="w-1/2 md:w-full pr-2">
                <input
                  className="
                    border
                    border-gray-300
                    w-full
                    rounded-full
                    outline-none
                    px-4
                    py-2
                  "
                  ref={filterInput}
                  onInput={handleInput}
                  placeholder="Enter filter term"
                />
              </div>
              <div className="w-1/2 md:w-full">
                <div
                  className="
                    rounded-sm
                    bg-gray-100
                    px-3
                    py-2
                  "
                >
                  <h3>Filter <strong>out</strong> news based on search term</h3>
                  <p>Blocking: {blockedCounter}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      {loading ? (
        <div className="w-full text-center px-3">
          <p className="text-lg text-red-500">Scraping news sites and building list {counter}s</p>
          <p className="text-xs text-gray-500">This can take up to 30 seconds</p>
        </div>
      ) : (
        <>
          {articles.map((item, index) => {
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
                  <p className="text-sm text-gray-400">{item.content ? `${truncateString(item.content, 200)}...` : 'No preview text'}</p>
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
