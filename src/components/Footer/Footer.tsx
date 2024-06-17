import FooterStyle from "./Footer.module.css"


const Footer = ({ topButton } : { topButton: boolean }) => {
  return(<>
    <footer className={FooterStyle.footer}>
      { topButton ? <a href="#" className={FooterStyle.arrow_top}>TOP</a> : <></> }
      <p>©<span>{new Date().getFullYear()}</span> dotBlog - All rights reserved.</p>
    </footer>
  </>)  
}

export default Footer
