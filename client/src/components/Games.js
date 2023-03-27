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
            user_id: currentUser.id
        }


        fetch('/games', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(addGame)
        })
        .then((r) => {
            if(r.ok){
                r.json().then((newGame) =>{
                    setGames([...games, newGame])
                })
            }
        })
    }
    
    return(
    <>
    <div className="addGameForm">
        <button onClick={handleForm}>{editForm ? "Cancel" : "Add New Game"}</button>
    {editForm ? <form onSubmit={handleAddNewGame}>
            <label>title</label>
            <input type="text" name="title" id="title"/>
            <label>about</label>
            <input type="text" name="about" id="about" />
            <label>creater</label>
            <input type="text" name="creater" id="creater" />
            <label>Image</label>
            <input type="text" name="image" id="image" />
            <label>link</label>
            <input type="text" name="link" id="link" />
            <button>ADD</button>
        </form> : null
    }
    </div>
    <h1 className="headers">All Games</h1>
    <div className="game-container">{gameList}</div>
    </>)
}

export default Games