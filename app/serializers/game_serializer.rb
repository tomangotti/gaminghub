class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :about, :creater, :link

  has_many :game_reviews
  has_many :users
end
