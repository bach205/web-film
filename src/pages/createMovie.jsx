import { useEffect, useState } from "react";
import Button from "../components/form/button";
import { DropDown } from "../components/form/dropdown";
import Input from "../components/form/input";
import WrapperBox from "../components/wrapperBox";
import { postMethod, getMethod } from "../library/API";
import { useSearchParams } from "react-router";
import styles from "../css/movieManagement.module.css";


function CreateMovie() {
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("")
    // const [imageURL, setImageURL] = useState("")
    // const [genre, setGenre] = useState("");
    // const [country, setCountry] = useState("");
    // const [releaseDate, setReleaseDate] = useState("");
    // const [category, setCategory] = useState("");
    // const [episode, setEpisode] = useState("");
    // const [videoURL, setVideoURL] = useState("");


    // const [listGenre, setListGenre] = useState([]);
    // const [genreRemove, setGenreRemove] = useState("");
    // const [response, setResponse] = useState("");

    // const genreArray = [
    //     { name: "Thể Loại", value: "" },
    //     { name: "Âm Nhạc", value: "Âm Nhạc" },
    //     { name: "Anime", value: "Anime" },
    //     { name: "Chiến Tranh", value: "Chiến Tranh" },
    //     { name: "Cổ Trang", value: "Cổ Trang" },
    //     { name: "Hài Hước", value: "Hài Hước" },
    //     { name: "Hành Động", value: "Hành Động" },
    //     { name: "Hình Sự", value: "Hình Sự" },
    //     { name: "Khoa Học", value: "Khoa Học" },
    //     { name: "Kinh Dị", value: "Kinh Dị" },
    //     { name: "Phiêu Lưu", value: "Phiêu Lưu" },
    //     { name: "Tâm Lý", value: "Tâm Lý" },
    //     { name: "Tình Cảm", value: "Tình Cảm" },
    //     { name: "Viễn Tưởng", value: "Viễn Tưởng" }
    // ]
    // const countryArray = [
    //     { name: "Quốc Gia", value: "" },
    //     { name: "Việt Nam", value: "Việt Nam" },
    //     { name: "Trung Quốc", value: "Trung Quốc" },
    //     { name: "Hàn Quốc", value: "Hàn Quốc" },
    //     { name: "Nhật Bản", value: "Nhật Bản" },
    //     { name: "Ấu", value: "Âu" },
    //     { name: "Mỹ", value: "Mỹ" },
    //     { name: "Thái Lan", value: "Thái Lan" },
    //     { name: "Đài Loan", value: "Đài Loan" },
    //     { name: "Hồng Kông", value: "Hồng Kông" },
    //     { name: "Ấn Độ", value: "Ấn Độ" }
    // ]

    // const releaseDateArray = [

    //     { name: "Năm Phát Hành", value: 0 },
    //     { name: 2025, value: 2025 },
    //     { name: 2024, value: 2024 },
    //     { name: 2023, value: 2023 },
    //     { name: 2022, value: 2022 },
    //     { name: 2021, value: 2021 },
    //     { name: 2020, value: 2020 },
    //     { name: 2019, value: 2019 },
    //     { name: 2018, value: 2018 },
    //     { name: 2017, value: 2017 },
    //     { name: 2016, value: 2016 },
    //     { name: 2015, value: 2015 },
    //     { name: 2014, value: 2014 },
    //     { name: 2013, value: 2013 },
    //     { name: 2012, value: 2012 },
    //     { name: 2011, value: 2011 },
    //     { name: 2010, value: 2010 },
    //     { name: 2009, value: 2009 },
    //     { name: 2008, value: 2008 },
    //     { name: 2007, value: 2007 },
    //     { name: "Trước năm 2007", value: -1 }
    // ]

    // const categoryArray = [
    //     { name: "Hình Thức", value: "" },
    //     { name: "Phim Bộ", value: "Phim Bộ" },
    //     { name: "Phim Lẻ", value: "Phim Lẻ" }
    // ]
    // const handleOnChange = (event, setState) => {
    //     setState(event.target.value);
    // }


    // useEffect(() => {
    //     if (genre && !listGenre.includes(genre)) {
    //         setListGenre(listGenre => [...listGenre, genre])
    //     }
    // }, [genre])

    // useEffect(() => {
    //     if (genreRemove) {
    //         setListGenre(listGenre.filter(item => item != genreRemove));
    //     }
    // }, [genreRemove])

    // const handleOnClick = () => {
    //     const data = [
    //         title,
    //         description,
    //         category,
    //         parseInt(releaseDate),
    //         country,
    //         imageURL,
    //         parseInt(episode),
    //         videoURL,
    //         listGenre
    //     ]
    //     const postData = async () => {
    //         let result = await postMethod(data, `http://localhost:8080/Web-film/api/movies/authorization/add-movie`)
    //         result = await result.json();
    //         setResponse(result.message)
    //     }
    //     postData();
    // }

    useEffect(() => {
        const fetchData = async () => {
            let result = await getMethod(`http://localhost:8080/Web-film/api/movies/authorization/get-all-movies`)
            result = await result.json();
            // setResponse(result.message)
            console.log(result.data)
        }
        fetchData();
    }, [])

    return (
        // <div>
        //     <div className='margin-header  flex-row ' style={{ justifyContent: "center", marginTop: "100px" }} >
        //         <WrapperBox style={{ width: "70em", alignItems: "center" }}>
        //             <div className="flex-row" style={{ justifyContent: "space-between" }}>
        //                 <div className="flex-column" style={{ alignItems: "flex-start" }}>
        //                     <div className="flex-row">
        //                         <Input value={title} label={"Title"} placeholder={"Title"} className={"default-input"} type={"text"} onChange={(event) => handleOnChange(event, setTitle)} />
        //                         <Input value={episode} className="default-input-half" label={"Episode"} placeholder={"episode"} type={"text"} onChange={(event) => { handleOnChange(event, setEpisode) }} />
        //                     </div>
        //                     <div className="flex-row" style={{ alignItems: "flex-end" }}>
        //                         <Input value={imageURL} label={"ImageURL"} placeholder={"http://imageurl.com"} className={"default-input"} type={"text"} onChange={(event) => handleOnChange(event, setImageURL)} />
        //                         <DropDown value={category} style={{ width: "12em" }} array={categoryArray} onChange={(event) => handleOnChange(event, setCategory)} />
        //                     </div>

        //                     <div className="flex-column">
        //                         <label>description</label>
        //                         <textarea rows={7} cols={80} value={description} onChange={(event) => handleOnChange(event, setDescription)}></textarea>
        //                     </div>
        //                 </div>
        //                 <div className="flex-column" style={{ alignItems: "flex-start" }}>

        //                     <Input value={videoURL} label={"VideoURL"} placeholder={"http://videourl.com"} type={"text"} onChange={(event) => { handleOnChange(event, setVideoURL) }} />
        //                     <div className="flex-row" >
        //                         <DropDown value={country} style={{ width: "12em" }} array={countryArray} onChange={(event) => handleOnChange(event, setCountry)} />
        //                         <DropDown value={releaseDate} style={{ width: "12em" }} array={releaseDateArray} onChange={(event) => handleOnChange(event, setReleaseDate)} />
        //                     </div>
        //                     <div className="flex-row">

        //                         <DropDown value={""} style={{ width: "12em" }} array={genreArray} onChange={(event) => handleOnChange(event, setGenre)} />
        //                     </div>
        //                     <div style={{ display: 'grid', gridTemplateColumns: "auto auto auto auto", gap: "2px" }}>
        //                         {listGenre.length != 0 && listGenre.map((item) => {
        //                             return (
        //                                 <span key={item} style={{ margin: "0 3px", backgroundColor: "black", color: "white", padding: "2px 5px", borderRadius: "8px", cursor: "pointer", textAlign: "center" }} onClick={() => setGenreRemove(item)}>{item}</span>
        //                             )
        //                         })}
        //                     </div>
        //                 </div>
        //             </div>
        //             {response && (
        //                 <p style={{ color: response == "ok" ? "green" : "red", alignSelf: "center" }}>{response}</p>
        //             )}
        //             <Button onClick={handleOnClick} style={{ alignSelf: "center" }}>+ create +</Button>
        //         </WrapperBox>

        //     </div>
        // </div>
        <div className="flex-column margin-header">
            <div>
                <button style={{ backgroundColor: "aqua", marginTop: "5px" }}>
                    <i style={{ color: "black", fontSize: "25px" }} className="fa-solid fa-square-plus"></i>
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "15em" }}>Title</th>
                        <th style={{ width: "15em" }}>Image</th>
                        <th style={{ width: "40em" }}>Descrition</th>
                        <th style={{ width: "5em" }}>Detail</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>hi</td>
                        <td>hi</td>
                        <td>hi</td>
                        <td>hi</td>
                        <td className={styles.action}>
                            <div className={[styles.icon, styles.add_episode].join(" ")}><i className="fa-solid fa-upload"></i></div>
                            <div className={[styles.icon, styles.update].join(" ")}><i className="fa-solid fa-pen"></i></div>
                            <div className={[styles.icon, styles.delete].join(" ")}><i className="fa-solid fa-trash"></i></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CreateMovie