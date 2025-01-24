import { useContext } from "react";
import { useNavigate } from "react-router"
import { loginContext } from "../context/loginProvider";
import { postMethod } from "../library/API";


function Header() {
    const navigate = useNavigate();
    const { isLogin, setIsLogin } = useContext(loginContext);

    const onclick = (url) => {
        navigate(url);
    }

    const handleLogout = async () => {
        await postMethod({}, "http://localhost:8080/Web-film/authentication/reset-session-cookie");
        setIsLogin(false);
        onclick("/");
    }
    console.log("check" + isLogin)
    return (
        <div>
            <h1 style={{ color: "white" }}>{isLogin ? "logined" : "logouted"}</h1>
            <button onClick={() => onclick("/login")}>Login</button>
            <button onClick={() => onclick("/register")}>Register</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Header