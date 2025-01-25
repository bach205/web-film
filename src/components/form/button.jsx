import "../../css/form/button.css"

function Button({ type = "default-button", onClick, children, }) {

    return (
        <button className={type} type="button" onClick={onClick} >{children}</button>
    )
}

export default Button