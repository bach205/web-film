import { createContext, useEffect, useState } from "react";
import { getMethod } from "../library/API";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState({
        id: 0,
        firstName: "admin",
        lastName: "admin",
        email: "admin@gmail.com",
        password: 1,
        gender: 0,
        address: "vietnam",
        role: 1
    });

    //khi navigate cay xe bi reload nen can phai luu gia tri isLogin vao cuc bo
    // useEffect(() => {
    //     const fetchData = async () => {
    //         let result = await getMethod("http://localhost:8080/Web-film/authentication");
    //         result = await result.json();
    //         if (result.status == 200) {
    //             setIsLogin(true)
    //             setUserData(result.data);
    //         } else {
    //             setIsLogin(false);
    //         }
    //     }
    //     fetchData();
    // }, [])
    return (
        <LoginContext.Provider value={{ isLogin, setIsLogin, userData, setUserData }}>
            {children}
        </LoginContext.Provider>
    )
}

export { LoginProvider, LoginContext };