import { useNavigate } from "react-router";
import "../css/contentContainerSlider.css"
import { truncateString } from '../library/truncateString';
import VideoBox from "./videoBox";
function ContentContainerSlider({ label, array }) {

    const navigate = useNavigate();

    const handleOnClick = (item) => {
        window.location.href = `http://localhost:5173/watch/${item.id}/${item.title}/1`
    }

    return (
        <>
            <h2>{label}</h2>
            <div className='content-container-slider'>
                {array != "" && array.map((item) => {
                    item.description = truncateString(item.description, 120)
                    return (
                        <VideoBox url={item.imageURL} key={item.id} title={item.title} description={item.description} category={item.category} releaseDate={item.releaseDate} country={item.country} onClick={() => handleOnClick(item)} />
                    )
                }
                )}
                {array != "" && array.map((item) => {
                    item.description = truncateString(item.description, 120)
                    return (
                        <VideoBox url={item.imageURL} key={item.id} title={item.title} description={item.description} category={item.category} releaseDate={item.releaseDate} country={item.country} onClick={() => handleOnClick(item)} />
                    )
                }
                )}
            </div>

        </>

    )
}

export default ContentContainerSlider