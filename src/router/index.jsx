import { Route, Routes } from "react-router"
import Container from "../components/container"
import Home from "../pages/home"
import Login from "../pages/Login"
import Register from "../pages/register"
import ForgetPassword from "../pages/forgetPassword"

function AppRouter() {

    return (
        <Routes>
            {/*container chua footer va header */}
            <Route path="/" element={<Container />} >
                <Route index element={<Home />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgetpassword" element={<ForgetPassword />} />
            {/* Fallback Route */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    )
}

export default AppRouter