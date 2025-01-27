import { Route, Routes } from "react-router"
import Container from "../components/container"
import Home from "../pages/home"
import Login from "../pages/Login"
import Register from "../pages/register"
import ForgetPassword from "../pages/forgetPassword"
import UserManagement from "../pages/userManagement"
import { PrivateRoute } from "./privateRoute"

function AppRouter() {

    return (
        <Routes>
            {/*container chua footer va header */}
            <Route path="/" element={<Container />} >
                <Route index element={<Home />} />
                <Route path="management/user" element={<PrivateRoute element={<UserManagement />} />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgetpassword" element={<ForgetPassword />} />
            {/* Fallback Route */}
            <Route path="*" element={<Container><FallbackRoute /></Container>} />
        </Routes>
    )
}

const FallbackRoute = () => {
    return (
        <>
            <br />
            <h1>There is nothing here</h1>
            <div style={{ height: "30vh" }}></div>
        </>

    )
}
export default AppRouter