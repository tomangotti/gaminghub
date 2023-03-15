import ChatFeed from "./ChatFeed"

function Home({currentUser}){
    const ws = new WebSocket("ws://localhost:3000/cable")

    if( currentUser === null){
        return <h1>Please Log in</h1>
    }
    
    return(
    <>
        <h1>Hello {currentUser?.username}!</h1>
        <ChatFeed currentUser={currentUser} ws={ws} />
        
    </>
    )
}

export default Home