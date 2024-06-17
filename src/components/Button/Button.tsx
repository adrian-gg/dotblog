import ButtonStyle from './Button.module.css'


interface ButtonType {
  type: "button" | "submit" | "reset";
  typeStyle: "primary" | "secondary" | "tertiary" | "primary-icon" | "secondary-icon" | "tertiary-icon";
  disabled?: boolean;
  children: React.ReactNode;
}
const Button = ({ type, typeStyle, disabled, children }: ButtonType) => {
  return(
    <button
      type={type}
      disabled={disabled}
      className={`${ButtonStyle.button} ${ButtonStyle[typeStyle]} text-xs`}
    >
      {children}
    </button> )
}

export default Button
