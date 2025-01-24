import { useContext, useEffect, useState } from "react";
import { postMethod } from "../library/API.js"
import "../css/login.css"
import WrapperBox from "../components/wrapperBox.jsx";
import Input from "../components/form/input.jsx";
import Button from "../components/form/button.jsx";
import { useNavigate } from "react-router";
import { loginContext } from "../context/loginProvider.jsx";
import "../css/form/input.css"

function Register() {
    const { isLogin, setIsLogin } = useContext(loginContext);
    useEffect(() => {
        if (isLogin) {
            navigate("/")
        }

    }, [isLogin])
    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    const [response, setResponse] = useState("");

    const handleOnChange = (event, setState) => {
        setState(event.target.value);
    }

    const handleOnClickRegister = async (event) => {
        event.preventDefault();
        const data = {
            firstName,
            lastName,
            email,
            password,
            gender,
            address
        }
        if (!email || !firstName || !lastName || !password || !gender || !address) {
            setResponse("*You must enter all field");
            return;
        }
        else {
            let result = await postMethod(data, "http://localhost:8080/Web-film/user/registration");
            result = await result.json();
            if (result.status == 200) {
                setResponse(result.message)
                setIsLogin(true);
                navigate("/");
            }
            else {
                setResponse(result.message);
            }
        }
    }
    const handleOnClickLogin = () => {
        navigate("/login");
    }
    return (
        <div className="container">
            <form>
                <WrapperBox>
                    <h2>Register account</h2>
                    <div style={{ display: "flex", gap: "15px", flexDirection: "row" }}>
                        {/* first name */}
                        <Input className="default-input-half" type="text" placeholder="First name" onChange={event => handleOnChange(event, setFirstName)} />
                        {/* last name */}
                        <Input className="default-input-half" type="text" placeholder="Last name" onChange={event => handleOnChange(event, setLastName)} />
                    </div>
                    {/* email */}
                    <Input type="text" placeholder="Enter your email" onChange={event => handleOnChange(event, setemail)} />
                    {/* password */}
                    <Input type="password" placeholder="Enter your password" onChange={event => handleOnChange(event, setPassword)} />
                    {/* gender */}
                    <select className="default-input" style={{ width: "200px", alignSelf: "center" }} onChange={event => handleOnChange(event, setGender)}>
                        <option value={""} style={{ color: "gray" }}>Gender</option>
                        <option value={0}>Male</option>
                        <option value={1}>Female</option>
                        <option value={2}>Unknown</option>
                    </select>
                    {/* address */}
                    <Input type="text" placeholder="Your address" onChange={event => handleOnChange(event, setAddress)} />
                    {response != null &&
                        <p style={{ margin: 0, textAlign: "left", color: "red" }}>{response}</p>
                    }

                    <Button type="default-button" onClick={handleOnClickRegister}>Register</Button>
                    <p style={{ margin: "0" }}>OR</p>
                    <Button type="neural-button" onClick={handleOnClickLogin}>Login</Button>
                </WrapperBox>
            </form>
        </div >
    )
}

export default Register