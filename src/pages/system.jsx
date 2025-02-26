import { Outlet, useLocation, useNavigate, useParams } from "react-router"
import { useEffect, useRef, useState } from "react";
import styles from "../css/system.module.css"

const System = () => {
    const navUser = useRef(null);
    const navMovie = useRef(null);
    const navStatic = useRef(null);
    const [nav, setNav] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean); // Loại bỏ chuỗi rỗng
    const lastSegment = segments[segments.length - 1]; // Lấy phần cuối

    useEffect(() => {
        if (lastSegment == "user") {
            setNav(navUser)
        } else if (lastSegment == "movie") {
            setNav(navMovie)
        } else if (lastSegment == "statics") {
            setNav(navStatic)
        }
    }, [])

    const handleOnClickNav = (current, url) => {
        setNav(current)
        navigate(url);
    }
    return (
        <div className="margin-header flex-row" style={{ padding: "0", gap: "2.5em" }}>
            <nav>
                <ul className={styles.navbar}>
                    <li className={[styles.first, styles.main].join(" ")}></li>
                    <li className={styles.main} style={{ backgroundColor: lastSegment == "user" ? "purple" : "" }}>
                        <div ref={navUser} onClick={() => { handleOnClickNav(navUser, "user") }} href="user">User</div>
                    </li>
                    <li className={styles.main} style={{ backgroundColor: lastSegment == "movie" ? "purple" : "" }}>
                        <div ref={navMovie} onClick={() => { handleOnClickNav(navMovie, "movie") }} href="movie">Movie</div>
                    </li>
                    <li className={styles.main} style={{ backgroundColor: lastSegment == "statics" ? "purple" : "" }}>
                        <div ref={navStatic} onClick={() => { handleOnClickNav(navStatic, "statics") }} href="statics">Statics</div>
                    </li>
                    <li className={[styles.last, styles.main].join(" ")}></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
export default System