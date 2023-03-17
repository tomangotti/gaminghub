import { useNavigate } from "react-router-dom"


function RenderGameCard({game}){
    const navigate = useNavigate()

    function handleClick(){
        navigate(`/games/${game.id}`)
    }

    return(
    <div className="game-card" style={{backgroundImage: `url(${game.image})`}} onClick={handleClick} >
        <h1>{game.name}</h1>
    </div>)
}

export default RenderGameCard