import { Routes, Route } from "react-router-dom"
import "./App.css"
import Home from './pages/Home/Home'
import FileTray from "./pages/FileTray/FileTray"
import Search from "./pages/Search/Search"
import Page404 from './pages/Page404/Page404'
import { useArticlesStore } from "./stores/articles"


const App = () => {
  const fileTrayOpened = useArticlesStore((state) => state.fileTrayOpened)

  return (<>
    <div className={fileTrayOpened ? "app_container overflow" : "app_container"}>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="search/:query" element={<Search />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </div>

    { fileTrayOpened ? <FileTray /> : <></> }
  </>)
}

export default App
