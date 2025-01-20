import { useState } from "react";
import { postMethod } from "../library/API.js"
function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("not yet");

    const handleOnChange = (event, setState) => {
        setState(event.target.value);
    }

    const handleOnClickLogin = async () => {
        let result = await postMethod({ id: userName, name: password }, "http://localhost:8080/SpringBootTest/api/student");
        console.log(result)
        setResponse(result);
    }
    return (
        <div>
            <form>
                <input type="text" placeholder="username" onChange={event => handleOnChange(event, setUserName)} />
                <input type="password" placeholder="password" onChange={event => handleOnChange(event, setPassword)} />
                <button type="button" onClick={handleOnClickLogin}>Login</button>
            </form>
            <h1>{response}</h1>
        </div>
    )
}

export default Login