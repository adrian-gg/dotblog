import { ReactNode } from "react"
import classNames from "../../utils/classNames"
import "./Button.css"

interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined
  variant?: "primary" | "secondary" | "outline-primary" | "outline-secondary"
  outline?: boolean
  icon?: boolean
  disabled?: boolean
  className?: string
  action?: () => void
  children: ReactNode
}
function Button({
  type,
  variant,
  outline,
  disabled = false,
  className,
  action,
  children,
}: ButtonProps) {
  const classes = classNames(
    "btn",
    variant && `btn-${variant}`,
    outline && "btn--outline",
    typeof children !== "string" && "btn--icon",
    className
  )

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={action}>
      {children}
    </button>
  )
}

export default Button
