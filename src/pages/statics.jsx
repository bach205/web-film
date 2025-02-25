import { useEffect, useState } from "react";
import { getMethod } from "../library/API"
import VideoBox from "../components/videoBox";
import styles from "../css/statics.module.css"


function Statics() {

    const [mostView, setMostView] = useState([])
    const [leastView, setLeastView] = useState([])
    const [totalView, setTotalView] = useState("");
    const [totalMovie, setTotalMovie] = useState("")

    const fetchData = async () => {
        let result = await getMethod("http://localhost:8080/Web-film/api/movies/load-most-view-by-duration?duration=month");
        result = await result.json()
        setMostView(result.listData[0].slice(0, 5) || 0)
        setLeastView(result.listData[0].slice(5, 10) || 0)
        setTotalMovie(result.listData[1][0])
        setTotalView(result.listData[1][1])
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className='margin-header'>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <TopStatic movie={mostView} label={"The Most View"} />
                    <div>
                        <h2><span style={{ color: "aqua" }}>Total Movie: </span>{totalMovie}<span style={{ color: "gray" }}> Movies</span></h2>
                        <h2><span style={{ color: "aqua" }}>Total View: </span>{totalView}<span style={{ color: "gray" }}> Views</span></h2>
                    </div>
                    <TopStatic movie={leastView} label={"The Least View"} />
                </div>
            </div>
        </div>
    )
}

const TopStatic = ({ movie, label }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 className={styles.label}>{label}</h3>
            {movie && movie.map((movie) => {
                return (
                    <div key={movie.movieId} style={{ display: "inline-flex", flexDirection: "row", gap: "10px", border: "solid 2px gray", width: "29em" }}>
                        <img src={movie.imageURL} width={"200em"} height={"auto"} />
                        <div style={{ padding: "0 10px" }}>
                            <p style={{ margin: "2px 0" }}><span style={{ color: "gray" }}>Title: </span>{movie.title}</p>
                            <p style={{ margin: "2px 0" }}><span style={{ color: "gray" }}>View: </span>{movie.view}</p>
                            <p style={{ margin: "2px 0" }}><span style={{ color: "gray" }}>View per episode: </span>{movie.totalEpisode}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default Statics