import { useEffect, useRef } from "react"
import ArticleCardsGrid from "../../components/ArticleCardsGrid/ArticleCardsGrid"
import useArticlesStore from "../../stores/articles"
import "./Home.css"

function Home() {
  const { articles, getArticles, resetArticles, isLoading, hasMore, hasError } =
    useArticlesStore()
  const loaderRef = useRef(null)

  useEffect(() => {
    resetArticles()
    getArticles("")
  }, [getArticles, resetArticles])

  useEffect(() => {
    const currentLoader = loaderRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && !hasError) {
          getArticles("")
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
  }, [loaderRef, hasMore, isLoading, hasError, getArticles])

  return (
    <main id="home">
      <ArticleCardsGrid data={articles} type="main" loaderRef={loaderRef} />
    </main>
  )
}

export default Home
