

function Home({currentUser}){
    

    if( currentUser === null){
        return <h1>Please Log in</h1>
    }



    
    return(
    <>
        <h1>Hello {currentUser?.username}!</h1>
    </>
    )
}

export default Home