import { Dispatch, SetStateAction } from "react"
import { IoFileTray, IoFileTrayFull } from "react-icons/io5"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import useArticlesStore from "../../stores/articles"
import Button from "../Button/Button"
import SearchBar from "../SearchBar/SearchBar"
import "./Navbar.css"

interface NavbarPorps {
  setFiletrayOpen: Dispatch<SetStateAction<boolean>>
}
function Navbar({ setFiletrayOpen }: NavbarPorps) {
  const { articlesInFileTray } = useArticlesStore()

  const handleSetModal = () => {
    setFiletrayOpen(true)
  }

  return (
    <div className="navbar">
      <Link to="/">
        <div className="navbar-brand">
          <img
            src={logo}
            alt="Logo dotBlog"
            style={{ width: "4rem", height: "4rem" }}
          />
        </div>
      </Link>

      <div className="nav">
        <SearchBar />

        <Button type="button" variant="secondary" action={handleSetModal}>
          {articlesInFileTray.length > 0 ? <IoFileTrayFull /> : <IoFileTray />}
        </Button>
      </div>
    </div>
  )
}

export default Navbar
