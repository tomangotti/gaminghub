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
            <h1>GAMINGHUB</h1>
            {currentUser ? <button onClick={handleLogout}>Logout</button> : <button onClick={handleLogin}>Login/SignUp</button>}
            
        </div>
    )
}

export default NavBar