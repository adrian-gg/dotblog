import { Dispatch, SetStateAction } from "react"
import { IoClose } from "react-icons/io5"
import useArticlesStore from "../../stores/articles"
import ArticleCardsGrid from "../ArticleCardsGrid/ArticleCardsGrid"
import Button from "../Button/Button"
import "./FileTray.css"

interface FileTrayProps {
  setFiletrayOpen: Dispatch<SetStateAction<boolean>>
}
function FileTray({ setFiletrayOpen }: FileTrayProps) {
  const { articlesInFileTray } = useArticlesStore()

  const handleSetModal = () => {
    setFiletrayOpen(false)
  }

  return (
    <div className="modal">
      <div className="modal-nav">
        <p className="modal-title">File tray</p>
        <Button type="button" variant="secondary" action={handleSetModal}>
          <IoClose />
        </Button>
      </div>
      <div className="modal-body">
        {articlesInFileTray.length > 0 ? (
          <ArticleCardsGrid data={articlesInFileTray} type="filetray" />
        ) : (
          <p className="empty">File tray empty.</p>
        )}
      </div>
    </div>
  )
}

export default FileTray
