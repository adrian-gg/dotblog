import { Link } from "react-router-dom"
import { IoFileTray, IoFileTrayFull } from "react-icons/io5"
import NavStyle from "./Nav.module.css"
import SearchBar from "../SearchBar/SearchBar"
import Button from "../Button/Button"
import { useArticlesStore } from "../../stores/articles"

interface Props {
  search: boolean
}
const Nav = ({ search }: Props) => {
  const [
    articlesInFileTray,
    setFileTrayOpened
  ] = useArticlesStore((state) => [
    state.articlesInFileTray,
    state.setFileTrayOpened 
  ])


  return(<>
    <nav className={NavStyle.menu}>
      <div className={NavStyle.bar}>

        <Link to="/"><div className={NavStyle.logo}>dB</div></Link>
        
        <div className={NavStyle.options}>

          { search ? <SearchBar/> : <></> }

          <div onClick={() => setFileTrayOpened()}>
            {
              articlesInFileTray.length > 0
                ? <Button type="button" typeStyle="tertiary-icon"><IoFileTrayFull /></Button>
                : <Button type="button" typeStyle="tertiary-icon"><IoFileTray /></Button>
            }
          </div>

        </div>

      </div>
    </nav>
  </>)

}

export default Nav
