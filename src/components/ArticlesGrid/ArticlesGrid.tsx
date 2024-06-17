import { useEffect, useRef } from "react"
import ArticlesGridStyle from "./ArticlesGrid.module.css"
import ArticleCard from "../ArticleCard/ArticleCard"
import { useArticlesStore } from "../../stores/articles"
import ArticleCardLoading from "../ArticleCard/ArticleCardLoading"


const ArticlesGrid = ({ query }: { query:string }) => {
  const { articles, articlesInFileTray, hasMore, loading, getArticles } = useArticlesStore(state => ({
    articles: state.articles,
    articlesInFileTray: state.articlesInFileTray,
    hasMore: state.hasMore,
    loading: state.loading,
    getArticles: state.getArticles,
  }))

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (loading || !hasMore) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        getArticles(query)
      }
    })

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [loading, hasMore, getArticles])

  
  return (
    <>
      <section className={ArticlesGridStyle.articles}>
        {articles.map((article, index) => {
          const isSaved = articlesInFileTray.some(
            (articleSaved) => article.title === articleSaved.title
          )

          if(query !== "" || (query === "" && index !== 0)) {           
            return (
              <ArticleCard
                key={article.title || index}
                article={article}
                saved={isSaved}
              />
            )            
          }                    

        })}

        {
          loading
            ? Array(10).fill(0).map((_,i) => <ArticleCardLoading key={"ArticleCardLoading_"+i} />)
            : <></>
        }
      {hasMore && (
        <div ref={loadMoreRef} className={ArticlesGridStyle.loadMore}>
          {
            loading
              ? 'Loading... more articles'
              : 'Load more articles'
          }
        </div>
      )}
      </section>

    </>
  )

}

export default ArticlesGrid
