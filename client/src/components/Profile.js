import { useEffect, useState } from "react"

function Profile({currentUser}){
    

    
    if(currentUser === null){
        return(<h1>please log in</h1>)
    }
    if(currentUser.about === null){
        return(
        <div>
            <h1>Please fillout information</h1>
            <form>
                <label></label>
            </form>
        </div>
            )
    }
    return(<></>)
}

export default Profile