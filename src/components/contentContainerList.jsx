import "../css/contentContainerList.css";
import { truncateString } from '../library/truncateString';
import VideoBox from "./videoBox";
function ContentContainerList({ label, array, episode = 1 }) {

    return (
        <div className="content-container-wrapper">
            <div className="flex-row content-container-label">
                <h2 style={{ color: "aqua" }}>{label}</h2>
            </div>
            <div className='content-container-slider'>
                {array.length != 0 && array.map((item) => {
                    item.description = truncateString(item.description, 150)
                    return (
                        <VideoBox item={item} key={item.id || item.movieId} label={label} episode={episode} ></VideoBox>
                    )
                }
                )}
            </div>

        </div>

    )
}

export default ContentContainerList