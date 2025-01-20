import { Outlet } from "react-router"
import Footer from "./footer"
import Header from "./header"

function Container() {

    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Container