import "../../css/form/input.css"

function Input({ type, placeholder, onChange, className = "default-input", label }) {

    return (
        <div style={{ textAlign: "start" }}>
            <label className="label">{label}</label>
            <br />
            <input className={className} type={type} placeholder={placeholder} onChange={onChange} />
        </div>

    )
}

export default Input