import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/loginProvider';
import { getMethod, postMethod } from '../library/API';
import styles from "../css/AdminManagement.module.css";
import { Pagination } from "../components/pagination"

//https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4
//https://trailer.vieon.vn/Teaser_NgoaiGiaHoiXuan_mkt.mp4

function WatchLater() {

    const { userData } = useContext(LoginContext);
    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState("");
    const [listMovie, setListMovie] = useState([]);
    const [listMovieEachPage, setListMovieEachPage] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            let result = await getMethod(`http://localhost:8080/Web-film/api/movies/load-watchlater?userId=${userData?.id}`);
            result = await result.json();
            setListMovie(result.data)
        }
        fetchData()
    }, [refresh])
    const TOTAL_VIDEO_PER_PAGE = 10;
    const TOTAL_COLUMN = 5
    useEffect(() => {
        setListMovieEachPage(listMovie.slice(TOTAL_VIDEO_PER_PAGE * (page - 1), (TOTAL_VIDEO_PER_PAGE * page)));
        setTotalPage(Math.ceil(listMovie.length / TOTAL_VIDEO_PER_PAGE))
    }, [listMovie, page])


    return (
        <div className='margin-header'>
            <h1>Watch Later List</h1>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "4em" }}>Title</th>
                        <th style={{ width: "15em" }}>Image</th>
                        <th style={{ width: "40em" }}>Descrition</th>
                        <th style={{ width: "4em" }}>Detail</th>
                        <th style={{ width: "3em" }}>View</th>
                        <th className={styles.actionContainer} style={{ width: "3em", color: "black" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listMovieEachPage.map((item) => {
                        return (
                            <WatchLaterList movie={item} key={item.movieId} refresh={refresh} setRefresh={setRefresh} userData={userData} />
                        )
                    })}
                </tbody>
            </table>
            <Pagination totalPage={totalPage} page={page} setPage={setPage} totalColumn={TOTAL_COLUMN} />
        </div>
    )
}

const WatchLaterList = ({ movie, refresh, setRefresh, userData }) => {
    const handleOnClickDelete = (item, userData) => {
        let data = {
            userId: userData?.id,
            movieId: item?.movieId
        }
        const postData = async () => {
            let result = await postMethod(data, "http://localhost:8080/Web-film/api/movies/delete-watchlater");
            if (result.status == 200) {
                setRefresh(!refresh);
            }
        }
        postData();
    }

    const handleOnClick = (item) => {
        window.location.href = `http://localhost:5173/watch/${item.id}/${item.title}/1`
    }
    return (
        <tr style={{ height: "2em" }}>
            <td>{movie.title}</td>
            <td><img src={movie.imageURL} height={"100%"} width={"100%"} onClick={() => handleOnClick(movie)} style={{ cursor: "pointer" }} /></td>
            <td>{movie.description}</td>
            <td>
                <div>{movie.category}</div>
                <div>{movie.country}</div>
                <div>{movie.releaseDate}</div>
            </td>
            <td>{movie.view}</td>
            <td className={styles.action} >
                <div style={{ color: "white", cursor: "pointer", backgroundColor: "red" }} onClick={() => handleOnClickDelete(movie, userData)}>delete</div>
            </td>
        </tr>
    )
}

export default WatchLater