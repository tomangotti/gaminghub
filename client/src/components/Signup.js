import { joinPaths } from "@remix-run/router"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


function Signup({setCurrentUser}){
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    function handleSignup(e){
        e.preventDefault()

        const formData = {
            first_name: e.target.fname.value,
            last_name: e.target.lname.value,
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            password_confirmation: e.target.password_confirmation.value
        }

        fetch('/users', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(r => {
            if(r.ok){
                r.json().then((user) => {
                    setCurrentUser(user)
                    navigate('/home')
                })
            }else{
                r.json().then(err => {
                    setErrors(err.errors[0])
                })
            }
        })
        
    }

    const errorHandling = errors.map((error, index) => {
        return (<h5 style={{color: "red"}} key={index}>{error}!</h5>)
    })
    


    return(
        <div>
            <form onSubmit={handleSignup}>
                <label>First Name</label><br></br>
                    <input type='text' name="fname" /><br></br>
                <label>Last Name</label><br></br>
                    <input type='text' name="lname" /><br></br>
                <label>Username</label><br></br>
                    <input type='text' name="username" /><br></br>
                <label>Email</label><br></br>
                    <input type='text' name="email" /><br></br>
                <label>Password</label><br></br>
                    <input type='password' name="password" /><br></br>
                <label>Password Confirmation</label><br></br>
                    <input type='password' name="password_confirmation" /><br></br>
                <button>Sign Up</button>
            </form>
            {errors ? errorHandling : null}
        </div>
    )
}

export default Signup