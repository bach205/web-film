import "../css/wrapperBox.css"

function WrapperBox({ children, className, style }) {

    return (
        <div className={`wrapper ${className}`} style={style}>
            <div className="wrapper-box">
                {children}
            </div>
        </div>
    )
}

export default WrapperBox