import "../../css/form/button.css"

function Button({ type = "default-button", onClick, children, style }) {

    return (
        <button className={type} type="button" onClick={onClick} style={style}>{children}</button>
    )
}

export default Button