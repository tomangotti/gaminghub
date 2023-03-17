import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
function GamePage(){
    const { id } = useParams()
    const [game, setGame] = useState()

    useEffect(() => {
        fetch(`/games/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then((game) => {
                    setGame(game)
                    
                })
            }
        })
    },[])
    if(!game){
        return(<h1>Loading</h1>)
    }
    return(
        <div className="gamepage-container">
            <img src={game.image} />
            <h1>{game.name}</h1>
            <p>{game.about}</p>
            <h6>By: {game.creater}</h6>
        </div>
    )
}

export default GamePage