import { useEffect, useState } from "react"
import { IoMdArrowRoundUp } from "react-icons/io"
import Button from "../Button/Button"
import "./ButtonTop.css"

const ButtonTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const buttonStyles = {
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? ("auto" as const) : ("none" as const),
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    setIsVisible(scrollTop > 0)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="top-button" style={buttonStyles}>
      <Button
        type="button"
        variant="outline-primary"
        action={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <IoMdArrowRoundUp />
      </Button>
    </div>
  )
}

export default ButtonTop
