
function RenderReview({review}) {
    
    return(<div className="review-card">
        <h4>{review.user.username}</h4>
        <p>{review.review}</p>
    </div>)
}

export default RenderReview