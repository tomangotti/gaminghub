import { useEffect, useState } from "react"
import RenderGameCard from "./RenderGameCard"

function Games(){

    const [games, setGames] = useState([])
    const [ownedGames, setOwnedGames] = useState([])
    const [editForm, setEditForm] = useState(true)

    useEffect(() => {
        fetch('/games')
        .then(r => {
            if(r.ok){
                r.json().then((list) => {
                    setGames(list.games)
                    setOwnedGames(list.owned)
                })
            }
        })
    }, [])
    
    const gameList = games.map((game) => {
        return <RenderGameCard key={game.id} game={game} />
    })

    const ownedList = ownedGames.map((game) => {
        return <RenderGameCard key={game.id} game={game} />
    })

    function handleForm(){
        setEditForm(!editForm)
    }

    function handleAddNewGame(e){
        e.preventDefault()

        newGame = {
            name: e.target.name,
            about: e.target.about,
            link: e.target.link,
            creater: e.target.creater
            image: e.target.image
        }

        fetch('/game', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newGame)
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
    {editForm ? <form onClick={handleAddNewGame}>
            <label>title</label>
            <input type="text" name="name"/>
            <label>about</label>
            <input type="text" name="about"/>
            <label>creater</label>
            <input type="text" name="creater"/>
            <label>Image</label>
            <input type="text" name="image"/>
            <label>link</label>
            <input type="text" name="link"/>
            <button>ADD</button>
        </form> : null
    }
    </div>
    <h1 className="headers">Owned Games</h1>
    <div className="game-container">{ownedList}</div>
    <h1 className="headers">All Games</h1>
    <div className="game-container">{gameList}</div>
    </>)
}

export default Games