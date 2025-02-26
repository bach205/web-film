import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import logoNoBackground from "../assets/bach_logo_nobackground.png";
import { LoginContext } from "../context/loginProvider";
import "../css/header.css";
import { postMethod } from "../library/API";
import Button from "./form/button";
import Input from "./form/input";

function Header() {
    const navigate = useNavigate();
    const { isLogin, setIsLogin } = useContext(LoginContext);
    const { userData, setUserData } = useContext(LoginContext);

    const [isOpenUserList, setIsOpenUserList] = useState(false);
    const [titleSearch, setTitleSearch] = useState("");

    const boxRef = useRef(null);
    const buttonRef = useRef(null);

    // Hàm kiểm tra nếu click bên ngoài
    useEffect(() => {
        function handleClickOutside(event) {
            if (boxRef.current && !boxRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsOpenUserList(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNavigate = (url) => {
        // navigate(url);
        window.location.href = "http://localhost:5173/" + url;
    }

    const handleLogout = async () => {
        await postMethod({}, "http://localhost:8080/Web-film/authentication/reset-session-cookie");
        setIsLogin(false);
        setUserData("");
    }

    const onEnterDown = (e) => {
        if (e.key == "Enter") {
            window.location.href = `http://localhost:5173/search?title=${titleSearch}`;
        }
    }

    const UserNavbar = () => {
        return (
            <ul className="user-list" ref={boxRef}>
                <li onClick={() => { handleNavigate("user") }}><i className="fa-solid fa-circle-user"></i>Hồ sơ cá nhân</li>
                <li onClick={() => { handleNavigate("watch-later") }}><i className="fa-solid fa-clock"></i>Xem sau (giỏ hàng)</li>
                <div style={{ border: "solid 1px black" }}></div>
                {checkUser && <li onClick={() => { handleNavigate("management/user") }}><i className="fa-solid fa-database"></i>Quản lí</li>}
                <div style={{ border: "solid 1px black" }}></div>
                <li onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Đăng xuất</li>
            </ul>
        )
    }


    const [toggleNavbar, setToggleNavbar] = useState(false);

    let checkUser = userData?.role === 1 || userData?.role === 2
    return (
        <div className="header-container">
            <img id="header-toggle-logo" onClick={() => { setToggleNavbar(!toggleNavbar) }} src={logoNoBackground} alt="" width="80px" height="100%" />
            <ul className="header-navbar" style={{ display: toggleNavbar ? "flex" : "none" }} id="header-ul">
                <li onClick={() => { handleNavigate("") }}><i className="fa-solid fa-house"></i>Trang chủ</li>
                <li onClick={() => { window.location.href = `http://localhost:5173/search?category=Phim%20Bộ` }}><i className="fa-solid fa-video"></i>Phim bộ</li>
                <li onClick={() => { window.location.href = `http://localhost:5173/search?category=Phim%20Lẻ` }}><i className="fa-solid fa-film"></i>Phim lẻ</li>
                <li onClick={() => { window.location.href = `http://localhost:5173/search?genre=Anime` }}><i className="fa-solid fa-dragon"></i>Anime</li>
            </ul>
            <ul className="header-navbar" id="header-ul">
                <li onClick={() => { handleNavigate("") }}><i className="fa-solid fa-house"></i>Trang chủ</li>
                <li onClick={() => { window.location.href = `http://localhost:5173/search?category=Phim%20Bộ` }}><i className="fa-solid fa-video"></i>Phim bộ</li>
                <li onClick={() => { window.location.href = `http://localhost:5173/search?category=Phim%20Lẻ` }}><i className="fa-solid fa-film"></i>Phim lẻ</li>
                <li onClick={() => { window.location.href = `http://localhost:5173/search?genre=Anime` }}><i className="fa-solid fa-dragon"></i>Anime</li>
            </ul>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Input type={"text"} placeholder={"Tìm kiếm"} className="medium-input" onKeyDown={onEnterDown} value={titleSearch} onChange={(event) => { setTitleSearch(event.target.value) }} />
            </div>

            <div>
                {!isLogin
                    ?
                    (<div className="header-right-content">
                        <Button type="small-button" onClick={() => handleNavigate("/login")}>Login</Button>
                        <Button type="small-button" onClick={() => handleNavigate("/register")}>Register</Button>
                    </div>)
                    :
                    (<div className="header-right-content">
                        <p id="header-message">{"Hello " + userData?.firstName}</p>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button ref={buttonRef} className="circle" onClick={() => {
                                setIsOpenUserList(!isOpenUserList);
                            }}></button>
                            {isOpenUserList && <UserNavbar />}
                        </div>
                    </div>)
                }

            </div>
        </div>
    )
}

export default Header