import "../css/contentContainerSlider.css";
import { truncateString } from '../library/truncateString';
import VideoBox from "./videoBox";
function ContentContainerSlider({ label, array, episode = 1 }) {
    const handleOnClick = (data) => {
        window.location.href = `http://localhost:5173/watch/${data.id}/${data.title}/${episode}`
    }

    const watchLaterClick = () => {
        alert("dang phat trien...")
    }

    return (
        <>
            <h2 style={{ color: "aqua" }}>{label}</h2>
            <div className='content-container-slider'>
                {array != "" && array.map((item) => {
                    item.description = truncateString(item.description, 120)
                    return (
                        <VideoBox url={item.imageURL} key={item.id} label={label} title={item.title} description={item.description} category={item.category} releaseDate={item.releaseDate} country={item.country} onClick={() => handleOnClick(item)} buttonClick={watchLaterClick}></VideoBox>
                    )
                }
                )}
                {array != "" && array.map((item) => {
                    item.description = truncateString(item.description, 120)
                    return (
                        <VideoBox url={item.imageURL} key={item.id} label={label} title={item.title} description={item.description} category={item.category} releaseDate={item.releaseDate} country={item.country} onClick={() => handleOnClick(item)} buttonClick={watchLaterClick}></VideoBox>
                    )
                }
                )}
            </div>

        </>

    )
}

export default ContentContainerSlider