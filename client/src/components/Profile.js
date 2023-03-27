import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



function Profile({currentUser, setCurrentUser}){
    const navigate = useNavigate()
    const [editOn, setEditOn] = useState(false)

    function handleUpdate(e){
        e.preventDefault()
        const aboutInfo = {
            bio: e.target.bio.value,
            image: e.target.image.value,
            background_image: e.target.backgroundImage.value,
        }

        const userInfo = {
            first_name: e.target.fname.value,
            last_name: e.target.lname.value,
            username: e.target.username.value,
            email: e.target.email.value,
        }

        fetch(`/abouts/${currentUser.about.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(aboutInfo)
        })
        .then((res) => {
            if(res.ok){}else{
                res.json().then((err) => {
                    console.log(err)
                    e.preventDefault();
                })
            }
        })

        fetch(`/users/${currentUser.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userInfo)
        })
        .then((r) => {
            if(r.ok){
                r.json().then((user) => {
                    setCurrentUser(user)
                })
            }
        })
        setEditOn(!editOn)
    }

    function handleEditStatus(){
        setEditOn(!editOn)
    }

    function handleDelete(){
        fetch(`/users/${currentUser.id}`, {
            method: "DELETE"
        })
        setCurrentUser(null)
        navigate('/login')
    }

    if(!currentUser){
        return(<h1>please log in</h1>)
    } else{
        return(<>
                <div className="userInfoContainer">
                    <img src={currentUser.about.image} />
                    <h1>{currentUser.first_name} {currentUser.last_name} aka {currentUser.username}</h1>
                    <p>{currentUser.about.bio}</p>
                </div>
                {editOn ? <div className="editForm">
                <h1>Update Your Information</h1>
                <form onSubmit={handleUpdate}>
                    <label>First Name: </label>
                    <input type="string" name="fname" defaultValue={currentUser.first_name} /><br></br>
                    <label>Last Name: </label>
                    <input type="string" name="lname" defaultValue={currentUser.last_name} /><br></br>
                    <label>Email: </label>
                    <input type="string" name="email" defaultValue={currentUser.email} /><br></br>
                    <label>UserName: </label>
                    <input type="string" name="username" defaultValue={currentUser.username} /><br></br>
                    <label>BIO: </label>
                    <input type="string" name="bio" defaultValue={currentUser.about.bio} /><br></br>
                    <label>Image: </label>
                    <input type="string" name="image" defaultValue={currentUser.about.image} /><br></br>
                    <label>Wall Paper: </label>
                    <input type="string" name="backgroundImage" defaultValue={currentUser.about.background_image}/><br></br>
                    <button>Save</button>
                </form>
                <button onClick={handleDelete}>DELETE ACCOUNT</button>
            </div> : null}
            <button onClick={handleEditStatus}>{editOn ? "Cancel edit" : "Edit Profile"}</button>
                </>
                )
    }
}

export default Profile