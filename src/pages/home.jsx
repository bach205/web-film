import { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/loginProvider'
import "../css/home.css"
import "../css/home.css"
import { getMethod, postMethod } from '../library/API';
import ContentContainerList from '../components/ContentContainerList';
import ContentBanner from '../components/contentBanner';
import ContentContainerSlider from '../components/contentBannerSlider';

//https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4
//https://trailer.vieon.vn/Teaser_NgoaiGiaHoiXuan_mkt.mp4

function Home() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let result = await getMethod("http://localhost:8080/Web-film/api/movies/load-homepage")
            result = await result.json();
            console.log(result.listData)
            setMovie(result.listData)

        }
        fetchData()
    }, [])


    return (
        <div >
            <ContentBanner src={'https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4'} title={"Bạch Nguyệt Phạn Tinh"} description={(movie.length != 0 && movie[0].length != 0 && movie[0][0].description) || ""}
                item={movie[0]} />
            <div className='content-container'>
                <ContentContainerSlider label={"Thịnh Hành"} array={(Array.isArray(movie[0])) ? movie[0] : []} />
                <ContentContainerList label={"Phim Bộ"} array={(Array.isArray(movie[1])) ? movie[1] : []} />
                <ContentContainerList label={"Phim Lẻ"} array={(Array.isArray(movie[2])) ? movie[2] : []} />
                <ContentContainerList label={"Anime"} array={(Array.isArray(movie[3])) ? movie[3] : []} />
            </div>
        </div>
    )
}

export default Home