import { useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/loginProvider'
import "../css/home.css"
import "../css/home.css"
import { getMethod, postMethod } from '../library/API';
import ContentContainerSlider from '../components/contentContainerSlider';
import ContentBanner from '../components/contentBanner';
import { useSearchParams } from 'react-router';
import { DropDown } from '../components/form/dropdown';

//https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4
//https://trailer.vieon.vn/Teaser_NgoaiGiaHoiXuan_mkt.mp4

function Search() {


    //null neu khong co param
    let [searchParams] = useSearchParams();
    let title = searchParams.get("title") || "";
    let genre = searchParams.get("genre") || "";
    let country = searchParams.get("country") || "";
    let releaseDate = searchParams.get("releaseDate") || "";
    let arrange = searchParams.get("arrange") || "";
    let category = searchParams.get("category") || "";


    const genreArray = ["Âm Nhạc",
        "   Anime",
        "Chiến Tranh",
        "Cổ Trang",
        "Hài Hước",
        "Hành Động",
        " Hình Sự",
        "Khoa Học",
        " Kinh Dị",
        "Phiêu Lưu",
        "  Tâm Lý",
        "Tình Cảm",
        "Viễn Tưởng"]
    useEffect(() => {
        alert(genre)
    }, [])

    return (
        <div className='margin-header'>
            <DropDown label={"genre"} value={genre} array={genreArray} />
            <h1>hi</h1>
        </div>
    )
}

export default Search