import "../css/videoBox.css"
function VideoBox({ children, url, title, description, genre, releaseDate, country }) {

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="video-box-container">
                <img src={url} />
                <span className="video-box-container-after">
                    <span id="thumnail-description">{description}</span>
                    <br />
                    <span>{genre + " | " + country + " | " + releaseDate}</span>
                </span>
                {children}
            </div>
            <div style={{ marginTop: "5px" }}>{title}</div>
        </div>

    )
}

export default VideoBox