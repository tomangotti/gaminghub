

function Home({currentUser}){
    console.log(currentUser)
    return(
    <>
        <h1>Hello {currentUser?.username}!</h1>
    </>
    )
}

export default Home