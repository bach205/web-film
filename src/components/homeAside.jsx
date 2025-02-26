import { useEffect, useState } from "react";
import styles from "../css/homeAside.module.css";
import { getMethod } from "../library/API";


function HomeAside() {
    const [topList, setTopList] = useState([])
    const [duration, setDuration] = useState("week");

    const fetchData = async () => {
        let result = await getMethod(`http://localhost:8080/Web-film/api/movies/load-most-view-by-duration?duration=${duration}`);
        result = await result.json()
        setTopList(result.listData[0])
    }
    useEffect(() => {
        fetchData();
    }, [duration])
    return (
        <div className='margin-header'>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <TopStatic movie={topList} label={duration} setDuration={setDuration} />
                </div>
            </div>
        </div>
    )
}


const TopStatic = ({ movie, label, setDuration }) => {
    const handleOnClick = (item) => {
        window.location.href = `http://localhost:5173/watch/${item?.id ? item.id : item.movieId}/${item.title}/1`
    }
    const handleDurationOnClick = (type) => {
        setDuration(type);
    }
    console.log(movie)
    return (
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "black", boxShadow: "0 0 5px 1px aqua", marginTop: "20px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "0" }}>{"TOP View"}</h3>
            <div className="flex-row" style={{ justifyContent: "center", gap: "0" }}>
                <p onClick={() => { handleDurationOnClick("week") }} className={styles.label} style={{ backgroundColor: label === "week" ? "#242424" : "" }}>{"Week"}</p>
                <p onClick={() => { handleDurationOnClick("month") }} className={styles.label} style={{ backgroundColor: label === "month" ? "#242424" : "" }}>{"Month"}</p>
                <p onClick={() => { handleDurationOnClick("year") }} className={styles.label} style={{ backgroundColor: label === "year" ? "#242424" : "" }}>{"Year"}</p>
            </div>
            {movie && movie.map((movie) => {
                return (
                    <div key={movie.movieId} style={{ display: "inline-flex", flexDirection: "row", width: "15em", backgroundColor: "gray", border: "solid 1px white", minHeight: "5em" }}>
                        <img onClick={() => { handleOnClick(movie) }} src={movie.imageURL} width={"50%"} height={"auto"} style={{ cursor: "pointer" }} />
                        <div onClick={() => { handleOnClick(movie) }} style={{ padding: "0 10px" }}>
                            <p className="text-hover-aqua" style={{ cursor: "pointer", color: "black", margin: "2px 0", wordWrap: "break-word", fontSize: "13px" }}>{movie.title}</p>
                            <p style={{ fontSize: "13px", color: "black", marginTop: "0" }}>{"Lượt xem: " + movie.totalView}</p>
                            <p style={{ fontSize: "13px", color: "black", marginTop: "0" }}>{"Số tập: " + movie.totalEpisode}</p>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default HomeAside