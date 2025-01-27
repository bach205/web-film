import "../css/contentBanner.css"
import { truncateString } from "../library/truncateString"
import Button from "./form/button"
function ContentBanner({ src, title, description }) {

    description = truncateString(description, 150)
    return (
        <div className='video-container'>
            <video src={src} autoPlay muted loop>
            </video>
            <div className='list-container'>
                <h1 style={{ marginTop: "0", marginBottom: "20px" }}>{title}</h1>
                <p>{description}</p>
                <div className='button-list'>
                    <Button type='watch-now-button' >
                        xem ngay
                    </Button>
                    <Button type='watch-later-button' >
                        xem sau
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default ContentBanner