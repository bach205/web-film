import { createContext, useEffect, useState } from "react";
import { postMethod } from "../library/API";

const loginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

    //khi navigate cay xe bi reload nen can phai luu gia tri isLogin vao cuc bo
    useEffect(() => {
        console.log(1)
        const fetchData = async () => {
            let result = await postMethod({}, "http://localhost:8080/Web-film/authentication");
            if (result.status == 200) {
                setIsLogin(true)
            } else {
                setIsLogin(false);
            }
        }
        fetchData();
    }, [])

    return (
        <loginContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </loginContext.Provider>
    )
}

export { LoginProvider, loginContext };