class HighScoreBoardsController < ApplicationController


    def show
        game = Game.find(params[:id])
        highScores = game.high_score_boards
        render json: highScores, status: :ok
    end


end
