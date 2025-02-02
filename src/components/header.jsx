import { useContext, useState } from "react";
import { useNavigate } from "react-router"
import { LoginContext } from "../context/loginProvider";
import { getMethod, postMethod } from "../library/API";
import logoNoBackground from "../assets/bach_logo_nobackground.png";
import "../css/header.css"
import Button from "./form/button";
import Input from "./form/input";

function Header() {
    const navigate = useNavigate();
    const { isLogin, setIsLogin } = useContext(LoginContext);
    const { userData, setUserData } = useContext(LoginContext);

    const [isOpenUserList, setIsOpenUserList] = useState(false);
    const [titleSearch, setTitleSearch] = useState("");

    const handleNavigate = (url) => {
        navigate(url);
    }

    const handleLogout = async () => {
        await postMethod({}, "http://localhost:8080/Web-film/authentication/reset-session-cookie");
        setIsLogin(false);
        setUserData("");
    }

    const onEnterDown = (e) => {
        if (e.key == "Enter") {
            navigate(`search?title=${titleSearch}`);
        }
    }

    let checkUser = userData?.role === 1 || userData?.role === 2
    return (
        // <div className="header-container">
        //     <ul className="header-navbar " id="header-ul">
        //         <li onClick={() => { handleNavigate("/") }}><img src={logoNoBackground} alt="" width="80px" height="100%"></img></li>
        //         <li onClick={() => { handleNavigate("/") }}><i className="fa-solid fa-house"></i>Trang chủ</li>
        //         <li onClick={() => { window.location.href = `https://bach205.github.io/web-film/search?category=Phim%20Bộ` }}><i className="fa-solid fa-video"></i>Phim bộ</li>
        //         <li onClick={() => { window.location.href = `https://bach205.github.io/web-film/search?category=Phim%20Lẻ` }}><i className="fa-solid fa-film"></i>Phim lẻ</li>
        //         <li onClick={() => { window.location.href = `https://bach205.github.io/web-film/search?genre=Anime` }}><i className="fa-solid fa-dragon"></i>Anime</li>
        //     </ul>

        //     <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        //         <span id="find-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
        //         <Input type={"text"} placeholder={"Tìm kiếm"} className="medium-input" onKeyDown={onEnterDown} value={titleSearch} onChange={(event) => { setTitleSearch(event.target.value) }} />
        //     </div>

        //     <div>
        //         {!isLogin
        //             ?
        //             (<div className="header-right-content">
        //                 <Button type="small-button" onClick={() => handleNavigate("/login")}>Login</Button>
        //                 <Button type="small-button" onClick={() => handleNavigate("/register")}>Register</Button>
        //             </div>)
        //             :
        //             (<div className="header-right-content">
        //                 <p>{"Hello " + userData?.firstName}</p>
        //                 <div style={{ display: "flex", flexDirection: "column" }}>
        //                     <button className="circle" onClick={() => {
        //                         setIsOpenUserList(!isOpenUserList);
        //                     }}></button>
        //                     {isOpenUserList &&
        //                         <ul className="user-list">
        //                             <li onClick={() => { handleNavigate("management/user") }}><i className="fa-solid fa-circle-user"></i>Hồ sơ cá nhân</li>
        //                             {checkUser && <li onClick={() => { handleNavigate("management/admin") }}><i className="fa-solid fa-list-check"></i>Admin management</li>}
        //                             {checkUser && <li onClick={() => { handleNavigate("management/movie") }}><i className="fa-regular fa-square-plus"></i>Create movie</li>}
        //                             <div style={{ border: "solid 1px black" }}></div>
        //                             <li onClick={() => { handleNavigate("watch-later") }}><i className="fa-solid fa-clock"></i>Xem sau (giỏ hàng)</li>
        //                             <li onClick={() => handleNavigate("/statics")}><i className="fa-solid fa-square-poll-vertical"></i>Thống kê trang web</li>
        //                             <div style={{ border: "solid 1px black" }}></div>
        //                             <li onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Đăng xuất</li>
        //                         </ul>}
        //                 </div>
        //             </div>)
        //         }

        //     </div>
        // </div>
        <div className="header-container">
            <ul className="header-navbar " id="header-ul">
                <li onClick={() => { handleNavigate("/") }}><img src={logoNoBackground} alt="" width="80px" height="100%"></img></li>
                <li onClick={() => { handleNavigate("/") }}><i className="fa-solid fa-house"></i>Trang chủ</li>
                <li onClick={() => { handleNavigate(`search`) }}><i className="fa-solid fa-video"></i>Phim bộ</li>
                <li onClick={() => { handleNavigate(`search`) }}><i className="fa-solid fa-film"></i>Phim lẻ</li>
                <li onClick={() => { handleNavigate(`search`) }}><i className="fa-solid fa-dragon"></i>Anime</li>
            </ul>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <span id="find-icon"><i className="fa-solid fa-magnifying-glass"></i></span>
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
                        <p>{"Hello " + userData?.firstName}</p>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button className="circle" onClick={() => {
                                setIsOpenUserList(!isOpenUserList);
                            }}></button>
                            {isOpenUserList &&
                                <ul className="user-list">
                                    <li onClick={() => { handleNavigate("management/user") }}><i className="fa-solid fa-circle-user"></i>Hồ sơ cá nhân</li>
                                    {checkUser && <li onClick={() => { handleNavigate("management/admin") }}><i className="fa-solid fa-list-check"></i>Admin management</li>}
                                    {checkUser && <li onClick={() => { handleNavigate("management/movie") }}><i className="fa-regular fa-square-plus"></i>Create movie</li>}
                                    <div style={{ border: "solid 1px black" }}></div>
                                    <li onClick={() => { handleNavigate("watch-later") }}><i className="fa-solid fa-clock"></i>Xem sau (giỏ hàng)</li>
                                    <li onClick={() => handleNavigate("/statics")}><i className="fa-solid fa-square-poll-vertical"></i>Thống kê trang web</li>
                                    <div style={{ border: "solid 1px black" }}></div>
                                    {/* <li onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Đăng xuất</li> */}
                                    <li onClick={() => alert("demo nen khong dung duoc dau")}><i className="fa-solid fa-right-from-bracket"></i>Đăng xuất</li>
                                </ul>}
                        </div>
                    </div>)
                }

            </div>
        </div>
    )
}

export default Header