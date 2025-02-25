import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from "../css/watching.module.css"
import { getMethod, postMethod } from '../library/API';
import ContentContainerList from '../components/contentContainerList';

//https://trailer.vieon.vn/Teaser_BachNguyetPhanTinh_mkt.mp4
//https://trailer.vieon.vn/Teaser_NgoaiGiaHoiXuan_mkt.mp4

function Watching() {
    const { movieId, title, episode } = useParams();
    const [data, setData] = useState("");
    const [isFetch, setIsFetch] = useState(false);
    const [trendingArray, setTrendingArray] = useState([]);
    const [relativeArray, setRelativeArray] = useState([]);

    const handleOnClick = (movieId, title, episode) => {
        window.location.href = `http://localhost:5173/watch/${movieId}/${title}/${episode}`
    }

    const fetchData = async () => {
        let result = await getMethod(`http://localhost:8080/Web-film/api/movies/get-episode-data/${title}/${episode}`);
        result = await result.json();
        if (result.status == 200) {
            setData(result.data);
            setTrendingArray(result.listData[0]);
            setRelativeArray(result.listData[1]);
        }

    }
    const updateView = async () => {
        let body = {
            movieId,
            episode
        }
        let result = await postMethod(body, "http://localhost:8080/Web-film/api/movies/update-episode-view");
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
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className='flex-row' style={{ justifyContent: "center" }}>
                    <iframe width="1400" height="600" src={data.videoURL} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <h3><span className={styles.secondary}>{"Tên phim: "}</span>{data?.title}</h3>
                <p style={{ marginTop: "0" }}>
                    <span className={styles.secondary}>View: </span>{data?.view}
                </p>
                <div>
                    <RatingStar />
                </div>
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
                {trendingArray && <ContentContainerList label={"Phim Đề Cử"} array={trendingArray} episode={1} />}
                {relativeArray.length != 0 && <ContentContainerList label={"Phim Cùng Thể Loại"} array={relativeArray} episode={1} />}
            </div>
        </div>
    )
}

const RatingStar = () => {
    const arr = new Array(5).fill(0);
    const [star, setStar] = useState([false, false, false, false, false]);

    const handleHoverStar = (index) => {
        let tmp = [...star];
        for (let i = 0; i <= index; i++) {
            tmp[i] = true;
        }
        setStar([...tmp])
    }
    const handleLeaveStar = () => {
        setStar([false, false, false, false, false]);
    }

    return (
        <p>
            {arr.map((_, index) => {
                return (
                    <span span key={index} style={{ color: star[index] && "yellow" }}> <i onMouseEnter={() => handleHoverStar(index)} onMouseLeave={handleLeaveStar} className="fa-solid fa-star" ></i></span>
                )
            })}
        </p >
    )
}

export default Watching