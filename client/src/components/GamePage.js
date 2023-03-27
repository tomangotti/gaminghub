import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"


import HighScoreBoard from "./HighScoreBoard"
import RenderReview from "./RenderReview"


function GamePage({currentUser}){
    const { id } = useParams()
    const [game, setGame] = useState()
    const [gameReviews, setGameReviews] = useState([])
    const [editGame, setEditGame] = useState(false)
    const navigate = useNavigate()
    

    useEffect(() => {
        fetch(`/games/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then((game) => {
                    setGame(game)
                    console.log(game)
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

    function handleEditGame(){
        setEditGame(!editGame)
    }

    function handleUpdateGame(e){
        e.preventDefault()

        let updateGame = {
            name: e.target.title.value,
            about: e.target.about.value,
            link: e.target.link.value,
            creater: e.target.creater.value,
            image: e.target.image.value,
            user_id: currentUser.id
        }


        fetch(`/games/${game.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updateGame)
        })
        .then((r) => {
            if(r.ok){
                r.json().then((newGame) =>{
                    setGame(newGame)
                })
            }
        })

        e.target.reset()
        setEditGame(!editGame)
    }
    
    function handleDeleteGame(){
        fetch(`/games/${game.id}`, {
            method: "DELETE"
        })
        navigate('/games')
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
                <a href={game.link} target="_blank">
                    <button>Play</button>
                </a>
                {currentUser.id === game.user_id ? <button onClick={handleEditGame}>Edit</button> : null}
                
            </div>
            
            { editGame ?
            <div className="edit-game-form">
                <form onSubmit={handleUpdateGame}>
                    <label>title</label>
                    <input type="text" name="title" id="title" defaultValue={game.name}/>
                    <label>about</label>
                    <input type="text" name="about" id="about" defaultValue={game.about}/>
                    <label>creater</label>
                    <input type="text" name="creater" id="creater"defaultValue={game.creater} />
                    <label>Image</label>
                    <input type="text" name="image" id="image" defaultValue={game.image}/>
                    <label>link</label>
                    <input type="text" name="link" id="link" defaultValue={game.link}/>
                    <button>SAVE</button>
                </form>
                <button onClick={handleDeleteGame}>DELETE</button> 
            </div> : null}
            <table className="score-container">
                <tr>
                    <th className="score-title">NAME</th>
                    <th className="score-title">SCORE</th>
                </tr>
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