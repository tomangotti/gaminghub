class GameReviewsController < ApplicationController

    def create
        review = GameReview.create(review_params)

        render json: review, status: :created
    end


    private

    def review_params
        params.permit(:user_id, :game_id, :review)
    end
end
