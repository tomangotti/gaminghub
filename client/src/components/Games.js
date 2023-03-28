import { useEffect, useState } from "react"
import RenderGameCard from "./RenderGameCard"

function Games({currentUser}){

    const [games, setGames] = useState([])
    const [editForm, setEditForm] = useState(false)

    useEffect(() => {
        fetch('/games')
        .then(r => {
            if(r.ok){
                r.json().then((list) => {
                    setGames(list.games)
                })
            }
        })
    }, [])
    
    const gameList = games.map((game) => {
        return <RenderGameCard key={game.id} game={game} />
    })


    function handleForm(){
        setEditForm(!editForm)
    }

    function handleAddNewGame(e){
        e.preventDefault()

        let addGame = {
            name: e.target.title.value,
            about: e.target.about.value,
            link: e.target.link.value,
            creater: e.target.creater.value,
            image: e.target.image.value,
            github: e.target.github.value,
            user_id: currentUser.id
        }

        console.log(addGame)
        fetch('/games', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(addGame)
        })
        .then((r) => {
            if(r.ok){
                r.json().then((newGame) =>{
                    setGames([...games, newGame])
                    console.log(newGame)
                })
            }
        })

        e.target.reset()
    }
    
    return(
    <>
    
        <button onClick={handleForm} id="addNewGame">{editForm ? "Cancel" : "Add New Game"}</button>
    {editForm ? 
    <div className="addGameForm">
    <form onSubmit={handleAddNewGame}>
            <h1>NEW GAME FORM</h1>
            <label>Title</label><br></br>
            <input type="text" name="title" id="title"/><br></br>
            <label>About</label><br></br>
            <input type="text" name="about" id="about" /><br></br>
            <label>Creater</label><br></br>
            <input type="text" name="creater" id="creater" /><br></br>
            <label>Image</label><br></br>
            <input type="text" name="image" id="image" /><br></br>
            <label>Link</label><br></br>
            <input type="text" name="link" id="link" /><br></br>
            <label>Github</label><br></br>
            <input type="text" name="github" id="github" /><br></br>
            <button>ADD</button>
        </form> 
        </div> : null
    }
    
    <div className="games">
        <h1 className="headers">All Games</h1>
        <div className="game-container">{gameList}</div>
    </div>
    </>)
}

export default Games