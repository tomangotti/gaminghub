class Game < ApplicationRecord
    has_many :game_reviews, dependent: :destroy
    has_many :high_score_boards, dependent: :destroy
    has_one :user
end
