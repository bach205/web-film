import { useContext } from "react"
import "../css/contentBanner.css"
import { truncateString } from "../library/truncateString"
import Button from "./form/button"
import { postMethod } from "../library/API"
import { LoginContext } from "../context/loginProvider"
import { useNavigate } from "react-router"
function ContentBanner({ src, title, description, item }) {

    const { userData } = useContext(LoginContext);
    const navigate = useNavigate()

    const handleOnClick = (item) => {
        navigate(`watch/${item.id}/${item.title}/1`);
    }

    const addToWatchLater = async (item) => {
        if (userData) {
            let data = {
                userId: userData?.id,
                movieId: item.id || item.movieId
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

    description = truncateString(description, 150)
    return (
        <div className='video-container'>
            <video src={src} autoPlay muted loop>
            </video>
            <div className='list-container'>
                <h1 style={{ marginTop: "0", marginBottom: "20px" }}>{title}</h1>
                <p>{description}</p>
                <div className='button-list'>
                    <Button type='watch-now-button' onClick={() => handleOnClick(item)} >
                        xem ngay
                    </Button>
                    <Button type='watch-later-button' onClick={() => watchLaterClick(item)}>
                        xem sau
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default ContentBanner