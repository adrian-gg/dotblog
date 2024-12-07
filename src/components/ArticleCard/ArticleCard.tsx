import { IoAdd, IoRemove } from "react-icons/io5"
import useArticlesStore from "../../stores/articles"
import type { ArticleMappedType } from "../../type"
import classNames from "../../utils/classNames"
import humanice from "../../utils/humanice"
import Button from "../Button/Button"
import Image from "../Image/Image"
import "./ArticleCard.css"

interface ArticleCardProps {
  type?: "main" | "filetray"
  data: ArticleMappedType
}
function ArticleCard({ type, data }: ArticleCardProps) {
  const { saveArticleToRead, removeArticleFromFileTray } = useArticlesStore()
  const { title, description, author, publishedAt, urlToImage, url, saved } =
    data
  const dateHumaniced = humanice(publishedAt)

  const handleClickAddToFileTray = () => {
    saveArticleToRead(data)
  }

  const handleClickRemoveFromFileTray = () => {
    removeArticleFromFileTray(data)
  }

  return (
    <article className={classNames("card", type && `card--${type}`)}>
      <header className="card-header">
        {!saved && (
          <Button
            type="button"
            variant="secondary"
            action={handleClickAddToFileTray}>
            <IoAdd />
          </Button>
        )}

        <div className="card-image">
          <a href={url} target="_blank">
            <Image src={urlToImage} alt={title} />
          </a>
        </div>
      </header>

      <main className="card-body">
        <a href={url} target="_blank">
          <h1 className="card-title">{title}</h1>
          <p className="card-text">{description}</p>

          <div className="card-footer">
            <p>{author ? `by ${author}` : "by unknown"}</p>
            <p>
              <time dateTime={publishedAt}>{dateHumaniced}</time>
            </p>
          </div>
        </a>
      </main>

      {type === "filetray" && (
        <div className="card-sidebar">
          <Button
            type="button"
            variant="outline-primary"
            action={handleClickRemoveFromFileTray}>
            <IoRemove />
          </Button>
        </div>
      )}
    </article>
  )
}

export default ArticleCard
