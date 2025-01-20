import { useState } from "react";

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [response, setResponse] = useState("not yet");

    const handleOnChange = (event, setState) => {
        setState(event.target.value);
    }

    const handleOnClickLogin = async () => {
        let result = await fetch("http://localhost:8080/SpringBootTest/api/student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset= utf-8",
            },
            body: JSON.stringify({
                id: userName,
                name: password
            })
        });
        result = await result.json();
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