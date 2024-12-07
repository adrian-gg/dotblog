import useArticlesStore from "../../stores/articles"
import { ArticleMappedType } from "../../type"
import classNames from "../../utils/classNames"
import ArticleCard from "../ArticleCard/ArticleCard"
import ArticleCardLoading from "../ArticleCard/ArticleCardLoading"
import "./ArticleCardsGrid.css"

interface ArticleCardsGridProps {
  data: ArticleMappedType[]
  type?: "main" | "filetray"
  loaderRef?: React.RefObject<HTMLDivElement>
}
function ArticleCardsGrid({ data, type, loaderRef }: ArticleCardsGridProps) {
  const { hasMore } = useArticlesStore()

  if (data.length === 0) {
    return (
      <div className={classNames("cards", type && `cards--${type}`)}>
        {new Array(7).fill(0).map((_, index) => {
          const typeCard =
            type !== "main" ? type : index === 0 ? type : undefined

          return <ArticleCardLoading key={index} type={typeCard} />
        })}
      </div>
    )
  }

  return (
    <div className={classNames("cards", type && `cards--${type}`)}>
      {data.map((article, index) => {
        const typeCard = type !== "main" ? type : index === 0 ? type : undefined

        return (
          <ArticleCard
            key={article.publishedAt + article.url}
            data={article}
            type={typeCard}
          />
        )
      })}

      {hasMore && type !== "filetray" && (
        <>
          {new Array(7).fill(0).map((_, index) =>
            index === 0 ? (
              <div ref={loaderRef} key={index}>
                <ArticleCardLoading />
              </div>
            ) : (
              <ArticleCardLoading key={index} />
            )
          )}
        </>
      )}
    </div>
  )
}

export default ArticleCardsGrid
