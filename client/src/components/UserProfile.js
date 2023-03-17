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
    return(<><h1>PROFILE STUFF HERE</h1></>)
}

export default UserProfile