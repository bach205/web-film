import { Outlet } from "react-router"
import Footer from "./footer"
import Header from "./header"

function Container({ children }) {

    return (
        <div>
            <Header />
            <Outlet />
            {children}
            <Footer />
        </div>
    )
}

export default Container