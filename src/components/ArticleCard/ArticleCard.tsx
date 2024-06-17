import { IoAdd } from 'react-icons/io5'
import { useEffect, useRef } from 'react'
import ArticleCardStyle from "./ArticleCard.module.css"
import Button from '../Button/Button'
import humanice from "../../utils/humanice"
import { useArticlesStore } from '../../stores/articles'
import { type ArticleType } from '../../type.d'


interface Props {
  article: ArticleType;
  saved?: boolean;
}
const ArticleCard = ({ article, saved }: Props) => {
  const saveArticleToRead = useArticlesStore((state) => state.saveArticleToRead)
  const {
    author,
    title,
    url,
    urlToImage,
    publishedAt,
    content,
  } = article

  const handleClick = () => {  
    saveArticleToRead(article)
  }

  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = imgRef.current
    const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (img && img.dataset.src) {
            img.src = img.dataset.src
          }
          observer.disconnect()
        }
      })
    })

    if (img) {
      observer.observe(img)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  
  return(    
    <article className={ArticleCardStyle.card}>
      <div className={ArticleCardStyle.img_box}>

        {
          !saved
          ? <div className={`${ArticleCardStyle.save} text-lg`} onClick={handleClick}>
              <Button type="button" typeStyle="primary-icon"><IoAdd /></Button>
            </div>
          : <></>
        }

        <a href={url} target="_blank">
          { urlToImage
            ? <img 
                className={ArticleCardStyle.img} 
                data-src={urlToImage} 
                width="538" 
                height="334" 
                alt={title} 
                ref={imgRef}
              />
            : <></>
          }
        </a>
      </div>
      
      <a href={url} target="_blank">
        <div className="container-col">
          <h1 className="text-2xl">{title}</h1>

          <p className={`${ArticleCardStyle.parraf} text-sm`}>{content}</p>

          <div className={`${ArticleCardStyle.more_data} container-row`}>
            <p className="text-sm">{`by ${author ?? 'unknown'}`}</p>
            <time className={`${ArticleCardStyle.date} text-xs`} dateTime={publishedAt} >{ humanice(publishedAt) }</time>
          </div>
        </div>
      </a>
    </article>
  )
  
}

export default ArticleCard
