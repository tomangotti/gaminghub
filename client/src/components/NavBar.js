import { useNavigate } from "react-router-dom"


function NavBar({currentUser, setCurrentUser}){
    const navigate = useNavigate()

    function handleLogin(){
        navigate('/login')
    }

    function handleLogout(){
        fetch('/logout', {
            method: "DELETE"
        })
        setCurrentUser(null)
        navigate('/home')
    }

    return(
        <div id="navbar">
            <h1>GAMING-HUB</h1>
            {currentUser ? <h4 onClick={handleLogout}>Logout</h4> : <h4 onClick={handleLogin}>Login/SignUp</h4>}
            
        </div>
    )
}

export default NavBar