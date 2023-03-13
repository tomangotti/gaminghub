import { useNavigate } from 'react-router-dom'

function Login({setCurrentUser}){
    const navigate = useNavigate()
    

    function handleLogin(e){
        e.preventDefault()

        const loginInfo = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        fetch('/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginInfo)
        })
        .then(r => {
            if(r.ok){
                r.json().then((user) => {
                    console.log(user)
                    setCurrentUser(user)
                    navigate('/home')
                })
            }
        })
}

    return(
        <div className="login">
            <form onSubmit={handleLogin}>
                <label>Username</label>
                <input type="text" name="username" />
                <label>Password</label>
                <input type="password" name="password" />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login