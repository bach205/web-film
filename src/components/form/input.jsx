import "../../css/form/input.css"

function Input({ type, placeholder, onChange, className = "default-input", }) {

    return (
        <input className={className} type={type} placeholder={placeholder} onChange={onChange} />
    )
}

export default Input