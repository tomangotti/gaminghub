class Game < ApplicationRecord
    has_many :owned_games
    has_many :users, through: :owned_games
    has_many :game_reviews
    has_many :high_score_boards
end