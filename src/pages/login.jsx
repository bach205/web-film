import { useContext, useEffect, useState } from "react";
import { postMethod } from "../library/API.js"
import "../css/login.css"
import WrapperBox from "../components/wrapperBox.jsx";
import Input from "../components/form/input.jsx";
import Button from "../components/form/button.jsx";
import { useNavigate } from "react-router";
import { loginContext } from "../context/loginProvider.jsx";

function Login() {
    const { isLogin, setIsLogin } = useContext(loginContext);
    useEffect(() => {
        console.log("page login" + isLogin);
        if (isLogin) {
            window.location.href = "http://localhost:5173/"
        }

    }, [isLogin])
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");

    const handleOnChange = (event, setState) => {
        setState(event.target.value);
    }

    const handleOnClickLogin = async (event) => {
        event.preventDefault();
        if (!email) {
            setResponse("*Email field must not be a blank");
            return;
        } else if (!password) {
            setResponse("*Password field must not be a blank");
            return;
        }
        else {
            let result = await postMethod({ email: email, password: password }, "http://localhost:8080/Web-film/user/validate");
            if (result.status == 200) {
                setResponse("");
                setIsLogin(true);
                navigate("/");
            } else if (result.status == 500) {
                setResponse("*cannot fetch api error");
            }
            else {
                setResponse("*your email or your password is incorrect");
            }
        }
    }
    return (
        <div className="container">
            <h1>WELCOME TO WEB FILM DEMO</h1>
            <form>
                <WrapperBox>
                    <h2>Login</h2>
                    <Input type="text" placeholder="Enter your email" onChange={event => handleOnChange(event, setemail)} />
                    <Input type="password" placeholder="Enter your password" onChange={event => handleOnChange(event, setPassword)} />
                    {response != null &&
                        <p style={{ margin: 0, textAlign: "left", color: "red" }}>{response}</p>
                    }
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <span>
                            <input type="checkbox" />
                            <label>Remember password</label>
                        </span>
                        <a href="#">Forget password?</a>
                    </div>
                    <Button type="button" onClick={handleOnClickLogin}>Login</Button>
                </WrapperBox>
            </form>
            <p>designed by huybach. Contact: huybach290125@gmail.com</p>
        </div>
    )
}

export default Login