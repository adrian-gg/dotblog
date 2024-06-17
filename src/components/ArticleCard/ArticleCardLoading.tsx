import ArticleCardStyle from "./ArticleCard.module.css"


const ArticleCardLoading = () => {
  const textTitlePlaceholder = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae excepturi, veniam impedit corporis atque, numquam voluptatum inventore ullam sequi."
  .split(" ")


  return(    
    <article className={ArticleCardStyle.card}>
      <div className={ArticleCardStyle.img_box}>
        <div className={ArticleCardStyle.img}></div>        
      </div>
      
      <div className="container-col">
        <h1 className={`${ArticleCardStyle.text_loading} text-2xl`}>
          {
            textTitlePlaceholder.map((word, i) => {
              if(i < 10) return(
                <span key={i+"a"}><span className="word_loading">{word}</span><span> </span></span>
              )
            })
          }
        </h1>

        <p className={`${ArticleCardStyle.parraf} ${ArticleCardStyle.text_loading} text-sm`}>
          {
            textTitlePlaceholder.map((word, i) => {
              return(
                <span key={i+"b"}><span className="word_loading">{word}</span><span> </span></span>
              )
            })
          }
        </p>

        <div className={`${ArticleCardStyle.more_data} container-row`}>
          <p className={`${ArticleCardStyle.author} ${ArticleCardStyle.text_loading} text-sm`}>
            <span>by unknown</span>
          </p>
          <time className={`${ArticleCardStyle.date} ${ArticleCardStyle.text_loading} text-xs`}>
            <span>unknown</span>
          </time>
        </div>                
      </div>
    </article>
  )
  
}

export default ArticleCardLoading
