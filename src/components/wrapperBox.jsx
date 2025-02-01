import "../css/wrapperBox.css"

function WrapperBox({ children, style }) {

    return (
        <div className="wrapper" style={style}>
            <div className="wrapper-box">
                {children}
            </div>
        </div>
    )
}

export default WrapperBox