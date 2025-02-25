import { Outlet, useLocation, useNavigate, useParams } from "react-router"
import { useEffect, useRef, useState } from "react";
import styles from "../css/system.module.css"

const System = () => {
    const navUser = useRef(null);
    const navMovie = useRef(null);
    const navStatic = useRef(null);
    const [nav, setNav] = useState("");
    const [isHover, setIsHover] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean); // Loại bỏ chuỗi rỗng
    const lastSegment = segments[segments.length - 1]; // Lấy phần cuối

    console.log(isHover)
    useEffect(() => {
        if (lastSegment == "user") {
            setNav(navUser)
        } else if (lastSegment == "movie") {
            setNav(navMovie)
        } else if (lastSegment == "statics") {
            setNav(navStatic)
        }
    }, [])

    useEffect(() => {
        if (isHover) {
            nav?.current?.blur()
        } else {
            nav?.current?.focus()
        }
    }, [nav, isHover])

    const handleOnMousEnter = () => {
        setIsHover(true);
        nav?.current?.blur()

    }
    const handleOnMouseLeave = () => {
        setIsHover(false);
        nav?.current?.focus()

    }
    const handleClickOutside = (event) => {
        if (!isHover && (!navUser?.current?.contains(event.target) || !navMovie?.current?.contains(event.target) || !navStatic?.current?.contains(event.target))) {
            nav?.current?.focus()
        } else if (isHover) {
            nav?.current?.blur()
        }
    };

    const handleOnClickNav = (current, url) => {
        setNav(current)
        navigate(url);

    }
    return (
        <div className="margin-header flex-row" style={{ padding: "0", gap: "2.5em" }}>
            <nav>
                <ul className={styles.navbar}>
                    <li className={[styles.first, styles.main].join(" ")}></li>
                    <li onBlur={(event) => { handleClickOutside(event) }} onMouseEnter={handleOnMousEnter} onMouseLeave={handleOnMouseLeave} ref={navUser} tabIndex={0} className={styles.main} >
                        <div onClick={() => { handleOnClickNav(navUser, "user") }} href="user">User</div>
                    </li>
                    <li onBlur={(event) => { handleClickOutside(event) }} onMouseEnter={handleOnMousEnter} onMouseLeave={handleOnMouseLeave} ref={navMovie} tabIndex={0} className={styles.main}>
                        <div onClick={() => { handleOnClickNav(navMovie, "movie") }} href="movie">Movie</div>
                    </li>
                    <li onBlur={(event) => { handleClickOutside(event) }} onMouseEnter={handleOnMousEnter} onMouseLeave={handleOnMouseLeave} ref={navStatic} tabIndex={0} className={styles.main}>
                        <div onClick={() => { handleOnClickNav(navStatic, "statics") }} href="statics">Statics</div>
                    </li>
                    <li className={[styles.last, styles.main].join(" ")}></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
export default System