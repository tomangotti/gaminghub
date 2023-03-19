class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :about, :creater

  has_many :game_reviews
end
