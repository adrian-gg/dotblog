import { useEffect } from "react"
import Nav from "../../components/Nav/Nav"
import ArticleCard from "../../components/ArticleCard/ArticleCard"
import Footer from "../../components/Footer/Footer"
import ArticlesGrid from "../../components/ArticlesGrid/ArticlesGrid"
import ArticleCardLoading from "../../components/ArticleCard/ArticleCardLoading"
import { useArticlesStore } from "../../stores/articles"


function Home() {
  const [
    articles,
    articlesInFileTray,
    loading,
    getArticles,
    resetArticles
  ] = useArticlesStore((state) => [
    state.articles,
    state.articlesInFileTray,
    state.loading,
    state.getArticles,
    state.resetArticles
  ])

  useEffect(() => {
    resetArticles()
    getArticles("")
  }, [resetArticles, getArticles])
  

  if(loading) return(<>
    <Nav search={true}/>

    <main>
      <header>
        <ArticleCardLoading />
      </header>

      <ArticlesGrid query={""} />
    </main>

    <Footer topButton={true}/>
  </>)

  if(articles.length === 0 && !loading) return(<>
    <Nav search={false}/>

    <main style={{textAlign: 'center'}}>
      <p className='text-2xl'>No articles found :(</p>
      <p className='text-lg' style={{marginBottom: '4rem'}}>Reload the page to try again.</p>
    </main>

    <Footer topButton={false}/>
  </>)

  const isSaved = articlesInFileTray.some(
    (articleSaved) => articles[0].title === articleSaved.title
  )

  
  return (<>
    <Nav search={true}/>

    <main>
      <header>
        <ArticleCard key={articles[0].title || "0"}
          article={articles[0]}
          saved={isSaved}
        />
      </header>

      <ArticlesGrid query={""} />
    </main>

    <Footer topButton={true}/>
  </>)
}

export default Home
