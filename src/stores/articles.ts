import { create } from "zustand"
import { persist } from "zustand/middleware"
import getFromApi from "../services/apiService"
import { ArticleMappedType, ArticleType } from "../type"
import { excludeObjectByQuery } from "../utils/objectFilterUtils"

interface State {
  articles: ArticleMappedType[]
  page: number
  pageSize: number
  isLoading: boolean
  hasMore: boolean
  hasError: unknown
  articlesInFileTray: ArticleMappedType[]
  getArticles: (query: string) => Promise<void>
  saveArticleToRead: (article: ArticleMappedType) => void
  removeArticleFromFileTray: (article: ArticleMappedType) => void
  resetArticles: () => void
}

const useArticlesStore = create<State>()(
  persist(
    (setState, getState) => {
      return {
        articles: [],
        page: 1,
        pageSize: 10,
        isLoading: false,
        hasMore: true,
        hasError: null,
        articlesInFileTray: [],
        getArticles: async (query) => {
          setState({ isLoading: true })
          try {
            const { page, pageSize, articlesInFileTray } = getState()
            const path =
              query === ""
                ? `top-headlines?country=us&page=${page}&pageSize=${pageSize}`
                : `everything?q=${query}&page=${page}&pageSize=${pageSize}`
            const data = await getFromApi(path)
            const articlesMapped = toMapArticles(
              data.articles,
              articlesInFileTray
            )

            setState((state) => ({
              articles: [...state.articles, ...articlesMapped],
              page: state.page + 1,
              hasMore: page * pageSize < data.totalResults,
            }))
          } catch (error) {
            setState({ hasMore: false, hasError: error })
            console.error("Failed to fetch articles:", error)
          } finally {
            setState({ isLoading: false })
          }
        },
        saveArticleToRead: (article) =>
          setState((state) => {
            const uppdatedArticles = state.articles.map((a) =>
              a.title !== article.title ? a : { ...a, saved: true }
            )
            return {
              articles: [...uppdatedArticles],
              articlesInFileTray: [
                ...state.articlesInFileTray,
                { ...article, saved: true },
              ],
            }
          }),
        removeArticleFromFileTray: (article: ArticleMappedType) =>
          setState((state) => {
            const articlesMapped = state.articles.map((a) =>
              a.title !== article.title ? a : { ...a, saved: false }
            )
            const restOfArticleInFileTray = excludeObjectByQuery(
              state.articlesInFileTray,
              "title",
              article.title
            )
            return {
              articles: [...articlesMapped],
              articlesInFileTray: [...restOfArticleInFileTray],
            }
          }),
        resetArticles: () => {
          setState(() => ({
            articles: [],
            page: 1,
            isLoading: false,
            hasMore: true,
            hasError: null,
          }))
        },
      }
    },
    {
      name: "dotBlog-articles",
      partialize: (state) => ({ articlesInFileTray: state.articlesInFileTray }),
    }
  )
)

const toMapArticles = (
  articles: ArticleType[],
  articlesInFileTray: ArticleMappedType[]
) => {
  const articlesMapped = articles
    .filter(
      (article) =>
        article.title !== "[Removed]" &&
        article.urlToImage &&
        article.content &&
        article.description
    )
    .map((article) => ({
      ...article,
      content: toFilterText(article.content),
      saved: isInFileTray(article, articlesInFileTray),
    }))

  return articlesMapped as ArticleMappedType[]
}

const toFilterText = (text: string) => {
  const regex = /\s*\[[^\]]*\]\s*$/
  const filteredText = text.replace(regex, "")
  return filteredText
}

const isInFileTray = (
  article: ArticleType,
  articlesInFileTray: ArticleMappedType[]
) => articlesInFileTray.find((a) => a.title === article.title) !== undefined

export default useArticlesStore
