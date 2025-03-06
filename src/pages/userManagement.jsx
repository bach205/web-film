import { useContext, useState } from 'react';
import { LoginContext } from '../context/loginProvider';
import WrapperBox from '../components/wrapperBox';
import Button from '../components/form/button';
import Input from '../components/form/input';
import "../css/userManagement.css";
import { postMethod } from '../library/API';
import { DropDown } from '../components/form/dropdown';

const handleOnChange = (event, setState) => {
    setState(event.target.value);
}

function UserManagement() {
    const { userData, setUserData } = useContext(LoginContext);
    const [isChangePassWord, setIsChangePassWord] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [response, setResponse] = useState("");

    return (
        <div className='container margin-header' style={{ padding: "0" }}>
            <div className='userManagement-form-container'>

                <WrapperBox>
                    <Toggle isChangePassWord={isChangePassWord} setIsChangePassWord={setIsChangePassWord} setResponse={setResponse} setIsSuccess={setIsSuccess} />
                    <form style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
                        {!isChangePassWord
                            ? <Information userData={userData} setUserData={setUserData} response={response} setResponse={setResponse} isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
                            : <ChangePassword userData={userData} setUserData={setUserData} response={response} setResponse={setResponse} isSuccess={isSuccess} setIsSuccess={setIsSuccess} />}

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

const Information = ({ userData, setUserData, response, setResponse, isSuccess, setIsSuccess }) => {

    const [firstName, setFirstName] = useState(userData?.firstName);
    const [lastName, setLastName] = useState(userData?.lastName);
    const [gender, setGender] = useState(userData?.gender);
    const [address, setAddress] = useState(userData?.address);
    const handleOnSubmit = () => {
        const data = {
            id: userData.id,
            firstName,
            email: userData.email,
            lastName,
            gender,
            address
        }
        const fetchData = async () => {
            let result = await postMethod(data, "http://localhost:8080/Web-film/user/update-info-except-password");
            result = await result.json();
            setResponse(result?.message);
            if (result.status == 200) {
                setIsSuccess(true)
                setUserData(data => {

                    return {
                        id: data.id,
                        firstName: firstName,
                        lastName: lastName,
                        gender: gender,
                        address: address,
                        email: data.email,
                        password: data.password,
                        role: data.role
                    }
                }
                )
            } else {
                setIsSuccess(false);
            }
        }
        if (!firstName) {
            setResponse("*first name field must not be a blank");
            setIsSuccess(false);
            return;
        } else if (!lastName) {
            setResponse("*last name field must not be a blank");
            setIsSuccess(false);
            return;
        } else if (!gender && gender != 2 && gender != 1 && gender != 0) {
            setResponse("*gender must be chose");
            setIsSuccess(false);
            return;
        } else if (!address) {
            setResponse("*address field must not be a blank");
            setIsSuccess(false);
            return;
        } else {
            fetchData()
        }
    }
    const arrayGender = [
        { value: 0, name: "Male" },
        { value: 1, name: "Female" },
        { value: 2, name: "Unknown" }
    ]
    return (
        <WrapperBox>
            <h3 style={{ textAlign: "center" }}>Update your information</h3>
            <div style={{ display: "flex", gap: "15px", flexDirection: "row" }}>
                {/* first name */}
                <Input className="default-input-half" value={firstName} label="First Name" type="text" placeholder="First name" onChange={event => handleOnChange(event, setFirstName)} />
                {/* last name */}
                <Input className="default-input-half" value={lastName} label="Last Name" type="text" placeholder="Last name" onChange={event => handleOnChange(event, setLastName)} />
            </div>
            {/* gender */}
            <DropDown array={arrayGender} value={gender} label={"Gender"} onChange={event => handleOnChange(event, setGender)} />
            {/* address */}
            <Input type="text" value={address} placeholder="Your address" label="Address" onChange={event => handleOnChange(event, setAddress)} />
            {response &&
                <p style={{ margin: 0, textAlign: "left", color: isSuccess ? "green" : "red" }}>{response}</p>
            }
            <Button type='default-button' onClick={(handleOnSubmit)}>Submit</Button>
        </WrapperBox>
    )
}
const ChangePassword = ({ userData, setUserData, response, setResponse, isSuccess, setIsSuccess }) => {
    const [email, setEmail] = useState(userData?.email);
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const handleOnSubmit = () => {
        const data = { email, password: newPassword };

        const fetchData = async () => {
            let result = await postMethod(data, "http://localhost:8080/Web-film/user/reset-password");
            result = await result.json();
            setResponse(result?.message);
            if (result.status == 200) {
                setIsSuccess(true)
                setUserData(data => {
                    return {
                        id: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        gender: data.gender,
                        address: data.address,
                        email: data.email,
                        password: newPassword,
                        role: data.role
                    }
                }
                )
            } else {
                setIsSuccess(false);
            }
        }
        if (currentPassword != userData?.password) {
            setResponse("*your current password is incorrect");
            setIsSuccess(false);
            return;

        } else if (!confirmNewPassword) {
            setResponse("*Confirm password field must not be a blank");
            setIsSuccess(false);
            return;
        } else if (newPassword != confirmNewPassword) {
            setResponse("*Password must be equal to confirm password");
            setIsSuccess(false);
            return;
        } else {
            fetchData()
        }
    }


    return (
        <WrapperBox>
            <h3 style={{ textAlign: "center" }}>Update your password</h3>
            <Input type="password" placeholder="Enter your currentPassword" label="Current password" onChange={event => handleOnChange(event, setCurrentPassword)} />
            <Input type="password" placeholder="Enter your password" label="new password" onChange={event => handleOnChange(event, setNewPassword)} />
            <Input type="password" placeholder="Confirm your password" label="Confirm new Password" onChange={event => handleOnChange(event, setConfirmNewPassword)} />
            {response &&
                <p style={{ margin: 0, textAlign: "left", color: isSuccess ? "green" : "red" }}>{response}</p>
            }
            <Button type='default-button' onClick={handleOnSubmit}>Submit</Button>
        </WrapperBox>
    )
}

export default UserManagement