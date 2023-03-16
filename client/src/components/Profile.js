import { useEffect, useState } from "react"

function Profile({currentUser}){
    

    function handleSubmit(e) {
        e.preventDefault();

        const body = {
            bio: e.target.bio.value,
            image: e.target.image.value,
            background_image: e.target.backgroundImage.value,
            user_id: currentUser.id
        }

        fetch(`/abouts`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        .then((res) => {
            if(res.ok){
                res.json().then((data) => {
                    console.log(data)
                })
            }else{
                res.json().then((err) => {
                    console.log(err)
                    e.preventDefault()
                })
            }
        })
    }


    if(currentUser === null){
        return(<h1>please log in</h1>)
    }
    if(currentUser.about === null){
        return(
        <div>
            <h1>Please fillout information</h1>
            <form onSubmit={handleSubmit}>
                <label>BIO: </label>
                <input type="string" name="bio" /><br></br>
                <label>Image: </label>
                <input type="string" name="image" /><br></br>
                <label>Wall Paper: </label>
                <input type="string" name="backgroundImage" /><br></br>
                <button>Save</button>
            </form>
        </div>
            )
    }
    return(<div className="userInfoContainer">
        <img src={currentUser.about.image ? currentUser.about.image : "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"} />
        <h1>{currentUser.first_name} {currentUser.last_name} aka {currentUser.username}</h1>
        <p>{currentUser.about.bio}</p>
    </div>)
}

export default Profile