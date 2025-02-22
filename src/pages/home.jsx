import { useEffect, useState } from 'react';
import bleach from "../assets/bleach.jpg";
import natra from "../assets/na_tra.jpg";
import peaky from "../assets/peaky_blinder.jpg";
import ContentContainerList from '../components/ContentContainerList';
import ContentBanner from '../components/contentBanner';
import ContentContainerSlider from '../components/contentBannerSlider';
import "../css/home.css";
import { getMethod } from '../library/API';

//https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4
//https://trailer.vieon.vn/Teaser_NgoaiGiaHoiXuan_mkt.mp4

function Home() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let result = await getMethod("http://localhost:8080/Web-film/api/movies/load-homepage")
            result = await result.json();
            setMovie(result.listData)

        }
        fetchData()
    }, [])
    return (

        <div >
            <ContentBanner src={'https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4'} title={"Bạch Nguyệt Phạn Tinh"} description={(movie.length != 0 && movie[0].length != 0 && movie[0][0].description) || ""}
                item={movie?.length != 0 && movie[0]?.length != 0 && movie[0][0]} />
            <div className='content-container'>
                <ContentContainerSlider label={"Thịnh Hành"} array={(Array.isArray(movie[0])) ? movie[0] : []} />
                <ContentContainerList label={"Phim Bộ"} array={(Array.isArray(movie[1])) ? movie[1] : []} />
                <br />
                <ContentContainerList label={"Phim Lẻ"} array={(Array.isArray(movie[2])) ? movie[2] : []} />
                <br />
                <ContentContainerList label={"Anime"} array={(Array.isArray(movie[3])) ? movie[3] : []} />
            </div>
        </div>
    )
}

export default Home