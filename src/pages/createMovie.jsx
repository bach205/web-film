import { useContext, useEffect, useState } from "react";
import Button from "../components/form/button";
import { DropDown } from "../components/form/dropdown";
import Input from "../components/form/input";
import { Pagination } from "../components/pagination.jsx";
import styles from "../css/movieManagement.module.css";
import { getMethod, postMethod } from "../library/API";
import { truncateString } from "../library/truncateString.js";
import { ReLoadApiContext } from "../context/reloadApiProvider.jsx";


function CreateMovie() {

    const [response, setResponse] = useState("");
    const { refresh } = useContext(ReLoadApiContext)
    const [page, setPage] = useState(1);
    const [listMovie, setListMovie] = useState([]);
    const [listMovieEachPage, setListMovieEachPage] = useState([]);
    const TOTAL_VIDEO_PER_PAGE = 12;
    const TOTAL_COLUMN = 5


    const [createModal, setCreateModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            let result = await getMethod(`http://localhost:8080/Web-film/api/movies/authorization/get-all-movies`)
            result = await result.json();
            setListMovie(result.data)
        }
        fetchData();
    }, [refresh])
    useEffect(() => {
        setListMovieEachPage(listMovie.slice(TOTAL_VIDEO_PER_PAGE * (page - 1), (TOTAL_VIDEO_PER_PAGE * page)))
    }, [page, listMovie])
    const openCreateModal = () => {
        setCreateModal(true);
    }
    return (
        <div className={styles.container}>
            {response && <div className={styles.response}>{response?.message}</div>}
            <div>
                <button onClick={openCreateModal} style={{ backgroundColor: "aqua", marginTop: "5px" }}>
                    <i style={{ color: "black", fontSize: "25px" }} className="fa-solid fa-square-plus"></i>
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "10em" }}>Title</th>
                        <th style={{ width: "15em" }}>Image</th>
                        <th style={{ width: "20em" }}>Descrition</th>
                        <th style={{ width: "8em" }}>Detail</th>
                        <th style={{ width: "8em" }}>Genre</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                    <RenderListMovie array={listMovieEachPage} response={response} setResponse={setResponse} />
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} totalColumn={TOTAL_COLUMN} totalPage={Math.ceil(listMovie.length / TOTAL_VIDEO_PER_PAGE)} />
            {createModal && <CreateModal setCreateModal={setCreateModal} response={response} setResponse={setResponse} />}


        </div>
    )
}

