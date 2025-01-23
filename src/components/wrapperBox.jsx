import "../css/wrapperBox.css"

function WrapperBox({ children }) {

    return (
        <div className="wrapper">
            <div className="wrapper-box">
                {children}
            </div>
        </div>
    )
}

export default WrapperBox