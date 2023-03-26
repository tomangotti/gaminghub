class UserWithAboutSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email
  has_one :about
  has_many :games
end
