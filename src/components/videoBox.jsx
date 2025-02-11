import { useContext, useState } from "react"
import { LoginContext } from "../context/loginProvider"
import "../css/videoBox.css"
import { postMethod } from "../library/API"
import { useNavigate } from "react-router"
function VideoBox({ children, item, episode }) {

    const { userData } = useContext(LoginContext);
    const [isHover, setIsHover] = useState(false)


    const navigate = useNavigate()
    const handleOnClick = (item) => {
        navigate(`http://localhost:5173/watch/${item?.id ? item.id : item.movieId}/${item.title}/${episode}`)
    }

    const addToWatchLater = async (item) => {
        // if (userData) {
        //     let data = {
        //         userId: userData?.id,
        //         movieId: item.id
        //     }
        //     let result = await postMethod(data, "http://localhost:8080/Web-film/api/movies/add-to-watchlater");
        //     result = await result.json();
        //     alert(result.message);
        // } else {
        //     alert("you need login to use this feature");
        // }
        alert("chua deploy backend")
    }

    const watchLaterClick = (item) => {
        addToWatchLater(item)
    }
    return (
        <div className="flex-column">
            <div className="video-box-container-parent" style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => { setIsHover(false) }}>
                <div className="video-box-container">
                    <img src={item?.imageURL} />
                    <span className="video-box-container-after" onClick={() => handleOnClick(item)}>
                        <span id="thumnail-description">{item?.description}</span>
                        <br />
                        <span style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "3px" }}>
                            <span >{item?.category + " | " + item?.country + " | " + item?.releaseDate}</span>

                        </span>
                    </span>
                    {children}

                </div>
                <div style={{ display: "flex", gap: "2px", flexDirection: "row", alignItems: "center" }}>
                    <span style={{ marginTop: "5px" }} className="video-box-title">{item?.title}</span>
                </div>
                <div className="flex-row">
                    <span className="video-box-title">Rate: 5<i className="fa-solid fa-star" style={{ color: "yellow" }}></i></span>
                    <span style={{ alignSelf: "flex-end" }} className="video-box-watch-later-button" title="watch later" onClick={() => watchLaterClick(item)}><i className="fa-solid fa-bookmark"></i></span>
                </div>
                {userData?.role == 1 && (
                    <div className="flex-row" style={{ justifyContent: "space-evenly", margin: "0 0" }}>
                        <button className="video-box-btn video-box-btn-update">update</button>
                        <button className="video-box-btn video-box-btn-delete">delete</button>
                    </div>
                )}
            </div>

        </div>

    )
}

export default VideoBox