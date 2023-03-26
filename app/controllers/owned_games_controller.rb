class OwnedGamesController < ApplicationController

    def create
        owned_game = OwnedGame.create!(purchase_params)
    end

    private

    def purchase_params
        params.permit(:game_id, :user_id)
    end
end
