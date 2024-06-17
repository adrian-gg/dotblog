import { IoRemove } from "react-icons/io5"
import ArticleCardMinStyle from "./ArticleCardMin.module.css"
import Button from "../Button/Button"
import humanice from "../../utils/humanice"
import { useArticlesStore } from "../../stores/articles"
import { type ArticleType } from '../../type.d'


interface Props {
  article: ArticleType,
}
const ArticleCardMin = ({ article }: Props) => {
  const removeArticleToRead = useArticlesStore((state) => state.removeArticleToRead)
  const {
    author,
    title,
    url,
    urlToImage,
    publishedAt,
  } = article

  
  return(<>
    <div className={ArticleCardMinStyle.container}>
      <a href={url} target="_blank">
        <article className={ArticleCardMinStyle.card}>
          <div className={ArticleCardMinStyle.img_box}>          
              { urlToImage
                ? <img className={ArticleCardMinStyle.img} src={urlToImage} width="538" height="334" alt={title}/>
                : <></>
              }
          </div>

          <div className="container-col">
            <h1 className="text-md">{title}</h1>

            <div className={`${ArticleCardMinStyle.more_data} container-row`}>
              <p className={`${ArticleCardMinStyle.author} text-sm`}>{`by ${author ?? 'unknown'}`}</p>
              <time className={`${ArticleCardMinStyle.date} text-xs`} dateTime={publishedAt} >{ humanice(publishedAt) }</time>
            </div>
          </div>
        </article>
      </a>
      <span onClick={() => removeArticleToRead(title)}>
        <Button type="button" typeStyle="secondary-icon"><IoRemove /></Button>
      </span>
    </div>
  </> )
  
}

export default ArticleCardMin
