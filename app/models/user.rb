class User < ApplicationRecord
    has_secure_password
    has_many :messages
    has_many :chatrooms, through: :messages
    has_one :about
    has_many :owned_games
    has_many :games, through: :owned_games
    has_many :game_reviews

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true
    validates :email, presence: true

end
