import { useEffect, useState } from "react";
import { getMethod } from "../library/API";
import Input from "../components/form/input";
import { DropDown } from "../components/form/dropdown";


function CreateMovie() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [genre, setGenre] = useState("");
    const [country, setCountry] = useState("");
    const [releaseDate, setReleaseDate] = useState(0);
    const [category, setCategory] = useState("");

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
    const handleOnChange = (event, setState) => {
        setState(event.target.value);
    }
    const fetchData = async () => {
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='margin-header'>
            <div className="flex-column">
                <div className="flex-row">
                    <Input label={"Title"} placeholder={"Title"} className={"default-input-half"} type={"text"} onChange={(event) => handleOnChange(event, setTitle)} />
                    <Input label={"Description"} placeholder={"Description"} className={"default-input-half"} type={"text"} onChange={(event) => handleOnChange(event, setDescription)} />
                </div>
                <div>
                    <Input label={"ImageURL"} placeholder={"ImageURL"} className={"default-input"} type={"text"} onChange={(event) => handleOnChange(event, setImageURL)} />
                </div>
                <div className="flex-row">
                    <DropDown value={genre} style={{ width: "12em" }} array={genreArray} onChange={(event) => handleOnChange(event, setGenre)} />
                    <DropDown value={country} style={{ width: "12em" }} array={countryArray} onChange={(event) => handleOnChange(event, setCountry)} />
                    <DropDown value={releaseDate} style={{ width: "12em" }} array={releaseDateArray} onChange={(event) => handleOnChange(event, setReleaseDate)} />
                    <DropDown value={category} style={{ width: "12em" }} array={categoryArray} onChange={(event) => handleOnChange(event, setCategory)} />
                </div>
            </div>
        </div>
    )
}

const TopStatic = ({ movie, label }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ color: "aqua", textAlign: "center" }}>{label}</h3>
            {movie && movie.map((movie) => {
                return (
                    <div key={movie.movieId} style={{ display: "inline-flex", flexDirection: "row", gap: "10px", border: "solid 2px gray", width: "29em" }}>
                        <img src={movie.imageURL} width={"200em"} height={"auto"} />
                        <div style={{ padding: "0 10px" }}>
                            <p style={{ margin: "2px 0" }}><span style={{ color: "gray" }}>Title: </span>{movie.title}</p>
                            <p style={{ margin: "2px 0" }}><span style={{ color: "gray" }}>View: </span>{movie.view}</p>
                            <p style={{ margin: "2px 0" }}><span style={{ color: "gray" }}>View per episode: </span>{movie.totalEpisode}</p>
                            <p style={{ margin: "2px 0" }}><span style={{ color: "gray" }}>Total episode: </span>{Math.floor(movie.view / movie.totalEpisode)}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default CreateMovie