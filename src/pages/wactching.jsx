import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from "../css/watching.module.css"
import { getMethod, postMethod } from '../library/API';

//https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4
//https://trailer.vieon.vn/Teaser_NgoaiGiaHoiXuan_mkt.mp4

function Watching() {
    const { movieId, title, episode } = useParams();
    const [data, setData] = useState("");
    const [isFetch, setIsFetch] = useState(false);

    const handleOnClick = (movieId, title, episode) => {
        window.location.href = `http://localhost:5173/watch/${movieId}/${title}/${episode}`
    }

    const fetchData = async () => {
        let result = await getMethod(`http://localhost:8080/Web-film/api/movies/get-episode-data/${title}/${episode}`);
        result = await result.json();
        if (result.status == 200) {
            console.log(result.data);
            setData(result.data);
            return result.data;
        }
        return null;

    }
    const updateView = async () => {
        let data = {
            movieId,
            episode
        }
        let result = await postMethod(data, "http://localhost:8080/Web-film/api/movies/update-episode-view");
        result = await result.json();
    }
    useEffect(() => {
        fetchData();
        setIsFetch(true);
    }, [])

    useEffect(() => {
        if (isFetch) {
            updateView();
        }
    }, [isFetch])
    console.log(data)
    return (
        <div className='margin-header'>
            <div style={{ display: "flex", padding: "0 20px", flexDirection: "column" }}>
                {/* <iframe width="1400" height="600" src="https://www.youtube.com/embed/wojenfJRVwU?si=cnFQHW38eKB4kVsm" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}

                <h3><span className={styles.secondary}>{"Tên phim: "}</span>{data?.title}</h3>
                <p style={{ marginTop: "0" }}>
                    <span className={styles.secondary}>View: </span>{data?.view}
                </p>
                <div style={{ display: "flex", flexDirection: "row", gap: "2em" }}>
                    <img src={data?.imageURL} style={{ borderRadius: "10px" }} />
                    <p style={{ display: "inline-block" }}>{data?.description}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "25em", margin: "2em 0" }}>
                    <span>
                        <span className={styles.secondary}>{"Thể loại: "}</span>
                        {data?.genre && data?.genre.map((item, index) => {
                            return (
                                <span key={index}>
                                    {index != data?.genre.length - 1 ? item + ", " : item}
                                </span>
                            )
                        })}
                    </span>
                    <span style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                        <span>{data?.country}</span>
                        <span className={styles.secondary}>|</span>
                        <span>{data?.category}</span>
                        <span className={styles.secondary}>|</span>
                        <span>{data?.releaseDate}</span>
                        <span className={styles.secondary}>|</span>
                        <span>{data?.country}</span>
                    </span>

                </div>
                <div className={styles.episodeContainer}>
                    <div className={styles.episodeWrapper}>
                        {Array.from({ length: data?.totalEpisode }).map((_, index) => {
                            let functionEpisode = index + 1;
                            return (
                                <span onClick={() => { handleOnClick(movieId, title, functionEpisode) }} key={index} className={styles.episode} style={functionEpisode == episode ? { backgroundColor: "brown" } : {}}>{functionEpisode}</span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Watching