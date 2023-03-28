class GamesController < ApplicationController

    def index
        games = Game.all
        user = User.find_by(id: session[:user_id])
        owned_games = user.games 
        object = {
            games: games, 
            owned: owned_games
        }

        render json: object, status: :ok
    end

    def show
        game = Game.find(params[:id])
        render json: game, status: :ok
    end

    def create
        newGame = Game.create!(game_params)
        render json: newGame, status: :created
    end

    def update
        update_game = Game.find(params[:id])
        update_game.update!(game_params)
        render json: update_game, status: :ok
    end

    def destroy
        game = Game.find(params[:id])
        game.destroy
        head :no_content
    end

    private

    def game_params
        params.permit(:name, :about, :link, :creater, :image, :user_id)
    end
end
