import { useContext, useState } from "react"
import "../css/videoBox.css"
import { postMethod } from "../library/API"
import Button from "./form/button"
import { LoginContext } from "../context/loginProvider"
function VideoBox({ children, item, episode, label }) {

    const { userData } = useContext(LoginContext);
    const [isHover, setIsHover] = useState(false)

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

    const handleOnClick = (item) => {
        window.location.href = `http://localhost:5173/watch/${item.id}/${item.title}/${episode}`
    }

    const addToWatchLater = async (item) => {
        if (userData) {
            let data = {
                userId: userData?.id,
                movieId: item.id
            }
            let result = await postMethod(data, "http://localhost:8080/Web-film/api/movies/add-to-watchlater");
            result = await result.json();
            alert(result.message);
        } else {
            alert("you need login to use this feature");
        }
    }

    const watchLaterClick = (item) => {
        addToWatchLater(item)
    }
    return (
        <div className="video-box-container-parent" style={{ display: "flex", flexDirection: "column", gap: "0.5em", alignItems: "center", backgroundColor: isHover ? "darkgreen" : renderBackground() }} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => { setIsHover(false) }}>
            <div className="video-box-container">
                <img src={item?.imageURL} />
                <span className="video-box-container-after" onClick={() => handleOnClick(item)}>
                    <span id="thumnail-description">{item?.description}</span>
                    <br />
                    <span>{item?.category + " | " + item?.country + " | " + item?.releaseDate}</span>
                </span>
                {children}

            </div>
            <div style={{ marginTop: "5px" }}>{item?.title}</div>
            <div className="video-box-watch-later-button" title="watch later" onClick={() => watchLaterClick(item)}><i className="fa-solid fa-bookmark"></i></div>
        </div>

    )
}

export default VideoBox