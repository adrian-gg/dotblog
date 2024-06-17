import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type ArticleType } from '../type.d'


interface State {
  articles: ArticleType[];
  articlesInFileTray: ArticleType[];
  fileTrayOpened: boolean;
  loading: boolean;
  page: number;
  hasMore: boolean;
  getArticles: (query: string, reset?: boolean) => Promise<void>;
  saveArticleToRead: (article: ArticleType) => void;
  removeArticleToRead: (articleTitle: string) => void;
  resetArticles: () => void;
  setFileTrayOpened: () => void;
  setLoading: (loading: boolean) => void;
}

export const useArticlesStore = create<State>()(persist((setState, getState) => {
  return {
    articles: [],
    articlesInFileTray: [],
    fileTrayOpened: false,
    loading: true,
    page: 1,
    hasMore: false,
    
    getArticles: async (query, reset = false) => {
      const API_KEY = ""
      const state = getState()
      const page = reset ? 1 : state.page
      const URL = API_KEY === ""
        ? "https://adrian-gg.github.io/dotblog/dist/articles.json"
        : query === ""
          ? `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=10&apiKey=${API_KEY}`
          : `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=10&apiKey=${API_KEY}`

      setState({ loading: true })

      try {
        const response = await fetch(URL)
        if (!response.ok) {
          throw new Error('Error fetching articles')
        }
        const data = await response.json()
        const articlesMapped = mapArticles(data.articles)

        setState((state) => ({
          articles: reset ? articlesMapped : [...state.articles, ...articlesMapped],
          loading: false,
          page: state.page + 1,
          hasMore: data.articles.length > 0,
        }))
      } catch (error) {
        console.error('Failed to fetch articles:', error)
        setState({ loading: false, hasMore: false })
      }
    },
    saveArticleToRead: (article) => setState((state) => ({ articlesInFileTray: [...state.articlesInFileTray, article] })),
    removeArticleToRead: (articleTitle) => {
      const { articlesInFileTray } = getState()
      const newArticlesToRead = articlesInFileTray.filter((article) => article.title !== articleTitle)
      setState(() => ({ articlesInFileTray: newArticlesToRead }))
    },
    resetArticles: () => setState(() => ({ articles: [], page: 1, hasMore: true })),
    setFileTrayOpened: () =>  {
      const { fileTrayOpened } = getState()
      setState(() => ({ fileTrayOpened: !fileTrayOpened }))
    },
    setLoading: (loading) => setState(() => ({ loading })),
  }
}, {
  name: 'articlesInFileTray',
  partialize: (state) => ({ articlesInFileTray: state.articlesInFileTray }),
}))

const mapArticles = (articles: ArticleType[]) => {
  const articlesMapped = articles.filter(article => 
    article.title !== "[Removed]" && article.urlToImage !== null && article.content !== null
  ).map(article => ({
    ...article,
    content: filterText(article.content)
  }));

  return articlesMapped
}

const filterText = (text: string) => {
  const regex = /\s*\[[^\]]*\]\s*$/
  const filteredText = text.replace(regex, '')
  return filteredText
}