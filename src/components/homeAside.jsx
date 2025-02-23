import { useEffect, useState } from "react";
import styles from "../css/homeAside.module.css";
import { getMethod } from "../library/API";


function HomeAside() {

    const [mostView, setMostView] = useState([])
    const [leastView, setLeastView] = useState([])
    const [totalView, setTotalView] = useState("");
    const [totalMovie, setTotalMovie] = useState("")

    const fetchData = async () => {
        let result = await getMethod("http://localhost:8080/Web-film/api/movies/load-statics");
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
                    <TopStatic movie={leastView} label={"The Least View"} />
                </div>
            </div>
        </div>
    )
}

const TopStatic = ({ movie, label }) => {
    const handleOnClick = (item) => {
        window.location.href = `http://localhost:5173/watch/${item?.id ? item.id : item.movieId}/${item.title}/1`
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "black", boxShadow: "0 0 5px 1px aqua", marginTop: "20px" }}>
            <h3 className={styles.label}>{label}</h3>
            {movie && movie.map((movie) => {
                return (
                    <div key={movie.movieId} style={{ display: "inline-flex", flexDirection: "row", width: "15em", backgroundColor: "gray", border: "solid 1px white", minHeight: "5em" }}>
                        <img onClick={() => { handleOnClick(movie) }} src={movie.imageURL} width={"50%"} height={"auto"} style={{ cursor: "pointer" }} />
                        <div onClick={() => { handleOnClick(movie) }} style={{ padding: "0 10px" }}>
                            <p className="text-hover-aqua" style={{ cursor: "pointer", color: "black", margin: "2px 0", wordWrap: "break-word", fontSize: "13px" }}>{movie.title}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default HomeAside