const RenderListMovie = ({ array, response, setResponse }) => {
    const { setRefresh } = useContext(ReLoadApiContext)
    const [updateModal, setUpdateModal] = useState(false);
    const handleDelete = async (id) => {
        let result = await postMethod(id, "http://localhost:8080/Web-film/api/movies/authorization/remove-movie")
        result = result.json();
        setRefresh(refresh => !refresh)
        setResponse(result);

    }
    const [id, setId] = useState("");
    return (
        array.map((item) => {
            console.log(id)
            return (
                <tr key={item?.id}>
                    <td>{item?.title}</td>
                    <td><img src={item?.imageURL} alt={item?.title} height={"100%"} width={"100%"} /></td>
                    <td>{truncateString(item?.description, 250)}</td>
                    <td>
                        <div>{item?.category}</div>
                        <div>{item?.country}</div>
                        <div>{item?.releaseDate}</div>
                    </td>
                    <td>
                        {item?.genre.map((item) =>
                            <div key={item} >{item}</div>
                        )}
                    </td>
                    <td className={styles.action}>
                        <div onClick={() => { setId(item?.id); setUpdateModal(true) }} className={[styles.icon, styles.add_episode].join(" ")}><i className="fa-solid fa-upload"></i></div>
                        <div className={[styles.icon, styles.update].join(" ")}><i className="fa-solid fa-pen"></i></div>
                        <div onClick={() => { handleDelete(item?.id) }} className={[styles.icon, styles.delete].join(" ")}><i className="fa-solid fa-trash"></i></div>
                    </td>
                    {updateModal && <UpdateModal setUpdateModal={setUpdateModal} response={response} setResponse={setResponse} id={id} />}
                </tr>
            )
        })
    )
}
const CreateModal = ({ setCreateModal, response, setResponse }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [genre, setGenre] = useState("");
    const [country, setCountry] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [category, setCategory] = useState("");
    const { setRefresh } = useContext(ReLoadApiContext)

    const [listGenre, setListGenre] = useState([]);
    const [genreRemove, setGenreRemove] = useState("");

    console.log(response?.message)
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


    useEffect(() => {
        if (genre && !listGenre.includes(genre)) {
            setListGenre(listGenre => [...listGenre, genre])
        }
    }, [genre])

    useEffect(() => {
        if (genreRemove) {
            setListGenre(listGenre.filter(item => item != genreRemove));
        }
    }, [genreRemove])

    const handleOnClick = () => {
        const data = [
            title,
            description,
            category,
            parseInt(releaseDate),
            country,
            imageURL,
            listGenre
        ]
        const postData = async () => {
            let result = await postMethod(data, `http://localhost:8080/Web-film/api/movies/authorization/add-movie`)
            result = await result.json();
            setRefresh(refresh => !refresh)
            setResponse(result)
        }
        postData();
    }
    return (
        <div className={styles.container_modal}>
            <div className={styles.modal}>
                <button className={styles.close_button} onClick={() => { setCreateModal(false); setResponse("") }}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <div className="flex-row">
                    <Input value={title} label={"Title"} placeholder={"Title"} className={"default-input"} type={"text"} onChange={(event) => handleOnChange(event, setTitle)} />
                    <Input value={imageURL} label={"ImageURL"} placeholder={"http://imageurl.com"} className={"default-input"} type={"text"} onChange={(event) => handleOnChange(event, setImageURL)} />
                </div>

                <div className="flex-column">
                    <label>Description</label>
                    <textarea className={styles.description} rows={7} cols={80} value={description} onChange={(event) => handleOnChange(event, setDescription)}></textarea>

                </div>
                <div className="flex-row">
                    <DropDown value={category} style={{ width: "12em" }} array={categoryArray} onChange={(event) => handleOnChange(event, setCategory)} />
                    <DropDown value={country} style={{ width: "12em" }} array={countryArray} onChange={(event) => handleOnChange(event, setCountry)} />
                    <DropDown value={releaseDate} style={{ width: "12em" }} array={releaseDateArray} onChange={(event) => handleOnChange(event, setReleaseDate)} />
                    <DropDown value={""} style={{ width: "12em" }} array={genreArray} onChange={(event) => handleOnChange(event, setGenre)} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: "auto auto auto auto", gap: "2px" }}>
                    {listGenre.length != 0 && listGenre.map((item) => {
                        return (
                            <span key={item} style={{ margin: "0 3px", backgroundColor: "gray", color: "black", padding: "2px 5px", borderRadius: "8px", cursor: "pointer", textAlign: "center" }} onClick={() => setGenreRemove(item)}>{item}</span>
                        )
                    })}
                </div>

                {response && (
                    <div className={styles.response} style={{ color: response.status == 200 ? "green" : "red", alignSelf: "center" }}>{response.message}</div>
                )}
                <Button onClick={handleOnClick} style={{ alignSelf: "center" }}>+ create +</Button>
            </div>
        </div>
    )
}
const UpdateModal = ({ setUpdateModal, response, setResponse, id }) => {
    const [videoURL, setVideoURL] = useState("");
    const [episode, setEpisode] = useState("");
    const { setRefresh } = useContext(ReLoadApiContext)



    const handleOnChange = (event, setState) => {
        setState(event.target.value);
    }


    const handleOnClick = () => {
        const data = {
            movieId: id,
            episode,
            videoURL
        }
        const postData = async () => {
            let result = await postMethod(data, `http://localhost:8080/Web-film/api/movies/authorization/add-episode`)
            result = await result.json();
            setRefresh(refresh => !refresh)
            setResponse(result)

        }
        postData();
    }

    return (
        <div className={styles.container_modal}>
            <div className={styles.modal}>
                <button className={styles.close_button} onClick={() => { setUpdateModal(false); setResponse("") }}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h1 style={{ color: "white" }} >Add episode</h1>
                <div className="flex-row">
                    <Input value={episode} label={"Episode"} placeholder={"Episode"} className={"default-input"} type={"text"} onChange={(event) => handleOnChange(event, setEpisode)} />
                    <Input value={videoURL} label={"videoURL"} placeholder={"http://videoURL.com"} className={"default-input"} type={"text"} onChange={(event) => handleOnChange(event, setVideoURL)} />
                </div>


                {response && (
                    <div className={styles.response} style={{ color: response.status == 200 ? "green" : "red", alignSelf: "center" }}>{response.message}</div>
                )}
                <Button onClick={() => handleOnClick()} style={{ alignSelf: "center" }}>+ create +</Button>
            </div>
        </div>
    )
}

export default CreateMovie