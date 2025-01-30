import "../css/videoBox.css"
import Button from "./form/button"
function VideoBox({ children, url, title, description, category, releaseDate, country, onClick, buttonClick, label }) {

    const renderBackground = () => {
        switch (label) {
            case "Thịnh Hành": {
                return "crimson"
            }
            case "Phim Bộ": {
                return "teal"
            }
            case "Phim Lẻ": {
                return "darkgoldenrod"
            }
            default: {
                return "gray"
            }
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em", alignItems: "center", backgroundColor: renderBackground() }}>
            <div className="video-box-container">
                <img src={url} />
                <span className="video-box-container-after" onClick={onClick}>
                    <span id="thumnail-description">{description}</span>
                    <br />
                    <span>{category + " | " + country + " | " + releaseDate}</span>
                </span>
                {children}

            </div>
            <div style={{ marginTop: "5px" }}>{title}</div>
            <Button type="small-button" style={{ width: "9em", backgroundColor: "black", height: "4em", border: 0, marginBottom: "0.3em", fontSize: "12px" }} onClick={buttonClick}>Watch Later</Button>
        </div>

    )
}

export default VideoBox