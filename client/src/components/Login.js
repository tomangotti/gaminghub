import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({setCurrentUser}){
    const [errors, setErrors] = useState([])
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
            }else{
                r.json().then(err => {
                    setErrors(err.errors)
                })
            }
        })
}
    const errorHandling = errors.map((error, index) => {
        return (<h5 style={{color: "red"}} key={index}>{error}!</h5>)
    })

    function handleSignUp(){
        navigate('/signup')
    }

    return(
        <div className="login">
            <form onSubmit={handleLogin}>
                <label>Username</label><br></br>
                <input type="text" name="username" /><br></br>
                <label>Password</label><br></br>
                <input type="password" name="password" /><br></br><br></br>
                <button>Login</button>
            </form>
            <h4>No account? Sign up Here!</h4>
            <button onClick={handleSignUp}>Sign up</button>
            {errors ? errorHandling : null}
        </div>
    )
}

export default Login