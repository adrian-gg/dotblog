//import SearchStyle from './Search.module.css'
import { useEffect, useRef } from "react"
import { IoChevronBack } from "react-icons/io5"
import { Link, useParams } from "react-router-dom"
import ArticleCardsGrid from "../../components/ArticleCardsGrid/ArticleCardsGrid"
import Button from "../../components/Button/Button"
import useArticlesStore from "../../stores/articles"
import "./Search.css"

function Search() {
  const { query } = useParams()
  const { articles, hasMore, isLoading, hasError, getArticles, resetArticles } =
    useArticlesStore()
  const loaderRef = useRef(null)

  useEffect(() => {
    resetArticles()
    getArticles(query || "")
    window.scrollTo(0, 0)
  }, [query, getArticles, resetArticles])

  useEffect(() => {
    const currentLoader = loaderRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !hasError) {
          getArticles(query || "")
        }
      },
      { threshold: 1.0 }
    )

    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [loaderRef, hasMore, isLoading, hasError, query, getArticles])

  return (
    <main id="search">
      <div className="navigation">
        <Link to="/">
          <Button type="button" variant="secondary">
            <IoChevronBack />
          </Button>
        </Link>
        <p>Search: {query}</p>
      </div>

      {articles.length > 0 ? (
        <ArticleCardsGrid data={articles} loaderRef={loaderRef} />
      ) : (
        <p className="empty">Articles not found :(</p>
      )}
    </main>
  )
}

export default Search
