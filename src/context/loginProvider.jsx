import { createContext, useEffect, useState } from "react";
import { postMethod } from "../library/API";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState("");

    //khi navigate cay xe bi reload nen can phai luu gia tri isLogin vao cuc bo
    useEffect(() => {
        const fetchData = async () => {
            let result = await postMethod({}, "http://localhost:8080/Web-film/authentication");
            result = await result.json();
            if (result.status == 200) {
                setIsLogin(true)
                setUserData(result.data);
            } else {
                setIsLogin(false);
            }
        }
        fetchData();
    }, [])

    return (
        <LoginContext.Provider value={{ isLogin, setIsLogin, userData, setUserData }}>
            {children}
        </LoginContext.Provider>
    )
}

export { LoginProvider, LoginContext };