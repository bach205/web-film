import { useContext, useEffect, useState } from "react";
import { postMethod } from "../library/API.js"
import "../css/login.css"
import WrapperBox from "../components/wrapperBox.jsx";
import Input from "../components/form/input.jsx";
import Button from "../components/form/button.jsx";
import { useNavigate } from "react-router";
import { LoginContext } from "../context/loginProvider.jsx";
import { isValidEmail } from "../library/validate.js";

function ForgetPassword() {
    const { isLogin, setIsLogin } = useContext(LoginContext);
    const [isReset, setIsReset] = useState(false);
    useEffect(() => {
        if (isLogin) {
            navigate("/")
        }

    }, [isLogin])
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [response, setResponse] = useState("");

    const handleOnChange = (event, setState) => {
        setState(event.target.value);
    }

    const handleOnClickConfirm = async (event) => {
        event.preventDefault();
        if (!email) {
            setResponse("*Email field must not be a blank");
            setIsReset(false);
            return;
        } else if (!isValidEmail(email)) {
            setResponse("*your email format is wrong please try again")
            setIsReset(false);
            return;
        } else if (!password) {
            setResponse("*Password field must not be a blank");
            setIsReset(false);
            return;
        } else if (!confirmPassword) {
            setResponse("*Confirm password field must not be a blank");
            setIsReset(false);
            return;
        } else if (password != confirmPassword) {
            setResponse("*Password must be equal to confirm password");
            setIsReset(false);
            return;
        }
        else {
            let data = {
                email,
                password
            }
            let result = await postMethod(data, "http://localhost:8080/Web-film/user/reset-password");
            result = await result.json()
            if (result.status == 200) {
                setIsReset(true);
            } else {
                setIsReset(false);
            }
            setResponse(result.message);
        }
    }
    const handleOnClickNavigate = (url) => {
        navigate(url);
    }
    return (
        <div className="container">
            <form>
                <WrapperBox>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px", alignItems: "center" }}>
                        <h2>Reset Password</h2>
                        <p style={{ color: "gray", margin: "0" }}>you need to confirm your email before reset the password</p>
                        <Input type="text" placeholder="Enter your email" label="Email" onChange={event => handleOnChange(event, setemail)} />
                        <Input type="password" placeholder="Enter your password" label="Password" onChange={event => handleOnChange(event, setPassword)} />
                        <Input type="password" placeholder="Confirm your password" label="Confirm Password" onChange={event => handleOnChange(event, setConfirmPassword)} />
                        {response != null &&
                            <p style={{ margin: 0, textAlign: "left", color: isReset ? "green" : "red" }}>{response}</p>
                        }
                        <Button type="default-button" onClick={handleOnClickConfirm}>Confirm</Button>
                        <p style={{ margin: "0" }}>OR</p>
                        <Button type="neural-button" onClick={() => { navigate(-1) }}>Return</Button>
                    </div>
                </WrapperBox>
            </form>
        </div>
    )
}

export default ForgetPassword