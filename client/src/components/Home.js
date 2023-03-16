import { useNavigate } from "react-router-dom"

import ChatFeed from "./ChatFeed"
import UserList from "./UserList"

function Home({currentUser}){
    const ws = new WebSocket("ws://localhost:3000/cable")
    const navigate = useNavigate()


    

    function handleProfile(userId){
        console.log(userId)
        navigate(`/profile/${userId}`)

    }

    if( currentUser === null){
        return <h1>Please Log in</h1>
    }
    
    return(<>
        
        <h1 style={{textAlign: "center"}}>Hello {currentUser?.username}!</h1>
        <div className="home">
            <ChatFeed currentUser={currentUser} ws={ws} />
            <UserList handleProfile={handleProfile} currentUser={currentUser} />
        </div>
    </>
    )
}

export default Home