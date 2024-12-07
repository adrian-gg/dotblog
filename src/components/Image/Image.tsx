import { useEffect, useRef } from "react"
import "./Image.css"

interface ImageProps {
  src: string
  alt: string
}
function Image({ src, alt }: ImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = imgRef.current
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (img && img.dataset.src) {
            img.src = img.dataset.src
          }
          observer.disconnect()
        }
      })
    })

    if (img) {
      observer.observe(img)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return <img data-src={src} alt={alt} ref={imgRef} />
}

export default Image
