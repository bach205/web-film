import { useContext } from "react";
import { LoginContext } from "../context/loginProvider";

const PrivateAdminRoute = ({ element }) => {
    const { userData } = useContext(LoginContext);
    return (
        <>
            {(userData.role == 1 || userData.role == 2) ? element : <AuthorizationFailed />}
        </>
    )
}
const AuthorizationFailed = () => {
    return (
        <>
            <br />
            <h1>You don't have authorization see this page</h1>
            <div style={{ height: "30vh" }}></div>
        </>

    )
}
export { PrivateAdminRoute };
