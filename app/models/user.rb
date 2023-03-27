class User < ApplicationRecord
    has_secure_password
    has_many :messages, dependent: :destroy
    has_many :chatrooms, through: :messages
    has_one :about, dependent: :destroy
    has_many :games
    has_many :game_reviews, dependent: :destroy

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true
    validates :email, presence: true

end
