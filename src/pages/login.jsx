import { useContext, useEffect, useState } from "react";
import { postMethod } from "../library/API.js"

import WrapperBox from "../components/wrapperBox.jsx";
import Input from "../components/form/input.jsx";
import Button from "../components/form/button.jsx";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/loginProvider.jsx";
import { isValidEmail } from "../library/validate.js";
import "../css/login.css"
import "../css/form/input.css"
import "../css/form/form.css"


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemember, setIsRemember] = useState(false);

    const [response, setResponse] = useState("");
    const { isLogin, setIsLogin, setUserData } = useContext(LoginContext);
    useEffect(() => {
        let localPass = localStorage.getItem("password");
        let localEmail = localStorage.getItem("email");
        let localRememberPassword = localStorage.getItem("rememberPassword");

        if (localPass) {
            setPassword(localPass)
        }

        if (localEmail) {
            setEmail(localEmail)
        }

        if (localRememberPassword) {
            setIsRemember(true)
        }

        if (isLogin) {
            navigate("/")
        }

    }, [isLogin])

    const handleOnChange = (event, setState) => {
        setState(event.target.value);
    }
    const handleOnClickLogin = async () => {
        if (!email) {
            setResponse("*Email field must not be a blank");
            return;
        } else if (!isValidEmail(email)) {
            setResponse("*your email format is wrong please try again")
        } else if (!password) {
            setResponse("*Password field must not be a blank");
            return;
        }
        else {
            let result = await postMethod({ email: email, password: password }, "http://localhost:8080/Web-film/user/validate");
            result = await result.json();
            if (result.status == 200) {
                setResponse("");
                setIsLogin(true);
                setUserData(result?.data)
                navigate("/");
            }
            else {
                setResponse(result.message);
            }
            if (isRemember) {
                localStorage.setItem("rememberPassword", true);
                localStorage.setItem("email", email);
                localStorage.setItem("password", password);
            } else {
                localStorage.removeItem("removePassword");
                localStorage.removeItem("email");
                localStorage.removeItem("password");
            }
        }
    }
    const handleOnClickNavigate = (url) => {
        navigate(url);
    }
    const handleOnEnterDown = (e) => {
        if (e.key == "Enter") {
            handleOnClickLogin();
        }
    }
    return (
        <div className="container">
            <h1>WELCOME TO WEB FILM DEMO</h1>

            <WrapperBox className={'form-box'}>
                <form className="login-form" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
                    <h2 style={{ textAlign: "center" }}>Login</h2>
                    <Input className="default-input new-input" type="text" value={email} placeholder="Enter your email" label="Email" onChange={event => handleOnChange(event, setEmail)} onKeyDown={e => handleOnEnterDown(e)} />
                    <Input className="default-input new-input" type="password" value={password} placeholder="Enter your password" label="Password" onChange={event => handleOnChange(event, setPassword)} onKeyDown={e => handleOnEnterDown(e)} />
                    {response &&
                        <p className="form-response" style={{ margin: 0, textAlign: "left", color: "red" }}>{response}</p>
                    }
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                        <div>
                            <input type="checkbox" checked={isRemember} onChange={() => {
                                setIsRemember(!isRemember)
                            }} />
                            <label>Remember password</label>
                        </div>
                        <a style={{ cursor: "pointer" }} onClick={() => handleOnClickNavigate("/forgetpassword")}>Forget password?</a>
                    </div>
                    <Button type="default-button new-button " onClick={handleOnClickLogin}>Login</Button>
                    <p style={{ margin: "0", textAlign: "center" }}>OR</p>
                    <Button type="neural-button new-button" onClick={() => handleOnClickNavigate("/register")}>Sign up</Button>
                </form>
            </WrapperBox>

            <p>designed by huybach. Contact: huybach290125@gmail.com</p>
        </div>
    )
}

export default Login