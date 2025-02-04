import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import Button from '../components/form/button';
import { DropDown } from '../components/form/dropdown';
import Input from '../components/form/input';
import { getMethod } from '../library/API';
import ContentContainerSlider from '../components/contentContainerSlider';
import { Pagination } from '../components/pagination';
import styles from "../css/search.module.css"

//https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4
//https://trailer.vieon.vn/Teaser_NgoaiGiaHoiXuan_mkt.mp4

function Search() {


    //null neu khong co param
    const [searchParams] = useSearchParams();
    const [title, setTitle] = useState(searchParams.get("title") || "");
    const [genre, setGenre] = useState(searchParams.get("genre") || "");
    const [country, setCountry] = useState(searchParams.get("country") || "");
    const [releaseDate, setReleaseDate] = useState(searchParams.get("releaseDate") || 0);
    const [category, setCategory] = useState(searchParams.get("category") || "");

    const [arrange, setArrange] = useState(searchParams.get("arrange") || "");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState("");
    const [listMovie, setListMovie] = useState([]);
    const [listMovieEachPage, setListMovieEachPage] = useState([]);

    const genreArray = [
        { name: "Thể Loại", value: "" },
        { name: "Âm Nhạc", value: "Âm Nhạc" },
        { name: "Anime", value: "Anime" },
        { name: "Chiến Tranh", value: "Chiến Tranh" },
        { name: "Cổ Trang", value: "Cổ Trang" },
        { name: "Hài Hước", value: "Hài Hước" },
        { name: "Hành Động", value: "Hành Động" },
        { name: "Hình Sự", value: "Hình Sự" },
        { name: "Khoa Học", value: "Khoa Học" },
        { name: "Kinh Dị", value: "Kinh Dị" },
        { name: "Phiêu Lưu", value: "Phiêu Lưu" },
        { name: "Tâm Lý", value: "Tâm Lý" },
        { name: "Tình Cảm", value: "Tình Cảm" },
        { name: "Viễn Tưởng", value: "Viễn Tưởng" }
    ]
    const countryArray = [
        { name: "Quốc Gia", value: "" },
        { name: "Việt Nam", value: "Việt Nam" },
        { name: "Trung Quốc", value: "Trung Quốc" },
        { name: "Hàn Quốc", value: "Hàn Quốc" },
        { name: "Nhật Bản", value: "Nhật Bản" },
        { name: "Ấu", value: "Âu" },
        { name: "Mỹ", value: "Mỹ" },
        { name: "Thái Lan", value: "Thái Lan" },
        { name: "Đài Loan", value: "Đài Loan" },
        { name: "Hồng Kông", value: "Hồng Kông" },
        { name: "Ấn Độ", value: "Ấn Độ" }
    ]

    const releaseDateArray = [

        { name: "Năm Phát Hành", value: 0 },
        { name: 2025, value: 2025 },
        { name: 2024, value: 2024 },
        { name: 2023, value: 2023 },
        { name: 2022, value: 2022 },
        { name: 2021, value: 2021 },
        { name: 2020, value: 2020 },
        { name: 2019, value: 2019 },
        { name: 2018, value: 2018 },
        { name: 2017, value: 2017 },
        { name: 2016, value: 2016 },
        { name: 2015, value: 2015 },
        { name: 2014, value: 2014 },
        { name: 2013, value: 2013 },
        { name: 2012, value: 2012 },
        { name: 2011, value: 2011 },
        { name: 2010, value: 2010 },
        { name: 2009, value: 2009 },
        { name: 2008, value: 2008 },
        { name: 2007, value: 2007 },
        { name: "Trước năm 2007", value: -1 }
    ]

    const categoryArray = [
        { name: "Hình Thức", value: "" },
        { name: "Phim Bộ", value: "Phim Bộ" },
        { name: "Phim Lẻ", value: "Phim Lẻ" }
    ]
    const arrangeArray = [
        { name: "Xắp Sếp", value: "" },
        { name: "Lượt Xem", value: "view" },
        { name: "Năm Sản Xuất", value: "releaseDate" }
    ]

    const fetchData = async () => {
        let result = await getMethod(`http://localhost:8080/Web-film/api/movies/search?title=${title}&genre=${genre}&country=${country}&releaseDate=${releaseDate}&category=${category}`);
        return result = await result.json();
    }
    const searchMovie = async () => {
        let result = await fetchData();
        insertionSort(result.data, arrange)
        setListMovie(result.data);
    }

    const handleOnChange = (event, setState) => {
        setState(event.target.value);
    }
    const HandleOnEnterDown = (e) => {
        if (e.key == "Enter") {
            searchMovie();
        }
    }

    function insertionSort(arr, key) {
        for (let i = 1; i < arr.length; i++) {
            let current = arr[i];
            let j = i - 1;

            // Dịch chuyển các phần tử có giá trị nho hơn `current[key]` sang phải
            while (j >= 0 && arr[j][key] < current[key]) {
                arr[j + 1] = arr[j];
                j--;
            }

            // Chèn `current` vào vị trí thích hợp
            arr[j + 1] = current;
        }
        return arr;
    }
    useEffect(() => {
        searchMovie();
    }, [])
    console.log(listMovie)
    const TOTAL_VIDEO_PER_PAGE = 30;
    const TOTAL_COLUMN = 5
    useEffect(() => {
        setListMovieEachPage(listMovie.slice(TOTAL_VIDEO_PER_PAGE * (page - 1), (TOTAL_VIDEO_PER_PAGE * page)));
        setTotalPage(Math.ceil(listMovie.length / TOTAL_VIDEO_PER_PAGE))
    }, [listMovie, page])

    return (
        <div className='margin-header'>
            <div className={styles.wrapper}>

                <div className={styles.dropDownLeft} style={{ alignItems: "center" }}>
                    <Button style={{ width: "6em" }} onClick={searchMovie}>search</Button>
                    <div className='flex-row' style={{ position: "relative" }}>
                        <Input type={"text"} placeholder={"Tìm kiếm"} value={title} className="medium-input" onChange={(event) => handleOnChange(event, setTitle)} onKeyDown={e => HandleOnEnterDown(e)} />
                    </div>
                    <DropDown value={arrange} style={{ width: "12em" }} array={arrangeArray} onChange={(event) => handleOnChange(event, setArrange)} />
                </div>
                <div className={styles.dropDownRight}>
                    <div className={styles.dropDownChild}>
                        <DropDown value={genre} style={{ width: "12em" }} array={genreArray} onChange={(event) => handleOnChange(event, setGenre)} />
                        <DropDown value={country} style={{ width: "12em" }} array={countryArray} onChange={(event) => handleOnChange(event, setCountry)} />
                    </div>
                    <div className={styles.dropDownChild}>
                        <DropDown value={releaseDate} style={{ width: "12em" }} array={releaseDateArray} onChange={(event) => handleOnChange(event, setReleaseDate)} />
                        <DropDown value={category} style={{ width: "12em" }} array={categoryArray} onChange={(event) => handleOnChange(event, setCategory)} />
                    </div>
                </div>
            </div>
            <h2 style={{ color: "aqua" }}>Danh sách phim đã được lọc</h2>

            {listMovie.length != 0 && (
                <>
                    <ContentContainerSlider array={listMovieEachPage} episode={1} />
                    <Pagination totalPage={totalPage} page={page} setPage={setPage} totalColumn={TOTAL_COLUMN} />
                </>
            )}
            {listMovie.length == 0 && <h3>No result found</h3>}
        </div>
    )
}

export default Search