import { useState } from "react";
import { postMethod } from "../library/API.js"
import "../css/login.css"
import WrapperBox from "../components/wrapperBox.jsx";
import Input from "../components/form/input.jsx";
import Button from "../components/form/button.jsx";

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("");

    const handleOnChange = (event, setState) => {
        setState(event.target.value);
    }

    const handleOnClickLogin = async () => {
        let result = await postMethod({ id: userName, name: password }, "http://localhost:8080/Web-film/api/session");
        console.log(result)
        setResponse(result);
    }
    return (
        <div className="container">
            <h1>WELCOME TO WEB FILM DEMO</h1>
            <WrapperBox>
                <h2>Login</h2>
                <Input type="text" placeholder="Enter your username" onChange={event => handleOnChange(event, setUserName)} />
                <Input type="password" placeholder="Enter your password" onChange={event => handleOnChange(event, setPassword)} />
                {response &&
                    <p style={{ margin: 0, textAlign: "left" }}>{response}</p>
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
            <p>designed by huybach. Contact: huybach290125@gmail.com</p>
        </div>
    )
}

export default Login