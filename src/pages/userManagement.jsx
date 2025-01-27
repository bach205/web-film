import { useContext, useState } from 'react';
import { loginContext } from '../context/loginProvider';
import WrapperBox from '../components/wrapperBox';
import Button from '../components/form/button';
import Input from '../components/form/input';
import "../css/userManagement.css";
import { postMethod } from '../library/API';

function UserManagement() {
    const { isLogin, setIsLogin } = useContext(loginContext);
    const { userData, setUserData } = useContext(loginContext);

    const [email, setEmail] = useState(userData?.email);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState(userData?.firstName);
    const [lastName, setLastName] = useState(userData?.lastName);
    const [gender, setGender] = useState(userData?.gender);
    const [address, setAddress] = useState(userData?.address);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isChangePassWord, setIsChangePassWord] = useState(false);
    const [response, setResponse] = useState("");

    const handleOnChange = (event, setState) => {
        setState(event.target.value);
    }

    const handleOnSubmit = () => {
        const data = isChangePassWord ? { email, password } : {
            firstName,
            lastName,
            gender,
            address
        }
        const fetchData = async () => {
            let result = await postMethod(data, isChangePassWord ? "http://localhost:8080/Web-film/user/reset-password" : "http://localhost:8080/Web-film/user/update-info-except-password");
            result = await result.json();
            setResponse(result?.message);
            if (result.status == 200) {
                setIsSuccess(true)
            } else {
                setIsSuccess(false);
            }
        }
        if (isChangePassWord) {
            if (!password) {
                setResponse("*Password field must not be a blank");
                setIsSuccess(false);
                return;
            } else if (!confirmPassword) {
                setResponse("*Confirm password field must not be a blank");
                setIsSuccess(false);
                return;
            } else if (password != confirmPassword) {
                setResponse("*Password must be equal to confirm password");
                setIsSuccess(false);
                return;
            } else {
                fetchData()
            }
        }
        else fetchData()
    }
    return (
        <div className='margin-header'>
            <div className='userManagement-form-container'>

                <WrapperBox>
                    <Toggle isChangePassWord={isChangePassWord} setIsChangePassWord={setIsChangePassWord} setResponse={setResponse} setIsSuccess={setIsSuccess} />
                    <form style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
                        {!isChangePassWord
                            ? <Information firstName={firstName} setFirstName={setFirstName} lastName={lastName}
                                setLastName={setLastName} gender={gender} setGender={setGender} address={address}
                                setAddress={setAddress} handleOnChange={handleOnChange} />
                            : <ChangePassword setConfirmPassword={setConfirmPassword} setPassword={setPassword} handleOnChange={handleOnChange} />}
                        {response &&
                            <p style={{ margin: 0, textAlign: "left", color: isSuccess ? "green" : "red" }}>{response}</p>
                        }
                        <Button type='default-button' onClick={(handleOnSubmit)}>Submit</Button>
                    </form>
                </WrapperBox>
            </div>
        </div>
    )
}

const Toggle = ({ isChangePassWord, setIsChangePassWord, setResponse, setIsSuccess }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
            <span><button style={{ backgroundColor: isChangePassWord ? "black" : "#242424" }} onClick={() => { setIsChangePassWord(false); setResponse(""); setIsSuccess(false) }} >Information</button></span>
            <span><button style={{ backgroundColor: isChangePassWord ? "#242424" : "black" }} onClick={() => { setIsChangePassWord(true); setResponse(""); setIsSuccess(false) }}>Change password</button></span>
        </div>
    )
}

const Information = ({ firstName, setFirstName, lastName, setLastName, gender, setGender, address, setAddress, handleOnChange }) => {
    return (
        <>
            <h3 style={{ textAlign: "center" }}>Update your information</h3>
            <div style={{ display: "flex", gap: "15px", flexDirection: "row" }}>
                {/* first name */}
                <Input className="default-input-half" value={firstName} label="First Name" type="text" placeholder="First name" onChange={event => handleOnChange(event, setFirstName)} />
                {/* last name */}
                <Input className="default-input-half" value={lastName} label="Last Name" type="text" placeholder="Last name" onChange={event => handleOnChange(event, setLastName)} />
            </div>
            {/* gender */}
            <select value={gender} className="default-input" style={{ width: "200px", alignSelf: "center" }} onChange={event => handleOnChange(event, setGender)}>
                <option value={""} style={{ color: "gray" }}>Gender</option>
                <option value={0}  >Male</option>
                <option value={1} >Female</option>
                <option value={2} >Unknown</option>
            </select>
            {/* address */}
            <Input type="text" value={address} placeholder="Your address" label="Address" onChange={event => handleOnChange(event, setAddress)} />
        </>
    )
}
const ChangePassword = ({ setPassword, setConfirmPassword, handleOnChange }) => {
    return (
        <>
            <Input type="password" placeholder="Enter your password" label="Password" onChange={event => handleOnChange(event, setPassword)} />
            <Input type="password" placeholder="Confirm your password" label="Confirm Password" onChange={event => handleOnChange(event, setConfirmPassword)} />
        </>
    )
}
export default UserManagement