import { useEffect, useState } from "react"
import { MemoryRouter, useParams } from "react-router-dom"

import HighScoreBoard from "./HighScoreBoard"
import RenderReview from "./RenderReview"


function GamePage({currentUser}){
    const { id } = useParams()
    const [game, setGame] = useState()
    const [gameReviews, setGameReviews] = useState([])
    const [owned, setOwned] = useState(false)

    console.log(currentUser)
    useEffect(() => {
        fetch(`/games/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then((game) => {
                    setGame(game)
                    currentUser.game.forEach((userGame) => {
                        if(userGame.id === game.id){
                            setOwned(false)
                        }
                    })
                })
            }
        })
    },[])

    useEffect(() => {
        fetch(`/game_reviews/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then((reviews) => {
                    setGameReviews(reviews)
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

        fetch(`/game_reviews`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        })
        .then(r => {
            if(r.ok){
                r.json().then((review) => {
                    setGameReviews([...gameReviews, review])
                })
            }
        })
    }

    function handleBuy(){
        fetch(`owned_games/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                game_id: game.id,
                user_id: currentUser.id,
            })
        })
        
    }

    

    if(!game || !currentUser){
        return(<h1>Loading</h1>)
    }

    

    return(<>
            <div className="gamepage-container">
                <img src={game.image} />
                <h1>{game.name}</h1>
                <p>{game.about}</p>
                <h6>By: {game.creater}</h6>
                {owned ? <button>Play</button> : <button onClick={handleBuy}>Buy</button>}
            </div>
            <table className="score-container">
                <th>
                    <td className="score-title">NAME</td>
                    <td className="score-title">SCORE</td>
                </th>
                <HighScoreBoard />
            </table>
            
            
            <div className="review-container">
                <form onSubmit={handleSubmit}>
                    <label>Review</label>
                    <input type="text" name="review"/>
                    <button>Post</button>
                </form>
                <div className="reviews">
                {gameReviews ? gameReviews.map((review) => {
                    return <RenderReview key={review.id} review={review} />}) : null}
                </div>
            </div>
        </>
    )
}

export default GamePage