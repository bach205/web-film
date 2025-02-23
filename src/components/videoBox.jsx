import { useContext, useState, useEffect } from "react"
import { LoginContext } from "../context/loginProvider"
import "../css/videoBox.css"
import { postMethod } from "../library/API"
import { DropDown } from "./form/dropdown";
import { ReLoadApiContext, ReloadApiProvider } from "../context/reloadApiProvider";
function VideoBox({ children, item, episode }) {

    const { userData } = useContext(LoginContext);
    const [isHover, setIsHover] = useState(false);
    const [toggleUpdateVideoModal, setToggleUpdateVideoModel] = useState(false);
    const { setRefresh } = useContext(ReLoadApiContext)

    const handleOnClick = (item) => {
        window.location.href = `http://localhost:5173/watch/${item?.id ? item.id : item.movieId}/${item.title}/${episode}`
    }

    const addToWatchLater = async (item) => {
        if (userData) {
            let data = {
                userId: userData?.id,
                movieId: item.id
            }
            let result = await postMethod(data, "http://localhost:8080/Web-film/api/movies/add-to-watchlater");
            result = await result.json();
            alert(result.message);
        } else {
            alert("you need login to use this feature");
        }
    }

    const watchLaterClick = (item) => {
        addToWatchLater(item)
    }

    const UpdateAndDeleteVideo = () => {

        const handleDelete = async () => {
            let result = await postMethod(item?.id, "http://localhost:8080/Web-film/api/movies/authorization/remove-movie")
            result = await result.json();
            if (result.status != 200) {
                alert(result.message);
            } else {
                setRefresh(refresh => !refresh)
            }
        }

        return (
            <>
                {userData?.role == 1 && (
                    <>
                        <button onClick={() => setToggleUpdateVideoModel(!toggleUpdateVideoModal)} className="video-box-btn video-box-btn-update"><i className="fa-solid fa-pen-to-square"></i></button>
                        <button onClick={handleDelete} className="video-box-btn video-box-btn-delete"><i className="fa-solid fa-x"></i></button>
                    </>
                )}
            </>
        )
    }
    const VideoDescription = () => {
        return (
            <div className="video-box-container">

                <img src={item?.imageURL} />
                <span className="video-box-container-after" onClick={() => handleOnClick(item)}>
                    <span id="thumnail-description">{item?.description}</span>
                    <br />

                </span>
                {children}

            </div>
        )
    }
    const VideoDetail = () => {
        return (
            <>
                <div style={{ display: "flex", gap: "2px", flexDirection: "row", alignItems: "center" }}>
                    <span style={{ marginTop: "5px" }} className="video-box-title">{item?.title}</span>
                </div>
                <span style={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: "3px" }}>
                    <div className="videobox-hightlight videobox-category">{item?.category}</div>
                    <div className="videobox-hightlight videobox-country">{item?.country}</div>
                    <div className="videobox-hightlight videobox-releaseDate">{item?.releaseDate}</div>
                </span>
                <div className="flex-row">
                    <span className="video-box-title">Rate: 5<i className="fa-solid fa-star" style={{ color: "yellow" }}></i></span>

                </div>
                <div style={{ alignSelf: "flex-end" }} className="video-box-watch-later-button" title="watch later" onClick={() => watchLaterClick(item)}>
                    <i className="fa-solid fa-bookmark"></i>
                </div>
            </>
        )
    }
    return (
        <div className="flex-column">
            <div className="video-box-container-parent" style={{ display: "flex", flexDirection: "column", alignItems: "center" }} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => { setIsHover(false) }}>
                <UpdateAndDeleteVideo />
                <VideoDescription />
                <VideoDetail />
                {toggleUpdateVideoModal && <VideoUpdateModel item={item} setToggleUpdateVideoModel={setToggleUpdateVideoModel} />}
            </div>

        </div>

    )
}

const VideoUpdateModel = ({ item, setToggleUpdateVideoModel }) => {
    const [title, setTitle] = useState(item?.title);
    const [description, setDescription] = useState(item?.description)
    const [imageURL, setImageURL] = useState(item?.imageURL)
    const [country, setCountry] = useState(item?.country);
    const [releaseDate, setReleaseDate] = useState(item?.releaseDate);
    const [category, setCategory] = useState(item?.category);

    const { setRefresh } = useContext(ReLoadApiContext);

    const [visibleRes, setVisibleRes] = useState(false);

    const [response, setResponse] = useState("");
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



    const handleOnClick = () => {
        const data = {
            id: item?.id,
            title,
            description,
            category,
            releaseDate: parseInt(releaseDate),
            country,
            imageURL
        }
        const postData = async () => {
            let result = await postMethod(data, `http://localhost:8080/Web-film/api/movies/authorization/update-movie`)
            result = await result.json();
            setResponse(result)
            if (result.status == 200) {
                setRefresh(refresh => !refresh);
                setToggleUpdateVideoModel(false);
            } else {
                setVisibleRes(true);
            }
        }
        postData();
    }

    useEffect(() => {
        let timeout = setTimeout(() => {
            setVisibleRes(false);
        }, 1500);
        if (visibleRes) {
            timeout
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [visibleRes])
    return (
        <div className="videobox-update" style={{ gap: "0.5em", zIndex: "2", display: "flex", justifyContent: "center", flexDirection: "column", position: "absolute", width: "100%", height: "100%", backgroundColor: "yellow" }}>
            <div className="flex-column">
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: "20%" }}></th>
                            <th style={{ width: "80%" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ color: "black" }}>
                                Title
                            </td>
                            <td>
                                <input style={{ width: "90%" }} value={title} placeholder="..." onChange={(event) => handleOnChange(event, setTitle)} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ color: "black" }}>
                                Description
                            </td>
                            <td>
                                <input style={{ width: "90%" }} value={description} placeholder="..." onChange={(event) => handleOnChange(event, setDescription)} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ color: "black" }}>
                                ImageURL
                            </td>
                            <td>
                                <input style={{ width: "90%" }} value={imageURL} placeholder="..." onChange={(event) => handleOnChange(event, setImageURL)} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <DropDown value={category} style={{ width: "7em", height: "2.5em", fontSize: "10px", padding: "0" }} array={categoryArray} onChange={(event) => handleOnChange(event, setCategory)} />
                            </td>
                            <td className="flex-row" style={{ justifyContent: "center" }}>
                                <DropDown value={country} style={{ width: "7em", height: "2.5em", fontSize: "10px", padding: "0" }} array={countryArray} onChange={(event) => handleOnChange(event, setCountry)} />
                                <DropDown value={releaseDate} style={{ width: "7em", height: "2.5em", fontSize: "10px", padding: "0" }} array={releaseDateArray} onChange={(event) => handleOnChange(event, setReleaseDate)} />
                            </td>

                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="flex-row" style={{ justifyContent: "center" }}>
                <button onClick={handleOnClick} style={{ backgroundColor: "green", padding: "0.5em", fontSize: "15px", justifyContent: "center" }} className="flex-row"><i className="fa-solid fa-circle-check"></i></button>
                <button onClick={() => setToggleUpdateVideoModel(toggleUpdateVideoModal => !toggleUpdateVideoModal)} style={{ backgroundColor: "gray", padding: "0.5em", fontSize: "15px", justifyContent: "center" }} className="flex-row"><i className="fa-solid fa-circle-xmark"></i></button>
            </div>
            <p style={{ position: "absolute", bottom: "0", backgroundColor: response?.status == 200 ? "green" : "red", padding: "0 1em", opacity: visibleRes ? "1" : "0", transition: "all 1s ease" }}>{response.message}</p>
        </div >
    )
}

export default VideoBox