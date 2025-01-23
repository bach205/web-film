import "../../css/form/input.css"

function Input({ type, placeholder, onChange }) {

    return (
        <input className="default-input" type={type} placeholder={placeholder} onChange={onChange} />
    )
}

export default Input