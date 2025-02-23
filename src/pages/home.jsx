import { useContext, useEffect, useState } from 'react';
import ContentContainerList from '../components/contentContainerList';
import ContentBanner from '../components/contentBanner';
import ContentContainerSlider from '../components/contentBannerSlider';
import "../css/home.css";
import { getMethod } from '../library/API';
import { ReLoadApiContext, ReloadApiProvider } from '../context/reloadApiProvider';
import HomeAside from '../components/homeAside';

//https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4
//https://trailer.vieon.vn/Teaser_NgoaiGiaHoiXuan_mkt.mp4

function Home() {
    const [movie, setMovie] = useState([]);
    const { refresh } = useContext(ReLoadApiContext)

    useEffect(() => {
        const fetchData = async () => {
            let result = await getMethod("http://localhost:8080/Web-film/api/movies/load-homepage")
            result = await result.json();
            setMovie(result.listData)

        }
        fetchData()
    }, [refresh])
    return (

        <div>
            <ContentBanner src={'https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4'} title={"Bạch Nguyệt Phạn Tinh"} description={(movie.length != 0 && movie[0].length != 0 && movie[0][0].description) || ""}
                item={movie?.length != 0 && movie[0]?.length != 0 && movie[0][0]} />
            <div className='content-container'>
                <ContentContainerSlider label={"Thịnh Hành"} array={(Array.isArray(movie[0])) ? movie[0] : []} />
                <div className='content-container-main'>
                    <div className='content-main'>

                        <ContentContainerList label={"Phim Bộ"} array={(Array.isArray(movie[1])) ? movie[1] : []} />
                        <br />
                        <ContentContainerList label={"Phim Lẻ"} array={(Array.isArray(movie[2])) ? movie[2] : []} />
                        <br />
                        <ContentContainerList label={"Anime"} array={(Array.isArray(movie[3])) ? movie[3] : []} />
                    </div>
                    <HomeAside />
                </div>
            </div>
        </div>
    )
}

export default Home