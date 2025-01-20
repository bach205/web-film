import { useNavigate } from "react-router"


function Header() {
    const navigate = useNavigate();

    const onclickLogin = () => {
        navigate("/login");
    }
    const onclickRegister = () => {
        navigate("/register");
    }

    return (
        <div>
            <button onClick={onclickLogin}>Login</button>
            <button onClick={onclickRegister}>Register</button>

        </div>
    )
}

export default Header