import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function UserProfile({currentUser}){
    const { id } = useParams()
    const [userInfo, setUserInfo] = useState(null)


    useEffect(()=> {
        fetch(`/abouts/${id}`)
        .then((r) => {
            if(r.ok){
                r.json().then((data) => {
                    setUserInfo(data)
                })
            }
        })
    }, [])

    if(currentUser === null){
        return(<h1>please log in</h1>)
    }
    console.log(userInfo)
    if(userInfo === null){
        return (<h1>Loading</h1>)
    }else{
        return(<div className="userInfoContainer">
            <img src={userInfo.about.image} />
            <div className="user-about-container">
                <h1>{userInfo.first_name} {userInfo.last_name} aka {userInfo.username}</h1>
                <h4>{userInfo.email}</h4>
                <p>{userInfo.about.bio}</p>
            </div>
            </div>)
        }
}

export default UserProfile