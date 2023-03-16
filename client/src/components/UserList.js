import { useEffect, useState } from "react"


function UserList(){
    const [users, setUsers] = useState(false)

    useEffect(() => {
        fetch('/users')
        .then(r => {
            if(r.ok){
                r.json().then((list) => {
                    setUsers(list)
                    console.log(list)
                })
            }
        })
    },[])

    if(!users){
        return(<div className="userList">
            <h1>There are no users</h1>
        </div>)
    }



    return(<div className="userList">
        <h1>Users</h1>
    </div>)
}

export default UserList