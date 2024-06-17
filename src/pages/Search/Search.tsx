import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import ArticlesGrid from '../../components/ArticlesGrid/ArticlesGrid'
import Button from '../../components/Button/Button'
import { useArticlesStore } from '../../stores/articles'


function Search() {
  const [articles, loading, getArticles, resetArticles] = useArticlesStore((state) => [
    state.articles,
    state.loading,
    state.getArticles,
    state.resetArticles,
  ])
  const { query } = useParams()

  useEffect(() => {
    if (query) {
      resetArticles()
      getArticles(query)
    }
  }, [query, resetArticles, getArticles])


  if(loading) return(<>
    <Nav search={true} />

    <main>
    <header className='container-row --ai-center'>
      <Button type="button" typeStyle="tertiary-icon"><IoChevronBack /></Button>
      <p className='text-lg'>Search: {query}</p>
    </header>

      <ArticlesGrid query={query || ""} />
    </main>
  </>)
  
  if(articles.length <= 0 && !loading) return(<>
    <Nav search={true} />

    <main style={{textAlign: 'center'}}>
    <header className='container-row --ai-center'>
      <Link to="/"><Button type="button" typeStyle="tertiary-icon"><IoChevronBack /></Button></Link>
      <p className='text-lg'>Search: {query}</p>
    </header>

      <p className='text-2xl'>No articles found :(</p>
    
    </main>

    <Footer topButton={false} />
  </>)


  return (<>
    <Nav search={true} />

    <main>
      <header className='container-row --ai-center'>
        <Link to="/"><Button type="button" typeStyle="tertiary-icon"><IoChevronBack /></Button></Link>
        <p className='text-lg'>Search: {query}</p>
      </header>

      <ArticlesGrid query={query || ""}/>
    </main>

    <Footer topButton={true} />
  </>)
}

export default Search
