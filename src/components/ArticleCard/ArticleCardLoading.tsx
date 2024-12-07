import classNames from "../../utils/classNames"
import "./ArticleCard.css"

interface ArticleCardProps {
  type?: "main" | "filetray"
}

const titlePlaceholder =
  "Lorem ipsum dolor sit amet consectet isicing elit vitae except uri."
const textPlaceholder =
  "Lorem ipsum dolor sit amet consectet isicing elit. Vitae excepturi, veniam impedit corporis atque, numquam voluptatum inventore ullam sequi."

function ArticleCardLoading({ type }: ArticleCardProps) {
  const generatePlaceholder = (placeholder: string, type: "title" | "text") => {
    const placeholderLength = placeholder.split(" ")

    return placeholderLength.map((word, i) => {
      const stylesWord = type === "title" ? { width: `${word.length}ch` } : {}
      const wordContent = type !== "title" ? word : ""

      return (
        <span key={`${type}-${i}`}>
          <span className="word-loading" style={stylesWord}>
            {wordContent}
          </span>
        </span>
      )
    })
  }

  const generatePlaceholderTitle = () => {
    return generatePlaceholder(titlePlaceholder, "title")
  }

  const generatePlaceholderText = () => {
    return generatePlaceholder(textPlaceholder, "text")
  }

  return (
    <article
      className={classNames("card", "card-loading", type && `card--${type}`)}>
      <header className="card-header">
        <div className="card-image"></div>
      </header>

      <main className="card-body">
        <h1 className="card-title">{generatePlaceholderTitle()}</h1>
        <p className="card-text">{generatePlaceholderText()}</p>

        <div className="card-footer">
          <p>
            <span className="word-loading">by author</span>
          </p>
          <p>
            <span className="word-loading">date time</span>
          </p>
        </div>
      </main>
    </article>
  )
}

export default ArticleCardLoading
