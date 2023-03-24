import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function HighScoreBoard(){
    const [scores, setScores] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        fetch(`/high_score_boards/${id}`)
        .then(r => {
            if(r.ok){
                r.json().then((highScore) => {
                    setScores(highScore)
                })
            }
        })
    }, [])

    if(!scores){
        return (<h1>Loading</h1>)
    } else {

    const scoreList = scores.map((score) => {
        return (
        <tr >
            <td className="score">{score.name}</td>
            <td className="score">{score.score}</td>
        </tr>
        )
    })
    return(<>{scoreList}</>)
    }
}

export default HighScoreBoard