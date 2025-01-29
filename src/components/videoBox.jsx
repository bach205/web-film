import "../css/videoBox.css"
function VideoBox({ children, url, title, description, category, releaseDate, country, onClick }) {

    return (
        <div style={{ display: "flex", flexDirection: "column" }} onClick={onClick}>
            <div className="video-box-container">
                <img src={url} />
                <span className="video-box-container-after">
                    <span id="thumnail-description">{description}</span>
                    <br />
                    <span>{category + " | " + country + " | " + releaseDate}</span>
                </span>
                {children}
            </div>
            <div style={{ marginTop: "5px" }}>{title}</div>
        </div>

    )
}

export default VideoBox