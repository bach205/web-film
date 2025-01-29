import { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/loginProvider'
import "../css/home.css"
import "../css/home.css"
import { postMethod } from '../library/API';
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
            let result = await postMethod({}, "http://localhost:8080/Web-film/api/movies/load-trending-latest")
            result = await result.json();
            setTrending(result.listData[0]);
            setLatestBo(result.listData[0]);
            setLatestLe(result.listData[0]);
        }
        fetchData()
    }, [])

    return (
        <div >
            <ContentBanner src={'https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4'} title={"Ngoai gia hoi xuan"} description={trending && trending[0]?.description} />
            <div className='content-container'>
                <ContentContainerSlider label={"Thịnh Hành"} array={trending} />
                <ContentContainerSlider label={"Phim bộ"} array={latestBo} />
                <ContentContainerSlider label={"Phim lẻ"} array={latestLe} />
                <ContentContainerSlider label={"Anime"} array={latestLe} />
            </div>
        </div>
    )
}

export default Home