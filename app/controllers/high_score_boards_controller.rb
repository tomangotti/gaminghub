class HighScoreBoardsController < ApplicationController
    skip_before_action :authorize, only: [:create, :score_params]

    def show
        game = Game.find(params[:id])
        highScores = game.high_score_boards
        render json: highScores, status: :ok
    end

    def create
        score = HighScoreBoard.create!(score_params)
    end

    private

    def score_params
        params.permit(:game_id, :name, :score)
    end
end
