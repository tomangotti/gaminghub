import { useEffect, useState } from "react"


function UserList({handleProfile, currentUser}){
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
    const filteredList = users.filter(user => user.id !== currentUser.id )
    const userList = filteredList.map((user) => {
        return (<div onClick={() => handleProfile(user.id)} className="user"><p>{user.username}</p></div>)
    })


    return(<div className="userList">
        <h1>Users</h1>
        {userList}
    </div>)
}

export default UserList