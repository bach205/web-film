import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router"
import { loginContext } from "../context/loginProvider";
import { postMethod } from "../library/API";
import logoNoBackground from "../assets/bach_logo_nobackground.png";
import "../css/header.css"
import Button from "./form/button";
import Input from "./form/input";

function Header() {
    const navigate = useNavigate();
    const { isLogin, setIsLogin } = useContext(loginContext);
    const { userData } = useContext(loginContext);

    const [isOpenUserList, setIsOpenUserList] = useState(false);

    const onclick = (url) => {
        navigate(url);
    }

    const handleLogout = async () => {
        await postMethod({}, "http://localhost:8080/Web-film/authentication/reset-session-cookie");
        setIsLogin(false);
        onclick("/");
    }

    const onEnterDown = (e) => {
        if (e.key == "Enter") alert("dang phat trien")
    }

    return (
        <div className="header-container">
            <ul className="header-navbar " id="header-ul">
                <li><img src={logoNoBackground} alt="" width="80px" height="100%"></img></li>
                <li><i className="fa-solid fa-house"></i>Trang chủ</li>
                <li><i className="fa-solid fa-video"></i>Phim bộ</li>
                <li><i className="fa-solid fa-film"></i>Phim lẻ</li>
                <li><i className="fa-solid fa-dragon"></i>Anime</li>
            </ul>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <span id="find-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
                <Input type={"text"} placeholder={"Tìm kiếm"} className="medium-input" onKeyDown={onEnterDown} />
            </div>

            <div>
                {!isLogin
                    ?
                    (<div className="header-right-content">
                        <Button type="small-button" onClick={() => onclick("/login")}>Login</Button>
                        <Button type="small-button" onClick={() => onclick("/register")}>Register</Button>
                    </div>)
                    :
                    (<div className="header-right-content">
                        <p>{"Hello " + userData?.firstName}</p>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button className="circle" onBlur={() => {
                                setIsOpenUserList(false);
                            }} onClick={() => {
                                setIsOpenUserList(!isOpenUserList);
                            }}></button>
                            {isOpenUserList &&
                                <ul className="user-list">
                                    <li>Hồ sơ cá nhân</li>
                                    <div style={{ border: "solid 1px black" }}></div>
                                    <li>Xem sau (giỏ hàng)</li>
                                    <li>Lịch sử xem</li>
                                    <li>Đang phát triển...</li>
                                </ul>}
                        </div>
                        <Button type="small-button" onClick={handleLogout}>Logout</Button>
                    </div>)
                }

            </div>
        </div>
    )
}

export default Header