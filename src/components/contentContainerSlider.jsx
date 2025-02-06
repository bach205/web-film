import "../css/contentContainerSlider.css";
import { truncateString } from '../library/truncateString';
import VideoBox from "./videoBox";
function ContentContainerSlider({ label, array, episode = 1 }) {

    return (
        <div className="content-container-wrapper">
            <div className="flex-row content-container-label">
                <h2 style={{ color: "aqua" }}>{label}</h2>
                <a>View all</a>
            </div>
            <div className='content-container-slider'>
                {array.length != 0 && array.map((item) => {
                    item.description = truncateString(item.description, 200)
                    return (
                        <VideoBox item={item} key={item.id || item.movieId} label={label} episode={episode} ></VideoBox>
                    )
                }
                )}
            </div>

        </div>

    )
}

export default ContentContainerSlider