class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :about, :creater, :link, :user_id

  has_many :game_reviews
end
