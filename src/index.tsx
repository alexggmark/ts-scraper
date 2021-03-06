import React, { useEffect, useState, useRef } from 'react'
import { render } from 'react-dom'
import { webScraper, truncateString } from './utils/index'
import LogoDisplay from './components/LogoDisplay'
import './style/index.scss'
import './tailwind.output.css'
import './style/transitions.scss'
import Loading from './components/Loading'
import { CSSTransition } from 'react-transition-group';

// CommonJS to allows image import more easily
const loader = require('./public/loader.gif')

const App = () => {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState([])
  const [articlesCache, setArticlesCache] = useState([])
  const [blockedCounter, setBlockedCounter] = useState(0)
  const filterInput = useRef<HTMLInputElement>(null)

  /**
   * Fetch API results on first load
   */
  useEffect(() => {
    scrapeAndCompile()
  }, [])

  /**
   * Set loading state, start counter, await API results and send to state
   */
  const scrapeAndCompile = async () => {
    setLoading(true)
    const scrapeResults = await webScraper()
    const results = JSON.parse(scrapeResults)
    console.log('Parsed results')
    console.log(results)
    setArticlesCache(results)
    setArticles(results)
    setLoading(false)
  }

  /**
   * Manually filter articles array
   * @param string - Input string from ref=filterInput
   */
  const filterResults = (string: string) => {
    const searchString = string.toLowerCase()
    const filteredArticles = articlesCache.filter((item) => {
      const itemTitle = item.title.toLowerCase()
      const itemContent = item.content.toLowerCase()
      return !itemTitle.includes(searchString) && !itemContent.includes(searchString)
    })
    setBlockedCounter(articlesCache.length - filteredArticles.length)
    setArticles(filteredArticles)
  }

  /**
   * Reset article state if no search input, filter results with value otherwise
   */
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
    <>
      <CSSTransition
        in={loading}
        appear={true}
        classNames="loading-trans"
        timeout={300}
        unmountOnExit
      >
        <Loading />
      </CSSTransition>
      <CSSTransition
        in={!loading}
        timeout={300}
        classNames="main-trans"
      >
        <div className="main-trans bg-gray-100">
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
                text-center
                font-serif
                font-thin
              "
            >
              NewsWith<span className="text-red-500">out.</span>
            </h1>
          </header>
          <section
            className={`
              max-w-100
              transition-colors
              duration-200
              bg-gray-600
            `}
          >
            <div
              className="
                max-w-3xl
                mx-auto
                flex
                flex-col-reverse
                md:flex-row
                items-center
                py-3
                px-2
                md:px-0
                mb-6
              "
            >
              <div className="w-full md:w-7/12 md:pr-2">
                <input
                  className="
                    border
                    border-white
                    bg-transparent
                    w-full
                    rounded-full
                    outline-none
                    px-4
                    py-2
                    text-white
                    placeholder-white
                  "
                  ref={filterInput}
                  onInput={handleInput}
                  placeholder="Enter filter term"
                />
              </div>
              <div className="w-full md:w-5/12 md:pl-2">
                <div
                  className="
                    rounded-sm
                    px-3
                    py-2
                    md:mb-0
                    mb-3
                    text-white
                  "
                >
                  <h3 className="text-sm">Filter out news based on search term</h3>
                  <p><span className="text-lg font-bold">Blocking: {blockedCounter} items</span></p>
                </div>
              </div>
            </div>
          </section>

          <div className="px-2">
            {articles.map((item, index) => {
              return (
                <div
                  className="
                    news-item-block
                    transition
                    duration-100
                    ease-in-out
                    max-w-3xl
                    mx-auto
                    my-2
                    bg-white
                    rounded-sm
                    shadow-sm
                    transform
                    hover:bg-red-500
                    hover:translate-x-1
                  "
                  key={index}
                >
                  <a
                    href={`${item.rawUrl}${item.url}`}
                  >
                    <div className="px-4 py-3">
                      <p className="text-lg">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.content ? `${truncateString(item.content, 200)}...` : 'No preview text'}</p>
                      <div className="w-full flex pt-4 justify-end align-middle h-8">
                        <LogoDisplay route={item.source} />
                      </div>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

render(
  <App />,
  document.getElementById('app')
)
