import "../css/videoBox.css"
function VideoBox({ children, url }) {

    return (
        <div className="video-box-container">
            <img src={url} width={"100%"} height={"100%"} />
            <span className="video-box-container-after">
                <span>noi dung</span>
                <br />
                <span>ten phim</span>
                <br />
                <span>thoi luong</span>
            </span>
            {children}
        </div>

    )
}

export default VideoBox