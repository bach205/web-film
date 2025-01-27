import "../css/contentContainerSlider.css"
import { truncateString } from '../library/truncateString';
import VideoBox from "./videoBox";
function ContentContainerSlider({ label, array }) {

    return (
        <>
            <h2>{label}</h2>
            <div className='content-container-slider'>
                {array != "" && array.map((item) => {
                    item.description = truncateString(item.description, 120)
                    return (
                        <VideoBox url={item.imageURL} key={item.id} title={item.title} description={item.description} genre={item.genre} releaseDate={item.releaseDate} country={item.country} />
                    )
                }
                )}
                {array != "" && array.map((item) => {
                    item.description = truncateString(item.description, 120)
                    return (
                        <VideoBox url={item.imageURL} key={item.id} title={item.title} description={item.description} genre={item.genre} releaseDate={item.releaseDate} country={item.country} />
                    )
                }
                )}
            </div>

        </>

    )
}

export default ContentContainerSlider