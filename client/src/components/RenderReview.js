
function RenderReview({review}) {

    console.log(review)
    return(<div className="review-card">
        <h6>{review.user.username}</h6>
        <p>{review.review}</p>
    </div>)
}

export default RenderReview