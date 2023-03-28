class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :about, :creater, :link, :user_id, :github

  has_many :game_reviews
end
