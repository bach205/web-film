import { Route, Routes } from "react-router"
import Container from "../components/container"
import { AdminManagement } from "../pages/adminManagement"
import CreateMovie from "../pages/createMovie"
import ForgetPassword from "../pages/forgetPassword"
import Home from "../pages/home"
import Login from "../pages/login"
import Register from "../pages/register"
import Search from "../pages/search"
import Statics from "../pages/statics"
import UserManagement from "../pages/userManagement"
import Watching from "../pages/wactching"
import WatchLater from "../pages/watchLater"
import { PrivateAdminRoute } from "./privateAdminRoute"
import { PrivateRoute } from "./privateRoute"

function AppRouter() {

    return (
        <Routes>
            {/*container chua footer va header */}
            <Route path="/" element={<Container />} >
                <Route index element={<Home />} />
                <Route path="management">
                    <Route path="user" element={<PrivateRoute element={<UserManagement />} />} />
                    <Route path="admin" element={<PrivateAdminRoute element={<AdminManagement />} />} />
                    <Route path="movie" element={<PrivateAdminRoute element={<CreateMovie />} />} />
                </Route>
                <Route path="watch/:movieId/:title/:episode" element={<Watching />} />
                <Route path="search" element={<Search />} />
                <Route path="watch-later" element={<PrivateRoute element={<WatchLater />} />} />
                <Route path="statics" element={<Statics />} />

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