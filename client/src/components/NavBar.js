import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"


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

    

    return(<>
        <div id="navbar">
            <h1>GAMING-HUB</h1>
            {currentUser ? <h4 onClick={handleLogout}>Logout</h4> : <h4 onClick={handleLogin}>Login/SignUp</h4>}
            
        </div>
        {currentUser ? 
        <div className="tabsContainer">
            <NavLink to='/home'><h2 className="tabs" name="social">Social</h2></NavLink>
            <NavLink to='/games'><h2 className="tabs"  name="games">Games</h2></NavLink>
            <NavLink to='/profile'><h2 className="tabs"  name="profile">Profile</h2></NavLink>
        </div> : null }
    </>
    )
}

export default NavBar



