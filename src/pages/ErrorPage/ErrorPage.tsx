import { Link, useRouteError } from "react-router-dom"
import Button from "../../components/Button/Button"
import "./ErrorPage.css"

function ErrorPage() {
  const error = useRouteError() as { statusText: string; message: string }

  return (
    <main id="Page404" className="error-page">
      <p className="error-title">404</p>

      <p className="error-subtitle">
        <i>{error.statusText || error.message}</i>
      </p>

      <Link to="/">
        <Button type="button" variant="primary">
          Back to home
        </Button>
      </Link>
    </main>
  )
}

export default ErrorPage
