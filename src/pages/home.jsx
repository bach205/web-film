import { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/loginProvider'
import "../css/home.css"
import "../css/home.css"
import { getMethod, postMethod } from '../library/API';
import ContentContainerSlider from '../components/contentContainerSlider';
import ContentBanner from '../components/contentBanner';

//https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4
//https://trailer.vieon.vn/Teaser_NgoaiGiaHoiXuan_mkt.mp4

function Home() {
    const { isLogin, setIsLogin } = useContext(LoginContext);
    const { userData, setUserData } = useContext(LoginContext);
    const [trending, setTrending] = useState("");
    const [latestBo, setLatestBo] = useState("");
    const [latestLe, setLatestLe] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let result = await getMethod("http://localhost:8080/Web-film/api/movies/load-homepage")
            result = await result.json();
            setTrending(result.listData[0]);
            setLatestBo(result.listData[0]);
            setLatestLe(result.listData[0]);
        }
        fetchData()
    }, [])

    const handleWatchNowClick = () => {
        window.location.href = "http://localhost:5173/watch/1/B%E1%BA%A1ch%20Nguy%E1%BB%87t%20Ph%E1%BA%A1n%20Tinh/1";
    }
    const handleWatchLaterClick = () => {
        alert("dang phat trien......")
    }

    return (
        <div >
            <ContentBanner src={'https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4'} title={"Bạch Nguyệt Phạn Tinh"} description={trending && trending[0]?.description}
                watchNowClick={handleWatchNowClick} watchLaterClick={handleWatchLaterClick} />
            <div className='content-container'>
                <ContentContainerSlider label={"Thịnh Hành"} array={trending} />
                <ContentContainerSlider label={"Phim Bộ"} array={latestBo} />
                <ContentContainerSlider label={"Phim Lẻ"} array={latestLe} />
                <ContentContainerSlider label={"Anime"} array={latestLe} />
            </div>
        </div>
    )
}

export default Home