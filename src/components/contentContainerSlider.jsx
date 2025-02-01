import "../css/contentContainerSlider.css";
import { truncateString } from '../library/truncateString';
import VideoBox from "./videoBox";
function ContentContainerSlider({ label, array, episode = 1 }) {

    return (
        <>
            <h2 style={{ color: "aqua" }}>{label}</h2>
            <div className='content-container-slider'>
                {array != "" && array.map((item) => {
                    item.description = truncateString(item.description, 120)
                    return (
                        <VideoBox item={item} key={item.id} label={label} episode={episode} ></VideoBox>
                    )
                }
                )}
            </div>

        </>

    )
}

export default ContentContainerSlider