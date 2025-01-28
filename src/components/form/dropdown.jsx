import "../../css/form/input.css"

const DropDown = ({ array, value, label, onChange }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <label>{label}</label>
            <select value={value} className="default-input" style={{ width: "200px", alignSelf: "center" }} onChange={onChange}>
                {array && array.map((item) => {
                    return (
                        <option key={item.value} value={item.value}>{item.name}</option>
                    )
                })}
            </select>
        </div>
    )
}
export { DropDown }