import { useEffect, useState } from "react"
import RenderGameCard from "./RenderGameCard"

function Games(){

    const [games, setGames] = useState([])
    const [ownedGames, setOwnedGames] = useState([])

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
    
    return(
    <>
    <h1 className="headers">Owned Games</h1>
    <div className="game-container">{ownedList}</div>
    <h1 className="headers">All Games</h1>
    <div className="game-container">{gameList}</div>
    </>)
}

export default Games