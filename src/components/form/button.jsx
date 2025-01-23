import "../../css/form/button.css"

function Button({ type, onClick, children }) {

    return (
        <button className="default-button" type={type} onClick={onClick} >{children}</button>
    )
}

export default Button