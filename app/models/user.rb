class User < ApplicationRecord
    has_secure_password
    has_many :messages
    has_many :chatrooms, through: :messages
    has_one :about

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true
    validates :email, presence: true

end
