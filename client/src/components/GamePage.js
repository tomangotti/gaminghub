import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
function GamePage({currentUser}){
    const { id } = useParams()
    const [game, setGame] = useState()
    const [gameReviews, setGameReviews] = useState([])

    useEffect(() => {
        fetch(`/games/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then((game) => {
                    setGame(game)
                    setGameReviews(game.review)
                })
            }
        })
    },[])

    function handleSubmit(e){
        e.preventDefault()

        const post = { 
            review: e.target.review.value,
            game_id: game.id,
            user_id: currentUser.id

        }

        fetch(`/gamereviews`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then(r => {
            if(r.ok){
                r.json().then((review) => {

                })
            }
        })
    }



    if(!game){
        return(<h1>Loading</h1>)
    }
    return(<>
            <div className="gamepage-container">
                <img src={game.image} />
                <h1>{game.name}</h1>
                <p>{game.about}</p>
                <h6>By: {game.creater}</h6>
            </div>
            <div className="review-container">
                <form onSubmit={handleSubmit}>
                    <label>Review</label>
                    <input type="text" name="review"/>
                    <button>Post</button>
                </form>
                <div>

                </div>
            </div>
        </>
    )
}

export default GamePage