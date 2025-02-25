import { useContext, useState } from "react";
import { LoginContext } from "../context/loginProvider";
import { ReLoadApiContext } from "../context/reloadApiProvider";
import "../css/videoBox.css";
import { postMethod } from "../library/API";
function VideoBox({ children, item, episode }) {

    const { userData } = useContext(LoginContext);
    const [isHover, setIsHover] = useState(false);
    const [toggleUpdateVideoModal, setToggleUpdateVideoModel] = useState(false);
    const { setRefresh } = useContext(ReLoadApiContext)

    const handleOnClick = (item) => {
        window.location.href = `http://localhost:5173/watch/${item?.id ? item.id : item.movieId}/${item.title}/${episode}`
    }

    const addToWatchLater = async (item) => {
        if (userData) {
            let data = {
                userId: userData?.id,
                movieId: item.id
            }
            let result = await postMethod(data, "http://localhost:8080/Web-film/api/movies/authorization/add-to-watchlater");
            result = await result.json();
            alert(result.message);
        } else {
            alert("you need login to use this feature");
        }
    }

    const watchLaterClick = (item) => {
        addToWatchLater(item)
    }

    const UpdateAndDeleteVideo = () => {

        const handleDelete = async () => {
            let result = await postMethod(item?.id, "http://localhost:8080/Web-film/api/movies/authorization/remove-movie")
            result = await result.json();
            if (result.status != 200) {
                alert(result.message);
            } else {
                setRefresh(refresh => !refresh)
            }
        }

        return (
            <>
                {userData?.role == 1 && (
                    <>
                        <button onClick={() => setToggleUpdateVideoModel(!toggleUpdateVideoModal)} className="video-box-btn video-box-btn-update"><i className="fa-solid fa-pen-to-square"></i></button>
                        <button onClick={handleDelete} className="video-box-btn video-box-btn-delete"><i className="fa-solid fa-x"></i></button>
                    </>
                )}
            </>
        )
    }
    const VideoDescription = () => {
        return (
            <div className="video-box-container">

                <img src={item?.imageURL} />
                <span className="video-box-container-after" onClick={() => handleOnClick(item)}>
                    <span id="thumnail-description">{item?.description}</span>
                    <br />

                </span>
                {children}

            </div>
        )
    }
    const VideoDetail = () => {
        return (
            <>
                <div style={{ display: "flex", gap: "2px", flexDirection: "row", alignItems: "center" }}>
                    <span style={{ marginTop: "5px" }} className="video-box-title">{item?.title}</span>
                </div>
                <span style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "3px" }}>
                    <div className="videobox-hightlight videobox-category">{item?.category}</div>
                    <div className="videobox-hightlight videobox-country">{item?.country}</div>
                    <div className="videobox-hightlight videobox-releaseDate">{item?.releaseDate}</div>
                </span>
                <div className="flex-row">
                    <span className="video-box-title">Rate: 5<i className="fa-solid fa-star" style={{ color: "yellow" }}></i></span>

                </div>
                <div style={{ alignSelf: "flex-end" }} className="video-box-watch-later-button" title="watch later" onClick={() => watchLaterClick(item)}>
                    <i className="fa-solid fa-bookmark"></i>
                </div>
            </>
        )
    }
    return (
        <div className="flex-column">
            <div className="video-box-container-parent" style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => { setIsHover(false) }}>
                <UpdateAndDeleteVideo />
                <VideoDescription />
                <VideoDetail />
            </div>

        </div>

    )
}

export default VideoBox