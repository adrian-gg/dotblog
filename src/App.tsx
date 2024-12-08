import { useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import "./App.css"
import ButtonTop from "./components/ButtonTop/ButtonTop"
import FileTray from "./components/FileTray/FileTray"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import classNames from "./utils/classNames"

function App() {
  const [filetrayOpen, setFiletrayOpen] = useState(false)
  const refScroll = useRef(window.scrollY)

  useEffect(() => {
    if (filetrayOpen) {
      refScroll.current = window.scrollY
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
      window.scrollTo(0, refScroll.current)
    }
  }, [filetrayOpen])

  return (
    <>
      <div className={classNames("container", filetrayOpen && "modal--opened")}>
        <div className="box">
          <Navbar setFiletrayOpen={setFiletrayOpen} />
          <Outlet />
        </div>

        <ButtonTop />

        <Footer />
      </div>

      {filetrayOpen && (
        <div className="container-modal">
          <FileTray setFiletrayOpen={setFiletrayOpen} />
        </div>
      )}
    </>
  )
}

export default App
