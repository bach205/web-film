import { useContext } from "react"
import { LoginContext } from "../context/loginProvider"
import { Navigate } from "react-router";

const PrivateRoute = ({ element }) => {
    const { isLogin } = useContext(LoginContext);
    return (
        <>
            {isLogin ? element : <AuthorizationFailed />}
        </>
    )
}
const AuthorizationFailed = () => {
    return (
        <>
            <br />
            <h1>You need login to see this page</h1>
            <div style={{ height: "30vh" }}></div>
        </>

    )
}
export { PrivateRoute }