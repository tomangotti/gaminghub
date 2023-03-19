import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function UserProfile({currentUser}){
    const { id } = useParams()
    const [userInfo, setUserInfo] = useState([])


    useEffect(()=> {
        fetch(`/abouts/${id}`)
        .then((r) => {
            if(r.ok){
                r.json().then((data) => {
                    setUserInfo(data)
                    console.log(data)
                })
            }
        })
    }, [])

    if(currentUser === null){
        return(<h1>please log in</h1>)
    }
    
    if(userInfo.about === null){
        return(<div>
            <h1>{userInfo.username} has not set up thier profile yet!</h1>
        </div>)
    }
    return(<div className="profile-container">
        <img src={userInfo.about.image} />
        <h1>{userInfo.first_name} {userInfo.last_name} aka {userInfo.username}</h1>
        <p>{userInfo.about.bio}</p>
        </div>)
}

export default UserProfile