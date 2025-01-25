import "../../css/form/input.css"

function Input({ type, placeholder, onChange, className = "default-input", label, value }) {

    return (
        <div style={{ textAlign: "start" }}>
            <label className="label">{label}</label>
            <br />
            <input className={className} value={value} type={type} placeholder={placeholder} onChange={onChange} />
        </div>

    )
}

export default Input