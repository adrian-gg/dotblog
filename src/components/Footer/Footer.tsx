import "./Footer.css"

function Footer() {
  const getYear = () => {
    return new Date().getFullYear()
  }

  return (
    <footer className="footer">
      <p>
        ©<span>{getYear()}</span> dotBlog - All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
