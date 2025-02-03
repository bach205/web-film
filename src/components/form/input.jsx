import "../../css/form/input.css"

function Input({ type, placeholder, onChange, className = "default-input", label, value, onKeyDown }) {

    return (
        <div style={{ textAlign: "start", position: "relative" }}>
            {label && (<>
                <label className="label">{label}</label>
                <br />
            </>)}
            <input className={className} value={value} type={type} placeholder={placeholder} onChange={onChange} onKeyDown={onKeyDown} name={label} autoComplete={label} autoCorrect="true" />
        </div>

    )
}

export default Input