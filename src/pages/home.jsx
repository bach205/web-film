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
    const [trending, setTrending] = useState("");
    const [latestBo, setLatestBo] = useState("");
    const [latestLe, setLatestLe] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            let result = await getMethod("http://localhost:8080/Web-film/api/movies/load-homepage")
            result = await result.json();
            console.log(result)
            setTrending(result.listData[0]);
            setLatestBo(result.listData[1]);
            setLatestLe(result.listData[2]);
        }
        fetchData()
    }, [])


    return (
        <div >
            <ContentBanner src={'https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4'} title={"Bạch Nguyệt Phạn Tinh"} description={trending && trending[0]?.description}
                item={trending[0]} />
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