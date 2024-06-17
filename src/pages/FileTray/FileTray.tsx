import { IoClose } from 'react-icons/io5'
import FileTrayStyle from './FileTray.module.css'
import ArticleCardMin from '../../components/ArticleCardMin/ArticleCardMin'
import { useArticlesStore } from '../../stores/articles'


function FileTray() {
  const [
    articlesInFileTray,
    setFileTrayOpened
  ] = useArticlesStore((state) => [
    state.articlesInFileTray,
    state.setFileTrayOpened
  ])

  if(articlesInFileTray.length === 0) return(
    <section id={FileTrayStyle.FileTray}>
      <div className={FileTrayStyle.container}>
        
        <nav className={FileTrayStyle.nav}>
          <span className={FileTrayStyle.icon} onClick={() => setFileTrayOpened()}><IoClose /></span>
        </nav>
        
        <div className={FileTrayStyle.content}>
          <span className='text-2xl' style={{textAlign: 'center'}}>File tray empty</span>
        </div>

      </div>
    </section>
  )


  return (<>
    <section id={FileTrayStyle.FileTray}>
      <div className={FileTrayStyle.container}>
        
        <nav className={FileTrayStyle.nav}>
          <span className={FileTrayStyle.icon} onClick={() => setFileTrayOpened()}><IoClose /></span>
        </nav>
        
        <div className={FileTrayStyle.content}>
          {articlesInFileTray.map((article, index) => {
          
            return (
              <ArticleCardMin key={index}
                article={article}
              />
            )
          
          })}
        </div>

      </div>
    </section>
  </>)
}
export default FileTray
